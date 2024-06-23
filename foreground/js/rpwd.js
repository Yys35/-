$(document).ready(function() {
	const user = JSON.parse(localStorage.getItem('userInfo'))
	const token = localStorage.getItem('userToken')

	$('#sure-btn').click(function(e) {
		e.preventDefault(); // 阻止表单的默认提交行为
		const updateData = {
			id: user.id,
			oldPassword: $('.oldpassword').val(),
			newPassword: $('.newpassword').val(),
			rNewPassword: $('.rnewpassword').val()
		};

		axios.post('http://localhost:9000/users/rpwd', updateData,
		{
				//配置token请求头
				headers: {
					'Authorization': `${token}`
				}
			})
			.then(res => {
				if (res.data.code === 1) {
					layer.msg(res.data.message, {
						icon: 1
					});
					$('.error').hide()
					setTimeout(function(){
						window.location.href = 'login.html';
					},1000)
					
				} else {
					$('.error').show()
					layer.msg(res.data.message, {
						icon: 5
					});
				}
			})
	})
})