(function() {
  window.ChatWidget = {
    init: function(config) {
      try {
        if (!config || typeof config !== 'object') {
          throw new Error('ChatWidget: Configuration object is required');
        }

        if (!config.apiKey) {
          throw new Error('ChatWidget: API key is required');
        }

        const container = document.createElement('div');
        container.id = 'chat-widget-container';
        document.body.appendChild(container);

        const baseUrl = config.baseUrl || 'http://localhost:3000';
        const theme = config.theme || 'dark';
        const buttonSize = config.buttonSize || 60;
        const widgetWidth = config.widgetWidth || 400;
        const widgetHeight = config.widgetHeight || 600;

        // Create chat button
        const chatButton = document.createElement('button');
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
        chatButton.style.position = 'fixed';
        chatButton.style.bottom = '20px';
        chatButton.style.right = '20px';
        chatButton.style.width = `${buttonSize}px`;
        chatButton.style.height = `${buttonSize}px`;
        chatButton.style.borderRadius = '50%';
        chatButton.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        chatButton.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
        chatButton.style.border = 'none';
        chatButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        chatButton.style.cursor = 'pointer';
        chatButton.style.zIndex = '9998';
        chatButton.style.transition = 'transform 0.3s ease';
        chatButton.style.display = 'flex';
        chatButton.style.alignItems = 'center';
        chatButton.style.justifyContent = 'center';

        // Create chat widget iframe
        const widget = document.createElement('iframe');
        widget.src = `${baseUrl}/widget?apiKey=${encodeURIComponent(config.apiKey)}&theme=${encodeURIComponent(theme)}&botName=${encodeURIComponent(config.botName || 'AI Assistant')}`;
        widget.style.position = 'fixed';
        widget.style.bottom = '100px';
        widget.style.right = '20px';
        widget.style.width = `${widgetWidth}px`;
        widget.style.height = `${widgetHeight}px`;
        widget.style.border = 'none';
        widget.style.borderRadius = '10px';
        widget.style.boxShadow = '0 5px 40px rgba(0, 0, 0, 0.16)';
        widget.style.display = 'none';
        widget.style.zIndex = '9999';

        let isOpen = false;

        chatButton.onclick = function() {
          if (!isOpen) {
            widget.style.display = 'block';
            chatButton.style.transform = 'scale(0.9)';
          } else {
            widget.style.display = 'none';
            chatButton.style.transform = 'scale(1)';
          }
          isOpen = !isOpen;
        };

        // Add minimize/maximize functionality
        let isMinimized = false;
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '−';
        toggleButton.style.position = 'fixed';
        toggleButton.style.right = '35px';
        toggleButton.style.bottom = `${widgetHeight + 85}px`;
        toggleButton.style.zIndex = '10000';
        toggleButton.style.padding = '4px 12px';
        toggleButton.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        toggleButton.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.display = 'none';

        toggleButton.onclick = function() {
          if (isMinimized) {
            widget.style.height = `${widgetHeight}px`;
            toggleButton.style.bottom = `${widgetHeight + 85}px`;
            toggleButton.innerHTML = '−';
          } else {
            widget.style.height = '0px';
            toggleButton.style.bottom = '100px';
            toggleButton.innerHTML = '+';
          }
          isMinimized = !isMinimized;
        };

        container.appendChild(chatButton);
        container.appendChild(toggleButton);
        container.appendChild(widget);

        // Show/hide toggle button when widget is shown/hidden
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              if (widget.style.display === 'block') {
                toggleButton.style.display = 'block';
              } else {
                toggleButton.style.display = 'none';
              }
            }
          });
        });

        observer.observe(widget, { attributes: true });

        console.log('ChatWidget: Initialized successfully');
      } catch (error) {
        console.error('ChatWidget: Initialization failed', error);
      }
    }
  };

  // Notify that the ChatWidget is ready
  if (typeof window.ChatWidgetLoaded === 'function') {
    window.ChatWidgetLoaded();
  }
})();