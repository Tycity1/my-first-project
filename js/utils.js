// Utility functions for the Real-Time Video & Audio Enhancer

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function to delay function execution until after a period of inactivity
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

/**
 * Format a number as a percentage
 * @param {number} value - The value to format
 * @returns {string} - Formatted percentage string
 */
export function formatPercentage(value) {
  return `${Math.round(value)}%`;
}

/**
 * Check if a feature is supported by the browser
 * @param {string} feature - The feature to check
 * @returns {boolean} - Whether the feature is supported
 */
export function isFeatureSupported(feature) {
  const featureSupport = {
    webRTC: !!window.RTCPeerConnection,
    mediaDevices: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    canvas: !!document.createElement('canvas').getContext,
    webGL: (function() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch(e) {
        return false;
      }
    })(),
    webWorkers: !!window.Worker,
    audioAPI: !!(window.AudioContext || window.webkitAudioContext),
  };
  
  return featureSupport[feature] || false;
}

/**
 * Safe localStorage getter with fallback
 * @param {string} key - The key to get from localStorage
 * @param {*} fallback - The fallback value if key doesn't exist
 * @returns {*} - The value from localStorage or fallback
 */
export function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return fallback;
  }
}

/**
 * Safe localStorage setter
 * @param {string} key - The key to set in localStorage
 * @param {*} value - The value to store
 * @returns {boolean} - Whether the operation was successful
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage:', e);
    return false;
  }
}

/**
 * Create a notification that auto-dismisses
 * @param {string} message - The notification message
 * @param {string} type - The type of notification (success, warning, error)
 * @param {number} duration - How long to show the notification (ms)
 */
export function showNotification(message, type = 'info', duration = 3000) {
  // Check if notification container exists, create if not
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    Object.assign(container.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1000'
    });
    document.body.appendChild(container);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    backgroundColor: type === 'success' ? 'var(--color-success-500)' : 
                    type === 'warning' ? 'var(--color-warning-500)' : 
                    type === 'error' ? 'var(--color-error-500)' : 
                    'var(--color-primary-500)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-md)',
    marginBottom: '10px',
    opacity: '0',
    transform: 'translateX(50px)',
    transition: 'opacity 0.3s, transform 0.3s'
  });
  
  // Add to container
  container.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto dismiss
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    
    // Remove from DOM after animation
    setTimeout(() => {
      container.removeChild(notification);
      
      // Remove container if empty
      if (container.children.length === 0) {
        document.body.removeChild(container);
      }
    }, 300);
  }, duration);
}