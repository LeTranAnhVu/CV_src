// Main
$(document).ready(function () {
	$('.my-decription-tabs .nav-item .nav-link').on('click',function(){
		let $this = $(this);
		let flag = $this.attr('my-tab');
		$this.parents('.my-decription-tabs').find('.nav-item .nav-link') .removeClass('active');
		$this.addClass('active');
		// change the content
		$('.tabs-content-box .tab-content').removeClass('active');
		$('.tabs-content-box .tab-content').each(function(i,item){
			if(flag == $(item).attr('my-tab')){
				$(this).addClass('active')
			}
		})
	})
});
