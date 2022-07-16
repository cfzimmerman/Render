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
import NotificationItem from "./NotificationItem";
import { RootStateType } from "../../../redux/store";
import LSClearNotificationStore from "./LSClearNotificationStore";
import GetCode3003Notifications from "./NotificationActions/GetCode3003Notifications";
import CreateCode3003Notification from "./NotificationActions/CreateCode3003Notification";
import AddComment from "../social/AddComment";
import { API, graphqlOperation } from "aws-amplify";
import { getPosts } from "../../../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetPostsQuery } from "../../../API";
import { PostType } from "../../../resources/CommonTypes";

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
      <Button
        title={"ClearNotificationStore"}
        color={"moccasin"}
        onPress={() => LSClearNotificationStore()}
      />
      <Button
        title={"CreateGhostNotification"}
        color={"coral"}
        onPress={() => {
          async function DoIt() {
            try {
              const {
                data: { getPosts: post },
              } = (await API.graphql(
                graphqlOperation(getPosts, {
                  id: "735aca90-d7c1-403a-9782-fc916d292aad",
                })
              )) as GraphQLResult<GetPostsQuery>;
              const postItem: PostType = {
                id: post.id,
                aspectratio: post.aspectratio,
                contentdate: post.contentdate,
                contentkey: post.contentkey,
                contenttype: post.contenttype,
                cognitosub: post.cognitosub,
                displayname: "Absolute Unit",
                header: false,
                posttext: post.posttext,
                publicpost: post.publicpost,
                publicpostdate: post.publicpostdate,
                signedurl: null,
                thumbnailkey: post.thumbnailkey,
                thumbnailurl: null,
                userid: "67caff7a-841a-45c6-9902-85813297e59b",
                userpfp: "07f1fa86-2fc3-4b4f-98a8-ea6029354700.jpg",
                userpfpurl: null,
              };

              const fauxCurrentUser = {
                ...currentuser,
                id: "71bbc458-bd28-4c23-9913-b92c6d5b32dc",
                displayname: "andrew2",
              };

              AddComment({
                item: postItem,
                dispatch,
                commentText: "Ghost comment 🦇",
                currentuser: fauxCurrentUser,
              });
            } catch (error) {
              console.log(JSON.stringify(error));
            }
          }

          // DoIt();
          console.log("turn it on bud");
        }}
      />
      <HintMessage message={"Tap for options"} />
      <FlatList
        data={notificationData}
        keyExtractor={(item) => item.notificationID}
        renderItem={renderItem}
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
