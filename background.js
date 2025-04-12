// JavaScript source code
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enhancementMode: "both" });
    console.log("Default Enhancement Mode: Both");
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.mode) {
        console.log(`Setting mode to: ${request.mode}`);
        chrome.storage.sync.set({ enhancementMode: request.mode });
    }
});
