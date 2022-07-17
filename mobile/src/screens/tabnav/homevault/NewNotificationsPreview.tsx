import React, { useState, useRef } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { DispatchType } from "../../../redux/store";
import { CurrentUserType } from "../../../resources/CommonTypes";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import NotificationItem from "./NotificationItem";
import { NotificationDataItem } from "./NotificationLibrary";

const AreEqual = (
  previousProps: NewNotificationsPreviewPropsType,
  nextProps: NewNotificationsPreviewPropsType
) => {
  if (
    previousProps.newNotificationData.length ===
      nextProps.newNotificationData.length &&
    previousProps.currentuser === nextProps.currentuser
  ) {
    return true;
  }
  return false;
};

interface NewNotificationsPreviewPropsType {
  newNotificationData: NotificationDataItem[];
  dispatch: DispatchType;
  currentuser: CurrentUserType;
  navigation: any;
}

const NewNotificationsPreview = ({
  newNotificationData,
  dispatch,
  currentuser,
  navigation,
}: NewNotificationsPreviewPropsType) => {
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
      <View style={styles.notificationWrapper}>
        <NotificationItem
          item={item}
          navigation={navigation}
          dispatch={dispatch}
          currentuser={currentuser}
        />
      </View>
    );
  };

  if (newNotificationData.length === 0) {
    return null;
  } else {
    return (
      <View style={styles.displayHolder}>
        <Text style={[GlobalStyles.h4text, styles.indexLabel]}>
          New notifications ({newNotificationData.length - currentIndex - 1})
        </Text>
        <FlatList
          style={styles.flatlistStyle}
          contentContainerStyle={styles.flatlistContainerStyle}
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

const styles = StyleSheet.create({
  notificationWrapper: {
    marginTop: -1 * Environment.LargePadding,
    paddingHorizontal: Environment.SmallPadding,
    alignItems: "center",
  },
  displayHolder: {
    justifyContent: "center",
    flex: 1,
  },
  indexLabel: {
    color: Colors.Accent90,
    textAlign: "left",
    paddingHorizontal: Environment.StandardPadding,
    marginTop: Environment.LargePadding,
  },
  flatlistStyle: {
    height: Environment.NotificationItemHeight,
    width: Environment.ScreenWidth,
    marginTop: Environment.StandardPadding,
  },
  flatlistContainerStyle: {
    height: Environment.NotificationItemHeight,
  },
});

export default React.memo(NewNotificationsPreview, AreEqual);
