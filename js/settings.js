// Settings Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
  const settingsToggle = document.getElementById('settingsToggle');
  const closeSettings = document.getElementById('closeSettings');
  const settingsPanel = document.getElementById('settingsPanel');
  
  if (!settingsToggle || !closeSettings || !settingsPanel) {
    console.warn('Required settings elements not found in the DOM');
    return;
  }
  
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
});