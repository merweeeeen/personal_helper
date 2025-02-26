"use client";
import { Category } from "@/components/Category/Category";
import { Meal } from "@/components/Meal/Meal";
import {
  Button,
  Center,
  Dialog,
  Flex,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { sendExpense } from "../../api/apiCalls";
import { useDisclosure } from "@mantine/hooks";

export default function Tracker() {
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("Food");
  const [meal, setMeal] = useState<string>("Breakfast");
  const [description, setDescription] = useState<string>("");
  const [opened, { toggle, close }] = useDisclosure(false);

  function handleItemChange(item: ChangeEvent<HTMLInputElement>) {
    setItem(item.target.value);
  }

  function handleAmountChange(amount: number | string) {
    setAmount(Number(amount));
  }

  function handleCategoryChange(category: ChangeEvent<HTMLSelectElement>) {
    setCategory(category.target.value);
    if (category.target.value !== "Food") {
      setMeal("");
    }
  }

  function handleMealChange(meal: ChangeEvent<HTMLSelectElement>) {
    setMeal(meal.target.value);
  }

  function handleDescriptionChange(description: ChangeEvent<HTMLInputElement>) {
    setDescription(description.target.value);
  }

  function handleSubmit() {
    console.log(item);
    console.log(amount);
    console.log(category);
    console.log(meal);
    console.log(description);
    if (item == "" || amount == 0 || meal == "") {
      toggle();
      return;
    }
    sendExpense(item, amount, category, description, meal);
    setItem("");
    setAmount(0);
    setCategory("Food");
    setMeal("");
    setDescription("");
  }

  return (
    <>
      <Center mt="xl">
        <Stack>
          <Title>Track my expenses</Title>
          <Flex>
            <Text mr={20} w={70}>
              Item
            </Text>
            <TextInput
              w={200}
              onChange={handleItemChange}
              required
              value={item}
            />
          </Flex>
          <Flex>
            <Text mr={20} w={70}>
              Amount
            </Text>
            <NumberInput
              w={200}
              onChange={handleAmountChange}
              required
              value={amount}
            />
          </Flex>
          <Flex>
            <Text mr={20} w={70}>
              Category
            </Text>
            <Category onChange={handleCategoryChange} value={category} />
          </Flex>
          {category == "Food" && (
            <Flex>
              <Text mr={20} w={70}>
                Meal
              </Text>
              <Meal onChange={handleMealChange} value={meal} />
            </Flex>
          )}
          <Flex>
            <Text mr={20} w={70}>
              Description
            </Text>
            <TextInput w={200} onChange={handleDescriptionChange} value={description} />
          </Flex>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Center>
      <Dialog opened={opened} withCloseButton onClose={close} bg="red">
        <Text fw={700}>Missing Fields</Text>
      </Dialog>
    </>
  );
}
