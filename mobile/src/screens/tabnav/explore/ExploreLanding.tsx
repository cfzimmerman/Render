import { useScrollToTop } from "@react-navigation/native";
import react, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { clearUserSearchResult } from "../../../redux/explore/exploremain";
import { RootStateType } from "../../../redux/store";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import ExploreListFooter from "./ExploreListFooter";
import GetUserSearchResults from "./GetUserSearchResults";
import SearchResultHeader from "./SearchResultHeader";
import UserTile from "./UserTile";

export type ExploreSearchCategory = "users" | "games";

const ExploreLanding = ({ navigation }) => {
  const [input, setInput] = useState("");

  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const [currentCategory, setCurrentCategory] =
    useState<ExploreSearchCategory>("users");

  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const nextToken = useSelector(
    (state: RootStateType) => state.exploremain.nextToken
  );
  const userSearchResult = useSelector(
    (state: RootStateType) => state.exploremain.userSearchResult
  );

  const flatListRef = useRef();

  useScrollToTop(flatListRef);

  const opacity = new Animated.Value(0);

  const animatein = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      easing,
    }).start(({ finished }) => {
      if (!finished) {
        setTimeout(() => {
          animatein(Easing.ease);
        }, 2000);
      }
    });
  };

  // Obscures button to confirm email
  const animateout = (easing) => {
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

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
    GlobalStyles.shadow,
  ];

  const bar = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [Environment.FullBar, Environment.TextBarOption],
  });

  const barStyles = [
    styles.bar,
    {
      width: bar,
    },
    GlobalStyles.shadow,
  ];

  const GetData = ({ value }) => {
    if (currentCategory === "users") {
      dispatch(clearUserSearchResult());
      GetUserSearchResults({
        input: value,
        category: currentCategory,
        nextToken: null,
        dispatch,
        cognitosub: currentuser.cognitosub,
      });
    }
  };

  const HandleChange = (value: string) => {
    setInput(value);
    GetData({ value });
  };

  if (initialPageLoad === true) {
    GetData({ value: input });
    setInitialPageLoad(false);
  }

  const renderItem = ({ item, index }) => {
    if (currentCategory === "users") {
      return (
        <UserTile
          item={item}
          index={index}
          navigation={navigation}
          dispatch={dispatch}
          cognitosub={currentuser.cognitosub}
          currentuser={currentuser}
        />
      );
    }
  };

  const ListFooter = () => (
    <ExploreListFooter
      input={input}
      category={currentCategory}
      searchResultsLength={userSearchResult.length}
      nextToken={nextToken}
      cognitosub={currentuser.cognitosub}
      dispatch={dispatch}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Animated.View style={barStyles}>
          <TextInput
            placeholder="Search"
            textAlign="left"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={Colors.AccentPartial}
            style={[styles.inputbox, GlobalStyles.h3text, styles.inputtext]}
            onChangeText={HandleChange}
            value={input}
            onFocus={() => animatein(Easing.ease)}
            keyboardType="default"
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            animateout(Easing.ease), Keyboard.dismiss();
          }}
        >
          <Animated.View
            // @ts-ignore
            style={animatedStyles}
          >
            <Icons.OriginalSize.X
              stroke={Colors.AccentOn}
              height={Environment.IconSize}
              width={Environment.IconSize}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={userSearchResult}
          ref={flatListRef}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnwrapper}
          keyboardDismissMode="on-drag"
          onEndReachedThreshold={0.25}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.Secondary,
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Environment.FullBar,
    marginVertical: Environment.StandardPadding,
  },
  bar: {
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    height: Environment.CubeSize,
  },
  box: {
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  columnwrapper: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
  },
  footer: {
    height: Environment.HalfBar,
  },
  inputbox: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
  },
  inputtext: {
    color: Colors.AccentOn,
  },
  contentContainer: {
    alignItems: "center",
  },
});

export default ExploreLanding;
