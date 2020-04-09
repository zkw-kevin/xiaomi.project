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



// 从localstorage里面获取数据
const info=JSON.parse(localStorage.getItem('info'));
// 判断数据是否存在
if(!info){
    alert('您查看的商品不存在');
    // 跳回页表页面
    window.location.href = '../pages/list.html'
}
// 3 渲染页面
bindHtml()
function bindHtml(){
    $(".nav1 .title").text(info.list_name)
    $('.box img').attr('src',info.list_url);
    $('.box .title').text(info.list_name);
    $('.box .txt').text(info.list_desc)
    $('.box .price').text('￥：' + info.list_price + ' 元')  
}
// 放大镜
jQuery(function(){
    $(".my-foto").imagezoomsl({    
       zoomrange: [4, 4],  //缩放范围
    });
 }); 

//  添加购物车
$('.btn').on('click',function(){
    // console.log('添加购物车');
    // 4.1 判断是够登录

    // 4.2加入到购物车数组里面
    const cartList=JSON.parse(localStorage.getItem('cartList'))||[];
    // console.log(cartList);

    // 4.3 原先里面没有数据  向数组里面把本条数据添加进去
    // cartList.push(info);
    // console.log(cartList);
    // 4.4 判断有没有数据
    // 每一个数据都有一个自己的 id
    //      只要看数组里面有没有 id 一样的数据, 就知道有没有这个数据了
    let exits=cartList.some(item=>{
        // 数组里面每一个id===本页面的这条数据id 
        return item.list_id===info.list_id;
    })
    // console.log(exits);//返回值是true 代表有这个信息或false 代表没有这个信息
    if(exits){
        // 表示有这个信息了, 我们要让 number ++
      // console.log('已经存在 number ++')
      // 找到这个信息给他 number ++
        let data=null;
        for(let i=0;i<cartList.length;i++){
            if(cartList[i].list_id===info.list_id){
                data=cartList[i];//  data 就是找到的这个信息
                break;
            }
        }
        data.number++;
        // console.log(data);
        // 数量添加的时候，小计价格改变
        data.xiaoji=data.list_price*data.number
        
    }else{
        // 表示没有这个信息, 直接 push 就可以了
        // push 之前, 象里面添加一个 number 信息为 1
        info.number=1;

        // 购物车小计
        info.xiaoji=info.list_price;
        info.isSelect=false;
        cartList.push(info);
    }
    // 再存储到localStorage里面
    localStorage.setItem('cartList',JSON.stringify(cartList))
    // console.log(cartList);

     //跳转到购物车页面
    window.location.href='../pages/cart.html'
})

// 跳转页面
$('.nav').on('click','li',function(){
    event.stopPropagation();//阻止事件传播
    window.location.href="../pages/list.html";
})