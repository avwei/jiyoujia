$.ajax({
	url:"http://www.ikindness.cn/api/test/getProduct"
}).done(function(data){
	console.log(data);
	$(".page").first({
		data : data.data
	});
});

$.fn.extend({
	first : function(data){
		var _data = data.data,
			dataLen = data.length,
			perNum = 10,
			array = [],
			arrayLen = array.length,
			pageNum = dataLen / perNum,
			count = 1;
			createDom(count,_data);
		// 价格升序
		$(".outDiv .nav").find(".priceUp").click(function(){
			_data = data.data;
			dataLen = _data.length;
			count = 1;
			pageNum = dataLen / perNum;
			$(".nav").find(".priceUp").addClass("bdColor").siblings().removeClass("bdColor");
			for(j = 0; j<dataLen-1;j++){
				for(i = 0; i<dataLen-1;i++){
					var dataPrev = parseFloat(_data[i].price),
						dataAfter = parseFloat(_data[i+1].price);
					if(dataPrev>dataAfter){
						var __data = _data[i];
						_data[i] = _data[i+1];
						_data[i+1] = __data;
					}
				}
			}
			setPageNum(count,pageNum);
			clearSelectValue();
			createDom(count,_data);
			// resetDisabled();
		});
		// 价格降序
		$(".outDiv .nav").find(".priceDown").click(function(){
			_data = data.data;
			dataLen = _data.length;
			count = 1;
			pageNum = dataLen / perNum;
			$(".nav").find(".priceDown").addClass("bdColor").siblings().removeClass("bdColor");
			for(j = 0; j<dataLen-1;j++){
				for(i = 0; i<dataLen-1;i++){
					var dataPrev = parseFloat(_data[i].price),
						dataAfter = parseFloat(_data[i+1].price);
					if(dataPrev<dataAfter){
						var __data = _data[i];
						_data[i] = _data[i+1];
						_data[i+1] = __data;
					}
				}
			}
			setPageNum(count,pageNum);
			clearSelectValue();
			createDom(count,_data);
			resetDisabled();
		});
		// 销量升序
		$(".outDiv .nav").find(".volumeUp").click(function(){
			_data = data.data;
			dataLen = _data.length;
			count = 1;
			pageNum = dataLen / perNum;
			$(".nav").find(".volumeUp").addClass("bdColor").siblings().removeClass("bdColor");
			for(j = 0; j<dataLen-1;j++){
				for(i = 0; i<dataLen-1;i++){
				var dataPrev = parseFloat(_data[i].sold),
					dataAfter = parseFloat(_data[i+1].sold);
					if(dataPrev>dataAfter){
						var __data = _data[i];
						_data[i] = _data[i+1];
						_data[i+1] = __data;	
					}
				}
			}
			setPageNum(count,pageNum);
			clearSelectValue();
			createDom(count,_data);
			resetDisabled();
		});
		// 销量降序
		$(".outDiv .nav").find(".volumeDown").click(function(){
			_data = data.data;
			dataLen = _data.length;
			count = 1;
			pageNum = dataLen / perNum;
			$(".nav").find(".volumeDown").addClass("bdColor").siblings().removeClass("bdColor");
			for(j = 0;j<dataLen-1;j++){
				for(i = 0;i<dataLen-1;i++){
				var dataPrev = parseFloat(_data[i].sold),
					dataAfter = parseFloat(_data[i+1].sold);
					if(dataPrev<dataAfter){
						var __data = _data[i];
						_data[i] = _data[i+1];
						_data[i+1] = __data;
					}
				}
			}
			setPageNum(count,pageNum);
			clearSelectValue();
			createDom(count,_data);
			resetDisabled();
		});
		// 右翻页
		$(".outDiv .nav").find(".pagesRight").click(function(){
			var pageNum = Math.ceil(_data.length / perNum);
			if(count){
				count++;
				count = count > pageNum ? 1 : count;
				setPageNum(count,pageNum);
				createDom(count,_data);
				resetDisabled();
			}
			
		})
		// 左翻页
		$(".outDiv .nav").find(".pagesLeft").click(function(){
			var pageNum = Math.ceil(_data.length / perNum);
			if(count){
				count--;
				count = count ? count : pageNum;
				setPageNum(count,pageNum);
				createDom(count,_data);
				resetDisabled();
			}
			
		})
		// 价格区间
		$(".outDiv .price").find(".button").click(function(){
			_data = data.data;
			var	array = [],
				priceLeft = $(".outDiv .price").find(".priceLeft").val(),
				priceRight = $(".outDiv .price").find(".priceRight").val(),
				pleft = parseFloat(priceLeft),
				pRight = parseFloat(priceRight);
				count = 1;
				resetDisabled();
			for(i = 0;i<_data.length;i++){
				var dataPrice = parseFloat(_data[i].price);
				if((dataPrice >= pleft && dataPrice <= pRight)||(dataPrice <= pleft && dataPrice >= pRight)){	
					array.push(_data[i]);
					// array[array.length] = _data[i];	
				};
			};
			_data = array;
			if(_data.length){
				pageNum = Math.ceil(array.length / perNum);
			}else{
				count = 0;
				pageNum = 0;
				alert("没有此产品，请再试一次！");
				$(".outDiv .pages").find(".pagesLeft").prop("disabled",true);
				$(".outDiv .pages").find(".pagesRight").prop("disabled",true);
			}
			setPageNum(count,pageNum);
			count ? createDom(count,_data) : ($(".page").empty());
		});
		function setPageNum(count,pageNum){
			$(".outDiv .nav").find(".num2").html(pageNum);
			$(".outDiv .nav").find(".num1").html(count);
		};
		function resetDisabled(){
			$(".outDiv .pages").find(".pagesLeft").prop("disabled",false);
			$(".outDiv .pages").find(".pagesRight").prop("disabled",false);
		};
		function clearSelectValue(){
			$(".nav .price").find(".priceLeft").val("");
			$(".nav .price").find(".priceRight").val("");
		};
		// perNum = 10,
		// array = [],
		// arrayLen = array.length,
		// pageNum = dataLen / perNum,
		// count = 1;
		function createDom(count,_data){
			$(".page").empty();
			$mainDiv = $("<div class='main'></div>");
			var counts = count == pageNum ? _data.length : count*perNum;
			for(i =perNum*(count-1);i<counts;i++){
				$mainDiv.append("<div class='box1'><a href='http:"+_data[i].href+"' target='_blank'><img src='http:"+_data[i].image+"' /><div class='hidden'><span class='span1'>找同款</span>"+
				"<span class='span2'>找相似</span></div></a><div class='prices'><div class='price'><span class='money'>￥"+_data[i].price+"</span>"+
				"<img src='./img/by.jpg' /><span class='buy'>"+_data[i].sold+"人购买</span></div><div class='text'>"+
				"<a href=''>"+_data[i].name+"</a></div><div class='icon'><div class='shop'>"+
				"<a href=''><span class='grade'><span class='grade1'></span><span class='grade2'></span><span class='grade3'></span>"+
				"</span><span class='shopName'>"+_data[i].owner+"</span></a></div><div class='location'>"+_data[i].location+"</div>"+
				"<div class='img clearfloat'><img src='./img/gold.jpg'><img src='./img/fu.jpg'><img src='./img/xian.jpg'></div></div></div></div>"+"");	
			}
			$(".page").append($mainDiv);
			}
		
	}
});
