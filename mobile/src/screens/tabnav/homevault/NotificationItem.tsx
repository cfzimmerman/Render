import { View, TouchableOpacity, StyleSheet, Button, Text } from "react-native";
import { formatDistanceToNowStrict } from "date-fns";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import CardFlip from "react-native-card-flip";
import NotificationActionRouter from "./NotificationActionRouter";
import { NotificationDataItem } from "./NotificationLibrary";
import { DispatchType } from "../../../redux/store";
import { CurrentUserType } from "../../../resources/CommonTypes";

const UnreadIndicator = ({
  unread,
  createdAt,
}: {
  unread: boolean;
  createdAt: string;
}) => {
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
      <View
        style={[GlobalStyles.shadow, styles.unreadIndicatorTimestampWrapper]}
      >
        <Text style={[GlobalStyles.p2text, styles.unreadIndicatorTimestamp]}>
          {formatDistanceToNowStrict(new Date(createdAt))}
        </Text>
      </View>
    );
  }
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

interface NotificationItemPropsType {
  item: NotificationDataItem;
  navigation: any;
  dispatch: DispatchType;
  currentuser: CurrentUserType;
}

const NotificationItem = ({
  item,
  navigation,
  dispatch,
  currentuser,
}: NotificationItemPropsType) => {
  var flipRef;
  // ^ This admittedly looks hella sus, but useRef in FlatList children is forbidden. If there's a better solution, feel free to implement it.

  const FlipCard = () => {
    flipRef.flip();
  };

  const NotificationFront = ({ item }) => {
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
            <UnreadIndicator unread={item.unread} createdAt={item.createdAt} />
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

  const NotificationBackRightAction = () => {
    FlipCard();
    NotificationActionRouter({
      notificationDataItem: item,
      currentuser,
      dispatch,
      navigation,
    });
  };

  const NotificationBack = ({ item }) => {
    return (
      <View style={styles.backWrapper}>
        <NotificationIconTile
          title={"Close"}
          Icon={Icons.OriginalSize.X}
          Action={FlipCard}
        />
        <NotificationIconTile
          title={item.back.rightTitle}
          Icon={Icons.OriginalSize[item.back.rightIcon]}
          Action={NotificationBackRightAction}
        />
      </View>
    );
  };

  return (
    <CardFlip
      ref={(card) => (flipRef = card)}
      flipDirection={"x"}
      duration={300}
      style={styles.cardFlipContainer}
    >
      <NotificationFront item={item} />
      <NotificationBack item={item} />
    </CardFlip>
  );
};

const styles = StyleSheet.create({
  cardFlipContainer: {
    height: Environment.NotificationItemHeight,
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
  },
  frontContainer: {
    width: Environment.FullBar,
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary,
    height: Environment.NotificationItemHeight,
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
  unreadIndicatorTimestamp: {
    color: Colors.Accent90,
    textAlign: "right",
  },
  unreadIndicatorTimestampWrapper: {
    justifyContent: "center",
  },
  backWrapper: {
    width: Environment.FullBar,
    height: Environment.NotificationItemHeight,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconTileWrapper: {
    height: Environment.NotificationItemHeight,
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
