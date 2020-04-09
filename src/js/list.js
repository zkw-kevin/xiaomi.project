// 导航栏区域渲染
getList1()
function getList1() {
    $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            // 1 准备字符串
            let str = '';
            // 2.渲染一级的li
            res.forEach(item => {
                str += `<li>${item.name}</li>`
            })
            // 3填充到nav_top里面的ul里面
            $('.nav_top >ul')
                .html(str)
                .on({
                    mouseenter: () => $('.nav_box').stop().slideDown(),
                    mouseleave: () => $('.nav_box').stop().slideUp()
                })
                .children('li') // 找到所有的一级菜单下的 li
                .on('mouseover', function () {
                    //3-1. 知道自己移入的时哪一个 li
                    const index = $(this).index()
                    // console.log(this);
                    // console.log(index);

                    // 3-2. 找到要渲染的数组
                    const list = res[index].list
                    // 3-3用我们找到的数组把 nav_box 位置渲染
                    let str = '';
                    // 3-4. 进行组装
                    list.forEach(item => {
                        str += `
                         <li>
                            <div>
                            <img src="${ item.list_url}" alt="">
                            </div>
                            <p class="title">${ item.list_name}</p>
                            <span class="price">${ item.list_price}</span>
                        </li>
                         `
                    })
                    //  填充到页面
                    $('.nav_box > ul').html(str)
                })
            // 给nav_box添加一个移入移除事件
            $('.nav_box')
                .on({
                    mouseover: function () { $(this).finish().show() },
                    mouseout: function () { $(this).finish().slideUp() }
                })
        }
    })
}


// 本地jsonp进行渲染
// 2.2准备变量，记录分页器切换到多少页
let currPage=1;
// 1.获取数据
getList()
function getList(){
    $.ajax({
        url:'../lib/list.json',
        dataType:'json',
        success:function(res){
            // console.log(res.length);
            // 一共多少条数据  数据.length
            // 2.分页器渲染
            $('.pagi').pagination({
                pageCount: Math.ceil(res.length/16),//总页数
                current: 1,//当前页
                jump: true,//是否跳转
                coping: true,//是否开启首页和末页
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function (api) {//当你切换页面的时候会触发
                    // api.getCurrent()当前第几页
                    // console.log(api.getCurrent())
                    // 给全局准备的变量赋值
                    currPage=api.getCurrent();
                    // console.log(currPage);
                    // 根据是第几页，从总数组中筛选出一部分数据  第一数据出不来，需要先把第一页数据渲染出来
                    let list=res.slice((currPage-1)*16,currPage*16)
                    console.log(list);
                    
                    // 3.2每次使用分页器切换的时候都渲染一次
                    bindHtml(list)
                }
            });
            // 3.先把第一页数据渲染出来
            bindHtml(res.slice(0,16))

            // 2.2 排序给全局变量list1赋值
            list1=res;
        }
    })
}

function bindHtml(list){
    // console.log(list);
    // 4根据list渲染数据
    // 4.1准备字符串
   let str='';
//    4.2组装数组
    list.forEach(item=>{
        str +=`
        <li data-id='${item.list_id}'>
        <img src="${item.list_url}" alt="">
        <a href="">${item.list_name}</a>
        <p>￥${item.list_price}元</p>
        <img src="${item.list_url}" alt="">
    </li>
        `
    })
    // 4.3添加到页面
    $(".box>ul").html(str)
}

// 排序
// 1.1准备一个变量  true是升序，flase是降序
let flag=true;
// 1.2准备一个变量接受数组
let list1=[];

$('.sort').on('click',function(){
    // 让准备好的变量改变
    flag=!flag;
    // console.log(flag);
    // 需要把数组重组
    // console.log(list1);
    list1.sort(function(a,b){//排序
        if(flag===true){
            $('em').attr('class','glyphicon glyphicon-arrow-up');
            return a.list_price-b.list_price;//升序
        }else{
            $('em').attr('class','glyphicon glyphicon-arrow-down');
            return b.list_price-a.list_price;//降序
        }
    })
    // console.log(list1);
    // 重新渲染
    $('.pagi').pagination({
        pageCount: Math.ceil(list1.length/12),//总页数
        current: 1,//当前页
        jump: true,//是否跳转
        coping: true,//是否开启首页和末页
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) {//当你切换页面的时候会触发
            // api.getCurrent()当前第几页
            // console.log(api.getCurrent())
            // 给全局准备的变量赋值
            currPage=api.getCurrent();
            // console.log(currPage);
            // 根据是第几页，从总数组中筛选出一部分数据  第一数据出不来，需要先把第一页数据渲染出来
            let list=list1.slice((currPage-1)*12,currPage*12);
            
            // 3.2每次使用分页器切换的时候都渲染一次
            bindHtml(list);
        }
    });
    // 3.先把第一页数据渲染出来
    bindHtml(list1.slice(0,12));
})

// 跳转详情页  事件委托
$('.box > ul').on('click','li',function(){
    // console.log(this);//点击的那一个li
    // 在li上绑定id，找到渲染li的数据  从list数组里面找到这个数据  点击li，拿到本身的id属性
    const id=$(this).data('id');//data获取自定义属性
    // console.log(id);
    // 从总的数组中找到与id匹配的那一个数据
    // console.log(list1);
    
    // console.log(list1[i].list1_id);
    
    let data={};
    for(let i=0;i<list1.length;i++){
        if(list1[i].list_id===id){
            data=list1[i];
            break;
        }
      }
    // console.log(data);//渲染当前这个li的数据
    // 把这条数据拿到detail页面渲染
    //数据存储到localhost
      localStorage.setItem('info',JSON.stringify(data));
    // 存储好了跳转页面
    window.location.href='../pages/detail.html';
})
$('.nav').on('click','li',function(){
    event.stopPropagation();//阻止事件传播
    window.location.href="../pages/list.html";
})
























/*
// 在网页上找数据进行渲染(有错误  渲染出来的为undefined)
https://api.search.mi.com/search?
callback=jsonpcallback
&query=鼠标
&page_index=1
&page_size=20
&filter_tag=0
&main_sort=0
&province_id=13
&city_id=133
&_=1585844526915
*/

// // 2.2准备变量，记录分页器切换到多少页
// let currPage=1;
// // 2.3准备一个变量当做开关，决定bindPagi函数是否执行
// let flag=true;

// // 1.获取数据
// getList()
// function getList() {
//     $.ajax({
//         url: '/ym',
//         data: {
//             query: '灯具',
//             page_index: currPage,
//             page_size: 16,
//             filter_tag: 0,
//             main_sort: 0,
//             province_id: 13,
//             city_id: 133,
//         },
//         dataType: 'jsonp',
//         success: function (res) {
//             // res.data.total 最多多少数据
//             // res.data.pc_list  请求回来的数组（渲染页面）
//             // console.log(res);
//             // console.log(res.data.pc_list);
//             // 渲染页面
//             bindHtml(res.data.pc_list);
//             /*渲染分页器 
//             这个函数只有页面打开的第一次请求需要渲染，之后切换分页器的请求不需要渲染
//             */ 
//         //    if(flag===true){
//         //     bingPagi(res.data.total)
//         //    }
//            /*可以写成短路表达式
//            flag是true，后面的就执行
//            flag是flase,后面的就不执行*/
           
//            flag&&bingPagi(res.data.total)
//         }
//     })
// }

// function bindHtml(list) {
//     // 3.渲染页面
//     console.log(list);
//     // 3.1准备一个字符串
//     let str='';
//     // 3.2组装一个字符串
//     list.forEach(item=>{
//         // console.log(item);
//         console.log(item.image);
//         str +=`
//         <li>
//             <img src="${item.image}" alt="">
//             <a href="">${item.name}</a>
//             <p>${item.price}</p>
//             <img src="${item.name}" alt="">
//         </li>
//         `
//         // 3.3添加到页面
//         $('.box>ul').html(str)
//         // console.log(item.image);    
//     })
    
// }
// function bingPagi(total) {
//     // 2.渲染分页器
//     // console.log(Math.ceil(total/16));

//     // 2.3把开关关上
//     flag=false;

//     // 分页
//     $('.pagi').pagination({
//         pageCount: Math.ceil(total/16),//总页数
//         current: 1,//当前页
//         jump: true,//是否跳转
//         coping: true,//是否开启首页和末页
//         homePage: '首页',
//         endPage: '末页',
//         prevContent: '上页',
//         nextContent: '下页',
//         callback: function (api) {//当你切换页面的时候会触发
//             // api.getCurrent()当前第几页
//             // console.log(api.getCurrent())
//             // 每次执行的时候给全局准备的变量赋值
//             currPage=api.getCurrent();
//             // console.log(currPage);
            

//             // 每一次改变执行一次getList
//             getList()
//         }
//     });

// }











