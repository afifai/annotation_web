(function($){
	$(function(){
		var hewan = localStorage.getItem('hewan') || "";
		var paket = localStorage.getItem('paket') || "";
		$('#jenis-hewan').val(hewan);
		$('#paket-qurban').val(paket);

  }); // end of document ready
})(jQuery); // end of jQuery name space