import react, { useState } from "react";
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
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import ClearSearchArray from "./ClearSearchArray";
import GetSearchResults from "./GetSearchResults";
import SearchResultHeader from "./SearchResultHeader";
import UserTile from "./UserTile";

function ExploreLanding({ navigation }) {
  const [input, setInput] = useState("");

  const [initialPageLoad, setInitialPageLoad] = useState(true);

  const [currentCategory, setCurrentCategory] = useState("users"); // 'users' or 'games' for now

  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const nextToken = useSelector((state) => state.exploremain.nextToken);
  const searchresult = useSelector((state) => state.exploremain.searchresult);

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
      alignItems: "center",
      justifyContent: "center",
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
      height: Environment.CubeSize,
    },
    GlobalStyles.shadow,
  ];

  const GetData = ({ value }) => {
    ClearSearchArray({ dispatch });
    GetSearchResults({
      input: value,
      category: currentCategory,
      nextToken: null,
      dispatch,
      cognitosub: currentuser.cognitosub,
    });
  };

  const HandleChange = (value) => {
    setInput(value);
    GetData({ value });
  };

  if (initialPageLoad === true) {
    GetData({ value: input });
    setInitialPageLoad(false);
  }

  function CorrectTile({ item, index }) {
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
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.Secondary }]}
    >
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
          <Animated.View style={animatedStyles}>
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
          data={searchresult}
          renderItem={({ item, index }) =>
            CorrectTile({ item, index, dispatch })
          }
          numColumns={2}
          columnWrapperStyle={styles.columnwrapper}
          keyboardDismissMode="on-drag"
          onEndReachedThreshold={0.25}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={SearchResultHeader({
            length: searchresult.length,
            GetData,
            input,
            dispatch,
            nextToken,
          })}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  },
  box: {
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
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
});

export default ExploreLanding;
