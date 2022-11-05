import { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../../redux";
import BackArrow from "../../general/components/BackArrow";
import HalfbarButton from "../../general/components/HalfbarButton";
import LoadProgressModal from "../../general/components/LoadProgressModal";
import { Colors, Environment, GlobalStyles, Icons } from "../../../../global";
import GameCoverTile from "../components/GameCoverTile";
import GetCurrentUserGameLibrary from "../operations/GetCurrentUserGameLibrary";
import SearchGameTitle from "../operations/SearchGameTitle";
import SearchLibraryGameTitle from "../operations/SearchLibraryGameTitle";
import SelectGameListHeader from "../components/SelectGameListHeader";
import SelectGameListFooter from "../components/SelectGameListFooter";
import CoverTileAction from "../operations/CoverTileAction";

const opacity = new Animated.Value(0);

const AnimateIn = (easing) => {
  opacity.setValue(0);
  Animated.timing(opacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: false,
    easing,
  }).start(({ finished }) => {
    if (!finished) {
      setTimeout(() => {
        AnimateIn(Easing.ease);
      }, 2000);
    }
  });
};

const AnimateOut = (easing) => {
  opacity.setValue(1);
  Animated.timing(opacity, {
    toValue: 0,
    duration: 200,
    useNativeDriver: false,
    easing,
  }).start();
};

// Calculates button transforming from size zero to a standard button size and back
const size = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [0, Environment.CubeSize],
});

const bar = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [
    Environment.FullBar - Environment.CubeSize,
    Environment.TextBarOption - Environment.CubeSize,
  ],
});

const SelectGame = ({ navigation, route }) => {
  type SearchModeType = "library" | "all";
  const [searchMode, setSearchMode] = useState<SearchModeType>("library");
  const [searchInput, setSearchInput] = useState("");
  const [gotEmptyAllGames, setGotEmptyAllGames] = useState(false);
  const [gotEmptyLibraryGames, setGotEmptyLibraryGames] = useState(false);

  const allGamesArray = useSelector(
    (state: RootStateType) => state.gametags.allGamesArray
  );
  const allGamesNextToken = useSelector(
    (state: RootStateType) => state.gametags.allGamesNextToken
  );
  const selectedPosts = useSelector(
    (state: RootStateType) => state.homevaultmain.selectedPosts
  );
  const currentUserID = useSelector(
    (state: RootStateType) => state.profilemain.currentuser.id
  );
  const currentUserCognitoSub = useSelector(
    (state: RootStateType) => state.profilemain.currentuser.cognitosub
  );
  const vaultPostData = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultFeedData = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const syncPreference = useSelector(
    (state: RootStateType) => state.localsync.localConfig.syncPreference
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const libraryGamesArray = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesArray
  );
  const libraryGamesNextToken = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesNextToken
  );
  const libraryGamesSearchResults = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesSearchResults
  );
  const dispatch = useDispatch();

  const flatlistRef = useRef(null);

  const selection = route.params.selection;
  const origin = route.params.origin;

  useEffect(() => {
    if (
      gotEmptyLibraryGames === false &&
      searchMode === "library" &&
      libraryGamesArray === null
    ) {
      GetCurrentUserGameLibrary({ currentUserID, dispatch });
      setGotEmptyLibraryGames(true);
    }
    if (
      searchMode === "all" &&
      gotEmptyAllGames === false &&
      allGamesArray.length === 0
    ) {
      SearchGameTitle({ title: "", dispatch, nextToken: allGamesNextToken });
      setGotEmptyAllGames(true);
    }
    /*
    if (selectedPosts.length === 0) {
      console.log("Development warning only: selectedPosts.length === 0");
    }
    */
  });

  const animatedStyles = [
    styles.xButton,
    {
      opacity,
      width: size,
      height: size,
    },
    GlobalStyles.shadow,
  ];

  const barStyles = [
    styles.searchBar,
    {
      width: bar,
    },
    GlobalStyles.shadow,
  ];

  const ChangeInput = (input: string) => {
    setSearchInput(input);
    if (searchMode === "library" && input.length > 0) {
      SearchLibraryGameTitle({
        title: input,
        libraryGamesArray,
        libraryGamesNextToken,
        currentUserID,
        dispatch,
      });
    } else if (searchMode === "all") {
      SearchGameTitle({ title: input, dispatch, nextToken: null });
    }
  };

  const CorrectData = () => {
    if (searchMode === "all") {
      return allGamesArray;
    } else if (searchMode === "library" && searchInput.length === 0) {
      return libraryGamesArray;
    } else if (searchMode === "library" && searchInput.length > 0) {
      return libraryGamesSearchResults;
    }
  };

  const ListHeader = () => {
    return SelectGameListHeader({
      item: {
        id: null,
        title: null,
        coverID: null,
        backgroundID: null,
      },
      searchMode,
      dispatch,
      navigation,
      selectedPosts,
      currentUserID,
      vaultPostData,
      vaultFeedData,
      currentUserCognitoSub,
      syncPreference,
      localLibrary,
      deleteTag: true,
    });
  };

  const renderItem = ({ item, index }) => (
    <GameCoverTile
      item={item}
      Action={() =>
        CoverTileAction({
          item,
          searchMode,
          dispatch,
          navigation,
          selectedPosts,
          currentUserID,
          vaultPostData,
          vaultFeedData,
          currentUserCognitoSub,
          syncPreference,
          localLibrary,
          deleteTag: false,
        })
      }
    />
  );

  const ListFooter = () => {
    return (
      <SelectGameListFooter
        nextToken={
          searchMode === "all" ? allGamesNextToken : libraryGamesNextToken
        }
        listData={CorrectData()}
        searchMode={searchMode}
        title={searchInput}
        dispatch={dispatch}
        currentUserID={currentUserID}
      />
    );
  };

  const LibraryButton = () => {
    if (searchMode === "all") {
      setSearchMode("library");
    } else if (searchMode === "library") {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  const AllButton = () => {
    if (searchMode === "library") {
      setSearchMode("all");
    } else if (searchMode === "all") {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.topHeaderContent}>
          <View style={styles.backArrowWrapper}>
            <BackArrow />
          </View>
          <Animated.View style={barStyles}>
            <TextInput
              placeholder="Search titles"
              textAlign="left"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={Colors.AccentPartial}
              style={[styles.inputBox, GlobalStyles.h3text, styles.inputText]}
              onChangeText={ChangeInput}
              value={searchInput}
              onFocus={() => AnimateIn(Easing.ease)}
              keyboardType="default"
            />
          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              AnimateOut(Easing.ease), Keyboard.dismiss();
            }}
          >
            {/* @ts-ignore */}
            <Animated.View style={animatedStyles}>
              <Icons.OriginalSize.X
                stroke={Colors.AccentOn}
                height={Environment.IconSize}
                width={Environment.IconSize}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonHolder}>
          <HalfbarButton
            label="Your library"
            active={searchMode === "library" ? true : false}
            Action={LibraryButton}
          />
          <HalfbarButton
            label="All games"
            active={searchMode === "all" ? true : false}
            Action={AllButton}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={CorrectData()}
          ref={flatlistRef}
          style={styles.flatlistWrapper}
          contentContainerStyle={styles.flatlistContentContainer}
          columnWrapperStyle={styles.flatlistColumnWrapper}
          numColumns={2}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={ListHeader()}
          ListFooterComponent={ListFooter()}
        />
      </View>
      <LoadProgressModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Environment.StandardPadding : 0,
    alignItems: "center",
  },
  headerWrapper: {
    width: Environment.FullBar,
  },
  topHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Environment.FullBar,
    marginVertical: Environment.SmallPadding,
  },
  backArrowWrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  searchBar: {
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  xButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  inputBox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
  },
  inputText: {
    color: Colors.AccentOn,
  },
  flatlistWrapper: {
    flex: 1,
  },
  flatlistContentContainer: {
    alignItems: "center",
  },
  flatlistColumnWrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    marginBottom: Environment.StandardPadding,
  },
  buttonHolder: {
    width: Environment.FullBar,
    marginTop: Environment.SmallPadding,
    marginBottom: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlistHolder: {
    flex: 1,
  },
});

export default SelectGame;
