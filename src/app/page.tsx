"use client";

import { Button, Center, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <Center mt={50}>
      <Stack>
        <Title>Track your daily life!</Title>

        <Button
          onClick={() => {
            router.push("/expense");
          }}
        >
          Expense Tracker
        </Button>
      </Stack>
    </Center>
  );
}
