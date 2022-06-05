import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { TransformDimensions } from "../../../resources/utilities";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import { HalfbarButton, PrimaryDivider } from "../../../resources/atoms";

import ChangeSelectedFeed from "./ChangeSelectedFeed";
import OnboardingHomeTab from "./OnboardingHomeTab";
import TransitionToFullView from "../vault/TransitionToFullView";
import VaultPreview from "./VaultPreview";

const TileOverlay = (viewed) => {
  if (viewed === false) {
    return 1;
  }
  return 0.5;
};

/*
// Taken out for style purposes. Reinstate if deemed appropriate.
const StoriesHeader = ({ storiesfullview }) => {
    if (storiesfullview.length === 0) {
        return (null)
    } else {
        return (
            <View style={{ paddingVertical: Environment.StandardPadding, }}>
                <Text style={[ GlobalStyles.shadow, GlobalStyles.h4text, { color: Colors.AccentOn, textAlign: 'left' }]}>New posts</Text>
            </View>
        )
    }
}
*/

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

const IsActive = ({ selectedfeed, buttonid }) => {
  if (selectedfeed === buttonid) {
    return true;
  }
  return false;
};

function FeedSelector({ dispatch, selectedfeed }) {
  return (
    <View style={styles.feedselectorbox}>
      <HalfbarButton
        Action={() => ChangeSelectedFeed({ dispatch, selection: "addedfeed" })}
        label="Added"
        active={IsActive({ buttonid: "addedfeed", selectedfeed })}
      />
      <HalfbarButton
        Action={() => ChangeSelectedFeed({ dispatch, selection: "publicfeed" })}
        label="All"
        active={IsActive({ buttonid: "publicfeed", selectedfeed })}
      />
    </View>
  );
}

function HomeListHeader({
  dispatch,
  currentuser,
  onboardingstatus,
  navigation,
  vaultheader,
  storiessectionlist,
  storiesfullview,
  selectedfeed,
}) {
  const size3 = TransformDimensions(
    (Environment.FullBar - Environment.StandardPadding * 4) / 3,
  );
  return (
    <View style={styles.container}>
      <OnboardingHomeTab
        dispatch={dispatch}
        currentuser={currentuser}
        onboardingstatus={onboardingstatus}
        navigation={navigation}
      />

      <VaultPreview vaultheader={vaultheader} navigation={navigation} />

      {/* <StoriesHeader storiesfullview={storiesfullview} /> */}
      <PrimaryDivider />

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
        ListFooterComponent={() => (
          <FeedSelector selectedfeed={selectedfeed} dispatch={dispatch} />
        )}
        bounces={false}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={styles.columnstyle}
        style={styles.flatliststyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
  },
  columnstyle: {
    padding: Environment.StandardPadding,
  },
  flatliststyle: {
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
  },
  feedselectorbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.Secondary,
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

export default HomeListHeader;
