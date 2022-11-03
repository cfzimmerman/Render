import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { GlobalStyles, Environment, Colors, Icons } from "../../../global";
import { RootStateType } from "../../../redux";
import BackArrow from "../../shared/general/components/BackArrow";
import PrimaryDivider from "../../shared/general/components/PrimaryDivider";
import LSGetConfig from "../../shared/local_sync/operations/LSGetConfig";
import LSChangeConfig from "../../shared/local_sync/operations/LSChangeConfig";
import { LocalConfigType } from "../../../redux/shared/localsync";
import {
  ButtonMessagePropTypes,
  setButtonMessageActive,
  setButtonMessageInactive,
} from "../../../redux/shared/messagemodal";
import ButtonMessageModal from "../../shared/general/components/ButtonMessageModal";
import LSClearStorage from "../../shared/local_sync/operations/LSClearStorage";

// Width of 3 buttons in a fullbar row separated by standard padding
const TriBoxSize = (Environment.FullBar - Environment.LargePadding) / 3;

interface TriButtonColorsReturnType {
  background: string;
  text: string;
}

const categoryDescriptions = {
  all: {
    description:
      "All photos and videos in your Vault are cached to this device. They are retrieved locally and verified against the cloud when the app is opened.",
    pros: "Fastest Vault load times, minimized network speed requirements.",
    cons: "Uses the most device storage.",
    recommended:
      "Users with plenty of device storage who want the most optimized Vault experience.",
  },
  partial: {
    description:
      "Vault photos and thumbnails are cached to this device. Videos are not. Photos are retrieved locally and verified against the cloud when the app is opened. Videos are loaded from the cloud when opened.",
    pros: "Fast Vault loading, major network bandwidth only needed to view Vault videos.",
    cons: "Still uses more device storage than the base app, although significantly less than Full sync (for users with videos).",
    recommended: "Most users.",
  },
  none: {
    description:
      "No Vault content is cached to this device. All photos and videos are retrieved from the cloud when the app is opened.",
    pros: "Requires no extra device storage beyond the base app bundle.",
    cons: "Slowest Vault loading, highest network usage.",
    recommended: "Users for whom device storage is a substantial concern.",
  },
};

const ParagraphText = ({ text }) => {
  return (
    <Text
      style={[
        GlobalStyles.irregularshadow,
        GlobalStyles.p1text,
        styles.paragraphtext,
      ]}
    >
      {text}
    </Text>
  );
};

const BoldText = ({ text }) => {
  return (
    <Text
      style={[
        GlobalStyles.irregularshadow,
        GlobalStyles.h4text,
        styles.boldtext,
      ]}
    >
      {text}
    </Text>
  );
};

const SummaryText = ({ title, description }) => {
  return (
    <Text>
      <BoldText text={title} />
      <ParagraphText text={description} />
    </Text>
  );
};

const GetDescription = ({ selectedMode }) => {
  if (selectedMode === "All") {
    return categoryDescriptions.all.description;
  } else if (selectedMode === "Partial") {
    return categoryDescriptions.partial.description;
  } else if (selectedMode === "None") {
    return categoryDescriptions.none.description;
  }
};

const GetPros = ({ selectedMode }) => {
  if (selectedMode === "All") {
    return categoryDescriptions.all.pros;
  } else if (selectedMode === "Partial") {
    return categoryDescriptions.partial.pros;
  } else if (selectedMode === "None") {
    return categoryDescriptions.none.pros;
  }
};

const GetCons = ({ selectedMode }) => {
  if (selectedMode === "All") {
    return categoryDescriptions.all.cons;
  } else if (selectedMode === "Partial") {
    return categoryDescriptions.partial.cons;
  } else if (selectedMode === "None") {
    return categoryDescriptions.none.cons;
  }
};

const GetRecommended = ({ selectedMode }) => {
  if (selectedMode === "All") {
    return categoryDescriptions.all.recommended;
  } else if (selectedMode === "Partial") {
    return categoryDescriptions.partial.recommended;
  } else if (selectedMode === "None") {
    return categoryDescriptions.none.recommended;
  }
};

const CategoryDescription = ({ selectedMode }) => {
  if (selectedMode === null) {
    return null;
  }
  return (
    <View style={[GlobalStyles.shadow, styles.descriptionwrapper]}>
      <ParagraphText text={GetDescription({ selectedMode })} />
      <Text>{"\n"}</Text>
      <SummaryText title={"Pros: "} description={GetPros({ selectedMode })} />
      <SummaryText title={"\nCons: "} description={GetCons({ selectedMode })} />
      <SummaryText
        title={"\nRecommended for: "}
        description={GetRecommended({ selectedMode })}
      />
    </View>
  );
};

const FullbarButton = ({
  title,
  textColor,
  backgroundColor,
  Action,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={() => Action()} disabled={disabled}>
      {/* MODAL message: Clears all locally-synced data. Does not affect cloud-saved content or cached content on other devices. */}
      <View
        style={[
          GlobalStyles.shadow,
          {
            width: Environment.FullBar,
            height: Environment.CubeSize,
            backgroundColor: backgroundColor,
            borderRadius: Environment.StandardRadius,
            // marginBottom: Environment.StandardPadding,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h3text,
            { color: textColor },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TriButtonColors = ({
  category,
  selectedMode,
}): TriButtonColorsReturnType => {
  if (selectedMode === category) {
    const activeColors = {
      background: Colors.AccentOn,
      text: Colors.Primary,
    };
    return activeColors;
  }
  const inactiveColors = {
    background: Colors.Primary,
    text: Colors.AccentOn,
  };
  return inactiveColors;
};

const TriButtonIcon = ({ syncPreference, category, palette }) => {
  if (syncPreference === category) {
    return (
      <View style={styles.tbiconwrapper}>
        <Icons.OriginalSize.Checkmark
          height={Environment.IconSize * 0.9}
          width={Environment.IconSize * 0.9}
          stroke={palette.text}
          style={[GlobalStyles.irregularshadow, styles.tbicon]}
        />
      </View>
    );
  } else {
    return null;
  }
};

interface TriButtonPropsType {
  category: "All" | "Partial" | "None";
  syncPreference: null | "All" | "Partial" | "None";
  selectedMode: null | "All" | "Partial" | "None";
  Action: Function;
}

const TriButton = ({
  category,
  syncPreference,
  selectedMode,
  Action,
}: TriButtonPropsType) => {
  const palette = TriButtonColors({ category, selectedMode });

  return (
    <TouchableOpacity onPress={() => Action()}>
      <View
        style={[
          GlobalStyles.shadow,
          styles.tbwrapper,
          { backgroundColor: palette.background },
        ]}
      >
        <TriButtonIcon
          syncPreference={syncPreference}
          category={category}
          palette={palette}
        />
        <Text
          style={[
            GlobalStyles.h3text,
            GlobalStyles.irregularshadow,
            { color: palette.text },
          ]}
        >
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ChangeSyncButton = ({ selectedMode, syncPreference, dispatch }) => {
  const newLocalConfig: LocalConfigType = {
    syncPreference: selectedMode,
  };
  if (selectedMode === syncPreference) {
    return (
      <FullbarButton
        backgroundColor={Colors.Primary}
        textColor={Colors.AccentOn}
        Action={() =>
          console.log(
            "Okaay hackerman. Nice try, but no. Here's some ice cream 🍦"
          )
        }
        title={"Active"}
        disabled={true}
      />
    );
  } else {
    return (
      <FullbarButton
        backgroundColor={Colors.AccentPartial}
        textColor={Colors.AccentOn}
        Action={() => LSChangeConfig({ dispatch, newLocalConfig })}
        title={"Tap to activate"}
        disabled={false}
      />
    );
  }
};

// Address for LocalSync directory
const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

async function GetStorageInfo({
  setAvailableStorage,
  setTotalStorage,
  setRenderLocalStorage,
}) {
  try {
    const availableBytes = await FileSystem.getFreeDiskStorageAsync();
    const totalBytes = await FileSystem.getTotalDiskCapacityAsync();
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);

    setAvailableStorage(availableBytes);
    setTotalStorage(totalBytes);
    if (directoryExists.exists === true) {
      setRenderLocalStorage(directoryExists.size);
    }
  } catch (error) {
    console.log("Error");
  }
}

const StorageIndicator = ({
  totalStorage,
  availableStorage,
  renderLocalStorage,
  storagesizeinbytes,
}) => {
  if (typeof totalStorage != "number" || typeof availableStorage != "number") {
    return null;
  } else {
    const fractionUsed = Math.round(
      100 - (availableStorage / totalStorage) * 100
    );
    const usedStorage = totalStorage - availableStorage;
    const modifiedFullBar = Environment.FullBar - Environment.LargePadding;
    const percentBarWidth = Math.round(
      (usedStorage * modifiedFullBar) / totalStorage
    );
    return (
      <View style={[GlobalStyles.shadow, styles.storagewrapper]}>
        <View>
          <Text>
            <BoldText text={"Device total: "} />
            <ParagraphText
              text={Math.round(totalStorage * 0.000000001).toString() + " GB"}
            />
          </Text>
          <Text>
            <BoldText text={"Device available: "} />
            <ParagraphText
              text={
                Math.round(availableStorage * 0.000000001).toString() + " GB"
              }
            />
          </Text>
          <Text>
            <BoldText text={"Render cache: "} />
            <ParagraphText
              text={
                (renderLocalStorage * 0.000000001).toFixed(3).toString() + " GB"
              }
            />
          </Text>
          <Text>
            <BoldText text={"Render cloud: "} />
            <ParagraphText
              text={
                (storagesizeinbytes * 0.000000001).toFixed(3).toString() + " GB"
              }
            />
          </Text>
        </View>
        <View>
          <View
            style={[
              GlobalStyles.shadow,
              styles.storagebarwrapper,
              { width: modifiedFullBar },
            ]}
          >
            <View
              style={[
                GlobalStyles.shadow,
                styles.storagebar,
                { width: percentBarWidth },
              ]}
            >
              <Text
                style={[
                  GlobalStyles.h3text,
                  GlobalStyles.shadow,
                  styles.storagelabel,
                ]}
              >
                {fractionUsed + "%"}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              GlobalStyles.p2text,
              {
                color: Colors.AccentPartial,
                textAlign: "right",
                marginTop: Environment.SmallPadding,
              },
            ]}
          >
            Device storage used
          </Text>
        </View>
      </View>
    );
  }
};

const LocalSyncSettings = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  // availableStorage: null | number of bytes
  const [availableStorage, setAvailableStorage] = useState(null);
  // totalStorage: null | number of bytes
  const [gotStorageInfo, setGotStorageInfo] = useState(false);
  const [totalStorage, setTotalStorage] = useState(null);
  const [renderLocalStorage, setRenderLocalStorage] = useState(0);

  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const pfpsignedurl = useSelector(
    (state: RootStateType) => state.profilemain.pfpsignedurl
  );
  // ^^ This can be deleted after testing
  const dispatch = useDispatch();

  if (selectedMode === null && localConfig.syncPreference != null) {
    setSelectedMode(localConfig.syncPreference);
  }

  if (gotStorageInfo === false) {
    console.log("GetStorageInfo");
    GetStorageInfo({
      setAvailableStorage,
      setTotalStorage,
      setRenderLocalStorage,
    });
    setGotStorageInfo(true);
  }

  const ConfirmClearStorage = () => {
    LSClearStorage({ dispatch, setGotStorageInfo });
  };

  const ButtonMessageProps: ButtonMessagePropTypes = {
    isactive: true,
    header: "🗑",
    title: "Clear local cache?",
    description: 'Set local sync "None" below to prevent future Vault caching.',
    leftButton: {
      Action: () => dispatch(setButtonMessageInactive()),
      title: "No, go back",
    },
    rightButton: {
      Action: ConfirmClearStorage,
      title: "Yes, clear",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerwrapper}>
        <BackArrow />
        <Text style={[GlobalStyles.h1text, styles.headertext]}>Local Sync</Text>
        <View style={styles.decoystyle} pointerEvents="none">
          <BackArrow />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollviewstyle}
      >
        <View style={[GlobalStyles.shadow, styles.summarywrapper]}>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              styles.summarytext,
            ]}
          >
            {
              "Local sync allows Render to cache your Vault-saved cloud content to your device's local file system.\n\nThis substantially improves loading speeds and reduces network intensity, but it can also be heavy on device storage.\n\nSettings are locally saved, so you can personalize preferences to each device's needs."
            }
          </Text>
        </View>
        <View style={styles.storagesectionwrapper}>
          <StorageIndicator
            totalStorage={totalStorage}
            availableStorage={availableStorage}
            renderLocalStorage={renderLocalStorage}
            storagesizeinbytes={currentuser.storagesizeinbytes}
          />
          <FullbarButton
            backgroundColor={Colors.Primary}
            textColor={Colors.WarmAccent}
            Action={() => dispatch(setButtonMessageActive(ButtonMessageProps))}
            title={"Clear local Render storage"}
            disabled={false}
          />
        </View>
        <PrimaryDivider />
        <View>
          <View style={styles.preferencepreviewwrapper}>
            <TriButton
              category={"All"}
              syncPreference={localConfig.syncPreference}
              selectedMode={selectedMode}
              Action={() => setSelectedMode("All")}
            />
            <TriButton
              category={"Partial"}
              syncPreference={localConfig.syncPreference}
              selectedMode={selectedMode}
              Action={() => setSelectedMode("Partial")}
            />
            <TriButton
              category={"None"}
              syncPreference={localConfig.syncPreference}
              selectedMode={selectedMode}
              Action={() => setSelectedMode("None")}
            />
          </View>
          <View style={styles.preferencedescriptionwrapper}>
            <ChangeSyncButton
              selectedMode={selectedMode}
              syncPreference={localConfig.syncPreference}
              dispatch={dispatch}
            />
            <CategoryDescription selectedMode={selectedMode} />
          </View>
        </View>
      </ScrollView>
      <ButtonMessageModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Environment.StandardPadding,
  },
  headerwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headertext: {
    color: Colors.AccentOn,
  },
  decoystyle: {
    opacity: 0,
  },
  sectionheader: {
    color: Colors.AccentPartial,
    textAlign: "left",
  },
  tbwrapper: {
    width: TriBoxSize,
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  tbiconwrapper: {
    marginHorizontal: Environment.SmallPadding,
  },
  tbicon: {
    margin: Environment.SmallPadding / -2,
  },
  paragraphtext: {
    color: Colors.AccentOn,
  },
  boldtext: {
    color: Colors.AccentPartial,
  },
  descriptionwrapper: {
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardPadding,
    marginTop: Environment.StandardPadding,
  },
  storagewrapper: {
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    width: Environment.FullBar,
    marginBottom: Environment.StandardPadding,
    padding: Environment.StandardPadding,
    justifyContent: "space-between",
  },
  storagebarwrapper: {
    height: Environment.CubeSize,
    backgroundColor: Colors.AccentPartial,
    borderRadius: Environment.StandardRadius,
    marginTop: Environment.LargePadding,
    justifyContent: "center",
  },
  storagebar: {
    alignItems: "center",
    justifyContent: "center",
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.AccentOn,
  },
  storagelabel: {
    color: Colors.Primary,
  },
  summarywrapper: {
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    marginVertical: Environment.StandardPadding,
  },
  summarytext: {
    color: Colors.AccentOn,
  },
  storagesectionwrapper: {
    width: Environment.FullBar,
    marginBottom: Environment.StandardPadding,
  },
  preferencepreviewwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preferencedescriptionwrapper: {
    width: Environment.FullBar,
    marginBottom: Environment.HalfBar,
    paddingVertical: Environment.StandardPadding,
  },
  scrollviewstyle: {
    flex: 1,
  },
});

export default LocalSyncSettings;
