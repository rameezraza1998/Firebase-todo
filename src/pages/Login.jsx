import React, { useRef, useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { auth } from "../config/firebase/configfirebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const email = useRef();
  const pass = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // For error message display

  function loginUser(event) {
    event.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = pass.current.value;

    // Validate if fields are empty
    if (!emailValue || !passwordValue) {
      setErrorMessage("Please fill out both fields!");
      return;
    }

    // Loggin In || SignUp
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in", user);
        navigate("/Todo");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Invalid email or password");
        console.log(errorMessage); // Log for debugging
      });
  }

  return (
    <>
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
            Login User
          </Typography>

          {/* Display error message */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={loginUser}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>

          <Box className="text-center">
            <Typography variant="subtitle1" color="initial">
              Doesn't have an account?{" "}
              <span
                className="text-decoration-underline text-primary"
                onClick={() => navigate("/register")}
              >
                {" "}
                <Link>Sign Up</Link>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
