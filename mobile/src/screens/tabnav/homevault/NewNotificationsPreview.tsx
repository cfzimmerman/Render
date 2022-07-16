import { Text, View, FlatList } from "react-native";
import { Environment } from "../../../resources/project";
import NotificationItem from "./NotificationItem";

const NewNotificationsPreview = ({
  newNotificationData,
  dispatch,
  currentuser,
  navigation,
}) => {
  const localNotificationArray = newNotificationData;

  const renderItem = ({ index, item }) => {
    return (
      <View
        style={{
          marginTop: -1 * Environment.LargePadding,
          paddingHorizontal: Environment.SmallPadding,
          alignItems: "center",
        }}
      >
        <NotificationItem
          item={item}
          navigation={navigation}
          dispatch={dispatch}
          currentuser={currentuser}
        />
      </View>
    );
  };

  // TODO: Label with new notifications and how many total
  // Try out deleting notifications as we go?
  // Make notificationItem a memoized component
  // Make this preview a memoized component

  return (
    <FlatList
      style={{
        height: Environment.NotificationItemHeight,
        width: Environment.ScreenWidth,
        marginTop: Environment.StandardPadding,
      }}
      contentContainerStyle={{
        height: Environment.NotificationItemHeight,
      }}
      data={localNotificationArray}
      keyExtractor={(item) => item.notificationID}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: Environment.ScreenWidth,
        index,
        offset: Environment.ScreenWidth * index,
      })}
      snapToInterval={Environment.ScreenWidth}
      decelerationRate={"fast"}
    />
  );

  /*
      <FlatList
        data={notificationData}
        keyExtractor={(item) => item.notificationID}
        renderItem={renderItem}
      />

    const renderItem = ({ index, item }) => {
    return NotificationItem({ item, currentuser, dispatch, navigation });
  };
  🌾 Make this little bugger a memoized component!!
  */
};

export default NewNotificationsPreview;
