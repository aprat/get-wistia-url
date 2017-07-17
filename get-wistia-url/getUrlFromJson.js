/**
 * @param {string} jsonString - String to check if it is a json object
 */
function isJsonString(jsonString) {
    try {
        JSON.parse(jsonString);
    } catch (e) {
        return false;
    }
    return true;
}

function onPageActionClicked(document_root) {
  var scriptTagsArray = document_root.getElementsByTagName('script');
  // Loop through all tags to find the right one.
  var scriptTagsArrayLength = scriptTagsArray.length;
  for (var i = 0; i < scriptTagsArrayLength; i++) {
    var tagInnerHTML = scriptTagsArray[i].innerHTML;
    // if (i==12) {return tagInnerHTML;}
    if (isJsonString(tagInnerHTML)) {
      var jsonObject = JSON.parse(tagInnerHTML);
      var url = jsonObject["@id"];
      return url
    }
  }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: onPageActionClicked(document)
});