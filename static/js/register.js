(function($){
  $(function(){

    function getPrice(){
      var durasi = parseInt($('.lama-menabung').find(":selected").attr('data-duration'));
      if($('.jenis-tabungan').val() === "qurban"){
        if(durasi === 2){
          totalBiaya = parseInt($('.paket-tabungan').find(":selected").attr('harga'))*0.1 + parseInt($('.paket-tabungan').find(":selected").attr('harga')) || 0;
        }else{
          totalBiaya = parseInt($('.paket-tabungan').find(":selected").attr('harga')) || 0;
        }
      }else if($('.jenis-tabungan').val() === "aqiqah"){
        var defaultValue = parseInt($('.paket-tabungan').find(":selected").attr('harga'))*0.1 + parseInt($('.paket-tabungan').find(":selected").attr('harga')) || 0;
        if(durasi === 1){
          totalBiaya = defaultValue;
        }else if(durasi === 2){
          totalBiaya = defaultValue*0.1 + defaultValue || 0;
        }else{
          totalBiaya = totalBiaya = parseInt($('.paket-tabungan').find(":selected").attr('harga')) || 0;
        }
      }
      $('.harga-total').val(totalBiaya);
    }

    if(localStorage.getItem('referral')){
      $('#referensi').val(localStorage.getItem('referral'));
    }else{
      $('#referensi').removeAttr('readonly');
    }

    var totalBiaya = parseInt($('.harga-total').val()) || 0;
    var lamaMenabung = parseInt($('.lama-menabung').val());
    getPrice();
    $('.bayar-perbulan').val(Math.ceil(totalBiaya/lamaMenabung)||0);

    $('.lama-menabung').change(function(){
      lamaMenabung = parseInt($('.lama-menabung').val());
      getPrice();
      $('.bayar-perbulan').val(Math.ceil(totalBiaya/lamaMenabung)||0);
    });

    $('.jenis-tabungan').change(function(){
      var value = $(this).val();
      $('.harga-total').val(0);
      $('.bayar-perbulan').val(0);
      if(value === "qurban"){
        $('.paket-tabungan').val('');
    		$('.qurban-paket-option').css('display', 'block');
    		$('.aqiqah-paket-option').css('display', "none");
    		$('.paket-tabungan').removeAttr('disabled');
    	}else if(value === "aqiqah"){
    		$('.paket-tabungan').val('');
    		$('.qurban-paket-option').css('display', 'none');
    		$('.aqiqah-paket-option').css('display', "block");
    		$('.paket-tabungan').removeAttr('disabled');
    	}else{
    		$('.paket-tabungan').attr('disabled', "disabled"); 
    		$('.paket-tabungan').val('');
    	}
    });

    $('.opsi-pengiriman').change(function(){
    	var value = $(this).val();
    	if(value === "kmn"){
        $('.penyaluran').removeClass('hidden');
    		$('.penyaluran').removeAttr('disabled');
        $('.alamat').addClass('hidden');
    		$('.alamat').attr('disabled','disabled');
    
    	}
    	else if(value === "rumah"){
        $('.alamat').removeClass('hidden');
    		$('.alamat').removeAttr('disabled');
        $('.penyaluran').addClass('hidden');
    		$('.penyaluran').attr('disabled','disabled');
    		
    	}
    	else{
    		$('.penyaluran').addClass('hidden');
    		$('.alamat').addClass('hidden')
    	}
    });

    $('.paket-tabungan').change(function(){
    	getPrice();
    	$('.harga-total').val(totalBiaya);
    	lamaMenabung = parseInt($('.lama-menabung').val());
    	$('.bayar-perbulan').val(Math.ceil(totalBiaya/lamaMenabung)||0);
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space