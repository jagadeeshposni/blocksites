//alert(document.URL);

chrome.runtime.sendMessage({siteURL: document.URL}, function(response) {
  console.log("SiteURL has been sent to echo.js");
  //alert(response);
  // alert("Howdy from content script!");
});