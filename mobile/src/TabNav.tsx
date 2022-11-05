import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Platform, Image } from "react-native";
import { BlurView } from "expo-blur";
import Explore from "./screens/explore/Explore";
import Plus from "./screens/plus/Plus";
import Profile from "./screens/profile/Profile";
import HomeVault from "./screens/home_vault/HomeVault";
import Social from "./screens/social/Social";
import { Colors, Icons } from "./global/index";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeVault"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.AccentOn,
        tabBarInactiveTintColor: Colors.AccentPartial,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarBackground: () => {
          if (Platform.OS === "ios") {
            return (
              <BlurView
                tint="dark"
                intensity={60}
                style={StyleSheet.absoluteFill}
              />
            );
          }
          if (Platform.OS === "android") {
            return <View style={styles.androidBarBackground} />;
          }
        },
      }}
    >
      <Tab.Screen
        name="HomeVault"
        component={HomeVault}
        options={{
          tabBarIcon: Icons.OriginalSize.HomeIcon,
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: Icons.OriginalSize.ExploreIcon,
        }}
      />

      <Tab.Screen
        name="Plus"
        component={Plus}
        options={{
          tabBarIcon: Icons.OriginalSize.PlusIcon,
        }}
      />

      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: Icons.OriginalSize.Social,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: Icons.OriginalSize.ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  androidBarBackground: {
    flex: 1,
    backgroundColor: Colors.Primary90,
  },
});

export default TabNav;
