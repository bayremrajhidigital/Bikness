import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    updateProfile,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

console.log("Bikness Auth System: Initializing...");

const firebaseConfig = {
    apiKey: "AIzaSyD1gtjDSC1ek2PM8zYvRVpxCpoISmR8QuA",
    authDomain: "bikness-ebef7.firebaseapp.com",
    projectId: "bikness-ebef7",
    storageBucket: "bikness-ebef7.firebasestorage.app",
    messagingSenderId: "586672790553",
    appId: "1:586672790553:web:1fa67abdf7659a14215e88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle Account Creation
window.signUpEmail = async () => {
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (!name || !email || !pass) {
        alert("Action Required: Please complete all profile fields.");
        return;
    }

    try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(result.user, { displayName: name });
        console.log("Profile Deployed Successfully");
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Signup Error:", error.code);
        alert("Registration Failed: " + error.message);
    }
};

// Handle Google Identity Sync
window.loginGoogle = async () => {
    try {
        console.log("Syncing with Google...");
        await signInWithPopup(auth, provider);
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Google Sync Error:", error.code);
        alert("Identity Sync Failed.");
    }
};

// Handle Email Login
window.loginEmail = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.href = "/dashboard";
    } catch (error) {
        alert("Access Denied: Invalid Credentials.");
    }
};

// Global Auth Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Status: Athlete Authenticated - " + user.displayName);
    } else {
        console.log("Status: No Active Session");
    }
});
