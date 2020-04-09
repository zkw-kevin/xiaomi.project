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

// 大的轮播图
var mySwiper = new Swiper('.lbt_big', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true, //自动播放

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function () {
    mySwiper.autoplay.stop();
}

//鼠标离开开始自动切换
mySwiper.el.onmouseout = function () {
    mySwiper.autoplay.start();
}

// 左边导航渲染
getList2()
function getList2() {
    $.ajax({
        url: '../lib/right.json',
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            // 准备一个空的字符串
            let str = '';
            // 渲染一级li
            res.forEach(item => {
                str += `<li>${item.name}</li>`
            })
            // 填充到nav_top里
            $('.lbt_l > ul')
                .html(str)
                .on({
                    mouseenter: () => $('.lbt_r').stop().slideDown(),
                    mouseleave: () => $('.lbt_r').stop().slideUp()
                })
                .children('li') // 找到所有的一级菜单下的 li
                .on('mouseover', function () {
                    // 5-1. 知道自己移入的时哪一个 li
                    const index = $(this).index()
                    // 5-2. 找到要渲染的数组
                    const list = res[index].list
                    // console.log(list)
                    // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
                    let str = ''

                    // 5-4. 进行组装
                    list.forEach(item => {
                        str += `
                                <li>
                                    <div>
                                    <img src="${ item.list_url}" alt="">
                                    </div>
                                    <span class="title">${ item.list_name}</span>
                                </li>
                                `
                    })
                    // 5-5. 填充到页面里面
                    $('.lbt_r > ul').html(str)
                })
                 // 4-4. 给 nav_box 添加一个移入移出事件
            $('.lbt_r')
                .on({
                    mouseover: function () { $(this).finish().show() },
                    mouseout: function () { $(this).finish().slideUp() }
                })    
        }
    })
}

// 倒计时

// 获取到页面这元素
var nums = document.getElementsByClassName('num');

function num(n){
    return n<10?'0'+n:n;
}
// 声明未来时间
let futureTime=new Date('2020-4-10 12:00:00');
function print_time(){
    // 声明现在时间
    let nowTime=new Date();
    // 声明剩余时间
    let remainTime=Math.ceil((futureTime-nowTime)/1000);
    if(remainTime>=0){
        // 对秒钟数进行时间换算
        let hour=Math.floor(remainTime/3600);
        let min=Math.floor(remainTime%3600/60);
        let sec=remainTime%60;
        // 组装成时分秒字符串
        let str=''+num(hour)+num(min)+num(sec);
        // 遍历字符串，将每一个字符串放入对应的div中
        for(let i=0;i<str.length;i++){
            nums[i].innerHTML=str.charAt(i)
        }
    }
}
let timer=setInterval(print_time,1000);

// 小轮播图
var mySwiper = new Swiper('.lbt_small_1', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true, //自动播放

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function () {
    mySwiper.autoplay.stop();
}

//鼠标离开开始自动切换
mySwiper.el.onmouseout = function () {
    mySwiper.autoplay.start();
}

// 第五部分渲染
getList3()
function getList3(){
    $.ajax({
        url:'../lib/main1.json',
        dataType:'json',
        success:function(res){
            // console.log(res);
            // 准备一个空字符串
            let str='';
            // 渲染
            res.forEach(item=>{
                str +=`
                <li>
                <img src="${item.list_url}" alt="">
                <p>${item.list_name}</p>
                <span>${item.list_js}</span>
                <h6>${item.list_price}</h6>
              </li>                    
                `
            }) 

            // 填充到ul里
            $('.m52>ul').html(str)
        }
    })
}

// 回到顶部
$(window).scroll(()=>{
    // 通过判断卷曲高度来决定
    if($(window).scrollTop()>=300){
        // 回到顶部按钮显示
        $('.back_top').fadeIn()
    }else{
        $('.back_top').fadeOut()
    }
})

$('.back_top').click(function(){
    $('html').animate({
        scrollTop: 0
      }, 800)
})

// 跳转页面
$('.lbt_big').on('click','li',function(){
    event.stopPropagation();//阻止事件传播
    window.location.href="../pages/list.html";
})