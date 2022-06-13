import React, { useState } from "react";
import { View, FlatList, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { Colors, Environment } from "../../../resources/project";
import GalleryFooter from "../profile/GalleryFooter";
import GalleryTile from "../profile/GalleryTile";
import GetOtherUserGalleryData from "./GetOtherUserGalleryData";
import OtherUserGalleryEmptyComponent from "./OtherUserGalleryEmptyComponent";
import OtherUserNavOptions from "./OtherUserNavOptions";
import { setFetchingOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";

async function SetGotDataDelay({ setGotOtherUserGalleryData }) {
  // We're delaying this to give the data a chance to fill the array. If there's no data in the Flatlist array after 0.5 seconds, the empty list display appears
  setTimeout(() => {
    setGotOtherUserGalleryData(true);
  }, "500");
}

const OtherUserGalleryMain = ({ navigation }) => {
  const [gotOtherUserGalleryData, setGotOtherUserGalleryData] = useState(false);

  const dispatch = useDispatch();

  const otherusergallerydata = useSelector(
    (state) => state.otheruserprofile.otherusergallerydata
  );
  const otheruser = useSelector((state) => state.otheruserprofile.otheruser);
  const otherusergallerynexttoken = useSelector(
    (state) => state.otheruserprofile.otherusergallerynexttoken
  );
  const fetchingotherusergallerydata = useSelector(
    (state) => state.otheruserprofile.fetchingotherusergallerydata
  );

  const isFocused = useIsFocused();

  if (
    isFocused === true &&
    otherusergallerydata.length === 0 &&
    otherusergallerynexttoken === null &&
    gotOtherUserGalleryData === false
  ) {
    GetOtherUserGalleryData({
      dispatch,
      otherusergallerydata,
      nextToken: otherusergallerynexttoken,
      otheruser,
    });
    // setGotOtherUserGalleryData(true);
    SetGotDataDelay({ setGotOtherUserGalleryData });
  }

  const EndReached = () => {
    if (otherusergallerydata.length > 0 && otherusergallerynexttoken != null) {
      dispatch(setFetchingOtherUserGalleryData(true));
      GetOtherUserGalleryData({
        dispatch,
        otherusergallerydata,
        nextToken: otherusergallerynexttoken,
        otheruser,
      });
    }
  };

  const renderItem = ({ item, index }) => (
    <GalleryTile
      item={item}
      index={index}
      navigation={navigation}
      usecase="otherusergallery"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerbox}>
        <OtherUserNavOptions
          navigation={navigation}
          currentScreen="OtherUserGalleryMain"
        />
      </View>

      <FlatList
        data={otherusergallerydata}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={EndReached}
        ListFooterComponent={GalleryFooter({
          length: otherusergallerydata.length,
        })}
        ListEmptyComponent={() => (
          <OtherUserGalleryEmptyComponent
            displayname={otheruser.displayname}
            fetchingotherusergallerydata={fetchingotherusergallerydata}
            gotOtherUserGalleryData={gotOtherUserGalleryData}
            otherusergallerydata={otherusergallerydata}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
  },
  headerbox: {
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headertextcontainer: {
    justifyContent: "center",
  },
  navoptions: {
    flexDirection: "row",
  },
  counterweight: {
    overflow: "hidden",
  },
});

export default OtherUserGalleryMain;
