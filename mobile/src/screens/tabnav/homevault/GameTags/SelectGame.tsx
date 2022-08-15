import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { GetGamesQuery } from "../../../../API";
import { RootStateType } from "../../../../redux/store";
import { BackArrow, HalfbarButton } from "../../../../resources/atoms";
import {
  Colors,
  Environment,
  GlobalStyles,
  Icons,
} from "../../../../resources/project";
import GameCoverTile, { GameCoverTileType } from "./GameCoverTile";
import GetGameCoverURL from "./GetGameCoverURL";
import SearchGameTitle from "./SearchGameTitle";
import SelectGameListFooter from "./SelectGameListFooter";

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
  const [searchMode, setSearchMode] = useState<SearchModeType>("all");
  const [searchInput, setSearchInput] = useState("");
  const [gotEmptyAllGames, setGotEmptyAllGames] = useState(false);

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

  const dispatch = useDispatch();

  const selection = route.params.selection;
  const origin = route.params.origin;

  useEffect(() => {
    if (gotEmptyAllGames === false && allGamesArray.length === 0) {
      SearchGameTitle({ title: "", dispatch });
      setGotEmptyAllGames(true);
    }
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

  const renderItem = ({ item, index }) => (
    <GameCoverTile
      item={item}
      searchMode={searchMode}
      dispatch={dispatch}
      navigation={navigation}
      selection={selection}
      selectedPosts={selectedPosts}
      currentUserID={currentUserID}
      origin={origin}
    />
  );

  const ChangeInput = (input: string) => {
    setSearchInput(input);
    SearchGameTitle({ title: input, dispatch });
  };

  const CorrectData = () => {
    if (searchMode === "all") {
      return allGamesArray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerWrapper]}>
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
            Action={() => console.log("Your games")}
          />
          <HalfbarButton
            label="All games"
            active={searchMode === "all" ? true : false}
            Action={() => console.log("All games")}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={CorrectData()}
          style={styles.flatlistWrapper}
          contentContainerStyle={styles.flatlistContentContainer}
          columnWrapperStyle={styles.flatlistColumnWrapper}
          numColumns={2}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          ListFooterComponent={() => (
            <SelectGameListFooter
              nextToken={
                searchMode === "all" ? allGamesNextToken : "changeThis!!"
              }
              listData={CorrectData()}
              searchMode={searchMode}
              title={searchInput}
              dispatch={dispatch}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  columnwrapper: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
  },
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
  buttonHolder: {
    width: Environment.FullBar,
    marginTop: Environment.SmallPadding,
    marginBottom: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
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
  xButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  searchBar: {
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
});

export default SelectGame;
