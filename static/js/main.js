(function($){
  $(function(){

    var path = location.pathname;
    if(path.indexOf('qurban') === -1){
      localStorage.removeItem('hewan');
      localStorage.removeItem('paket');
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    var tooltip = '<div class="popup row"><div class="popup-title"><img src="../images/ava.png"> <p>Nasabah</p></div><div class="saldo">Rp. 1,000,000.00</div><div class="logout">Keluar</div></div>'
    var currentId;
    $("#jasa-kami, .static, .hasfooter").css('padding-bottom',$('.page-footer.teal').innerHeight()+150)
    $('.material-icons').click(function(){
      if($(".hide-on-med-and-down").length > 0){
       var x = document.getElementById("nav-bar");
       if (x.className === "hide-on-med-and-down right") {
        x.className = "hide-on-med-and-down responsive";
      } else {
        x.className = "hide-on-med-and-down right";
      }
    }else{
      var x = document.getElementById("side-menu");
      currentId = $('.main-dashboard-content.active')[0] ? $('.main-dashboard-content.active')[0].id : currentId;
      $('.main-dashboard-content').removeClass('active')
      if (x.className === "col-md-2 col-xs-12 col-sm-2 col-lg-2 side-menu dashboard-content show") {
        x.className = "col-md-2 col-xs-12 col-sm-2 col-lg-2 side-menu dashboard-content";
        $(document.getElementById(currentId)).addClass('active');
      } else {
        x.className = "col-md-2 col-xs-12 col-sm-2 col-lg-2 side-menu dashboard-content show";
      }
    }
  })
    if($('.my-profile').length > 0){
      $('.my-profile').qtip({
        content:{
          text: $('.my-profile').next('.popup')
        },
        show: 'click',
        position: {
              my: 'top right',  // Position my top left...
              at: 'bottom left', // at the bottom right of...
              target: $('.my-profile') // my target
            },
            hide: 'unfocus click',
            style:{
              tip:{
                size:{
                  x:100,
                  y:100
                }
              }
            }
          });
    }
    if($(".jcarousel-testimoni").length > 0){
     var jcarouselTestimoni = $('.jcarousel-testimoni');

     jcarouselTestimoni
     .on('jcarousel:reload jcarousel:create', function () {
      var width = jcarouselTestimoni.innerWidth();
      jcarouselTestimoni.jcarousel('items').css('width', width + 'px');

    })

     setInterval("$('.jcarousel-testimoni').jcarousel('scroll', '+=1')", 8000);

     jcarouselTestimoni.jcarousel({
       wrap : 'both'
     });
   }
   if($(".jcarousel").length > 0){

    var jcarousel = $('.jcarousel');
    jcarousel
    .on('jcarousel:reload jcarousel:create', function () {
      var width = jcarousel.innerWidth();
      jcarousel.jcarousel('items').css('width', width + 'px');

    })

    setInterval("$('.jcarousel').jcarousel('scroll', '+=1')", 8000);

    jcarousel.jcarousel({
     wrap : 'both'
   });

    $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function() {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
      $(this).removeClass('active');
    })
    .jcarouselPagination({
      'item': function(page, carouselItems) {
        return '<a href="#' + page + '"></a>';
      }
    });
  }

  $('.type-selection').click(function(){
    var item = $(this).find("td:first").text();
    var id = $(this).attr('id').split('-');
    $('.type-selection-text').val("Paket " + item+" " +id[1]);
  })

  $('.enable-edit-button').click(function(){
    var parent = $(this).parent();
    var $this = $(parent).children('.account-info');
    if($this.attr('disabled')){
      $this.removeAttr('disabled');
    }else{
      $this.attr('disabled','disabled');
    }
  })

  // Get the modal
  var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("cancel-button")[0];
var share = document.getElementById("share");

// When the user clicks on the button, open the modal 
if(span){
  span.onclick = function() {
    modal.style.display = "none";
  }
}

if(share){
  share.onclick = function() {
    modal.style.display = "block";
  } 
}

if(modal){
  if(!localStorage.getItem("hasShownpopup")){
    modal.style.display = "block";
    localStorage.setItem("hasShownpopup", "true");
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

if($('.dashboard').length  === 0){
  localStorage.removeItem("hasShownpopup");
  localStorage.removeItem("currentTab");
}


if($('.edit-button')){
  var attr = $('.edit-button').attr('disabled');

  $('.edit-button').click(function(){
    if($('.editable').attr('disabled')){
     $('.editable').removeAttr('disabled');
   }else{
    $('.editable').attr('disabled','disabled');
  }
});
}

  $('.rekening-nasabah').change(function(){
      var value = $(this).val();
      if(value === "dll"){
        $('.edit-bank-account').removeClass('hidden');
        $('.edit-bank-account').removeAttr('disabled');
      }
      else{
        $('.edit-bank-account').addClass('hidden');
        $('.edit-bank-account').attr('disabled','disabled');
      }
    });

  $('.paket-selection').change(function(){
      totalBiaya = parseInt($(this).find(":selected").attr('harga')) || 0;
      $('.harga-total').val(totalBiaya);
      lamaMenabung = parseInt($('.lama-menabung').val());
      if(lamaMenabung <= 12){$('.bayar-perbulan').val(Math.ceil(totalBiaya/lamaMenabung)||0);}
      else{$('.bayar-perbulan').val(Math.ceil(((totalBiaya+(totalBiaya*0.1))/lamaMenabung))||0);}
    });

  $('#email').blur(function(){
      var text = $(this).val();
      if(text !== '' && !validateEmail(text)){
        $(this).css('border-color', 'red');
        $('#email-error').css('display','block');
        $('.btn.submit-login').attr('disabled','disabled');
      }else{
        $(this).css('border-color', 'initial');
        $('#email-error').css('display','none');
        $('.btn.submit-login').removeAttr('disabled','disabled');
      }
  });

  $('#password').blur(function(){
      var text = $(this).val();
      var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if(text !== '' && !passRegex.test(text)){
        $(this).css('border-color', 'red');
        $('#password-error').css('display','block');
      }else{
        $(this).css('border-color', 'initial');
        $('#password-error').css('display','none');
      }
  });

  $('#confirm-password').blur(function(){
      var text = $(this).val();
      var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if(text !== '' && !passRegex.test(text)){
        $(this).css('border-color', 'red');
        $('#confirm-password-error').css('display','block');
      }else{
        $(this).css('border-color', 'initial');
        $('#confirm-password-error').css('display','none');
      }
  });
  }); // end of document ready
})(jQuery); // end of jQuery name space
