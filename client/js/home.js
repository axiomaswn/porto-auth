$(document).ready(function(){
  if(!localStorage.getItem('token'))
  {
    window.location.href="http://127.0.0.1:8080/index.html"

  }else{
    $.ajax({
      url:`http://localhost:3000/verify`,
      type:'POST',
      data:{
        token : localStorage.getItem('token')
      },
      dataType:'json',
      success: function(data)
      {
          if(data.status)
          {
          let username = localStorage.getItem('username')
              $('#title #name').html(username)
          }
          if(!data.status){
            window.location.href="http://127.0.0.1:8080/index.html"
          }
      },error:function(err){
        console.log(err);
      }
    })

  }
})

function logout(){
    localStorage.clear()
    window.location.href="http://127.0.0.1:8080/index.html"
}
