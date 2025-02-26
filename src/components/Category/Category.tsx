import { CategoryList } from "@/app/model";
import { Input } from "@mantine/core";
import { ChangeEvent } from "react";

export function Category({
  onChange,
}: {
  onChange: (category: ChangeEvent<HTMLSelectElement>) => void;
}) {
  console.log(Object.keys(CategoryList));
  return (
    <>
      <Input
        component="select"
        w={200}
        onChange={onChange}
        defaultValue={"Food"}
      >
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
