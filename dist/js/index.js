"use strict";function getList1(){$.ajax({url:"../lib/nav_top.json",dataType:"json",success:function(o){var t="";o.forEach(function(n){t+="<li>".concat(n.name,"</li>")}),$(".nav_top >ul").html(t).on({mouseenter:function(){return $(".nav_box").stop().slideDown()},mouseleave:function(){return $(".nav_box").stop().slideUp()}}).children("li").on("mouseover",function(){var n=$(this).index(),t=o[n].list,i="";t.forEach(function(n){i+='\n                         <li>\n                            <div>\n                            <img src="'.concat(n.list_url,'" alt="">\n                            </div>\n                            <p class="title">').concat(n.list_name,'</p>\n                            <span class="price">').concat(n.list_price,"</span>\n                        </li>\n                         ")}),$(".nav_box > ul").html(i)}),$(".nav_box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}})}})}function getList2(){$.ajax({url:"../lib/right.json",dataType:"json",success:function(o){var t="";o.forEach(function(n){t+="<li>".concat(n.name,"</li>")}),$(".lbt_l > ul").html(t).on({mouseenter:function(){return $(".lbt_r").stop().slideDown()},mouseleave:function(){return $(".lbt_r").stop().slideUp()}}).children("li").on("mouseover",function(){var n=$(this).index(),t=o[n].list,i="";t.forEach(function(n){i+='\n                                <li>\n                                    <div>\n                                    <img src="'.concat(n.list_url,'" alt="">\n                                    </div>\n                                    <span class="title">').concat(n.list_name,"</span>\n                                </li>\n                                ")}),$(".lbt_r > ul").html(i)}),$(".lbt_r").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}})}})}getList1(),(mySwiper=new Swiper(".lbt_big",{loop:!0,autoplay:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})).el.onmouseover=function(){mySwiper.autoplay.stop()},mySwiper.el.onmouseout=function(){mySwiper.autoplay.start()},getList2();var nums=document.getElementsByClassName("num");function num(n){return n<10?"0"+n:n}var futureTime=new Date("2020-4-10 12:00:00");function print_time(){var n=new Date,t=Math.ceil((futureTime-n)/1e3);if(0<=t)for(var i=Math.floor(t/3600),o=Math.floor(t%3600/60),e=t%60,a=""+num(i)+num(o)+num(e),l=0;l<a.length;l++)nums[l].innerHTML=a.charAt(l)}var mySwiper,timer=setInterval(print_time,1e3);function getList3(){$.ajax({url:"../lib/main1.json",dataType:"json",success:function(n){var t="";n.forEach(function(n){t+='\n                <li>\n                <img src="'.concat(n.list_url,'" alt="">\n                <p>').concat(n.list_name,"</p>\n                <span>").concat(n.list_js,"</span>\n                <h6>").concat(n.list_price,"</h6>\n              </li>                    \n                ")}),$(".m52>ul").html(t)}})}(mySwiper=new Swiper(".lbt_small_1",{loop:!0,autoplay:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})).el.onmouseover=function(){mySwiper.autoplay.stop()},mySwiper.el.onmouseout=function(){mySwiper.autoplay.start()},getList3(),$(window).scroll(function(){300<=$(window).scrollTop()?$(".back_top").fadeIn():$(".back_top").fadeOut()}),$(".back_top").click(function(){$("html").animate({scrollTop:0},800)}),$(".lbt_big").on("click","li",function(){event.stopPropagation(),window.location.href="../pages/list.html"});