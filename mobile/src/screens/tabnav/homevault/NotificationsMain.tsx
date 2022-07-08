import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrow, PrimaryDivider } from "../../../resources/atoms";
import {
  NotificationFront,
  NotificationBack,
  NotificationUnit,
} from "./NotificationsComponents";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";

const CategoryHeader = ({ title }) => {
  return (
    <Text
      style={[
        GlobalStyles.h4text,
        GlobalStyles.irregularshadow,
        { color: Colors.Accent90 },
      ]}
    >
      {title.split("")[0]}
    </Text>
  );
};

const headerData = [
  {
    title: "New follower",
    code: 3001,
    preview: "Eko36 added you. Would you like to add back?",
    unread: true,
  },
];

const ThreadThumbnail = () => {
  const item = headerData[0];
  return (
    <View
      style={[
        GlobalStyles.shadow,
        {
          width: Environment.FullBar,
          padding: Environment.StandardPadding,
          backgroundColor: Colors.Primary,
          height: Environment.CubeSize + Environment.StandardPadding * 3,
          marginTop: Environment.StandardPadding,
        },
      ]}
    >
      <View
        style={{
          width: Environment.FullBar - Environment.LargePadding,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            { color: Colors.AccentOn },
          ]}
        >
          {item.title}
        </Text>
        <View
          style={[
            GlobalStyles.shadow,
            {
              height: Environment.StandardPadding * 1.5,
              width: Environment.StandardPadding * 1.5,
              borderRadius: Environment.SmallPadding,
              backgroundColor: Colors.WarmAccent,
            },
          ]}
        />
      </View>
      <View
        style={{
          width: Environment.FullBar - Environment.LargePadding,
          marginTop: Environment.SmallPadding,
        }}
      >
        <Text
          style={[GlobalStyles.p1text, { color: Colors.Accent90 }]}
          numberOfLines={2}
        >
          {item.preview}
        </Text>
      </View>
    </View>
  );
};

const ThreadThumbnailBackside = () => {
  return (
    <View
      style={[
        {
          width: Environment.FullBar,
          height: Environment.CubeSize + Environment.StandardPadding * 3,
          marginTop: Environment.StandardPadding,
          justifyContent: "space-between",
          flexDirection: "row",
        },
      ]}
    >
      <View
        style={[
          GlobalStyles.shadow,
          {
            height: Environment.CubeSize + Environment.StandardPadding * 3,
            width: (Environment.FullBar - Environment.StandardPadding) / 2,
            borderRadius: Environment.StandardRadius,
            backgroundColor: Colors.AccentOn,
            alignItems: "center",
            justifyContent: "center",
            padding: Environment.StandardPadding,
          },
        ]}
      >
        <Icons.OriginalSize.X
          stroke={Colors.Primary}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize * 1.25}
          width={Environment.IconSize * 1.25}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            { color: Colors.Primary, marginTop: Environment.SmallPadding },
          ]}
        >
          Back
        </Text>
      </View>
      <View
        style={[
          GlobalStyles.shadow,
          {
            height: Environment.CubeSize + Environment.StandardPadding * 3,
            width: (Environment.FullBar - Environment.StandardPadding) / 2,
            borderRadius: Environment.StandardRadius,
            backgroundColor: Colors.AccentOn,
            alignItems: "center",
            justifyContent: "center",
            padding: Environment.StandardPadding,
          },
        ]}
      >
        <Icons.OriginalSize.AddUser
          stroke={Colors.Primary}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize * 1.25}
          width={Environment.IconSize * 1.25}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            { color: Colors.Primary, marginTop: Environment.SmallPadding },
          ]}
        >
          Visit profile
        </Text>
      </View>
    </View>
  );
};

const NotificationsMain = () => {
  const hasUnread = true;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical:
          Platform.OS === "android" ? Environment.StandardPadding : 0,
      }}
    >
      <View
        style={{
          width: Environment.FullBar,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BackArrow />
        <Text
          style={[
            GlobalStyles.h2text,
            GlobalStyles.irregularshadow,
            { color: Colors.AccentOn },
          ]}
        >
          Notifications
        </Text>
        <View style={{ opacity: 0 }} pointerEvents={"none"}>
          <BackArrow />
        </View>
      </View>
      <PrimaryDivider />
      <NotificationUnit item={headerData[0]} />
    </SafeAreaView>
  );
};

export default NotificationsMain;
