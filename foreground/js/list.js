$(document).ready(function() {
	// const user = JSON.parse(localStorage.getItem('userInfo'))
	// const token = localStorage.getItem('userToken')

	// 获取分类列表
	axios.get('http://localhost:9000/goods/category')
		.then(res => {
			if (res.data.code === 1) {
				const data = res.data.list.reverse()
				$.each(data, function(index, value) {
					$('.category').append('<li>' + value + '</li>');
				});
			}
		})

	
	// 默认查询参数
	let params = {
		current: 1, //当前页
		pagesize: 12, //当前条数
		category: '', //商品分类
		search: '', //关键字
		filter: '',  //(热销/折扣)筛选//hot,sale 
		saleType: 10, //折扣类型
		sortType: 'id',
		sortMethod: 'ASC',
	}
	//页码总数
	let total = 0
	
	// 页码处理
	function commonDeal(params){
		$('.total').text(`${params.current} / ${total}`)
		if(params.current !== 1) {
			$('.first').removeClass('disable').prop('disabled', false)
			$('.prev').removeClass('disable').prop('disabled', false)
		} else {
			$('.first').addClass('disable').prop('disabled', true)
			$('.prev').addClass('disable').prop('disabled', true)
		}
		
		if(params.current == total) {
			$('.last').addClass('disable').prop('disabled', true)
			$('.next').addClass('disable').prop('disabled', true)
		} else {
			$('.last').removeClass('disable').prop('disabled', false)
			$('.next').removeClass('disable').prop('disabled', false)
		}
	}
	
	// 获取商品列表
	function getGoodsList() {
		axios.get('http://localhost:9000/goods/list', 
		 {
		  params: params
		}).then(res => {
				if (res.data.code === 1) {
					const data = res.data.list
					total = res.data.total
					$('.list').html('')
					commonDeal(params) //公共处理
					$.each(data, function(index, item) {
						$('.list').append(`
								<li data-id="${item.goods_id}">
								<div class="show">
									<img src="${item.img_big_logo}">
									${item.is_hot ? '<span class="hot">热销</span>':''}
									${item.is_sale ? '<span>折扣</span>':''}
								</div>
								<div class="info">
									<p class="title">${item.title}</p>
									<p class="price">
										<span class="curr">¥ ${item.current_price}</span>
										<span class="old">¥ ${item.price}</span>
									</p>
								</div>
							</li>
							`);
					});
				}
			})

	}
	getGoodsList()

	// 类别筛选
	$('.category').on('click', 'li', function (event) {
		$(this).addClass('active').siblings().removeClass('active')
		params.category = $(this).text() =='全部'?'':$(this).text()
		params.current = 1
		getGoodsList()
	})
	
	// 类别筛选
	$('.typeBox').on('click', 'li', function (event) {
		$(this).addClass('active').siblings().removeClass('active')
		params.current = 1
		params.filter = $(this).text() =='全部'?'':$(this).attr('data-type')
		getGoodsList()
	})
	
	// 折扣处理
	$('.saleBox').on('click', 'li', function (event) {
		$(this).addClass('active').siblings().removeClass('active')
		params.current = 1
		params.saleType = $(this).text() =='全部'? 10 :$(this).attr('data-type')
		getGoodsList()
	})
	
	// 排序效果
	$('.sortBox').on('click', 'li', function (event) {
		$(this).addClass('active').siblings().removeClass('active')
		params.current = 1
		params.sortType = $(this).attr('data-type')
		params.sortMethod = $(this).attr('data-method')
		getGoodsList()
	})
	
	// 搜索框输入事件
	 $('.search').on('input', debounce(function(e){
		 params.current = 1
		 params.search = e.target.value
		 getGoodsList()
	 }, 1000));
	
	// 防抖事件
	function debounce(func, wait) {
		let timeout;
		return function(...args) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	}

	
	// 翻页效果
	$('.pagination').on('click', 'span', function () {
		console.log($(this).text())
		let text = $(this).text()
		if(text === '首页') {
			params.current = 1
		} 
		if(text === '末页'){
			params.current = total
		}
		if(text === '上一页') {
			params.current --
		}
		if(text === '下一页') {
			params.current ++
		}
		getGoodsList()
	})
	
	// 跳转到指定页
	$('.go').click(function(){
		params.current = $('.jump').val()
		getGoodsList()
	})
	
	// 页码条数选择
	$('.pagesize').change(function(){
		params.pagesize = $(this).val()
		params.current = 1
		getGoodsList()
	})
	
	
	// 进入详情页
	$('.list').on('click', 'li', function () {
		console.log($(this).attr('data-id'))
		let detailId = $(this).attr('data-id')
		axios.get(`http://localhost:9000/goods/item/${detailId}`)
			.then(res => {
				console.log(res)
				if (res.data.code === 1) {
					localStorage.setItem('detailInfo',JSON.stringify(res.data.info))
					setTimeout(function(){
						window.location.href = 'detail.html';
					},1000)
				}
			})
	})
})