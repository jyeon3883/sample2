import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, TextField } from "./Input";

const meta = {
  title: "Atoms/Input",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type InputStory = StoryObj<typeof Input>;
type TextFieldStory = StoryObj<typeof TextField>;

export const BasicInput: InputStory = {
  render: () => <Input placeholder="입력하세요" />,
};

export const TextFieldDefault: TextFieldStory = {
  render: () => <TextField label="이름" placeholder="이름을 입력하세요" />,
};

export const TextFieldWithValue: TextFieldStory = {
  render: () => <TextField label="이메일" defaultValue="user@example.com" />,
};
