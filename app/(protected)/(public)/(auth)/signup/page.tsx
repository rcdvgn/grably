"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/_contexts/AuthContext";

const SignUp: React.FC = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(email, password);
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("SignUp error:", error);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#060609",
    },
    card: {
      backgroundColor: "#181a29",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center" as const,
      marginBottom: "1.5rem",
      fontSize: "1.5rem",
      color: "#fff",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontSize: "0.9rem",
      color: "#fff",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #3d3f5c",
      borderRadius: "8px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "transparent",
    },
    error: {
      color: "red",
      fontSize: "0.9rem",
      marginTop: "0.5rem",
      textAlign: "center" as const,
    },
    button: {
      display: "block",
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#5f15d6",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "1rem",
    },
    buttonHover: {
      backgroundColor: "#5f15d6d3",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.button.backgroundColor)
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
