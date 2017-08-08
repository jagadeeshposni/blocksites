// window.onload = function(){
// 	//alert("hi");
// 	//document.getElementById('sp1').onclick = dosomething;
// 	document.getElementById('field').onkeyup = updateText;

// }

document.addEventListener('DOMContentLoaded', function(){


		chrome.runtime.onMessage.addListener(
		  function(request, sender, sendResponse) {
					chrome.tabs.query({}, function(tabs){
						//alert("hi");
						for (var i = 0; i < tabs.length; i++) {
							var tabURL = tabs[i].url;
							//alert(tabURL);
							if(tabURL.includes("facebook.com")){
								//chrome.tabs.remove(tabs[i].id);
								alert("You have opened facebook..")
							}
						}
					});
		    console.log(sender.tab ?
		                "from a content script:" + sender.tab.url :
		                "from the extension");
		    if (request.greeting == "hello")
		      sendResponse({farewell: "goodbye"});
		  });

		chrome.storage.sync.get('siteKeyIds', function (result) {
            console.log(result.siteKeyIds);
            for (var i = 0; i < result.siteKeyIds.length; i++) {
            	console.log(result.siteKeyIds[i].siteName);
            	addCheckboxToView(result.siteKeyIds[i].siteName);
            }
        });

		document.getElementById('textfield').onkeyup = storeNewSiteAndUpdatePOPUPHTML;
		document.getElementById('siteList').onclick = updateSiteStorage;
		//document.getElementsByName('siteName');
		chrome.tabs.query({}, function(tabs){
			//alert("hi");
			for (var i = 0; i < tabs.length; i++) {
				var tabURL = tabs[i].url;
				//alert(tabURL);
				if(tabURL.includes("facebook.com")){
					chrome.tabs.remove(tabs[i].id);
				}
			}
		});

});

function updateSiteStorage(){
	//alert("clicked babay!");
	var checkboxes = document.getElementsByName('siteName');
	//alert(checkboxes.length);
	for (var i = 0; i < checkboxes.length; i++) {
		if(!checkboxes[i].checked){
			removeSiteNameFromStorage(checkboxes[i].id);
			//removeCheckboxFromPOPUPHTML();
			checkboxes[i].parentNode.innerHTML = '';
		}
	}
}

function removeSiteNameFromStorage(siteName){
	chrome.storage.sync.get({siteKeyIds: []}, function(result){
	 	var siteKeyIdsArray = (result.siteKeyIds);
		for(var i = 0; i < siteKeyIdsArray.length; i++){
			if(siteKeyIdsArray[i].siteName == "fb"){
				siteKeyIdsArray.splice(i,1);
				i = -1;
	        }
	    }
		chrome.storage.sync.set({siteKeyIds: siteKeyIdsArray}, function(){});
	});
}

function storeNewSiteAndUpdatePOPUPHTML(e){
		if (e.keyCode === 13) {
			
			var text = document.getElementById('textfield').value;
			document.getElementById('textfield').value='';

			//var siteListArray = //document.getElementById("some_div").getElementsByTagName("input");
			console.log(text);
			chrome.storage.sync.get({siteKeyIds: []}, function (result){
				var siteKeyIds = result.siteKeyIds;
				if(!isDuplicateSiteName(siteKeyIds, text)){
					siteKeyIds.push({siteName: text});
					chrome.storage.sync.set({siteKeyIds: siteKeyIds}, function(){

					});
				addCheckboxToView(text);

				}
			});
			
		
	} else {}

}

function isDuplicateSiteName(siteKeyIds, text){
	for (var i = 0; i < siteKeyIds.length; i++) {
		var siteName = siteKeyIds[i].siteName;
		if(siteName == text){
			return true;
		}

	}
}

function addCheckboxToView(text){
	var description = document.createTextNode(text);
	var checkbox = document.createElement('input');
	var li = document.createElement('li');
	li.name = text + "li";
	checkbox.type = "checkbox";
	checkbox.name = "siteName";
	checkbox.id = text;
	checkbox.value = text;

	li.appendChild(checkbox);
	li.appendChild(description);
	document.getElementById('siteList').appendChild(li);
	document.getElementById(text).checked = true;
}



