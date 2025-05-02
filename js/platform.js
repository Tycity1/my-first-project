// Platform Selection Functionality
document.addEventListener('DOMContentLoaded', () => {
  const platformButtons = document.querySelectorAll('.platform-button');
  const videoQuality = document.getElementById('videoQuality');
  const audioQuality = document.getElementById('audioQuality');
  
  // Initialize selected platform from localStorage
  const savedPlatform = localStorage.getItem('selectedPlatform');
  if (savedPlatform) {
    setActivePlatform(savedPlatform);
  }
  
  // Add click event listener to platform buttons
  platformButtons.forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.getAttribute('data-platform');
      setActivePlatform(platform);
      applyPlatformSettings(platform);
      
      // Save selected platform to localStorage
      localStorage.setItem('selectedPlatform', platform);
    });
  });
  
  // Set active platform UI
  function setActivePlatform(platform) {
    platformButtons.forEach(button => {
      if (button.getAttribute('data-platform') === platform) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // Apply platform-specific settings
  function applyPlatformSettings(platform) {
    const settings = getPlatformSettings(platform);
    
    if (!videoQuality || !audioQuality) return;
    
    videoQuality.value = settings.videoQuality;
    audioQuality.value = settings.audioQuality;
    
    // Animate changes
    const statusCircle = document.getElementById('statusCircle');
    if (statusCircle) {
      statusCircle.classList.add('animate-pulse');
      setTimeout(() => {
        statusCircle.classList.remove('animate-pulse');
      }, 1000);
    }
    
    // Save updated settings
    saveSettings();
  }
  
  // Get platform-specific settings
  function getPlatformSettings(platform) {
    const settings = {
      zoom: {
        videoQuality: 1080,
        audioQuality: 48000
      },
      meet: {
        videoQuality: 720,
        audioQuality: 44100
      },
      twitch: {
        videoQuality: 1920,
        audioQuality: 48000
      },
      custom: {
        videoQuality: 1080,
        audioQuality: 44100
      }
    };
    
    return settings[platform] || settings.custom;
  }
  
  // Save current settings
  function saveSettings() {
    if (!videoQuality || !audioQuality) return;
    
    const settings = {
      videoQuality: videoQuality.value,
      audioQuality: audioQuality.value
    };
    
    localStorage.setItem('enhancerSettings', JSON.stringify(settings));
  }
});