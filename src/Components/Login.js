import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Logo from "../images/logo6.png";
// import { app } from "../Firebase";

function Login() {
  const navigate = useNavigate();
  //   const auth = getAuth(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/Kanban");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="login-form">
      <img src={Logo} alt="Logo" />{" "}
      <input
        className="login-input"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        className="login-input"
        type="password"
        name="Password"
        placeholder="Password"
      />
      <button className="login-btn">Sign in</button>
      <button className="login-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
