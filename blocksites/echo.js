
document.addEventListener('DOMContentLoaded', function(){
		chrome.storage.sync.get('siteKeyIds', function (result) {
            console.log(result.siteKeyIds);
            for (var i = 0; i < result.siteKeyIds.length; i++) {
            	console.log(result.siteKeyIds[i].siteName);
            	addCheckboxToView(result.siteKeyIds[i].siteName);
            }
        });

		document.getElementById('textfield').onkeyup = storeNewSiteAndUpdatePOPUPHTML;
		document.getElementById('siteList').onclick = updateSiteStorage;
		document.getElementById('blockButton').onclick = blockCurrentTab;
});

function blockCurrentTab(){
	var currentTabURL;
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		currentTabURL = tabs[0].url;
	});
	
	
}

function updateSiteStorage(){
	var checkboxes = document.getElementsByName('siteName');
	for (var i = 0; i < checkboxes.length; i++) {
		if(!checkboxes[i].checked){
			removeSiteNameFromStorage(checkboxes[i].id);
			checkboxes[i].parentNode.innerHTML = '';
		}
	}
}

function removeSiteNameFromStorage(siteName){
	chrome.storage.sync.get({siteKeyIds: []}, function(result){
	 	var siteKeyIdsArray = (result.siteKeyIds);
		for(var i = 0; i < siteKeyIdsArray.length; i++){
			if(siteKeyIdsArray[i].siteName == siteName){
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




