import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeLanding } from "../screens/tabnav/home";

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeLanding" component={HomeLanding} />
    </Stack.Navigator>
  );
}

export default Home;
