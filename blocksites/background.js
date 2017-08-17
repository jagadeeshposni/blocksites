chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //alert("hi");
		var siteNameOpened = request.siteURL;
        chrome.tabs.query({}, function(tabs) {
            //alert("hi");
            for (var i = 0; i < tabs.length; i++) {
                var tabURL = tabs[i].url;
                //alert(tabURL);
                if (tabURL.includes(siteNameOpened)) {
                    chrome.tabs.remove(tabs[i].id);
                }
            }
        });
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({
                farewell: "goodbye"
            });
    });