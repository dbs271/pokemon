import BackgroundColors from "@/util/PokeTypeColors";
import { withTheme } from "styled-components";
import PokemonTypeButton from "./PokemonTypeButton";

export default {
  title: "PokemonTypeButton",
  component: PokemonTypeButton,
  argTypes: {
    onClick: {
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
  width: 30,
  height: 30,
};
