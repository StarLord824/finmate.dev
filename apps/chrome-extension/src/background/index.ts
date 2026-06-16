// Background Service Worker

// Sync authentication from FinMate web app to extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("FinMate Extension Installed.");
});

// Example of reading a cookie from the main domain
async function syncAuth() {
  const cookie = await chrome.cookies.get({
    url: "https://finmate-dev.vercel.app",
    name: "better-auth.session_token",
  });
  
  if (cookie) {
    // Save to local storage for the popup to use
    chrome.storage.local.set({ "finmate_session": cookie.value });
  }
}

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (changeInfo.cookie.domain.includes("finmate") && changeInfo.cookie.name.includes("better-auth.session_token")) {
    syncAuth();
  }
});
