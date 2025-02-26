import { MealList } from "@/app/model";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

export function Meal({
  onChange,
  value,
}: {
  onChange: (category: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  return (
    <>
      <Input component="select" w={200} onChange={onChange} value={value}>
        {Object.keys(MealList)
          .filter((key) => isNaN(Number(key)))
          .map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
      </Input>
    </>
  );
}
