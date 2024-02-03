import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA6oiSipYw0x9xQvrR6PxZGdBL05f_TA0",
  authDomain: "violet-2024.firebaseapp.com",
  projectId: "violet-2024",
  storageBucket: "violet-2024.appspot.com",
  messagingSenderId: "835936435849",
  appId: "1:835936435849:web:b9c3490352c685c469d058"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  });
}

// Add the public key generated from the console here.
getToken(messaging, { vapidKey: 'BEgnlR0WkGtx-Sdm1yNzfkGr5Vq97pQBnUSDUJOM5Luh0ptMuDI3tapxVb_T4QIsIJfDdEdNg89Er7POL6YNzRQ' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log('Token available: ', currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    requestPermission();
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

export { app, messaging };