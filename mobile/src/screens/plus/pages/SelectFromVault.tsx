import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { setFetchingData } from "../../../redux/shared/vaultpostdata";
import { GlobalStyles, Environment, Colors } from "../../../global";
import PrimaryDivider from "../../shared/general/components/PrimaryDivider";
import BackArrow from "../../shared/general/components/BackArrow";
import SystemMessageModal from "../../shared/general/components/SystemMessageModal";
import GetVaultData from "../../home_vault/operations/GetVaultData";
import { RootStateType } from "../../../redux";

const tilesize = (Environment.FullBar - Environment.StandardPadding * 3) / 4;

function Tile({ item, navigation, index }) {
  const Action = () => {
    navigation.navigate("EditPost", { index, origin: "plus" });
  };

  if (item.publicpost === true) {
    if (item.contenttype === "video") {
      return (
        <View style={[GlobalStyles.shadow, styles.tilewrapper]}>
          <Image
            style={styles.tilepostedimage}
            source={{ uri: item.thumbnailurl }}
          />
        </View>
      );
    }
    return (
      <View style={[GlobalStyles.shadow, styles.tilewrapper]}>
        <Image
          style={styles.tilepostedimage}
          source={{ uri: item.signedurl }}
        />
      </View>
    );
  }
  if (item.contenttype === "video") {
    return (
      <TouchableOpacity
        style={[GlobalStyles.shadow, styles.tilewrapper]}
        onPress={() => Action()}
      >
        <Image
          style={styles.tileunpostedimage}
          source={{ uri: item.thumbnailurl }}
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.tilewrapper]}
      onPress={() => Action()}
    >
      <Image
        style={styles.tileunpostedimage}
        source={{ uri: item.signedurl }}
      />
    </TouchableOpacity>
  );
}

const SelectFromVault = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const fetchingdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.fetchingdata
  );
  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );

  const isFocused = useIsFocused();

  if (
    isFocused === true &&
    vaultpostdata.length === 0 &&
    vaultnexttoken === null
  ) {
    GetVaultData({
      dispatch,
      vaultpostdata,
      limit: 100,
      cognitosub: currentuser.cognitosub,
      nextToken: vaultnexttoken,
      localLibrary,
      syncPreference: localConfig.syncPreference,
    }); // .then((result) => console.log(result))
  }

  const EndReached = () => {
    if (
      vaultpostdata.length > 0 &&
      vaultnexttoken != null &&
      fetchingdata === false
    ) {
      dispatch(setFetchingData(true));
      GetVaultData({
        dispatch,
        vaultpostdata,
        cognitosub: currentuser.cognitosub,
        nextToken: vaultnexttoken,
        limit: 100,
        localLibrary,
        syncPreference: localConfig.syncPreference,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerwrapper}>
        <BackArrow />
        <View style={styles.titlewrapper}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h2text,
              styles.title,
            ]}
          >
            {" "}
            Select{" "}
          </Text>
        </View>
      </View>
      <PrimaryDivider />
      <FlatList
        data={vaultfeeddata}
        renderItem={({ item, index }) => (
          <Tile item={item} index={index} navigation={navigation} />
        )}
        showsHorizontalScrollIndicator
        numColumns={4}
        columnWrapperStyle={styles.flatlistcolumn}
        onEndReachedThreshold={0.5}
        onEndReached={() => EndReached()}
      />

      <SystemMessageModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerwrapper: {
    flexDirection: "row",
    width: Environment.FullBar,
  },
  titlewrapper: {
    color: Colors.AccentOn,
    textAlign: "left",
    width: Environment.FullBar,
    justifyContent: "center",
  },
  title: {
    color: Colors.AccentOn,
    textAlign: "left",
    width: Environment.FullBar,
  },
  flatlistcolumn: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
  },
  tilewrapper: {
    marginRight: Environment.StandardPadding,
  },
  tilepostedimage: {
    height: tilesize,
    width: tilesize,
    borderRadius: Environment.StandardRadius,
    opacity: 0.25,
  },
  tileunpostedimage: {
    height: tilesize,
    width: tilesize,
    borderRadius: Environment.StandardRadius,
  },
});

export default SelectFromVault;
