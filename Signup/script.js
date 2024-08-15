// signup.js
import React from 'react';
import { auth, database } from '/TextboX/FireBaseConfig/firebaseConfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

function SignUp() {
    const handleSignUp = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(database, 'users/' + user.uid), {
          name: name,
          email: email
        });
        window.location.href = '/';
      } catch (error) {
        alert('Sign up failed: ' + error.message);
      }
    };
  
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default SignUp;