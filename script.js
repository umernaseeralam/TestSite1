// signin.js
import React from 'react';
import { auth } from '/TextboX/FireBaseConfig/firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

function SignIn() {
    const handleSignIn = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = '/inbox';
      } catch (error) {
        alert('Sign in failed: ' + error.message);
      }
    };
  
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
  
  export default SignIn;