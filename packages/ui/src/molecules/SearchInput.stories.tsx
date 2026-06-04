import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SearchInput, type SearchInputProps } from "./SearchInput";

function SearchInputDemo(props: Partial<SearchInputProps>) {
  const [value, setValue] = useState(props.value ?? "");
  return (
    <SearchInput
      label={props.label ?? "검색"}
      placeholder={props.placeholder ?? "검색어를 입력하세요"}
      value={value}
      onChange={setValue}
    />
  );
}

const meta = {
  title: "Molecules/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
  },
  render: (args) => <SearchInputDemo {...args} />,
};

export const WithInitialValue: Story = {
  args: {
    value: "검색어",
    placeholder: "검색...",
    label: "키워드",
  },
  render: (args) => <SearchInputDemo {...args} />,
};
