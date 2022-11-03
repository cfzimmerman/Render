import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { setSystemmessageActive } from "../../../redux/shared/messagemodal";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../global";
import PrimaryDivider from "../../shared/general/components/PrimaryDivider";
import LoadProgressModal from "../../shared/general/components/LoadProgressModal";
import SystemmessageModal from "../../shared/general/components/SystemmessageModal";

import GetContentDate from "../operations/GetContentDate";
import UploadImage from "../operations/UploadImage";
import UploadVideo from "../operations/UploadVideo";
import { RootStateType } from "../../../redux";

const HalfbarIconBox = ({ Icon, header, description, Action }) => {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View style={[GlobalStyles.shadow, styles.halfbarboxwrapper]}>
        <Icon
          stroke={Colors.AccentOn}
          height={Environment.IconSize * 3}
          width={Environment.IconSize * 3}
        />
        <View style={styles.halfbartextwrapper}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h4text,
              styles.halfbarheadertext,
            ]}
          >
            {header}
          </Text>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p2text,
              styles.halfbardescriptiontext,
            ]}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TodaysDate = () => {
  const isodate = new Date().toISOString();
  return isodate;
};

const PlusLanding = ({ navigation }) => {
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const gotaddedusersfilter = useSelector(
    (state: RootStateType) => state.homemain.gotaddedusersfilter
  );

  const uploadcanceled = useSelector(
    (state: RootStateType) => state.loadprogressmessage.uploadcanceled
  );

  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const multiSelectActive = useSelector(
    (state: RootStateType) => state.homevaultmain.multiSelectActive
  );

  const dispatch = useDispatch();

  if (
    typeof currentuser.cognitosub === "undefined" ||
    currentuser.fullyauthenticated === false
  ) {
    return (
      <SafeAreaView style={styles.emptypagewrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("OnboardingLanding")}
        >
          <View>
            <Text style={[GlobalStyles.h4text, styles.emptypagemessage]}>
              Log in to upload content.
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  interface SelectContentResultType {
    cancelled: boolean;
    type?: "image" | "video";
    uri?: string | null;
    width?: number | null;
    height?: number | null;
    duration?: number | null;
  }
  async function SelectContentFromDevice() {
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      exif: true,
      // videoMaxDuration: 120,
    })) as SelectContentResultType;

    if (
      !result.cancelled &&
      result.type === "video" &&
      result.duration > 120000
    ) {
      const userdialogue = {
        header: "😨",
        title: "Unsupported upload",
        description: `Video uploads must be 120 seconds or fewer. This is ${Math.round(
          result.duration / 1000
        ).toString()} seconds.`,
      };

      dispatch(setSystemmessageActive(userdialogue));
      return;
    }

    if (!result.cancelled && result.type === "image") {
      const date = GetContentDate(result);
      UploadImage({
        dispatch,
        uri: result.uri,
        height: result.height,
        width: result.width,
        type: result.type,
        date,
        currentuser,
        vaultpostdata,
        vaultfeeddata,
        vaultnexttoken,
        gotaddedusersfilter,
        multiSelectActive,
      });
    } else if (!result.cancelled && result.type === "video") {
      const date = TodaysDate();
      UploadVideo({
        dispatch,
        uri: result.uri,
        height: result.height,
        width: result.width,
        type: result.type,
        duration: result.duration,
        date,
        currentuser,
        vaultpostdata,
        vaultfeeddata,
        vaultnexttoken,
        gotaddedusersfilter,
        multiSelectActive,
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollviewstyle}
        contentContainerStyle={styles.scrollviewcontainerstyle}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionwrapper}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h2text,
              styles.sectionheader,
            ]}
          >
            {" "}
            Upload{" "}
          </Text>
          <PrimaryDivider />
          <View style={styles.cardrow}>
            <HalfbarIconBox
              Icon={Icons.OriginalSize.Phone}
              header="Local device"
              description="Best for content on your phone."
              Action={() => SelectContentFromDevice()}
            />
            <HalfbarIconBox
              Icon={Icons.OriginalSize.Web}
              header="Browser"
              description="Best for content on your PC."
              Action={() => navigation.navigate("WebUploadPreview")}
            />
          </View>
        </View>

        <View style={styles.sectionwrapper}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h2text,
              styles.sectionheader,
            ]}
          >
            {" "}
            Post{" "}
          </Text>
          <PrimaryDivider />
          <View style={styles.cardrow}>
            <HalfbarIconBox
              Icon={Icons.OriginalSize.VaultIcon}
              header="From Vault"
              description="Share a memory from your Vault."
              Action={() => {
                navigation.navigate("SelectFromVault");
              }}
            />
          </View>
        </View>
      </ScrollView>
      <SystemmessageModal />
      <LoadProgressModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.Secondary,
    paddingTop: Environment.StandardPadding,
  },
  scrollviewstyle: {
    flex: 1,
  },
  scrollviewcontainerstyle: {
    alignItems: "center",
  },
  sectionwrapper: {
    width: Environment.FullBar,
    marginBottom: Environment.LargePadding,
  },
  sectionheader: {
    color: Colors.AccentOn,
    textAlign: "left",
  },
  cardrow: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  emptypagewrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  emptypagemessage: {
    color: Colors.AccentOn,
  },
  halfbarboxwrapper: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  halfbartextwrapper: {
    marginTop: Environment.StandardPadding,
  },
  halfbarheadertext: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  halfbardescriptiontext: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
});

export default PlusLanding;
