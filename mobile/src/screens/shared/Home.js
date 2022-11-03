import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeLanding from "../home_vault/pages/HomeLanding";

const Stack = createNativeStackNavigator();

const Home = () => {
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
};

export default Home;
