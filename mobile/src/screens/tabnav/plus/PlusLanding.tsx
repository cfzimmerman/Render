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

import { setSystemmessageActive } from "../../../redux/system/messagemodal";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../resources/project";
import { PrimaryDivider } from "../../../resources/atoms";
import {
  LoadProgressModal,
  SystemmessageModal,
} from "../../../resources/molecules";

import GetContentDate from "./GetContentDate";
import UploadImage from "./UploadImage";
import UploadVideo from "./UploadVideo";
import { RootStateType } from "../../../redux/store";
import {
  addSelectedPost,
  deactivateMultiSelect,
} from "../../../redux/homevault/homevaultmain";
import GetCurrentUserGameLibrary from "../homevault/GameTags/GetCurrentUserGameLibrary";
import SearchLibraryGameTitle from "../homevault/GameTags/SearchLibraryGameTitle";
import { GameCoverTileType } from "../homevault/GameTags/GameCoverTile";
import RemovePostGameRelationship from "../homevault/GameTags/RemovePostGameRelationship";

const libraryGamesArray: GameCoverTileType[] = [
  {
    id: "2797ee70-f003-4a2d-b0bb-c34a45bb3fa0",
    title: "BioShock",
    coverID: "co2mli",
    backgroundID: "eviuwu4ipxp1qems0jzn",
  },
  {
    id: "2aacb549-5a81-43b3-af4f-738550f2e488",
    title: "Thief: Deadly Shadows",
    coverID: "co2rom",
    backgroundID: "ccvyu2a3t0ehowio0kcs",
  },
  {
    id: "3fc1cf85-4fe2-433d-ad86-4f9849c4c3a7",
    title: "Fallout",
    coverID: "co1ybn",
    backgroundID: "ar1qjx",
  },
  {
    id: "462bd003-073b-4f7b-9086-cecd9e602852",
    title: "Fallout Tactics: Brotherhood of Steel",
    coverID: "co1ybr",
    backgroundID: "gs9dc1zpmlt7ami6ret9",
  },
  {
    id: "6b29b79f-5e05-46c6-ab05-fd04f6200ce5",
    title: "Thief: The Dark Project",
    coverID: "co22ne",
    backgroundID: "wisqqkvrtl93vfocx6wn",
  },
  {
    id: "73473ab0-e84f-40e3-929b-e543cc631c76",
    title: "Fallout: New Vegas",
    coverID: "co1u60",
    backgroundID: "ar4hb",
  },
  {
    id: "74a489ab-89a6-42d2-b758-b4431db790c7",
    title: "Thief",
    coverID: "co22nc",
    backgroundID: "d0dmuf0tpw3ffne8as77",
  },
  {
    id: "bdfc3138-2f58-41a0-bcd0-5ffc1a600bee",
    title: "Fallout 3",
    coverID: "co1ycw",
    backgroundID: "ar8pz",
  },
  {
    id: "c533e831-6e8b-40cc-a6c1-9c4d29bf0464",
    title: "Fallout 2",
    coverID: "co50kv",
    backgroundID: "ar18xr",
  },
  {
    id: "e717e144-df6b-426a-8b20-e67691cc57d9",
    title: "BioShock 2",
    coverID: "co2mlj",
    backgroundID: "ntwgt1f8yluhitypt5rh",
  },
];

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
