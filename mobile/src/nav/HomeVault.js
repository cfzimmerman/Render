import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVaultLanding from "../screens/tabnav/homevault/HomeVaultLanding";
import NotificationsMain from "../screens/tabnav/homevault/NotificationsMain";

const Stack = createNativeStackNavigator();

const HomeVault = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeVaultLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeVaultLanding" component={HomeVaultLanding} />
      <Stack.Screen name="NotificationsMain" component={NotificationsMain} />
    </Stack.Navigator>
  );
};

export default HomeVault;
