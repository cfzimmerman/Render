import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlusLanding } from "../screens/tabnav/plus";

import SelectFromVault from "../screens/tabnav/plus/SelectFromVault";

const Stack = createNativeStackNavigator();

const Plus = () => {
  return (
    <Stack.Navigator
      initialRouteName="PlusLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PlusLanding" component={PlusLanding} />
      <Stack.Screen name="SelectFromVault" component={SelectFromVault} />
    </Stack.Navigator>
  );
};

export default Plus;
