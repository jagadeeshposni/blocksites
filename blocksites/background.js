chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		var siteNameOpened = request.siteURL;
		 chrome.storage.sync.get('siteKeyIds', function (result) {
            console.log(result.siteKeyIds);
            for (var i = 0; i < result.siteKeyIds.length; i++) {
            	if(siteNameOpened.includes(result.siteKeyIds[i].siteName + ".com")){
					chrome.tabs.query({}, function(tabs) {
						for (var i = 0; i < tabs.length; i++) {
							var tabURL = tabs[i].url;
							if (tabURL.includes(siteNameOpened)) {
								chrome.tabs.remove(tabs[i].id);
								alert("That site was blocked by yourself!");
							}
						}
					});

				}
			}
		});
		
    });