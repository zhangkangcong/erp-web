var api='http://localhost:8080/'
var baseUrl='www.leige.tech/'

//下次再发请求，把token带到后台
//获取第一次登录时放入cookie的token
var token = $.cookie("TOKEN");
//设置ajax前置拦截
//每次ajax请求时把token都带过去
$.ajaxSetup({
	headers:{
		'TOKEN':token   
	}
});

//如果访问登录页面之外的页面，并且没有登录成功之后写入cookie的token，就转发到登录页面
if(token==undefined){
	if(window.location!='http://127.0.0.1:8848/ERP-WEB/login.html'){
		window.top.location = '/ERP-WEB/login.html';
	}
}else{
	if(window.location!='http://127.0.0.1:8848/ERP-WEB/login.html'){
		$.ajax({
				url:api+"login/checkLogin",
				async:true,//同步为true，指当这个请求成功之后才能处理
				type:'post',
				dataType:'json',
				success:function(res){
					if(res.code==-1){
						window.top.location = '/ERP-WEB/login.html';
					}
				},
				error:function(res){
					window.top.location = '/ERP-WEB/login.html';
				}
			});
	}
}

//给按钮赋权限
var pers= localStorage.getItem("permissions");
var userType= localStorage.getItem("userType");
if(userType==1){
	if(pers!=null){
		var permissions = pers.split(",");
		console.log("11111"+permissions);
		//部门权限开始
		if(permissions.indexOf("dept:add")<0){
			$(".btn_add").hide();
		}
		if(permissions.indexOf("dept:update")<0){
			$(".btn_update").hide();
		}
		if(permissions.indexOf("dept:delete")<0){
			$(".btn_delete").hide();
		}
		//部门权限结束
	}else{
		$(".btn_add").hide();
		$(".btn_update").hide();
		$(".btn_delete").hide();
		$(".btn_dispatch").hide();
		$(".btn_reset").hide();
	}
	
}
//给页面显示登录用户名
var username = localStorage.getItem("username");
$(".user_name").html(username);





