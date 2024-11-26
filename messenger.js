document.addEventListener('DOMContentLoaded', function () {
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

    const username = 'User'; // You can dynamically set the username if needed
    usernameDisplay.textContent = username; // Display username in header

    // Store emojis from GitHub API
    let emojiMap = {};

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
        avatar.src = sender === 'user'
            ? 'https://randomuser.me/api/portraits/men/1.jpg'
            : 'https://randomuser.me/api/portraits/men/2.jpg';
        messageElement.appendChild(avatar);

        // Replace emoji codes in the message with their image URLs
        const messageText = document.createElement('p');
        messageText.innerHTML = replaceEmojiWithImages(message); // Replace emojis
        messageElement.appendChild(messageText);

        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.classList.add('message-time');
        const date = new Date();
        timestamp.textContent = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        messageElement.appendChild(timestamp);

        // Append message to chat window
        chatWindow.appendChild(messageElement);

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Store chat history in localStorage
        saveChatHistory();
    }

    // Replace emoji text with corresponding image URLs
    function replaceEmojiWithImages(text) {
        return text.replace(/:\w+:/g, match => {
            const emojiUrl = emojiMap[match.slice(1, -1)];
            return emojiUrl ? `<img src="${emojiUrl}" alt="${match}" class="emoji-inline" />` : match;
        });
    }

    // Generate bot response based on user input
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
    messageInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent newline in input
            sendMessage();
        }
    });

    // Event listener for "Send" button click
    sendBtn.addEventListener('click', sendMessage);

    // Dark Mode toggle functionality
    nightModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });

    // Floating Action Button (FAB) functionality
    fab.addEventListener('click', function () {
        messageInput.focus(); // Focus the input field for quick message typing
    });

    // Emoji picker toggle
    emojiButton.addEventListener('click', function () {
        emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Add emoji to input
    emojiContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') { // Ensure we are clicking on an image
            const emojiAlt = event.target.alt; // Use the alt text as the emoji
            messageInput.value += emojiAlt; // Append emoji to input field
            emojiContainer.style.display = 'none'; // Hide emoji container after selection
        }
    });

    // Fetch emojis from GitHub API and populate the emoji container
    async function fetchEmojis() {
        try {
            const response = await fetch('https://api.github.com/emojis');
            const emojis = await response.json();

            // Store emojis in the emojiMap
            emojiMap = emojis;

            // Populate the emoji container
            Object.entries(emojis).forEach(([name, emojiUrl]) => {
                const emojiElement = document.createElement('img');
                emojiElement.src = emojiUrl;
                emojiElement.alt = `:${name}:`; // Use GitHub emoji name as the alt text
                emojiElement.classList.add('emoji');
                emojiElement.style.width = '32px'; // Set emoji size
                emojiElement.style.cursor = 'pointer'; // Cursor pointer
                emojiContainer.appendChild(emojiElement);
            });
        } catch (error) {
            console.error('Error fetching emojis:', error);
        }
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

    // Fetch and initialize emojis
    fetchEmojis();
});
