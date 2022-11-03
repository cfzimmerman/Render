import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlusLanding from "./pages/PlusLanding";

import SelectFromVault from "./pages/SelectFromVault";
import WebUploadPreview from "./pages/WebUploadPreview";

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
      <Stack.Screen name="WebUploadPreview" component={WebUploadPreview} />
    </Stack.Navigator>
  );
};

export default Plus;
