"use client";
import { getUser } from "@/api/api";
import { setItem } from "@/utils/localStorage";
import {
  Button,
  Center,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { useRouter } from "next/navigation";

export default function Login() {
  // const [user, setUser] = useState<CredentialResponse>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = usePersistedState("user", {});
  const router = useRouter();

  async function handleLogin() {
    const response = await getUser(email, password);
    if (response) {
      if (response["status"] == "Success") {
        setUser({
          email: response["data"]["email"],
          password: response["data"]["password"],
          name: response["data"]["name"],
        });
        router.push("/");
      }
    }
  }
  // function responseMessage(response: CredentialResponse) {
  //   // on login, save in the state
  //   console.log(response);
  //   setUser(response);
  // }
  // function errorMessage(error) {
  //   console.log(error);
  // }

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <Center mt={20}>
      <Stack w={300}>
        <Title style={{ margin: "auto" }}>Login</Title>
        <TextInput
          label={"Email"}
          placeholder="Enter your email"
          onChange={onChangeEmail}
          value={email}
        />
        <PasswordInput
          label={"Password"}
          placeholder="Enter your password"
          onChange={onChangePassword}
          value={password}
        />
        <Button onClick={handleLogin}>Login</Button>
        <Text>
          Not signed up yet ? Register{" "}
          <a href={"/register"} style={{ color: "blue" }}>
            here
          </a>
        </Text>
        {/* <Divider label="OR" /> */}
        {/* SSO Login google */}
        {/* <div style={{ margin: "auto" }}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div> */}
      </Stack>
    </Center>
  );
}
