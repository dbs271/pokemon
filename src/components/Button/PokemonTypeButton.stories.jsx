import BackgroundColors from "@/util/BackgroundColor";
import { withTheme } from "styled-components";
import PokemonTypeButton from "./PokemonTypeButton";

export default {
  title: "PokemonTypeButton",
  component: PokemonTypeButton,
  argTypes: {
    onclick: {
      action: "action",
    },
  },
};

const Template = (args) => <PokemonTypeButton {...args} />;

export const NormalTypeButton = Template.bind({});
NormalTypeButton.args = {
  label: "normal",
  backgroundColor: BackgroundColors.normal,
  type: "normal",
  width: 20,
  height: 20,
  color: "#fff",
  fontSize: "16px",
};
