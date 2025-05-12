import './theme.js';
import './settings.js';
import './status.js';
import './platform.js';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  const audioInput = document.getElementById('audio');
  const videoInput = document.getElementById('video');
  const statusText = document.getElementById('statusText');
  const statusDetails = document.getElementById('statusDetails');

  // Initialize enhancement mode from saved state
  const savedMode = localStorage.getItem('enhancementMode') || 'audio';
  if (savedMode === 'video') {
    videoInput.checked = true;
  } else {
    audioInput.checked = true;
  }
  updateEnhancementMode(savedMode);

  // Handle enhancement mode changes
  function updateEnhancementMode(mode) {
    statusText.textContent = 'Enhancement Active';
    statusDetails.textContent = `Optimizing ${mode}`;
    
    // Save the selected mode
    localStorage.setItem('enhancementMode', mode);
  }

  // Add event listeners for radio inputs
  audioInput.addEventListener('change', () => {
    if (audioInput.checked) {
      updateEnhancementMode('audio');
    }
  });

  videoInput.addEventListener('change', () => {
    if (videoInput.checked) {
      updateEnhancementMode('video');
    }
  });
});