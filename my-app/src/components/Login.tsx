import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import newimg from "../assets/newimage.png"; // adjust actual extension
import GoogleLogo from "../assets/background.png";

import BackButton from './BackButton';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: (username: string, role?: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let role = "user";
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { email: user.email, role: "user" });
      } else {
        const data = userDoc.data();
        role = data.role || "user";
      }

      onLoginSuccess(user.email || "Google User", role);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let role = "user";
      if (userDoc.exists()) {
        const data = userDoc.data();
        role = data.role || "user";
      } else {
        await setDoc(userDocRef, { email: user.email, role: "user" });
      }

      onLoginSuccess(user.email ?? email, role);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
      });

      onLoginSuccess(user.email ?? email, "user");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url("https://th.bing.com/th/id/OIP.GrGKxfOn9tbJ4MmOstk-pgHaDt?w=333&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: '20px',
      }}
    >
      <BackButton />

      <div
        className="login-container"
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 50,
          boxShadow: "0 2px 16px #0002",
          borderRadius: 14,
          background: "rgba(255, 255, 255, 0.25)",
          margin: "auto",
          backdropFilter: "blur(2px)",
        }}
      >
        <img
          src={newimg}
          alt="Logo"
          style={{ margin: "0 auto 24px auto", display: "block", maxWidth: 80 }}
        />
        <h2 style={{ textAlign: "center" }}>{isRegistering ? "Register" : "Log In"}</h2>
        {error && (
          <p style={{ color: error === "Password reset email sent." ? "green" : "red", textAlign: "center" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #888" }}
            />
          </div>
          <div style={{ marginBottom: isRegistering ? 24 : 8 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #888" }}
            />
          </div>
          {!isRegistering && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <button
                type="button"
                style={{ background: "none", border: "none", color: "#0077cc", cursor: "pointer", padding: 0 }}
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#0077cc",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "12px",
              borderRadius: 6,
              border: "none",
              marginBottom: 12,
            }}
          >
            {loading ? "Please wait..." : isRegistering ? "Register" : "Log In"}
          </button>
        </form>
        <div
          style={{
            margin: "16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              background: "#fff",
              color: "#444",
              border: "1px solid #4285f4",
              borderRadius: 4,
              padding: "10px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={GoogleLogo}
              alt="Google logo"
              style={{ width: 22, marginRight: 12 }}
            />
            Login with Google
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          {isRegistering ? "Already have an account? " : "New user? "}
          <button
            onClick={() => {
              setError("");
              setIsRegistering(!isRegistering);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#0077cc",
              cursor: "pointer",
              fontWeight: 600,
              padding: 0,
              fontSize: "1rem",
            }}
          >
            {isRegistering ? "Log in" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
