// 1.获取数据
const cartList = JSON.parse(localStorage.getItem('cartList'))
// console.log(cartList);
// 2.判断有没有数据
if (!cartList) {
    alert('您的购物车为空')
} else {
    // 3。渲染页面
    bindHtml()
    // 4.添加事件
    bindEvent()
}

// 3.整体渲染页面
function bindHtml() {
    // 全选按钮  如果每一个数据的isSelect都是true，就渲染成true
    let selectAll=cartList.every(item=>{
        // 如果每一条都是true，就会返回true
        return item.isSelect===true;
    })

    let str = `
    <div id="top1">
    <div class="top1 container">
        <ul>
            <li>
                <input type="checkbox" ${selectAll?'checked':''} class='selectAll'>
                全选
            </li>
            <li>图片</li>
            <li>商品名称</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
        </ul>
    </div>
</div>
<div id="center">
    <div class="center container">
        <ul>
            `

    cartList.forEach(item => {
        // 根据每一条数据的渲染  toFixed(2)保留两位小数
        str += `
            <li>
                <div class="select">
                <input type="checkbox" ${item.isSelect ? 'checked':''} class='smallSelect' data-id=${item.list_id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div class="img">
                    <img src="${item.list_url}"
                        alt="">
                </div>
                <div>${item.list_name}</div>
                <div>￥:${item.list_price}</div>
                <div>
                    <button class='sub'data-id=${item.list_id}>-</button>
                    <input type="text" value="${item.number}">
                    <button class='add' data-id=${item.list_id}>+</button>
                </div>
                <div>￥:${item.xiaoji.toFixed(2)}</div>
                <div data-id=${item.list_id} class='del'>删除</div>
            </li>
    
    `
    })

    // 选中商品数量需要渲染
    // 要把数组中isSelect为tru的数据的number加在一起
    let selectArr=cartList.filter(item=>{
        return item.isSelect===true;
    })
    // console.log(selectArr);
    // 选中商品数量
    let selectNumber=0;
    // 选中商品总价
    let selectPrice=0;
    selectArr.forEach(item=>{
        selectNumber +=item.number;
        selectPrice +=item.xiaoji; 
    })
    // 去支付  没有选中就禁选(禁用)  选中就不禁选  用selectArr的length来判断

    str += `
        </ul>
    </div>
</div>
<div id="bottom">
    <div class="bottom container">
        <p><a href="../pages/list.html">继续选购</a> <em>|</em> 选中商品数量<span>${selectNumber}</span></p>
        <span>合计：${selectPrice}元</span>
        <button class="pay" ${selectArr.length?'':'disabled'}>去结算</button>
        <button class="clear">清空购物车</button>
    </div>
</div>
    
    `
    // 整体添加到页面的盒子里面
    $('#cart').html(str)
}

// 4. 添加事件
function bindEvent(){
    // 4.1  全选按钮事件
    $('#cart').on('change','.selectAll',function(){
        // 状态一改变就是一条数据的状态
        // console.log(this.checked);
        // 让数组里面的每一个数据的isSelect都变成this.checked
        cartList.forEach(item=>{
            item.isSelect=this.checked;
        })
        // 重新使用这个数据渲染一遍页面
        // 当点击取消全选按钮时不管用，因为重新渲染页面了，页面上的元素改变，是一套新的元素，没有事件了,所以使用事件委托
        bindHtml();

        // 刷新页面会重置，需要重新存储一个数据
        localStorage.setItem('cartList',JSON.stringify(cartList))
    })

    // 单选按钮事件
    $('#cart').on('change','.smallSelect',function(){
        // console.log(this);
        // 需要知道点击的是哪一个数据的按钮  添加data-id
        // data('id')是data-id=${item.list_id}
        // console.log($(this).data('id'));
        const id=$(this).data('id');
        // 找到数组中id一样的那条数据改变isSelect属性
        cartList.forEach(item=>{
            if(item.list_id===id){
                item.isSelect=!item.isSelect;
            }
        })

        // 重新渲染页面
        bindHtml()
        // 刷新页面会重置，需要重新存储一个数据
        localStorage.setItem('cartList',JSON.stringify(cartList))
    })

    // 4.3 减少商品数量
    $('#cart').on('click','.sub',function(){
        // console.log('减少商品数量');
        // 需要知道点击的是哪一个数据的按钮  添加data-id
        // data('id')是data-id=${item.list_id}
        // console.log($(this).data('id'));
        const id=$(this).data('id');
        // 循环数组，把id对应的这个数据number和小计修改
        cartList.forEach(item=>{
            if(item.list_id===id){
                // 当item.number==1的时候不需要--
                item.number !==1?item.number--:alert('数量不能小于1');
                item.xiaoji=item.number*item.list_price
            }
        })
         // 重新渲染页面
         bindHtml()
         // 刷新页面会重置，需要重新存储一个数据
         localStorage.setItem('cartList',JSON.stringify(cartList))
    })

    // 4.4 增加商品数量
    $('#cart').on('click','.add',function(){
        // 需要知道点击的是哪一个数据的按钮  添加data-id
        // data('id')是data-id=${item.list_id}
        // console.log($(this).data('id'));
        const id=$(this).data('id');
        // 循环数组，把id对应的这个数据number和小计修改
        cartList.forEach(item=>{
            if(item.list_id===id){
                // 当item.number==1的时候不需要--
                item.number++;
                item.xiaoji=item.number*item.list_price
            }
        })
         // 重新渲染页面
         bindHtml()
         // 刷新页面会重置，需要重新存储一个数据
         localStorage.setItem('cartList',JSON.stringify(cartList))
    })

    // 4.5 删除
    $('#cart').on('click','.del',function(){

        // 需要知道点击的是哪一个数据的按钮  添加data-id
        // data('id')是data-id=${item.list_id}
        // console.log($(this).data('id'));
        const id=$(this).data('id');
        // console.log('把数组中id为：'+id+'数据清除')

        // // 获取数据
        let arr=JSON.parse(localStorage.getItem('cartList'));
        // console.log(arr);
        
        // // 筛选数据
        arr=arr.filter(item=>{
            return item.list_id !=id;
        })
        console.log(arr);
        
        // // 将筛选出来的数据放回本地存储
        localStorage.setItem('cartList',JSON.stringify(arr))

        //  // 重新渲染页面
         bindHtml()

        //自动刷新当前页面
        window.location.reload()
    })

    //4.6清除事件 
    $('#cart').on('click','.clear',function(){
        localStorage.removeItem('cartList');
        // 重新渲染页面
         bindHtml()

        //自动刷新当前页面
        window.location.reload()
    })
}

// 点击小米图片返回首页
$('.logo').on('click',function(){
    console.log('回到首页');
    
    window.location.href='../pages/index.html'
})