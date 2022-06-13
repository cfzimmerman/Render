import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExploreLanding } from "../screens/tabnav/explore";

import OtherUserProfileLanding from "../screens/tabnav/explore/OtherUserProfileLanding";
import OtherUserGalleryMain from "../screens/tabnav/explore/OtherUserGalleryMain";

const Stack = createNativeStackNavigator();

const Explore = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExploreLanding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExploreLanding" component={ExploreLanding} />
      <Stack.Screen
        name="OtherUserProfileLanding"
        component={OtherUserProfileLanding}
      />
      <Stack.Screen
        name="OtherUserGalleryMain"
        component={OtherUserGalleryMain}
      />
    </Stack.Navigator>
  );
};

export default Explore;
