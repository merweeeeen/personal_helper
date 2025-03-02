"use client";
import { signUp, getData } from "@/api/api";
import { setItem } from "@/utils/localStorage";
import {
  Alert,
  Button,
  Center,
  Dialog,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [opened, { toggle, close }] = useDisclosure(false);

  const router = useRouter();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    function isValidEmail(email: string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email");
      return;
    }

    const response = await signUp(email, password, name);
    if (response["status"] == "Failed") {
      // prompt failed
      toggle()
      setError(response["message"]);
    } else {
      setItem("user", { email: email, password: password, name: name });
      router.push("/");
    }
  };
  return (
    <>
      <Center mt="xl">
        <Stack w={300}>
          <Title>Register</Title>
          <TextInput
            label={"Email"}
            value={email}
            onChange={onEmailChange}
            required
            error={emailError}
          ></TextInput>
          <PasswordInput
            label={"Password"}
            value={password}
            onChange={onPasswordChange}
            required
          ></PasswordInput>
          <TextInput
            label={"Name"}
            value={name}
            onChange={onNameChange}
            required
          ></TextInput>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Center>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
        bg="red"
      >
        <Text size="md" mb="xs" fw={700}>
          {error}
        </Text>
      </Dialog>
    </>
  );
}
