"use client";
import { Category } from "@/components/Category/Category";
import { Meal } from "@/components/Meal/Meal";
import {
  Button,
  Center,
  Flex,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";

export default function Tracker() {
  const [item, setItem] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<string>("Food");
  const [meal, setMeal] = useState<string>("Breakfast");
  const [description, setDescription] = useState<string>();

  function handleItemChange(item: ChangeEvent<HTMLInputElement>) {
    setItem(item.target.value);
  }

  function handleAmountChange(amount: number | string) {
    setAmount(Number(amount));
  }

  function handleCategoryChange(category: ChangeEvent<HTMLSelectElement>) {
    setCategory(category.target.value);
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
  }

  return (
    <Center mt="xl">
      <Stack>
        <Title>Track my expenses</Title>
        <Flex>
          <Text mr={20} w={70}>
            Item
          </Text>
          <TextInput w={200} onChange={handleItemChange} required />
        </Flex>
        <Flex>
          <Text mr={20} w={70}>
            Amount
          </Text>
          <NumberInput w={200} onChange={handleAmountChange} required />
        </Flex>
        <Flex>
          <Text mr={20} w={70}>
            Category
          </Text>
          <Category onChange={handleCategoryChange} />
        </Flex>
        {category == "Food" && (
          <Flex>
            <Text mr={20} w={70}>
              Meal
            </Text>
            <Meal onChange={handleMealChange} />
          </Flex>
        )}
        <Flex>
          <Text mr={20} w={70}>
            Description
          </Text>
          <TextInput w={200} onChange={handleDescriptionChange} />
        </Flex>
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Center>
  );
}
