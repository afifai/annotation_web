(function($){
  $(function(){
    var currentDate = new Date();
    pickmeup('.birth-date', {
      format  : 'd-m-Y',
      position    : 'right',
      hide_on_select  : true,
      render : function (date) {
        if (date >= currentDate) {
          return {disabled : true, class_name : 'date-in-past'};
        }
        return {};
      } 
    });

    pickmeup('.arrival-time', {
      format  : 'd-m-Y',
      position    : 'right',
      hide_on_select  : true,
      render : function (date) {
        if (date < currentDate) {
          return {disabled : true, class_name : 'date-in-past'};
        }
        return {};
      } 
    });

    $('.birth-date').val("");
    $('.arrival-time').val("");

    var totalBiaya = 0;

    $('#kota-tujuan').change(function(){
      var shipping = parseInt($('#kota-tujuan').find(':selected').attr('harga'));
      var paket1 = parseInt($('#t1').val());
      var paket2 = parseInt($('#t2').val());
      totalBiaya = shipping + paket1 + paket2;
      $('#ongkir').val(shipping);
      $('#bt').val(totalBiaya);
    });

    $('#jp1').change(function(){
      var selectedPaket1 = parseInt($('#jp1').find(':selected').attr('harga'));
      var paket1Quantity = parseInt($('#j1').val());
      $('#h1').val(selectedPaket1);
      $('#t1').val(selectedPaket1*paket1Quantity);
      var shipping = parseInt($('#kota-tujuan').find(':selected').attr('harga'));
      var paket1 = parseInt($('#t1').val());
      var paket2 = parseInt($('#t2').val());
      totalBiaya = shipping + paket1 + paket2;
      $('#bt').val(totalBiaya);
    });

    $('#jp2').change(function(){
     var selectedPaket2 = parseInt($('#jp2').find(':selected').attr('harga'));
     var paket2Quantity = parseInt($('#j2').val());
     $('#h2').val(selectedPaket2);
     $('#t2').val(selectedPaket2*paket2Quantity);
     var shipping = parseInt($('#kota-tujuan').find(':selected').attr('harga'));
     var paket1 = parseInt($('#t1').val());
     var paket2 = parseInt($('#t2').val());
     totalBiaya = shipping + paket1 + paket2;
     $('#bt').val(totalBiaya);
   });

    $('#j2').keyup(function(){
     var selectedPaket2 = parseInt($('#jp2').find(':selected').attr('harga'));
     var paket2Quantity = parseInt($('#j2').val());
     $('#h2').val(selectedPaket2);
     $('#t2').val(selectedPaket2*paket2Quantity);
     var shipping = parseInt($('#kota-tujuan').find(':selected').attr('harga'));
     var paket1 = parseInt($('#t1').val());
     var paket2 = parseInt($('#t2').val());
     totalBiaya = shipping + paket1 + paket2;
     $('#bt').val(totalBiaya);
   });

    $('#gender').change(function(){
      if($(this).val() === "laki-laki"){
        $('#j1').val(2);
      }else{
        $('#j1').val(1);
      }
      var selectedPaket1 = parseInt($('#jp1').find(':selected').attr('harga'));
      var paket1Quantity = parseInt($('#j1').val());
      $('#h1').val(selectedPaket1);
      $('#t1').val(selectedPaket1*paket1Quantity);
      var shipping = parseInt($('#kota-tujuan').find(':selected').attr('harga'));
      var paket1 = parseInt($('#t1').val());
      var paket2 = parseInt($('#t2').val());
      totalBiaya = shipping + paket1 + paket2;
      $('#bt').val(totalBiaya);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space