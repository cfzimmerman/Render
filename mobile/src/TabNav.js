import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Platform, Image } from "react-native";
import { BlurView } from "expo-blur";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import {
  Home,
  Explore,
  Plus,
  Vault,
  Profile,
  HomeVault,
  Social,
} from "../old-src/nav";
import { Colors, Icons, Environment } from "./global/index";

// Each tab screen is a stack for its respective domain of the app
/*

const Tab = AnimatedTabBarNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                activeBackgroundColor: Colors.AccentPartial,
                activeTintColor: Colors.AccentOn,
                inactiveTintColor: Colors.AccentPartial,
                labelStyle: {
                    fontFamily: "Inter_600SemiBold",
                },
                tabStyle: {
                    borderRadius: Environment.StandardRadius,
                }
            }}
            appearance={{
                floating: true,
                shadow: false,
                tabBarBackground: Colors.Primary,
                dotCornerRadius: Environment.StandardRadius,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
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
                name="Vault"
                component={Vault}
                options={{
                    tabBarIcon: Icons.OriginalSize.VaultIcon,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: Icons.OriginalSize.ProfileIcon,
                }}
            />
            <Tab.Screen
                name="HomeVault"
                component={HomeVault}
                options={{
                    tabBarIcon: Icons.OriginalSize.HomeIcon,
                }}
            />
        </Tab.Navigator>
    )
}

*/

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
