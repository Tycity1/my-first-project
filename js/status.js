// Status Indicator Functionality
document.addEventListener('DOMContentLoaded', () => {
  const statusCircle = document.getElementById('statusCircle');
  const statusText = document.getElementById('statusText');
  const statusDetails = document.getElementById('statusDetails');
  
  let isActive = true;
  
  // Initialize status based on saved state
  const savedStatus = localStorage.getItem('enhancerActive');
  if (savedStatus !== null) {
    isActive = savedStatus === 'true';
    updateStatusUI();
  }
  
  // Update UI based on status
  function updateStatusUI() {
    if (statusCircle) {
      if (isActive) {
        statusCircle.classList.remove('inactive');
        statusCircle.classList.add('active');
      } else {
        statusCircle.classList.remove('active');
        statusCircle.classList.add('inactive');
      }
    }
    
    if (statusText) {
      statusText.textContent = isActive ? 'Enhancement Active' : 'Enhancement Disabled';
    }
    
    if (statusDetails) {
      statusDetails.textContent = isActive ? 'Optimizing video & audio' : 'Not optimizing streams';
    }
  }
  
  // Simulated performance monitoring
  function simulatePerformanceCheck() {
    if (!isActive || !statusCircle || !statusDetails) return;
    
    // Randomly simulate performance issues
    const performanceScore = Math.random() * 100;
    
    if (performanceScore < 20) {
      // Poor performance
      statusCircle.classList.remove('active');
      statusCircle.classList.add('warning');
      statusDetails.textContent = 'Processing load high, reducing quality';
      
      // Reset after a few seconds
      setTimeout(() => {
        if (isActive && statusCircle && statusDetails) {
          statusCircle.classList.remove('warning');
          statusCircle.classList.add('active');
          statusDetails.textContent = 'Optimizing video & audio';
        }
      }, 3000);
    }
  }
  
  // Check performance periodically
  setInterval(simulatePerformanceCheck, 30000);
});