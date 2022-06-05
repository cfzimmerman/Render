import { Appearance } from "react-native";

const IsDarkMode = () => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === "dark") {
    return true;
  }
  return false;
};

export default IsDarkMode;
