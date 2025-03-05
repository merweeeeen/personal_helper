"use client";
import { ComboBox } from "@/components/Combobox/Combobox";
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
import { DatePickerInput, DateValue } from "@mantine/dates";
import { ChangeEvent, useState } from "react";
import { sendExpense } from "../../api/api";
import { useDisclosure } from "@mantine/hooks";
import { getItem } from "@/utils/localStorage";

export default function Tracker() {
  const categoryOptions = [
    "Food",
    "Clothes",
    "Investment",
    "Bills",
    "Miscellaneous",
  ];

  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Drinks"];
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("Food");
  const [meal, setMeal] = useState<string>("Breakfast");
  const [description, setDescription] = useState<string>("");
  const [dialog, setDialog] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const [opened, { toggle, close }] = useDisclosure(false);
  const user = getItem("user");

  function handleItemChange(item: ChangeEvent<HTMLInputElement>) {
    setItem(item.target.value);
  }

  function handleAmountChange(amount: number | string) {
    setAmount(Number(amount));
  }

  function handleCategoryChange(category: string) {
    setCategory(category);
    if (category !== "Food") {
      setMeal("");
    }
  }

  function handleMealChange(meal: string) {
    setMeal(meal);
  }

  function handleDescriptionChange(description: ChangeEvent<HTMLInputElement>) {
    setDescription(description.target.value);
  }

  function handleDateChange(changedDate: DateValue) {
    if (changedDate) {
      setDate(changedDate);
    }
  }

  function handleSubmit() {
    if (item == "" || amount == 0) {
      setDialog("Missing Fields");
      toggle();
      return;
    }
    if (category == "Food" && meal == "") {
      setDialog("Meal Required");
      toggle();
      return;
    }

    if(date == null) {
      setDialog("Date Required");
      toggle();
      return;
    }

    sendExpense(user["email"], item, amount, category, description, date, meal);
    setItem("");
    setAmount(0);
    setCategory("Food");
    setMeal("");
    setDescription("");
    setDialog("Success");
    setDate(null)
  }

  return (
    <>
      <Center mt="xl">
        <Stack>
          <Title>Track my expenses</Title>
          <Flex>
            <TextInput
              w={"100%"}
              label="Item"
              onChange={handleItemChange}
              required
              value={item}
            />
          </Flex>
          <Flex>
            <NumberInput
              w={"100%"}
              label="Amount"
              onChange={handleAmountChange}
              required
              value={amount}
            />
          </Flex>
          <Flex>
            <ComboBox
              label="Category"
              onChange={handleCategoryChange}
              optionsList={categoryOptions}
            />
          </Flex>
          {category == "Food" && (
            <Flex>
              <ComboBox
                label="Meal"
                optionsList={mealOptions}
                onChange={handleMealChange}
              />
            </Flex>
          )}
          <DatePickerInput
            w={"100%"}
            value={date}
            onChange={handleDateChange}
            label="Date input"
            placeholder="Date input"
            size="sm"
          />

          <Flex>
            <TextInput
              w={"100%"}
              label="Description"
              onChange={handleDescriptionChange}
              value={description}
            />
          </Flex>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Center>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        bg={dialog == "Success" ? "green" : "red"}
      >
        {dialog == "Success" ? (
          <Text fw={700}>Expense Tracked</Text>
        ) : (
          <Text fw={700}>{dialog}</Text>
        )}
      </Dialog>
    </>
  );
}
