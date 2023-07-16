const target = "*://*.azure-api.net/prod/api/cms/GetBrackets/*";
const eventDetails =
  "*://*.azure-api.net/prod/api/cms/GetAllLiveOrActiveEventsDetails/*";

const webRequestListener = chrome.webRequest.onCompleted.addListener(
  webRequestCb,
  {
    urls: [target, eventDetails],
  }
);

function webRequestCb(res) {
  if (res.url.match(/GetAllLiveOrActiveEventsDetails/g)) {
    chrome.webRequest.onCompleted.removeListener(webRequestListener);
  }
}
