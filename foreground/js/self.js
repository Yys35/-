$(document).ready(function() {
	const user = JSON.parse(localStorage.getItem('userInfo'))
	const token = localStorage.getItem('userToken')

	if (user) {
		$('.username').val(user.username)
		$('.nickname').val(user.nickname)
		$('.gender').val(user.gender)
		$('.age').val(user.age || '')
	}

	$('#sure-btn').click(function(e) {
		e.preventDefault(); // 阻止表单的默认提交行为
		const updateData = {
			id: user.id,
			age: $('.age').val(),
			gender: $('.gender').val(),
			nickname: $('.nickname').val()
		};

		axios.post('http://localhost:9000/users/update', updateData,
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
				} else {
					layer.msg(res.data.message, {
						icon: 5
					});
				}
			})
	})
})