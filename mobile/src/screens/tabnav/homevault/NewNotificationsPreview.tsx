import React, { useState, useRef } from "react";
import { Text, View, FlatList } from "react-native";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import NotificationItem from "./NotificationItem";

const NewNotificationsPreview = ({
  newNotificationData,
  dispatch,
  currentuser,
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onviewref = useRef(({ viewableItems }) => {
    const newIndex = viewableItems[0].index;
    if (newIndex > currentIndex) {
      setCurrentIndex(newIndex);
    }
  });
  const viewconfigref = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

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
  // Make notificationItem a memoized component
  // Make this preview a memoized component?
  // Reverse direction of new content
  // Universal post condtion if post is not found or deleted!!

  if (newNotificationData.length === 0) {
    return null;
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={[
            GlobalStyles.h4text,
            {
              color: Colors.Accent90,
              textAlign: "left",
              paddingHorizontal: Environment.StandardPadding,
              marginTop: Environment.LargePadding,
            },
          ]}
        >
          New notifications ({newNotificationData.length - currentIndex - 1})
        </Text>
        <FlatList
          style={{
            height: Environment.NotificationItemHeight,
            width: Environment.ScreenWidth,
            marginTop: Environment.StandardPadding,
          }}
          contentContainerStyle={{
            height: Environment.NotificationItemHeight,
          }}
          data={newNotificationData}
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
          onViewableItemsChanged={onviewref.current}
          viewabilityConfig={viewconfigref.current}
        />
      </View>
    );
  }
};

export default NewNotificationsPreview;
