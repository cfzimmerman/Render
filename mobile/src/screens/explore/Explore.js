import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExploreLanding } from "../../../old-src/screens/tabnav/explore";

import OtherUserProfileLanding from "./pages/OtherUserProfileLanding";
import OtherUserGalleryMain from "./pages/OtherUserGalleryMain";
import PGLanding from "../shared/public_game/pages/PGLanding";

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
      <Stack.Screen
        name="PGLanding"
        component={PGLanding} /* gameID: string */
      />
    </Stack.Navigator>
  );
};

export default Explore;
