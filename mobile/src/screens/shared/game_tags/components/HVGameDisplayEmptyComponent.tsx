import { View, Text, StyleSheet } from "react-native";
import HalfByFullDisplayBox from "../../general/components/HalfByFullDisplayBox";

const HVGameDisplayEmptyComponent = () => {
  return (
    <HalfByFullDisplayBox
      header="💃 🕺"
      title="All uploads tagged"
      description="You're now a Render patrician."
      Action={() => console.log("Nice")}
      disabled={true}
    />
  );
};

export default HVGameDisplayEmptyComponent;
