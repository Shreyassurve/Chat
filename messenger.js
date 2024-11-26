document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.getElementById('typing-indicator');
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const fab = document.getElementById('fab');
    const emojiButton = document.getElementById('emoji-btn');
    const usernameDisplay = document.getElementById('username');
    const emojiContainer = document.getElementById('emoji-container');

    const username = 'User';  // You can dynamically set the username if needed
    usernameDisplay.textContent = username; // Display username in header

    // Emojis Array
    const emojis = ['😊', '😂', '😍', '😎', '🥺', '😢', '👍', '🙏'];

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === "") return; // Don't send empty messages

        // Add user message to chat
        addMessageToChat(message, 'user');

        // Clear the input
        messageInput.value = '';

        // Simulate bot response after a short delay
        typingIndicator.style.display = 'block';
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addMessageToChat(generateBotResponse(message), 'bot');
        }, 1000);
    }

    // Add message to chat window
    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        // Optional: Add avatar for user/bot
        const avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = sender === 'user' ? 'https://randomuser.me/api/portraits/men/1.jpg' : 'https://randomuser.me/api/portraits/men/2.jpg';
        messageElement.appendChild(avatar);

        // Add message text
        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageElement.appendChild(messageText);

        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.classList.add('message-time');
        const date = new Date();
        timestamp.textContent = `${date.getHours()}:${date.getMinutes()}`;
        messageElement.appendChild(timestamp);

        // Append message to chat window
        chatWindow.appendChild(messageElement);

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Store chat history in localStorage
        saveChatHistory();
    }

    // Generate bot response based on user input (you can enhance this function)
    function generateBotResponse(message) {
        if (message.toLowerCase().includes('hello')) {
            return 'Hi there! How can I assist you today? 😊';
        } else if (message.toLowerCase().includes('help')) {
            return 'I am here to help! Ask me anything.';
        } else if (message.toLowerCase().includes('bye')) {
            return 'Goodbye! Have a nice day!';
        }
        return "I'm here to help!";
    }

    // Event listener for "Enter" key press to send message
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent newline in input
            sendMessage();
        }
    });

    // Event listener for "Send" button click
    sendBtn.addEventListener('click', sendMessage);

    // Dark Mode toggle functionality
    nightModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Floating Action Button (FAB) functionality
    fab.addEventListener('click', function() {
        messageInput.focus(); // Focus the input field to allow quick message typing
    });

    // Emoji picker toggle
    emojiButton.addEventListener('click', function() {
        emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Add emoji to input
    emojiContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('emoji')) {
            messageInput.value += event.target.textContent;
            emojiContainer.style.display = 'none';
        }
    });

    // Initialize emoji list
    function initializeEmojiContainer() {
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.classList.add('emoji');
            emojiElement.textContent = emoji;
            emojiContainer.appendChild(emojiElement);
        });
    }

    // Save chat history in localStorage
    function saveChatHistory() {
        const messages = chatWindow.innerHTML;
        localStorage.setItem('chatHistory', messages);
    }

    // Load chat history from localStorage
    function loadChatHistory() {
        const savedMessages = localStorage.getItem('chatHistory');
        if (savedMessages) {
            chatWindow.innerHTML = savedMessages;
        }
    }

    // Load chat history when page loads
    loadChatHistory();

    // Initialize emoji container
    initializeEmojiContainer();
});
