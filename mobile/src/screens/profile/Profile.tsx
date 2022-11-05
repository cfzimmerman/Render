import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileLanding from "./pages/ProfileLanding";
import GalleryMain from "./pages/GalleryMain";
import SettingsMain from "./pages/SettingsMain";
import AddedUsers from "./pages/AddedUsers";
import LocalSyncSettings from "./pages/LocalSyncSettings";
import AddedMeUsers from "./pages/AddedMeUsers";
import BackupMain from "./pages/BackupMain";

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileLanding" component={ProfileLanding} />
      <Stack.Screen name="GalleryMain" component={GalleryMain} />
      <Stack.Screen name="SettingsMain" component={SettingsMain} />
      <Stack.Screen name="AddedUsers" component={AddedUsers} />
      <Stack.Screen name="LocalSyncSettings" component={LocalSyncSettings} />
      <Stack.Screen name="AddedMeUsers" component={AddedMeUsers} />
      <Stack.Screen name="BackupMain" component={BackupMain} />
    </Stack.Navigator>
  );
};

export default Profile;
