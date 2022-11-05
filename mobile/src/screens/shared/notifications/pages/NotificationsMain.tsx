import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../general/components/BackArrow";
import HalfByFullDisplayBox from "../../general/components/HalfByFullDisplayBox";
import PrimaryDivider from "../../general/components/PrimaryDivider";
import { Environment, Colors, GlobalStyles, Icons } from "../../../../global";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "../components/NotificationItem";
import { RootStateType } from "../../../../redux";

const NotificationsTitleBox = () => {
  return (
    <View style={styles.titleBoxWrapper}>
      <BackArrow />
      <Text
        style={[
          GlobalStyles.h2text,
          GlobalStyles.irregularshadow,
          styles.titleBoxText,
        ]}
      >
        Notifications
      </Text>
      <View style={styles.titleBoxCounterweight} pointerEvents={"none"}>
        <BackArrow />
      </View>
    </View>
  );
};

const EmptyNotificationsBox = () => {
  return (
    <View style={styles.emptyNotificationsWrapper}>
      <HalfByFullDisplayBox
        header="🤷‍♂️"
        title="No notifications"
        description="Maybe they're hiding"
        Action={() => null}
        disabled={true}
      />
    </View>
  );
};

const HintMessage = ({ message }) => {
  return (
    <View style={styles.hintMessageWrapper}>
      <Text style={[GlobalStyles.p2text, styles.hintMessageText]}>
        {message}
      </Text>
    </View>
  );
};

const NotificationsMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const notificationData = useSelector(
    (state: RootStateType) => state.notifications.notificationData
  );
  const unreadCutoffDate = useSelector(
    (state: RootStateType) => state.notifications.unreadCutoffDate
  );

  const renderItem = ({ index, item }) => {
    return NotificationItem({ item, currentuser, dispatch, navigation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsTitleBox />
      <PrimaryDivider />
      <HintMessage message={"Tap for options"} />
      <FlatList
        contentContainerStyle={styles.flatlistContainerStyle}
        data={notificationData}
        keyExtractor={(item) => item.notificationID}
        renderItem={renderItem}
        ListEmptyComponent={EmptyNotificationsBox}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical:
      Platform.OS === "android" ? Environment.StandardPadding : 0,
  },
  flatlistContainerStyle: {
    flex: 1,
  },
  titleBoxWrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleBoxText: {
    color: Colors.AccentOn,
  },
  titleBoxCounterweight: {
    opacity: 0,
  },
  hintMessageWrapper: {
    width: Environment.FullBar,
  },
  hintMessageText: {
    textAlign: "right",
    color: Colors.Accent90,
  },
  emptyNotificationsWrapper: {
    marginVertical: Environment.LargePadding,
  },
});

export default NotificationsMain;
