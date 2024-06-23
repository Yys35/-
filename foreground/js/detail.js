$(document).ready(function() {
	let detailInfo = JSON.parse(localStorage.getItem('detailInfo'))
	console.log(detailInfo)
	$('.img_big_logo').attr('src', detailInfo.img_big_logo)
	$('.old').text(detailInfo.price)
	$('.discount').text(detailInfo.sale_type)
	$('.curprice').text(detailInfo.current_price)
	$('.desc').html(detailInfo.goods_introduce)
})