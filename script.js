

 // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDefTZ3hQl16jIvXbIQ3AXFvkvQWlwIpqI",
    authDomain: "dream-web-61ad8.firebaseapp.com",
    projectId: "dream-web-61ad8",
    storageBucket: "dream-web-61ad8.appspot.com",
    messagingSenderId: "40035040781",
    appId: "1:40035040781:web:ab016bb5d72c612e325f44",
    measurementId: "G-76X879JLY4"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  const messageContainer = document.getElementById('message-container');
  const nameInput = document.getElementById('name-input');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  // Function to create a new message object and save it to the database
  function sendMessage() {
    const name = nameInput.value;
    const message = messageInput.value;
  
    if (name && message) {
      const newMessageRef = database.ref('messages').push();
      newMessageRef.set({
        name: name,
        message: message
      });
  
      messageInput.value = '';
    }
  }
  
  // Event listener for Send button click
  sendButton.addEventListener('click', sendMessage);
  
  // Event listener for Enter key press on message input field
  messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Function to display new messages
  function displayMessage(name, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
    messageContainer.appendChild(messageElement);
  }
  
  // Function to listen for new messages in the database
  function listenForMessages() {
    database.ref('messages').on('child_added', function(snapshot) {
      const message = snapshot.val();
      displayMessage(message.name, message.message);
    });
  }
  
  // Start listening for new messages
  listenForMessages();
  