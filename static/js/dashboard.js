(function($){
	$(function(){
		localStorage.removeItem('referral');
		var currentTab = localStorage.getItem('currentTab') ? localStorage.getItem('currentTab') : "D";
		$('.side-menu-selection ul li').removeClass("active") ;
		$('.main-dashboard-content').removeClass('active');
		$('#'+currentTab).addClass('active');
		$('[value='+currentTab+']').addClass('active');
		$('.side-menu-selection ul li').click(function(){
		    $('.side-menu-selection ul li.active').removeClass('active');
		    $('.side-menu').removeClass('show');
		    var id = $(this).attr('value');
		    if(id == "B0"){
		      $(this).children("ul").css("display", "block");
		    }else{
		      $("[value = B0]").children('ul').css("display","none")
		      $('div.active').removeClass('active');
		      $('#'+id).addClass('active');
		      $(this).addClass('active');
		      localStorage.setItem('currentTab', id);
		    }
		  });

  }); // end of document ready
})(jQuery); // end of jQuery name space