chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //alert("hi");
		var siteNameOpened = request.siteURL;
		//alert("URL of opened site is " + siteNameOpened);
		 chrome.storage.sync.get('siteKeyIds', function (result) {
            console.log(result.siteKeyIds);
            for (var i = 0; i < result.siteKeyIds.length; i++) {
            	//alert(result.siteKeyIds[i].siteName);
            	if(siteNameOpened.includes(result.siteKeyIds[i].siteName)){
					chrome.tabs.query({}, function(tabs) {
						for (var i = 0; i < tabs.length; i++) {
							var tabURL = tabs[i].url;
							//alert(tabURL);
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