// pages/register/register.tsx

import React, { useState } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { InputComponent } from "../../components/input/input";
import ButtonComponent from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { RegisterAction } from "../../libs/network/Auth";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/login");
  };

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Reset errors
    setUsernameError("");
    setPasswordError("");

    // Validate inputs
    let isValid = true;
    if (!username) {
      setUsernameError("Silahkan masukkan username");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Silahkan masukkan password");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Attempt registration
    const success = await RegisterAction({ username, password });

    if (success) {
      navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Stack>
      <Stack width={"100%"} maxW={"md"} mx={"auto"} p={4}>
        <Heading letterSpacing={1.4} size={"lg"}>
          REGISTER
        </Heading>
        <Stack mt={4}>
          <InputComponent
            label="Username"
            type="text"
            helperText="Masukkan username"
            errorMessage={usernameError}
            value={username}
            setValue={setUsername}
          />
          <InputComponent
            label="Password"
            type="password"
            helperText="Masukkan password"
            errorMessage={passwordError}
            value={password}
            setValue={setPassword}
          />
          <ButtonComponent mt={6} label="Daftar" onClick={handleRegister} />
          <ButtonComponent
            onClick={handleLogin}
            mt={2}
            label="Sudah punya akun? Masuk"
            colorScheme="blue"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
