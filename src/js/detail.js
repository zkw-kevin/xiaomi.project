// 从localstorage里面获取数据
const info=JSON.parse(localStorage.getItem('info'));
if(!info){
    alert('您查看的商品不存在');
    window.location.href = '../pages/list.html'
}