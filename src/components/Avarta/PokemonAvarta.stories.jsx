import PokemonAvarta from "./PokemonAvarta";

export default {
  title: "PokemonAvarta",
  component: PokemonAvarta,
};

const Template = (args) => <PokemonAvarta {...args} />;

export const PikachuAvarta = Template.bind({});
PikachuAvarta.args = {
  id: 25,
  width: 120,
  height: 120,
};
