import { MealList } from "@/app/model";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

export function Meal({
  onChange,
}: {
  onChange: (category: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <Input
        component="select"
        w={200}
        onChange={onChange}
        defaultValue={"Breakfast"}
      >
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
