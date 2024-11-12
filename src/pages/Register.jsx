import React, { useRef, useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { auth } from "../config/firebase/configfirebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const email = useRef();
  const pass = useRef();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  function registerUser(event) {
    event.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = pass.current.value;

    // Simple validation for empty fields
    if (!emailValue || !passwordValue) {
      setErrorMessage("Please fill out both fields!");
      return;
    }

    setIsLoading(true); // Set loading state to true while the registration request is being processed

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User is registered", user);
        navigate("/"); // Navigate to home page after successful registration
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage("Registration failed. Please try again."); // Set user-friendly error message
      })
      .finally(() => {
        setIsLoading(false); // Set loading state back to false once the registration process is complete
      });
  }

  return (
    <Box
      className="bg-danger-subtle"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        className="d-flex flex-column container justify-content-center gap-5"
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        <Typography variant="h3" color="initial" className="text-center">
          Register User
        </Typography>

        {/* Display error message if there is one */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={registerUser}>
          <TextField
            id="outlined-basic1"
            label="Email"
            type="email"
            variant="outlined"
            inputRef={email}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="outlined-basic2"
            label="Password"
            type="password"
            variant="outlined"
            inputRef={pass}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
