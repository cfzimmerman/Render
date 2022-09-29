import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SocialLanding from "./pages/SocialLanding";

const Stack = createNativeStackNavigator();

function Social() {
  return (
    <Stack.Navigator
      initialRouteName="SocialLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SocialLanding" component={SocialLanding} />
    </Stack.Navigator>
  );
}

export default Social;
