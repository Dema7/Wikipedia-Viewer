//https://en.wikipedia.org/wiki/Special:Random

function main() {

function positive() {

    var bar = document.getElementById("sb").childNodes[1];
    var value = bar.value;
    if (!value) {
    	window.alert("Type in anything to start the research");
    } else {
    	var ex = /\s+/g;
    	var space_count = value.match(ex);
    	if (space_count == null) {
            var new_text = value;
    	} else {
    		new_text = value.replace(ex, "%20");
    		//console.log(new_text);
    	}

        url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&continue=-%7C%7C&srsearch=" + new_text + "&srlimit=20&sroffset=20&srprop=snippet&origin=*";

        var request = new XMLHttpRequest();
        request.open("GET", url);
        //request.setRequestHeader("Api-User-Agent", "Example/1.0");
        request.onload = function() {
	        var data = JSON.parse(request.responseText);
	        render(data);
	        //console.log(data);
        }
        request.send();
    }

}

function render(data) {

	$('link[rel=stylesheet][href*="css/main.css"]').remove();

	var style_sheet = document.createElement("link");
    style_sheet.setAttribute("rel", "stylesheet");
    style_sheet.setAttribute("type", "text/css");
    style_sheet.setAttribute("href", "css/main2.css");
    document.getElementsByTagName("head")[0].appendChild(style_sheet);

	$(".window").remove();

	var box = document.getElementById("sb").childNodes[1];
    box.value = "";

    $("#first_h1, #first_h3, #sb label, #second_h1").hide("slow");
    $("#second_h3").hide("slow", function() {
    	$("#sb input").css({
    		"float":"left",
    		//"margin-left":"20%",
    		"margin-bottom":"20px"
    	});
    	$("#first_btn").css({
    		"float":"left",
    		"margin-bottom":"20px"
    	});
    	$("#second_btn").css({
    		"float":"left",
    		"margin-bottom":"20px",
    		"margin-left":"10px",
    	});
        $("#second_btn button").css({
        	//"width":"120px"
        });

    	var btn_text = document.getElementById("second_btn").childNodes[1];
    	btn_text.firstChild.nodeValue = "RANDOM";

        for (var i = 0; i < data.query.search.length; i++) {

	        var title = data.query.search[i].title;
	        //console.log(title);
	        var snippet = data.query.search[i].snippet;
	        //console.log(snippet);

	        var code = /&quot;/gi;
	        var el = snippet.replace(code, "'");
	        //console.log(el);

	        var new_snippet;
	        var reg_ex = /\<.*?>/g;
	        var inspect = el.match(reg_ex);
	        if (inspect == null) {
                new_snippet = el;
	        } else {
	        	new_snippet = el.replace(reg_ex, "");
	        }
	        //console.log(new_snippet);

    	    var el_text;
    	    var ex = /\s+/gi;
    	    var check = title.match(ex);
    	    if (check == null) {
                el_text = title;
    	    } else {
    	    	el_text = title.replace(ex, "%20");
    	    }

    	    var url = "https://en.wikipedia.org/wiki/" + el_text;

    	    var hyper = document.createElement("a");
    	    var new_window = document.createElement("div");
    	    var new_title = document.createElement("h3");
    	    var new_p = document.createElement("p");

    	    hyper.setAttribute("href", url);
    	    hyper.setAttribute("target", "_blank");
    	    hyper.setAttribute("class", "hyper");
    	    new_window.setAttribute("class", "window");
    	    new_title.setAttribute("class", "align");
    	    new_p.setAttribute("class", "align");
    	    var new_text = document.createTextNode(title);
    	    var new_paragraph = document.createTextNode(new_snippet);

    	    hyper.appendChild(new_window);
    	    new_title.appendChild(new_text);
    	    new_p.appendChild(new_paragraph);
            new_window.appendChild(new_title);
            new_window.appendChild(new_p);

    	    var position = document.getElementsByTagName("body")[0];
    	    position.appendChild(hyper);

        }
    });
        
}

var first_btn = document.getElementById("first_btn");
first_btn.addEventListener("click", positive, false);


function random() {

    url = "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts&generator=random&exsentences=2&exintro=1&grnnamespace=0&grnlimit=20&origin=*";

	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		var data = JSON.parse(request.responseText);
		render_sn(data);
		//console.log(data);
	}
	request.send();
}

function render_sn(data) {

	$('link[rel=stylesheet][href*="css/main.css"]').remove();

	var style_sheet = document.createElement("link");
    style_sheet.setAttribute("rel", "stylesheet");
    style_sheet.setAttribute("type", "text/css");
    style_sheet.setAttribute("href", "css/main2.css");
    document.getElementsByTagName("head")[0].appendChild(style_sheet);

	$(".window").remove();

	var object = data.query.pages;
    var prop = Object.getOwnPropertyNames(object); // I could have used instead Object.keys(data.query.pages)
    //console.log(prop.length);
    //console.log(extract);
    
    $("#first_h1, #first_h3, #sb label, #second_h1").hide("slow");
    $("#second_h3").hide("slow", function() {
    	$("#sb input").css({
    		"float":"left",
    		//"margin-left":"20%",
    		"margin-bottom":"20px"
    	});
    	$("#first_btn").css({
    		"float":"left",
    		"margin-bottom":"20px"
    	});
    	$("#second_btn").css({
    		"float":"left",
    		"margin-bottom":"20px",
    		"margin-left":"10px"
    	});
        $("#second_btn button").css({
        	//"width":"120px"
        });

    	var btn_text = document.getElementById("second_btn").childNodes[1];
    	btn_text.firstChild.nodeValue = "RANDOM";

        for (var i = 0; i < prop.length; i++) {

	        var title = data.query.pages[prop[i]].title;
	        //console.log(title);
	        var extract = data.query.pages[prop[i]].extract;
	        //console.log(snippet);

	        var code = /&quot;/gi;
	        var el = extract.replace(code, "'");

	        var new_extract;
	        var reg_ex = /\<.*?>/g;
	        var inspect = el.match(reg_ex);
	        if (inspect == null) {
                new_extract = el;
	        } else {
	        	new_extract = el.replace(reg_ex, "");
	        }

	        var el_text;
    	    var ex = /\s+/gi;
    	    var check = title.match(ex);
    	    if (check == null) {
                el_text = title;
    	    } else {
    	    	el_text = title.replace(ex, "%20");
    	    }

    	    var url = "https://en.wikipedia.org/wiki/" + el_text;

    	    var hyper = document.createElement("a");
    	    var new_window = document.createElement("div");
    	    var new_title = document.createElement("h3");
    	    var new_p = document.createElement("p");

    	    hyper.setAttribute("href", url);
    	    hyper.setAttribute("target", "_blank");
    	    hyper.setAttribute("class", "hyper");
    	    new_window.setAttribute("class", "window");
    	    new_title.setAttribute("class", "align");
    	    new_p.setAttribute("class", "align");
    	    var new_text = document.createTextNode(title);
    	    var new_paragraph = document.createTextNode(new_extract);

    	    hyper.appendChild(new_window);
    	    new_title.appendChild(new_text);
    	    new_p.appendChild(new_paragraph);
            new_window.appendChild(new_title);
            new_window.appendChild(new_p);

    	    var position = document.getElementsByTagName("body")[0];
    	    position.appendChild(hyper);

        }
    });
}

var second_btn = document.getElementById("second_btn");
second_btn.addEventListener("click", random, false);

}

$(document).ready(main);

/* /w/api.php?action=query&format=json&prop=extracts&generator=random&exsentences=5&exintro=1&grnnamespace=0&grnlimit=20 */
