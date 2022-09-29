import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { VaultLanding } from "../../../old-src/screens/tabnav/vault";

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
