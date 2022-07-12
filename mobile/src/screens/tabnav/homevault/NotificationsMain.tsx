import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrow, PrimaryDivider } from "../../../resources/atoms";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import { useDispatch, useSelector } from "react-redux";
import NotificationLibrary, {
  Code3001PayloadType,
  NotificationDataItem,
  NotificationLibraryPropTypes,
} from "./NotificationLibrary";
import NotificationItem from "./NotificationItem";
import { RootStateType } from "../../../redux/store";
import LSCreateNotificationStore from "./LSCreateNotificationStore";
import LSGetNotificationStore from "./LSGetNotificationStore";
import AddNewNotification, {
  AddNewNotificationPropTypes,
} from "./AddNewNotification";
import GetNotificationsCloud from "./GetNotificationsCloud";
import LSUpdateNotificationStore from "./LSUpdateNotificationStore";

const headerData: NotificationDataItem[] = [
  {
    notificationID: "poof",
    code: 3001,
    payload: "no",
    unread: true,
    createdAt: new Date().toISOString(),
    front: {
      title: "New follower",
      message: "Eko36 added you 🎉. Would you like to add back?",
    },
    back: {
      rightIcon: Icons.OriginalSize.AddUser,
      rightTitle: "Visit profile",
    },
  },
];

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

const HintMessage = ({ message }) => {
  return (
    <View style={styles.hintMessageWrapper}>
      <Text style={[GlobalStyles.p2text, styles.hintMessageText]}>
        {message}
      </Text>
    </View>
  );
};

const dummyPayload = {
  ouID: "67caff7a-841a-45c6-9902-85813297e59b",
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

  const notificationObject: NotificationLibraryPropTypes = {
    code: 3001,
    notificationID: "bo-fa",
    payload: JSON.stringify(dummyPayload),
    dispatch,
  };

  console.log("notificationData: " + JSON.stringify(notificationData));

  const renderItem = ({ index, item }) => {
    return NotificationItem({ item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsTitleBox />
      <PrimaryDivider />
      <HintMessage message={"Tap for options"} />
      <FlatList
        data={notificationData}
        keyExtractor={(item) => item.notificationID}
        renderItem={renderItem}
      />
      <View style={{ marginTop: Environment.CubeSize }}>
        <Button
          title={"GetNotificationsCloud"}
          color={"moccasin"}
          onPress={() =>
            GetNotificationsCloud({
              currentuser,
              unreadCutoffDate: "2011-10-05T14:48:00.000Z",
              dispatch,
            })
          }
        />
        <Button
          title={"Notification Library"}
          color={"indianred"}
          onPress={() => NotificationLibrary(notificationObject)}
        />
        <Button
          title={"LSUpdateNotificationStore"}
          color={"goldenrod"}
          onPress={() =>
            LSUpdateNotificationStore({ newItem: notificationData[0] })
          }
        />
        <Button
          title={"AddNewNotification"}
          color={"wheat"}
          onPress={() => {
            const newPayload: Code3001PayloadType = {
              ouID: "cacaa58e-6a7c-4d97-84a1-885ca95f5128",
            };
            const newNotification: AddNewNotificationPropTypes = {
              targetUserID: "67caff7a-841a-45c6-9902-85813297e59b",
              code: 3001,
              payloadString: JSON.stringify(newPayload),
            };
            console.log("bring it back dingus");
            // AddNewNotification(newNotification);
          }}
        />
      </View>
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
});

export default NotificationsMain;
