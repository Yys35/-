//注册逻辑
$('#regist-btn').click(function(e) {
	const registData = {
		username: $('.username').val(),
		password: $('.password').val(),
		rpassword: $('.rpassword').val(),
		nickname: $('.nickname').val()
	};
	e.preventDefault(); // 阻止表单的默认提交行为
	// 发送注册请求
	axios.post('http://localhost:9000/users/register', registData)
		.then(res => {
			if (res.data.code === 1) {
				layer.open({
				  content: res.data.message+'点击确定跳转登录页面!',
				  btn: ['确定','取消'],
				  yes: function(index, layero){
					  window.location.href = 'login.html';
				  },
				});
			} else {
				layer.msg(res.data.message, {
					icon: 5
				});
			}
		})
})