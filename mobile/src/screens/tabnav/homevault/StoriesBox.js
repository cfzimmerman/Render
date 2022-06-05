import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { TransformDimensions } from "../../../resources/utilities";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

import TransitionToFullView from "../vault/TransitionToFullView";

function StoryTile({
  item, dispatch, navigation, storiesfullview, size3,
}) {
  return (
    <TouchableOpacity
      onPress={() => TransitionToFullView({
        id: item.firstpostid,
        navigation,
        data: storiesfullview,
        usecase: "stories",
      })}
    >
      <View style={[styles.tilewrapper, { width: size3 }]}>
        <View style={GlobalStyles.shadow}>
          <Image
            style={[
              styles.tileimage,
              {
                width: size3,
                height: size3,
                opacity: TileOverlay(item.viewed),
              },
            ]}
            source={{ uri: item.previewurl }}
          />
        </View>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.tiletext,
            { opacity: TileOverlay(item.viewed) },
          ]}
        >
          {item.displayname}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const TileOverlay = (viewed) => {
  if (viewed === false) {
    return 1;
  }
  return 0.5;
};

function StoriesBox({
  dispatch,
  navigation,
  storiesfullview,
  storiessectionlist,
}) {
  const size3 = TransformDimensions(
    (Environment.FullBar - Environment.StandardPadding * 4) / 3,
  );

  return (
    <FlatList
      data={storiessectionlist}
      keyExtractor={(item) => item.cognitosub}
      renderItem={({ item, index }) => (
        <StoryTile
          item={item}
          dispatch={dispatch}
          navigation={navigation}
          storiesfullview={storiesfullview}
          size3={size3}
        />
      )}
      // ListHeaderComponent={() => <StoriesHeader storiesfullview={storiesfullview} />}
      bounces={false}
      scrollEnabled={false}
      numColumns={3}
      columnWrapperStyle={styles.columnstyle}
      style={styles.flatliststyle}
    />
  );
}

const styles = StyleSheet.create({
  columnstyle: {
    padding: Environment.StandardPadding,
  },
  flatliststyle: {
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    marginTop: Environment.StandardPadding,
  },
  tilewrapper: {
    marginRight: Environment.StandardPadding,
  },
  tileimage: {
    borderRadius: Environment.StandardRadius,
  },
  tiletext: {
    color: Colors.AccentOn,
    textAlign: "center",
    marginTop: Environment.SmallPadding,
  },
});

export default StoriesBox;
