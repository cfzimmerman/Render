import {
  View, FlatList, Animated, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { Colors, Environment, Icons } from "../../../resources/project";
import {
  BackArrow,
  ScreenTitleHeader,
  CubeSizeButton,
  CollapsingHeaderBox,
} from "../../../resources/atoms";
import GalleryFooter from "../profile/GalleryFooter";
import GalleryTile from "../profile/GalleryTile";
import GetOtherUserGalleryData from "./GetOtherUserGalleryData";
import OtherUserGalleryEmptyComponent from "./OtherUserGalleryEmptyComponent";
import OtherUserNavOptions from "./OtherUserNavOptions";

function OtherUserGalleryMain({ navigation }) {
  const dispatch = useDispatch();

  const otherusergallerydata = useSelector(
    (state) => state.otheruserprofile.otherusergallerydata,
  );
  const otheruser = useSelector((state) => state.otheruserprofile.otheruser);
  const otherusergallerynexttoken = useSelector(
    (state) => state.otheruserprofile.otherusergallerynexttoken,
  );

  const isFocused = useIsFocused();

  if (
    isFocused === true
    && otherusergallerydata.length === 0
    && otherusergallerynexttoken === null
  ) {
    GetOtherUserGalleryData({
      dispatch,
      otherusergallerydata,
      nextToken: otherusergallerynexttoken,
      otheruser,
    });
  }

  const EndReached = () => {
    if (otherusergallerydata.length > 0 && otherusergallerynexttoken != null) {
      GetOtherUserGalleryData({
        dispatch,
        otherusergallerydata,
        nextToken: otherusergallerynexttoken,
        otheruser,
      });
    }
  };

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
        renderItem={({ item, index }) => (
          <GalleryTile
            item={item}
            index={index}
            navigation={navigation}
            usecase="otherusergallery"
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => EndReached()}
        ListFooterComponent={GalleryFooter({
          length: otherusergallerydata.length,
        })}
        ListEmptyComponent={OtherUserGalleryEmptyComponent(
          otheruser.displayname,
        )}
      />
    </SafeAreaView>
  );
}

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
