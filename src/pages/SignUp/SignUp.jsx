
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [formType, setFormType] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const notifySuccess = (msg) => toast.success(msg, { position: "top-right" });
  const notifyError = (msg) => toast.error(msg, { position: "top-right" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "signup") {
      if (!fullName || !email || !password) {
        setError("All fields are required");
        notifyError("All fields are required");
        return;
      }
      if (!email.endsWith("@gmail.com")) {
        setError("Please enter a valid Gmail address");
        notifyError("Please enter a valid Gmail address");
        return;
      }

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        setError("Email already exists. Please sign in.");
        notifyError("Email already exists. Please sign in.");
        return;
      }

      const newUser = { fullName, email, password };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setError("");
      notifySuccess("Sign Up successful! Please Sign In.");
      setFormType("signin");
      setFullName("");
      setPassword("");
    } else {
      if (!email || !password) {
        setError("Both email and password are required");
        notifyError("Both email and password are required");
        return;
      }

      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!existingUser) {
        setError("Invalid email or password");
        notifyError("Invalid email or password");
        return;
      }

      setError("");
      notifySuccess(`Welcome, ${existingUser.fullName}!`);

     
      authLogin(existingUser);

     
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h2>{formType === "signup" ? "Sign Up" : "Sign In"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {formType === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{formType === "signup" ? "Sign Up" : "Sign In"}</button>
      </form>
      <p>
        {formType === "signup" ? "Already have an account?" : "Don't have an account?"}
        <span
          className="toggle-link"
          onClick={() => {
            setFormType(formType === "signup" ? "signin" : "signup");
            setError("");
            setFullName("");
            setPassword("");
          }}
        >
          {formType === "signup" ? " Sign In" : " Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default SignUp;
