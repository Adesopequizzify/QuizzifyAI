    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.header');
    const toggleButton = document.getElementById('sidebarToggle');
    const chatContainer = document.querySelector('.chat-container'); // Container for chat messages
    const sendMessageButton = document.getElementById('sendButton'); // Send message button
    
    // Function to open the sidebar
    function openSidebar() {
      sidebar.style.left = '0';
      content.style.marginLeft = '250px'; // Adjust this value based on your sidebar's width
    }
    
    // Function to close the sidebar
    function closeSidebar() {
      sidebar.style.left = '-250px'; // Hides the sidebar to the left
      content.style.marginLeft = '0';
    }
    
    // Toggle sidebar when the button is clicked
    toggleButton.addEventListener('click', () => {
      if (sidebar.style.left === '0px') {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
    
    // OpenAI ChatGPT integration
    const apiKey = ''; // Replace with your OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace with the correct API endpoint
    let requestCount = 0; // Initialize request count
    
    // Function to send a message to OpenAI ChatGPT
    function sendMessageToOpenAI(userMessage) {
      if (!userMessage) {
        console.error('Message cannot be empty.');
        return;
      }
    
      // Increment the request count
      requestCount++;
    
      if (requestCount === 75) {
        console.error('You have reached the maximum number of requests for today.');
        return;
      }
    
      // Format the message for the API request
      const message = { role: 'user', content: userMessage };
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [message]
      };
    
      // Send the request to ChatGPT using fetch
      fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
          const botMessage = responseData.choices[0].message.content;
          // Display both user and bot messages in the chat UI
          displayMessage(userMessage, 'user');
          displayMessage(botMessage, 'bot');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    
    // Function to display a message in the chat UI
    function displayMessage(message, role) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add(`${role}-message-text`);
      messageContainer.textContent = message;
      chatContainer.appendChild(messageContainer);
    }
    
    // Event listener for sending user messages
    sendMessageButton.addEventListener('click', () => {
      const messageInput = document.querySelector('input[type="text"]');
      const userMessage = messageInput.value;
      sendMessageToOpenAI(userMessage);
      messageInput.value = ''; // Clear the input field after sending
    });