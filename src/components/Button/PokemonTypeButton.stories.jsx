import BackgroundColors from "@/util/BackgroundColor";
import PokemonTypeButton from "./PokemonTypeButton";

export default {
  title: "PokemonTypeButton",
  component: PokemonTypeButton,
};

const Template = (args) => <PokemonTypeButton {...args} />;

export const NormalTypeButton = Template.bind({});
NormalTypeButton.args = {
  label: "normal",
  backgroundColor: BackgroundColors.normal,
  type: "normal",
  width: 20,
  height: 20,
};
