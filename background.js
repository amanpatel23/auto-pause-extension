const udemyVideoTabUrl = "https://www.udemy.com/course/";

let previousTabId = null;
let previousWindowId = null;
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currTabUrl = tab.url;
    if (previousTabId) {
      chrome.scripting.executeScript({
        target: { tabId: previousTabId },
        files: ["scripts/algo-1.js"],
      });
    }

    previousTabId = null;
    if (currTabUrl && currTabUrl.startsWith(udemyVideoTabUrl)) {
      previousTabId = activeInfo.tabId;
      previousWindowId = activeInfo.windowId;
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ["scripts/algo-2.js"],
      });
    }
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (
    windowId === chrome.windows.WINDOW_ID_NONE ||
    (previousWindowId && previousWindowId !== windowId)
  ) {
    if (previousTabId) {
      chrome.scripting.executeScript({
        target: { tabId: previousTabId },
        files: ["scripts/algo-1.js"],
      });
    }
  }

  if (previousWindowId && previousWindowId === windowId) {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      let tab = tabs[0];
      if (tab && tab.id === previousTabId) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["scripts/algo-2.js"],
        });
      }
    });
  }
});
