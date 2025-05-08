// Settings Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
  const settingsToggle = document.getElementById('settingsToggle');
  const closeSettings = document.getElementById('closeSettings');
  const settingsPanel = document.getElementById('settingsPanel');
  const autoStart = document.getElementById('autoStart');
  const notifications = document.getElementById('notifications');
  
  let isAnimating = false;
  
  // Toggle settings panel
  settingsToggle.addEventListener('click', () => {
    if (isAnimating) return;
    
    isAnimating = true;
    settingsToggle.classList.add('rotate');
    
    if (settingsPanel.classList.contains('open')) {
      closeSettingsPanel();
    } else {
      openSettingsPanel();
    }
    
    setTimeout(() => {
      settingsToggle.classList.remove('rotate');
      isAnimating = false;
    }, 300);
  });
  
  closeSettings.addEventListener('click', () => {
    if (isAnimating) return;
    closeSettingsPanel();
  });
  
  // Close settings panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && 
        !settingsToggle.contains(e.target) && 
        settingsPanel.classList.contains('open')) {
      closeSettingsPanel();
    }
  });
  
  function openSettingsPanel() {
    settingsPanel.classList.add('open');
    settingsToggle.setAttribute('aria-expanded', 'true');
  }
  
  function closeSettingsPanel() {
    settingsPanel.classList.remove('open');
    settingsToggle.setAttribute('aria-expanded', 'false');
  }
  
  // Load and save settings
  function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('quickSettings') || '{}');
    autoStart.checked = settings.autoStart || false;
    notifications.checked = settings.notifications || false;
  }
  
  function saveSettings() {
    const settings = {
      autoStart: autoStart.checked,
      notifications: notifications.checked
    };
    localStorage.setItem('quickSettings', JSON.stringify(settings));
  }
  
  // Add change event listeners
  autoStart.addEventListener('change', saveSettings);
  notifications.addEventListener('change', saveSettings);
  
  // Load settings on initialization
  loadSettings();
});