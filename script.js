// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqv_Uq9Ssp9JrBVboVfXTaPoOAroA8RiU",
    authDomain: "chatroom-ecd00.firebaseapp.com",
    databaseURL: "https://chatroom-ecd00-default-rtdb.firebaseio.com",
    projectId: "chatroom-ecd00",
    storageBucket: "chatroom-ecd00.appspot.com",
    messagingSenderId: "752787629307",
    appId: "1:752787629307:web:fb0aea45be36e2f9397c5e",
    measurementId: "G-HSJTZMGPKK"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const app = initializeApp(firebaseConfig);

// Function to send a message to the Firebase Realtime Database
function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (message) {
    const messageData = {
      user: 'You',  // Replace with dynamic user data if you have user authentication
      text: message,
      timestamp: Date.now()
    };
    
    // Push the message to the 'messages' node in Firebase
    const messagesRef = ref(database, 'messages');
    push(messagesRef, messageData);
    input.value = '';
  }
}

// Function to add a message to the chat window
function addMessage(user, message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  messageContainer.innerHTML = `<strong>${user}:</strong> ${message}`;
  
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.appendChild(messageContainer);
  messageContainer.scrollIntoView();  // Automatically scroll to the new message
}

// Listen for new messages added to the Firebase Realtime Database
const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  addMessage(data.user, data.text);
});

// Add event listener to the send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Optional: Add an event listener to allow pressing "Enter" to send a message
document.getElementById('message-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
