"use client";

import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { getItem } from "@/utils/localStorage";

export default function Page() {
  const router = useRouter();
  const user = getItem("user");
  console.log(user);

  return (
    <Center mt={50}>
      <Stack>
        {user?.name ? <Title>Hi {user["name"]}</Title> : <></>}
        <Title>Track your daily life!</Title>
        {!user?.name ? (
          <>
            <Text>You seemed to be not logged in</Text>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </>
        ) : (
          <Button
            onClick={() => {
              router.push("/expense");
            }}
          >
            Expense Tracker
          </Button>
        )}
      </Stack>
    </Center>
  );
}
