import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Environment, GlobalStyles, Colors, Icons } from "../../../../global";

const DefaultText = ({ children }) => (
  <Text
    style={[
      GlobalStyles.h4text,
      GlobalStyles.irregularshadow,
      styles.descriptionText,
    ]}
  >
    {children}
  </Text>
);

const descriptionIconSize = Environment.IconSize / 1.25;

export const GetStartedWelcomeDescription = () => {
  return (
    <DefaultText>
      Render is the best place to save your screen captures.
    </DefaultText>
  );
};

async function ShareWebUpload() {
  try {
    await Share.share({
      message:
        "Use Render web to upload from any PC: https://www.app.render.game/",
      url: "https://www.app.render.game/",
    });
  } catch (error) {
    console.log(error);
  }
}

export const GetStartedUploadDescription = () => {
  const navigation = useNavigation();
  const NavigateToPlusLanding = () => {
    // @ts-ignore
    navigation.navigate("Plus");
  };
  return (
    <DefaultText>
      Use our desktop{" "}
      <Text onPress={ShareWebUpload} style={styles.linkText}>
        web portal
      </Text>{" "}
      or app{" "}
      <Icons.OriginalSize.PlusIcon
        stroke={Colors.Accent90}
        height={descriptionIconSize}
        width={descriptionIconSize}
        // @ts-ignore
        onPress={NavigateToPlusLanding}
      />{" "}
      to upload captures.
    </DefaultText>
  );
};

export const GetStartedSaveDescription = () => {
  const navigation = useNavigation();
  const NavigateToVault = () => {
    // @ts-ignore
    navigation.navigate("HomeVault");
  };
  return (
    <DefaultText>
      The{" "}
      <Text onPress={NavigateToVault} style={styles.linkText}>
        Vault
      </Text>{" "}
      <Icons.OriginalSize.HomeIcon
        stroke={Colors.Accent90}
        height={descriptionIconSize}
        width={descriptionIconSize}
        onPress={NavigateToVault}
        // @ts-ignore
      />{" "}
      is your cloud storage library. All uploads are private by default until
      posted publicly.
    </DefaultText>
  );
};

export const GetStartedSortDescription = () => {
  const navigation = useNavigation();
  const NavigateToHVSearchLanding = () => {
    // @ts-ignore
    navigation.navigate("HVSearchLanding");
  };
  return (
    <DefaultText>
      <Text onPress={NavigateToHVSearchLanding} style={styles.linkText}>
        Tag games
      </Text>{" "}
      <Icons.OriginalSize.Tag
        stroke={Colors.Accent90}
        height={descriptionIconSize}
        width={descriptionIconSize}
        onPress={NavigateToHVSearchLanding}
        // @ts-ignore
      />{" "}
      , add text{" "}
      <Icons.OriginalSize.Text
        stroke={Colors.AccentOn}
        height={descriptionIconSize}
        width={descriptionIconSize}
        // @ts-ignore
      />{" "}
      , and change timestamps{" "}
      <Icons.OriginalSize.Clock
        stroke={Colors.AccentOn}
        height={descriptionIconSize}
        width={descriptionIconSize}
        // @ts-ignore
      />{" "}
      by long-pressing Vault tiles or entering edit mode{" "}
      <Icons.OriginalSize.Edit
        stroke={Colors.AccentOn}
        height={descriptionIconSize}
        width={descriptionIconSize}
        // @ts-ignore
      />{" "}
      .
    </DefaultText>
  );
};

export const GetStartedExportDescription = () => {
  const navigation = useNavigation();
  const NavigateToSocial = () => {
    // @ts-ignore
    navigation.navigate("Social");
  };
  return (
    <DefaultText>
      Download{" "}
      <Icons.OriginalSize.Download
        stroke={Colors.AccentOn}
        height={descriptionIconSize}
        width={descriptionIconSize}
        onPress={NavigateToSocial}
        // @ts-ignore
      />{" "}
      , export to other apps, or{" "}
      <Text onPress={NavigateToSocial} style={styles.linkText}>
        share within Render
      </Text>{" "}
      <Icons.OriginalSize.Social
        stroke={Colors.Accent90}
        height={descriptionIconSize}
        width={descriptionIconSize}
        onPress={NavigateToSocial}
      />
      .
    </DefaultText>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    color: Colors.AccentOn,
    textAlign: "center",
    margin: Environment.LargePadding,
  },
  linkText: {
    textDecorationLine: "underline",
    color: Colors.Accent90,
  },
});
