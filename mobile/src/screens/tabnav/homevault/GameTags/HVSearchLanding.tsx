import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import GetCurrentUserGameLibrary from "./GetCurrentUserGameLibrary";
import { RootStateType } from "../../../../redux/store";
import { BackArrow, FlatListFooterSpacer } from "../../../../resources/atoms";
import {
  Colors,
  Environment,
  GlobalStyles,
  Icons,
} from "../../../../resources/project";
import GetGameCoverURL from "./GetGameCoverURL";
import HVSearchGameTile from "./HVSearchGameTile";
import HVSearchHeader from "./HVSearchHeader";
import SearchLibraryGameTitle from "./SearchLibraryGameTitle";

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

const HVSearchLanding = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [gotEmptyLibraryGames, setGotEmptyLibraryGames] = useState(false);

  const libraryGamesArray = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesArray
  );
  const libraryGamesNextToken = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesNextToken
  );
  const { id: currentUserID, cognitosub: currentUserCognitoSub } = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const libraryGamesSearchResults = useSelector(
    (state: RootStateType) => state.gametags.libraryGamesSearchResults
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (libraryGamesArray === null && gotEmptyLibraryGames === false) {
      GetCurrentUserGameLibrary({ currentUserID, dispatch });
      setGotEmptyLibraryGames(true);
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

  const ChangeInput = (input: string) => {
    setSearchInput(input);
    if (input.length > 0) {
      SearchLibraryGameTitle({
        title: input,
        libraryGamesArray,
        libraryGamesNextToken,
        currentUserID,
        dispatch,
      });
    }
  };

  const CorrectData = () => {
    if (searchInput.length === 0) {
      return libraryGamesArray;
    } else if (searchInput.length > 0) {
      return libraryGamesSearchResults;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <HVSearchGameTile item={item} index={index} navigation={navigation} />
    );
  };

  const ListHeader = () => {
    return <HVSearchHeader navigation={navigation} />;
  };

  const ListFooter = () => {
    // return null;
    return <FlatListFooterSpacer />;
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
              placeholder="Search your titles"
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
      </View>
      <View>
        <FlatList
          data={CorrectData()}
          // ref={flatlistRef}
          style={styles.flatlistWrapper}
          contentContainerStyle={styles.flatlistContentContainer}
          columnWrapperStyle={styles.flatlistColumnWrapper}
          numColumns={2}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
        />
      </View>
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
    marginVertical: Environment.StandardPadding,
  },
  topHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Environment.FullBar,
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
  flatlistHolder: {
    flex: 1,
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
});

export default HVSearchLanding;
