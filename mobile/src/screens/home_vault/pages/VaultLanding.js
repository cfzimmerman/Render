import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SectionGrid } from "react-native-super-grid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { GlobalStyles, Environment, Colors, Icons } from "../../../global";
import {
  PageHeaderWithOptions,
  SearchbarTouchable,
} from "../../../resources/molecules";
import GetVaultData from "../operations/GetVaultData";
import SectionGridEmptyComponent from "../components/SectionGridEmptyComponent";
import SectionGridFooter from "../components/SectionGridFooter";
import VaultSectionHeader from "../components/VaultSectionHeader";
import VaultSectionItem from "../components/VaultSectionItem";

function VaultLanding({ navigation }) {
  // Empty vault, add first post
  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const vaultpostdata = useSelector(
    (state) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state) => state.vaultpostdata.vaultfeeddata
  );
  const nextToken = useSelector((state) => state.vaultpostdata.nextToken);

  const dispatch = useDispatch();

  if (
    typeof currentuser.cognitosub === "undefined" ||
    currentuser.fullyauthenticated === false
  ) {
    return (
      <SafeAreaView style={styles.unauthenticateduserwrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("OnboardingLanding")}
        >
          <View>
            <Text
              style={[GlobalStyles.h4text, styles.unauthenticatedusermessage]}
            >
              Log in to access Vault
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  const scrollYValue = new Animated.Value(0);

  const clampedscroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      new Animated.Value(0)
    ),
    0,
    50
  );

  if (vaultpostdata.length === 0 && nextToken === null) {
    GetVaultData({
      dispatch,
      vaultpostdata,
      cognitosub: currentuser.cognitosub,
      nextToken,
    }); // .then((result) => console.log(result))
  }

  const EndReached = () => {
    if (vaultpostdata.length > 0 && nextToken != null) {
      GetVaultData({
        dispatch,
        vaultpostdata,
        cognitosub: currentuser.cognitosub,
        nextToken,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeaderWithOptions
        title="Vault"
        icon={Icons.OriginalSize.List}
        dispatch={dispatch}
      />
      <SearchbarTouchable
        navigation={navigation}
        destination="VaultLanding"
        clampedscroll={clampedscroll}
      />
      <View>
        <SectionGrid
          itemDimension={Environment.HalfBar}
          // extraData={refreshfeed}
          fixed
          spacing={0}
          stickySectionHeadersEnabled={false}
          style={styles.sectiongridstyle}
          additionalRowStyle={styles.sectiongridrowstyle}
          sections={vaultpostdata}
          renderItem={({ item }) => (
            <VaultSectionItem
              item={item}
              navigation={navigation}
              vaultfeeddata={vaultfeeddata}
            />
          )}
          renderSectionHeader={({ section }) => (
            <VaultSectionHeader
              section={section}
              navigation={navigation}
              vaultfeeddata={vaultfeeddata}
            />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: false },
            () => {}
          )}
          onEndReachedThreshold={1}
          onEndReached={() => EndReached()}
          ListFooterComponent={SectionGridFooter({
            length: vaultfeeddata.length,
          })}
          ListEmptyComponent={SectionGridEmptyComponent({
            navigation,
            firstvaultupload: currentuser.firstvaultupload,
          })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    width: Environment.ScreenWidth,
  },
  sectiongridstyle: {
    flex: 1,
    width: Environment.ScreenWidth,
  },
  sectiongridrowstyle: {
    marginVertical: Environment.SmallPadding,
  },
  unauthenticateduserwrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  unauthenticatedusermessage: {
    color: Colors.AccentOn,
  },
});

export default VaultLanding;
