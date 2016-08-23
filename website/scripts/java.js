
//AJAX動作
function useAjax(ACT , needVal){
	
	$.ajax({
		type: 'POST',
		url: 'ajax.php',
		data: {Func:ACT,Val:encodeURI(needVal)},
		dataType:'json',
		beforeSend:function(){

			if(ACT == 'requestForm' || ACT == 'contact'){
				setLoadPlayer( '' , '' , '');
			}
		},
		success:function(json){


			//回傳判斷
			switch(ACT)
			{

				case 'getProList':
					//$('input[name=product_class]').val().indexOf($(this).val()) == -1
					console.log(json.sql);
					if(json.num7 == 0){
						alert('No Data!!'); return false;
					}else{
						$('.proList').html(json.re);
						
						
						$('#num').html(json.num+' product(s) found.');
						$("#compareOpen").slideDown("slow");
						
						var valuelist = ''; 
						
						$('input[name=comparison]').change(function() {
							if (this.checked) {
								valuelist += $(this).val() + ',';
							}else{
								valuelist = valuelist.replace($(this).val()+',','');
							}
							
							
							if($('input[name=comparison]:checked').length >4){
								alert('Only choose a maximum of four!!');
								
								$('#inquiryBtn').attr('disabled',true);
								
								/*$('#inquiryBtn').click(function(){
									alert('Only choose a maximum of four!!');
								})*/
								
								
								
							}else{
								$('#inquiryBtn').attr('disabled',false);
								
								$('#inquiryBtn').click(function(){
									useAjax('compare',valuelist);
								})
								
							}
						});
					}
					
				break;
				
				case 'getProList2':
					//alert(json.re);
					$('#Condition').html(json.re);
					//console.log(json.sql);
				break;
				
				case 'compare':
					//alert(json.re);
					window.location.href='products-inquiry.php';
				break;
				
				case 'addCompare':
					//alert(json.re);
					
					$('.selectWord').html('You have selected '+json.num+' products');
					
				break;
				
				case 'delComparison':
					//alert(json.re);
					//window.location.href='products-inquiry.php';
					//$('#proList').html(json.re);
					useAjax('getComparison','en');
				break;
				
				case 'getComparison':
					//alert(json.re);
					//window.location.href='products-inquiry.php';
					$('#proList').html(json.re);
				break;
				
				case 'getProduct':
					//alert(json.re);
					//console.log(json.sql);
					$('#up_cls').html(json.re);
					$('#up_cls').show(1000);
				break;
				
				case 'getDownloadList':
					$('#result > div.container.md > div > table > tbody').html(json.re);
					$('#p_url').attr('href',json.url);
					$('#p_url').html(json.title);
					$('#p_url2').attr('href',json.url);
					
					$('#p_pic').html('<img src="_upload/images/'+json.pic+'" alt="">');
					
					$('#result').show(1000);
				break;
				
				case 'contact':
					if(json.re == '1'){
						alert("send success!!");
						window.location.href="contactInquiry.php";
					}else{
						alert('Verification code error!!');
						$('#VerificationCode').val('');
						$('#rand-img').click();
					}
				break;
				
				case 'requestForm':
					if(json.re == '1'){
						alert("send success!!");
						window.location.href="supRequest.php";
					}else{
						alert('Verification code error!!');
						$('#VerificationCode').val('');
						$('#rand-img').click();
					}
				break;

			}

			//setLoadPlayer( 'none' , '' , '');
			if(ACT == 'requestForm' || ACT == 'contact'){
				$.unblockUI();
			}

		},
		complete:function(){ //生成分頁條

		},
		error:function(){
			//alert("讀取錯誤!");
		}
	});
}


//調整讀取條位置
function setLoadPlayer( view , left , top)
{


	if(view == 'none')
	{
		$.unblockUI();
	}
	else
	{
		$.blockUI({ css: {
			border: 'none',
			padding: '15px',
			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: .5,
			color: '#fff'
		} });

	}

}

