$(document).ready(function() {
	const token = localStorage.getItem('userToken')
	let userInfo = JSON.parse(localStorage.getItem('userInfo'))

		// 请求轮播图数据
		axios.get(`http://localhost:9000/carousel/list`)
		.then(res => {
			if (res.data.code === 1) {
				$('#carousel-item').html('')
				const data = res.data.list
				$.each(data, function(index, item) {
					$('#carousel-item').append(`
								<div><img src="http://127.0.0.1:9000/${item.name}"></div>
							`);
				});
				layui.carousel.render({
					elem: '#carousel', // 选择器
					width: '1200px', //设置容器宽度
					height: '600px',
					arrow: 'hover',
					anim: 'fade' //切换动画方式
				});
			}
		})

	console.log('用户信息', userInfo)

	// 判断用户是否存在，显隐操作
	if (userInfo) {
		$('.header .off').hide()
		$('.header .on').show()
		$('.nickname').text(userInfo.nickname)
	} else {
		$('.header .off').show()
		$('.header .on').hide()
		return
	}

	// 获取用户信息, 用于刷新用户
	axios.get(`http://localhost:9000/users/info?id=${userInfo.id}`, {
			//配置token请求头
			headers: {
				'Authorization': `${token}`
			}
		})
		.then(res => {
			if (res.data.code === 1) {
				userInfo = res.data.user
				$('.nickname').text(userInfo.nickname)
				// 配置localStorage, 信息共享
				localStorage.setItem('userInfo', JSON.stringify(res.data.user))
			} else {
				layer.msg(res.data.message, {
					icon: 5
				});
				localStorage.removeItem('userInfo')
				localStorage.removeItem('userToken')
			}
		})


	// 注销登录操作
	$('.logout').click(function() {
		layer.open({
			content: '确定要注销登录?',
			btn: ['确定', '取消'],
			yes: function(index, layero) {
				axios.get(`http://localhost:9000/users/logout?id=${userInfo.id}`, {
						//配置token请求头
						headers: {
							'Authorization': `${token}`
						}
					})
					.then(res => {
						if (res.data.code === 1) {
							localStorage.removeItem('userInfo')
							localStorage.removeItem('userToken')
							layer.msg('注销登录成功', {
								icon: 1
							});

							setTimeout(function() {
								$('.header .off').show()
								$('.header .on').hide()
							}, 1500)
						} else {
							layer.msg(res.data.message, {
								icon: 5
							});
						}
					})
			},
		});
	})

	// 个人中心
	$('.self').click(function() {
		window.location.href = 'self.html';
	})
})