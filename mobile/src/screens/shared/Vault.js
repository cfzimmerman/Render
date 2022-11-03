import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VaultLanding from "../home_vault/pages/VaultLanding";

const Stack = createNativeStackNavigator();

function Vault() {
  return (
    <Stack.Navigator
      initialRouteName="VaultLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VaultLanding" component={VaultLanding} />
    </Stack.Navigator>
  );
}

export default Vault;
