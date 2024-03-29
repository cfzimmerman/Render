import { View, FlatList, Animated, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { Colors, Environment } from "../../../global";
import GalleryTile from "../components/GalleryTile";
import GalleryFooter from "../components/GalleryFooter";
import GetGalleryData from "../operations/GetGalleryData";
import SelfGalleryHeader from "../components/SelfGalleryHeader";
import { RootStateType } from "../../../redux";
import { setFetchingGalleryData } from "../../../redux/profilemain";

const GalleryMain = ({ navigation }) => {
  const dispatch = useDispatch();

  const gallerydata = useSelector(
    (state: RootStateType) => state.profilemain.gallerydata
  );
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const gallerynexttoken = useSelector(
    (state: RootStateType) => state.profilemain.gallerynexttoken
  );
  const fetchingGalleryData = useSelector(
    (state: RootStateType) => state.profilemain.fetchingGalleryData
  );

  const isFocused = useIsFocused();

  if (
    isFocused === true &&
    gallerydata.length === 0 &&
    gallerynexttoken === null &&
    fetchingGalleryData === false
  ) {
    setFetchingGalleryData(true);
    GetGalleryData({
      dispatch,
      cognitosub: currentuser.cognitosub,
      nextToken: gallerynexttoken,
      userID: currentuser.id,
    });
  }

  const EndReached = () => {
    if (
      gallerydata.length > 0 &&
      gallerynexttoken != null &&
      fetchingGalleryData === false
    ) {
      setFetchingGalleryData(true);
      GetGalleryData({
        dispatch,
        cognitosub: currentuser.cognitosub,
        nextToken: gallerynexttoken,
        userID: currentuser.id,
      });
    }
  };

  const renderItem = ({ item, index }) => (
    <GalleryTile
      item={item}
      index={index}
      navigation={navigation}
      usecase="gallery"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gallerydata}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.liststyle}
        onEndReached={EndReached}
        ListFooterComponent={GalleryFooter({ length: gallerydata.length })}
        ListHeaderComponent={SelfGalleryHeader({ navigation, dispatch })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.Secondary,
    alignItems: "center",
  },
  liststyle: {
    alignItems: "center",
  },
  headerwrapper: {
    width: Environment.FullBar,
  },
  cubenavbarwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Environment.StandardPadding,
  },
});

export default GalleryMain;
