import { CategoryList } from "@/app/model";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

export function Category({
  onChange,
  value,
}: {
  onChange: (category: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  console.log(Object.keys(CategoryList));
  return (
    <>
      <Input component="select" w={200} onChange={onChange} value={value}>
        {Object.keys(CategoryList)
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
