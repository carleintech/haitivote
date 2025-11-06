/**
 * TechKlein VoteLive Embed Script
 * Usage: <script src="https://votelive.techklein.com/embed.js" data-votelive></script>
 */

(function() {
  'use strict';

  // Find all embed containers
  const containers = document.querySelectorAll('[data-votelive]');
  
  containers.forEach(function(container) {
    // Get configuration from data attributes
    const width = container.getAttribute('data-width') || '100%';
    const height = container.getAttribute('data-height') || '700px';
    const theme = container.getAttribute('data-theme') || 'dark';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = window.location.origin + '/embed';
    iframe.width = width;
    iframe.height = height;
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowtransparency', 'true');
    
    // Add theme class to container
    container.className = 'techklein-votelive-embed theme-' + theme;
    
    // Insert iframe
    container.appendChild(iframe);
    
    // Handle responsive height (optional)
    if (container.hasAttribute('data-auto-height')) {
      window.addEventListener('message', function(event) {
        if (event.data.type === 'votelive-height') {
          iframe.height = event.data.height + 'px';
        }
      });
    }
  });
})();
