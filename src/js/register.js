$('p').on('click',function(){
    $.ajax({
            url:'',
            type:'post',
            data:{
            number:$('.number').val
            },
            dataType:'json',
    }).then(function(res){
        if(res.status==200){
            location.href='login.html'
        }else{
            alert(res.msg);
            return;
        }
    })
})