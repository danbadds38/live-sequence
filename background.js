chrome.extension.onMessage.addListener(function(request, sender, callback) {
	console.log("diagram refresh reqest");
	var domain = "http://www.websequencediagrams.com";
	getData(request.body, domain, callback);
	return true;
});

function getData(body, domain, callback){
	console.log("get data");
		
	var page = "/index.php";
	
	var params = [];
	var first = true;
	for (var key in body){
	    params.push(key + "=" + encodeURIComponent(body[key]));
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", domain + page, false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params.join("&"));

	try {
		var response = JSON.parse(xhr.responseText);
		if (response.img) {
			callback(domain + page + response.img);
		}
	} catch (e){
		;
	}
};