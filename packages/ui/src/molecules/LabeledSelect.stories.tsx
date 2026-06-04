import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { LabeledSelect, type LabeledSelectProps } from "./LabeledSelect";

const options = [
  { label: "전체", value: "all" },
  { label: "진행 중", value: "in-progress" },
  { label: "완료", value: "done" },
];

function LabeledSelectDemo(props: Partial<LabeledSelectProps>) {
  const [value, setValue] = useState(props.value ?? "all");
  return (
    <LabeledSelect
      label={props.label ?? "상태"}
      value={value}
      options={props.options ?? options}
      onChange={setValue}
    />
  );
}

const meta = {
  title: "Molecules/LabeledSelect",
  component: LabeledSelect,
  tags: ["autodocs"],
  args: {
    label: "상태",
    value: "all",
    options,
    onChange: fn(),
  },
} satisfies Meta<typeof LabeledSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "상태",
    value: "all",
    options,
  },
  render: (args) => <LabeledSelectDemo {...args} />,
};
