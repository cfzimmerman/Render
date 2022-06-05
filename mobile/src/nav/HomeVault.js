import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVaultLanding from "../screens/tabnav/homevault/HomeVaultLanding";

const Stack = createNativeStackNavigator();

function HomeVault() {
  return (
    <Stack.Navigator
      initialRouteName="HomeVaultLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeVaultLanding" component={HomeVaultLanding} />
    </Stack.Navigator>
  );
}

export default HomeVault;
