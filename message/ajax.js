/**
 * @author CXCLei
 *
 * @param method		请求方式，默认POST方式传递
 * @param url			默认请求的URL地址
 * @param data			请求的参数，可以使用key=value方式的字符串或者使用JSON对象
 * @param success		成功请求之后的回调方法
 * @param error			请求失败之后的回调方法，目前该方法需要完善
 */
function ajax(method, url, data, success,error) {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	/**
	 * 拼接传递的参数信息。
	 * 在原生的Ajax的请求中，是不能直接使用JSON对象进行传输的，所以需要将数据转换成key=value方式，如果是对象参数就需要修改成key1=value1&key2=value2
	 *
	 */
	if(data){
		//如果当前是JSON对象才进行如下处理
		if(data.constructor == Object){
			var param = new Array();
			for(var key in data){
				param[param.length] = key + "=" + data[key];
			}
			data = param.join("&");
		}
		
		/**
		 * 判断提交的方式是get还是post方式，根据不同的方式拼接URL
		 */
		if('get' === method){
			url += '?'+ data;
		}
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				error && error(e.message);
			}
		}
		
	}
}
