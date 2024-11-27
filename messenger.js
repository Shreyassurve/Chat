document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.getElementById('typing-indicator');
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const emojiButton = document.getElementById('emoji-btn');
    const emojiContainer = document.getElementById('emoji-container');
    const fileInput = document.getElementById('file-input');
    const downloadBtn = document.getElementById('download-chat');

    const username = 'User'; // Set username
    document.getElementById('username').textContent = username;

    // GitHub Emoji Map
    const emojiMap = {
        ':smile:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f604.png',
        ':heart:': 'https://github.githubassets.com/images/icons/emoji/unicode/2764.png',
        ':thumbsup:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png',
        ':laughing:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f606.png',
        ':wink:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f609.png',
        ':cry:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f622.png',
        ':thumbsdown:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png',
        ':clap:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f44f.png',
        ':star:': 'https://github.githubassets.com/images/icons/emoji/unicode/2b50.png',
        ':fire:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f525.png',
        ':sunglasses:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png',
        ':tada:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f389.png',
        ':muscle:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f4aa.png',
        ':hugs:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f917.png',
        ':pizza:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f355.png',
        ':coffee:': 'https://github.githubassets.com/images/icons/emoji/unicode/2615.png',
        ':sunny:': 'https://github.githubassets.com/images/icons/emoji/unicode/2600.png',
        ':earth_africa:': 'https://github.githubassets.com/images/icons/emoji/unicode/1f30d.png',
    };

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return; // Don't send empty messages

        // Add user message to chat
        addMessageToChat(message, 'user');

        // Clear input field
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

        // Create message content element
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = convertTextToEmojis(message); // Convert emojis before adding content
        messageElement.appendChild(messageContent);

        // Timestamp
        const timestamp = document.createElement('span');
        timestamp.classList.add('time');
        const date = new Date();
        timestamp.textContent = `${date.getHours()}:${date.getMinutes()}`;
        messageElement.appendChild(timestamp);

        // Add actions for user messages (edit and delete buttons)
        if (sender === 'user') {
            const messageActions = document.createElement('div');
            messageActions.classList.add('message-actions');

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            messageActions.appendChild(editBtn);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            messageActions.appendChild(deleteBtn);

            messageElement.appendChild(messageActions);
        }

        // Append message to chat window
        chatWindow.appendChild(messageElement);

        // Scroll to the bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Convert text message to display emojis (if applicable)
    function convertTextToEmojis(text) {
        return text.replace(/(:\w+:)/g, (match) => {
            return emojiMap[match] ? `<img src="${emojiMap[match]}" alt="${match}" class="emoji" />` : match;
        });
    }

    // Simulate bot response based on user message with more varied replies
    function generateBotResponse(userMessage) {
        const responses = [
            `You said: ${userMessage}`,
            `How can I assist you with "${userMessage}"?`,
            `That's interesting! Could you elaborate on "${userMessage}"?`,
            `Tell me more about "${userMessage}". I'm curious!`,
            `I see you're talking about "${userMessage}". What else can I help you with?`,
            `I’m not sure about "${userMessage}". Do you want to know something else?`,
            `Sounds fun! What else do you want to talk about?`
        ];

        // Return a random response from the list
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Night mode toggle
    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key press
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Show emoji container
    emojiButton.addEventListener('click', () => {
        emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Fetch emojis and display them
    function fetchEmojis() {
        // Manually display a few emojis for demonstration purposes
        const emojiNames = Object.keys(emojiMap);
        emojiNames.forEach(name => {
            const emojiElement = document.createElement('img');
            emojiElement.src = emojiMap[name];
            emojiElement.alt = `:${name}:`; // Use emoji name as alt text
            emojiElement.classList.add('emoji');
            emojiElement.style.width = '32px'; // Set emoji size
            emojiElement.style.cursor = 'pointer'; // Cursor pointer
            emojiElement.addEventListener('click', () => {
                messageInput.value += `:${name}:`; // Append emoji as text to input field
                emojiContainer.style.display = 'none'; // Hide emoji container after selection
            });
            emojiContainer.appendChild(emojiElement);
        });
    }

    // Handle file uploads
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const message = `📎 <a href="${URL.createObjectURL(file)}" target="_blank">${file.name}</a>`;
            addMessageToChat(message, 'user');
        }
    });

    // Typing indicator
    messageInput.addEventListener('input', () => {
        typingIndicator.textContent = `${username} is typing...`;
        typingIndicator.style.display = 'block';
        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 1000);
    });

    // Edit and delete message actions
    chatWindow.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const messageContent = event.target.closest('.message').querySelector('.message-content');
            const newText = prompt('Edit your message:', messageContent.textContent);
            if (newText) {
                messageContent.innerHTML = convertTextToEmojis(newText);
            }
        }

        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('.message').remove();
        }
    });

    // Initialize emoji container and fetch emojis
    fetchEmojis();
});
