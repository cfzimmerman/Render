import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileLanding } from "../screens/tabnav/profile";
import GalleryMain from "../screens/tabnav/profile/GalleryMain";
import SettingsMain from "../screens/tabnav/profile/SettingsMain";
import AddedUsers from "../screens/tabnav/profile/AddedUsers";
import LocalSyncSettings from "../screens/tabnav/profile/LocalSyncSettings";
import AddedMeUsers from "../screens/tabnav/profile/AddedMeUsers";
import BackupMain from "../screens/tabnav/profile/BackupMain";

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
