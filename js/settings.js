// Settings Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Advanced settings toggle
  const advancedToggle = document.getElementById('advancedToggle');
  const advancedSettings = document.getElementById('advancedSettings');
  
  advancedToggle.setAttribute('aria-expanded', 'false');
  
  advancedToggle.addEventListener('click', () => {
    const isExpanded = advancedToggle.getAttribute('aria-expanded') === 'true';
    advancedToggle.setAttribute('aria-expanded', !isExpanded);
    
    if (isExpanded) {
      advancedSettings.classList.add('hidden');
    } else {
      advancedSettings.classList.remove('hidden');
      advancedSettings.classList.add('animate-fade-in');
      setTimeout(() => {
        advancedSettings.classList.remove('animate-fade-in');
      }, 300);
    }
  });
  
  // Enhancement buttons
  const videoEnhancement = document.getElementById('videoEnhancement');
  const audioEnhancement = document.getElementById('audioEnhancement');
  
  videoEnhancement.addEventListener('click', () => {
    videoEnhancement.classList.toggle('active');
    updateEnhancements();
  });
  
  audioEnhancement.addEventListener('click', () => {
    audioEnhancement.classList.toggle('active');
    updateEnhancements();
  });
  
  // Quality inputs
  const videoQuality = document.getElementById('videoQuality');
  const audioQuality = document.getElementById('audioQuality');
  
  videoQuality.addEventListener('change', () => {
    updateVideoQuality(videoQuality.value);
  });
  
  audioQuality.addEventListener('change', () => {
    updateAudioQuality(audioQuality.value);
  });
  
  // Save settings to localStorage
  function saveSettings() {
    const settings = {
      videoEnabled: videoEnhancement.classList.contains('active'),
      audioEnabled: audioEnhancement.classList.contains('active'),
      videoQuality: videoQuality.value,
      audioQuality: audioQuality.value
    };
    
    localStorage.setItem('enhancerSettings', JSON.stringify(settings));
  }
  
  // Load settings from localStorage
  function loadSettings() {
    const savedSettings = localStorage.getItem('enhancerSettings');
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      if (settings.videoEnabled) {
        videoEnhancement.classList.add('active');
      } else {
        videoEnhancement.classList.remove('active');
      }
      
      if (settings.audioEnabled) {
        audioEnhancement.classList.add('active');
      } else {
        audioEnhancement.classList.remove('active');
      }
      
      videoQuality.value = settings.videoQuality;
      audioQuality.value = settings.audioQuality;
    }
  }
  
  function updateEnhancements() {
    const videoEnabled = videoEnhancement.classList.contains('active');
    const audioEnabled = audioEnhancement.classList.contains('active');
    
    console.log(`Video enhancement: ${videoEnabled ? 'enabled' : 'disabled'}`);
    console.log(`Audio enhancement: ${audioEnabled ? 'enabled' : 'disabled'}`);
    
    saveSettings();
  }
  
  function updateVideoQuality(value) {
    console.log(`Video quality set to ${value}px`);
    saveSettings();
  }
  
  function updateAudioQuality(value) {
    console.log(`Audio quality set to ${value}Hz`);
    saveSettings();
  }
  
  // Load saved settings on initialization
  loadSettings();
});