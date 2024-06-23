//登录逻辑
$('#login-btn').click(function(e) {
	const loginData = {
		username: $('.username').val(),
		password: $('.password').val(),
	};
	e.preventDefault(); // 阻止表单的默认提交行为
	// 发送注册请求
	axios.post('http://localhost:9000/users/login', loginData)
		.then(res => {
			if (res.data.code === 1) {
				layer.msg(res.data.message, {
					icon: 1
				});
				// 保存登录用户信息
				localStorage.setItem('userInfo',JSON.stringify(res.data.user))
				localStorage.setItem('userToken',res.data.token)
				setTimeout(function(){
					window.location.href = 'index.html';
				},1000)
			} else {
				layer.msg(res.data.message, {
					icon: 5
				});
			}
		})
})