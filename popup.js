document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveButton");

    // Load saved settings and update the radio selection
    chrome.storage.sync.get(["enhancementMode"], (data) => {
        if (data.enhancementMode) {
            const radio = document.getElementById(data.enhancementMode);
            if (radio) {
                radio.checked = true;
            }
        }
    });

    // Save settings on button click and show button loading animation
    saveBtn.addEventListener("click", () => {
        // Add loading class for button animation
        saveBtn.classList.add("loading");

        const selectedMode = document.querySelector('input[name="mode"]:checked').value;
        chrome.storage.sync.set({ enhancementMode: selectedMode }, () => {
            console.log(`Enhancement Mode set to: ${selectedMode}`);

            // Notify content scripts
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { mode: selectedMode });
            });

            // Simulate enhancement process delay then remove loading class
            setTimeout(() => {
                saveBtn.classList.remove("loading");

                // Optionally show enhancement overlay for a short time
                const overlay = document.querySelector(".enhancement-overlay");
                overlay.classList.add("active");
                setTimeout(() => {
                    overlay.classList.remove("active");
                }, 2000);
            }, 2000);
        });
    });
});
