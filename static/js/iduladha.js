(function($){
	$(function(){

		$('.jcarousel-hewan').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
		var path = location.pathname.split('/');
		var pathLength = path.length;
		if(path.length > 1 && path[pathLength - 2].indexOf('#') === -1){
			localStorage.setItem("referral", path[pathLength - 2]);
		}

		var modal = '<div id="myModal" class="modal"><!-- Modal content --><div class="tnc modal-content"><h6>Term and Condition</h6><ul><li>Tenor/Jangka waktu pembayaran Tabungan Qurban yaitu 12 bulan (1 tahun). Adapun besar setorannya sesuai paket hewan yang dipilih, yaitu Rp 200.000 per bulan untuk paket standard dan Rp 250.000 per bulan untuk paket premium.</li><li>Bagi nasabah yang mendaftarkan diri di tengah tahun atau tidak genap 12 bulan dari Idul Adha tahun ini, dapat membayar setoran dengan besaran menyesuaikan tenor yang tersisa atau dapat juga menabung diperuntukkan untuk Idul adha tahun berikutnya dengan tenor yang lebih lama dari 12 bulan (jumlah setoran bulanan untuk nasabah tersebut akan diinformasikan oleh Bank Qurban saat mendaftar). Contoh: menabung paket standar pada bulan ke-4 program, sisa 8 bulan, maka jumlah setoran Rp 300.000 per bulan ( Rp 2.400.000 : 8 bulan).</li><li>Besar setoran akan diikuti dengan 3 angka unik untuk memudahkan verifikasi setoran oleh admin (jumlah setoran beserta angka unik akan terakumulasi otomatis di saldo nasabah, contoh setor Rp 200.000, beserta angka unik menjadi Rp 200.101).</li><li>Untuk nasabah yang tidak dapat melunasi besarnya akumulasi 12 bulan saat Idul Adha tiba, tenor tabungannya akan otomatis diperpanjang dan hewan kurbannya akan diperuntukkan untuk Idul Adha tahun depan dengan besar akumulasi tabungan ditambah 10% dari besar akumulasi awal (prediksi harga hewan kurban naik 10% tahun depan).</li><li>Nasabah yang terdaftar sebagai Nasabah Bank Qurban akan mendapatkan akun (lengkap dengan username dan password) sebagai fasilitas melakukan konfirmasi pembayaran, cek saldo, dan berhenti menabung.</li><li>Nasabah Bank Qurban berhak berhenti/tidak melanjutkan proses menabung, akan ada menu "berhenti menabung" di akun masing-masing nasabah dengan form exit (diisi nasabah) yang menjelaskan alasan berhenti menabung.</li><li>Uang Nasabah yang berhenti menabung (setelah mengisi form exit) akan ditransfer/dikembalikan ke rekening nasabah masing-masing dengan dipotong biaya administrasi sebesar Rp 100.000,-</li><li>Hewan kurban yang telah dilunasi siap dikirim secara hidup ke seluruh wilayah jabodetabek atau dipercayakan Bank Qurban untuk didistribusikan ke wilayah miskin dan panti asuhan seluruh Indonesia (sesuai request Nasabah). Jika kuota tidak memenuhi maka distribusi hewan kurban hanya sebatas wilayah miskin dan panti asuhan se jabodetabek. </li><li>Nasabah berhak mendapatkan reminder pembayaran 2 kali setiap bulannya.</li><li>Program dimulai September 2016 sampai dengan Agustus 2017.</li><li>Bank Qurban menyediakan menu AJAK TEMANMU di akun masing-masing nasabah, yaitu program promosi Bank Qurban yang melibatkan nasabah untuk promosi Bank Qurban. Besar bagi hasil untuk nasabah yang bersedia klik share AJAK TEMANMU yaitu Rp 100.000/ekor kambing AQIQAH dan Rp 50.000/Nasabah Bank Qurban baru yang mendaftarkan diri lewat share aktif nasabah. Bagi hasil/komisi akan otomatis terakumulasi ke dalam saldo nasabah (Nasabah memiliki kode referral masing-masing untuk mengetahui jumlah bagi hasil/ orang yang mendaftar lewat share program).</li></ul><div class="btn agree-button"><a href="/register/"> Setuju </a></div></div></div>'
		$('#jasa-kami > div > div > div:nth-child(1) > div > h2 > a').click(function(event){
			event.preventDefault();
			$('body').append(modal);
			var modalElement = document.getElementById('myModal');
			modalElement.style.display = "block";
			window.onclick = function(event) {
				if (event.target == modalElement) {
					modalElement.parentNode.removeChild(modalElement);
				}
			}
		});

		$('.animal-image-container img').click(function(){
			localStorage.setItem('hewan',  $(this).attr('hewan'));
			localStorage.setItem('paket',  $(this).attr('paket'));
			location.href = 'qurban.html'
		});

		$('#jasa-kami > div > div > div:nth-child(2) > div > h2 > a').click(function(event){
			event.preventDefault();
			var modalAqiqah = '<div id="myModalAqiqah" class="modal">'+
							    '<!-- Modal content -->'+
							    '<div class="tnc modal-content">'+
							        '<h6>Term and Condition</h6>'+
							        '<ul>'+
							            '<li>Harga total paket Tabungan Aqiqah adalah harga paket normal ditambah 10% (kenaikan harga paket aqiqah tahun depan)</li>'+
							            '<li>Besar setoran akan diikuti dengan 3 angka unik untuk memudahkan verifikasi setoran oleh admin (jumlah setoran beserta angka unik akan terakumulasi otomatis di saldo nasabah, contoh setor Rp 100.000, beserta angka unik menjadi Rp 100.101).</li>'+
							            '<li>Nasabah yang terdaftar sebagai Nasabah Bank Qurban akan mendapatkan akun (lengkap dengan username dan password) sebagai fasilitas melakukan konfirmasi pembayaran, cek saldo, dan berhenti menabung.</li>'+
							            '<li>Nasabah Bank Qurban berhak berhenti/tidak melanjutkan proses menabung, akan ada menu "berhenti menabung" di akun masing-masing nasabah dengan form exit (diisi nasabah) yang menjelaskan alasan berhenti menabung.</li>'+
							            '<li>Uang Nasabah yang berhenti menabung (setelah mengisi form exit) akan ditransfer/dikembalikan ke rekening nasabah masing-masing dengan dipotong biaya administrasi sebesar Rp 100.000,-</li>'+
							            '<li>Nasabah berhak mendapatkan reminder pembayaran 2 kali setiap bulannya.</li>'+
							            '<li>Bank Qurban menyediakan menu AJAK TEMANMU di akun masing-masing nasabah, yaitu program promosi Bank Qurban yang melibatkan nasabah untuk promosi Bank Qurban. Besar bagi hasil untuk nasabah yang bersedia klik share AJAK TEMANMU yaitu Rp 100.000/ekor kambing AQIQAH dan Rp 50.000/Nasabah Bank Qurban baru yang mendaftarkan diri lewat share aktif nasabah. Bagi hasil/komisi akan otomatis terakumulasi ke dalam saldo nasabah (Nasabah memiliki kode referral masing-masing untuk mengetahui jumlah bagi hasil/ orang yang mendaftar lewat share program).</li>'+
							        '</ul>'+
							        '<div class="btn agree-button"><a href="/register/"> Setuju </a>'+
							        '</div>'+
							    '</div>'+
							'</div>';
			$('body').append(modalAqiqah);
			var modalAqiqahElement = document.getElementById('myModalAqiqah');
			modalAqiqahElement.style.display = "block";

			window.onclick = function(event) {
				if (event.target == modalAqiqahElement) {
					modalAqiqahElement.parentNode.removeChild(modalAqiqahElement);
				}
			};
		});

  }); // end of document ready
})(jQuery); // end of jQuery name space