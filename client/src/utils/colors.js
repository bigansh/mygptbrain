import { useColorModeValue } from "@chakra-ui/react";

export const useColors = () => {
  const base = useColorModeValue("#FFFFFF", "#1D1E20");
  const base600 = useColorModeValue("#DFE8FF", "#303134");
  const base800 = useColorModeValue("#F4F7FF", "#202124");
  const base700 = useColorModeValue("#DFE8FF80", "#30313480");
  const text = useColorModeValue("#000000", "#FFFFFF");
  return { base, base800, base700, text , base600};
};
