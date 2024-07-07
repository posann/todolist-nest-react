// pages/login/login.tsx

import React, { useState } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { InputComponent } from "../../components/input/input";
import ButtonComponent from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "../../libs/network/Auth";
import { SetDataLocal } from "../../libs/local-storage";
import { AlertComponent } from "../../components/alert/alert";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/register");
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

    // Attempt login
    const response = await LoginAction({ username, password });

    if (response) {
      SetDataLocal(response);
      navigate("/dashboard");
    } else {
      AlertComponent({
        status: "error",
        message: "Username atau password salah.",
        isOpen: true,
        onClose: () => {},
      });
    }
  };

  return (
    <Stack>
      <Stack width={"100%"} maxW={"md"} mx={"auto"} p={4}>
        <Heading letterSpacing={1.4} size={"lg"}>
          LOGIN
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
          <ButtonComponent
            onClick={handleLogin}
            mt={6}
            label="Masuk"
            colorScheme="blue"
          />
          <ButtonComponent
            onClick={handleRegister}
            mt={2}
            label="Belum punya akun? Daftar"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
