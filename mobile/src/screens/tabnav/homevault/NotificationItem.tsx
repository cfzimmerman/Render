import { useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Button, Text } from "react-native";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import CardFlip from "react-native-card-flip";

const UnreadIndicator = ({ unread }: { unread: boolean }) => {
  if (unread === true) {
    return (
      <View
        style={[
          GlobalStyles.shadow,
          styles.unreadIndicatorBaseline,
          styles.unreadIndicatorOn,
        ]}
      />
    );
  } else {
    return (
      <View style={[GlobalStyles.shadow, styles.unreadIndicatorBaseline]} />
    );
  }
};

const NotificationFront = ({ item, flipRef }) => {
  const FlipCard = () => {
    flipRef.current.flip();
  };

  return (
    <TouchableOpacity onPress={FlipCard}>
      <View style={[GlobalStyles.shadow, styles.frontContainer]}>
        <View style={styles.frontTitleWrapper}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              styles.frontTitle,
            ]}
          >
            {item.front.title}
          </Text>
          <UnreadIndicator unread={item.unread} />
        </View>
        <View style={styles.frontMessageWrapper}>
          <Text
            style={[GlobalStyles.p1text, styles.frontMessage]}
            numberOfLines={2}
          >
            {item.front.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NotificationBack = ({ flipRef, item }) => {
  const FlipCard = () => {
    flipRef.current.flip();
  };

  return (
    <View style={styles.backWrapper}>
      <NotificationIconTile
        title={"Close"}
        Icon={Icons.OriginalSize.X}
        Action={FlipCard}
      />
      <NotificationIconTile
        title={item.back.rightTitle}
        Icon={item.back.rightIcon}
        Action={() => console.log("Visit profile")}
      />
    </View>
  );
};

const NotificationIconTile = ({ title, Icon, Action }) => {
  const PerformAction = () => {
    Action();
  };

  return (
    <TouchableOpacity onPress={PerformAction}>
      <View style={[GlobalStyles.shadow, styles.iconTileWrapper]}>
        <Icon
          stroke={Colors.Primary}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize * 1.25}
          width={Environment.IconSize * 1.25}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.iconTileTitle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationItem = ({ item }) => {
  const flipRef = useRef(null);
  return (
    <CardFlip
      ref={flipRef}
      flipDirection={"x"}
      duration={300}
      style={styles.cardFlipContainer}
    >
      <NotificationFront item={item} flipRef={flipRef} />
      <NotificationBack item={item} flipRef={flipRef} />
    </CardFlip>
  );
};

const styles = StyleSheet.create({
  cardFlipContainer: {
    height: Environment.CubeSize + Environment.StandardPadding * 3,
    width: Environment.FullBar,
  },
  frontContainer: {
    width: Environment.FullBar,
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary,
    height: Environment.CubeSize + Environment.StandardPadding * 3,
    marginTop: Environment.StandardPadding,
  },
  frontTitleWrapper: {
    width: Environment.FullBar - Environment.LargePadding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  frontTitle: {
    color: Colors.AccentOn,
  },
  frontMessageWrapper: {
    width: Environment.FullBar - Environment.LargePadding,
    marginTop: Environment.SmallPadding,
  },
  frontMessage: {
    color: Colors.Accent90,
  },
  unreadIndicatorBaseline: {
    height: Environment.StandardPadding * 1.5,
    width: Environment.StandardPadding * 1.5,
    borderRadius: Environment.SmallPadding,
  },
  unreadIndicatorOn: {
    backgroundColor: Colors.WarmAccent,
  },
  backWrapper: {
    width: Environment.FullBar,
    height: Environment.CubeSize + Environment.StandardPadding * 3,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconTileWrapper: {
    height: Environment.CubeSize + Environment.StandardPadding * 3,
    width: (Environment.FullBar - Environment.StandardPadding) / 2,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOn,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  iconTileTitle: {
    color: Colors.Primary,
    marginTop: Environment.SmallPadding,
  },
});

export default NotificationItem;
