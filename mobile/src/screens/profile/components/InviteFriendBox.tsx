import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../global";
import * as Linking from "expo-linking";
import { CopyToClipboard, ShareLink } from "../../../resources/utilities";
import { HalfbarButton, TextButton } from "../../../resources/atoms";
import { DispatchType } from "../../../redux";

interface InputTypes {
  username: string;
  inviteFriendLinkCopied: boolean;
  setInviteFriendLinkCopied: Function;
}

const InviteFriendBox = ({
  username,
  inviteFriendLinkCopied,
  setInviteFriendLinkCopied,
}: InputTypes) => {
  const inviteLink = `https://docs.google.com/forms/d/e/1FAIpQLSdeacr-mRudJqcRZC5Ofy5Eoe5VnYAG-HIKSSM5C0_L0valFQ/viewform?usp=pp_url&entry.1470519735=@${username}`;
  const CopyAction = () => {
    CopyToClipboard(inviteLink);
    setInviteFriendLinkCopied(true);
  };
  return (
    <View style={styles.boxWrapper}>
      <View style={styles.labelWrapper}>
        <Text style={[GlobalStyles.h4text, styles.label]}>Invite friends</Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(inviteLink)}>
        <View style={[GlobalStyles.shadow, styles.linkButton]}>
          <Text
            selectable={true}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h4text,
              styles.linkText,
            ]}
          >
            {inviteLink}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>
        <HalfbarButton
          label={inviteFriendLinkCopied === true ? "Copied" : "Copy"}
          active={false}
          Action={CopyAction}
        />
        <HalfbarButton
          label={"Share"}
          active={false}
          Action={() => ShareLink(inviteLink)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxWrapper: {
    marginVertical: Environment.LargePadding,
  },
  labelWrapper: {
    alignItems: "flex-start",
  },
  label: {
    textAlign: "right",
    color: Colors.AccentPartial,
  },
  linkButton: {
    height: Environment.CubeSize,
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    borderWidth: Environment.StandardPadding / 3,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.Accent90,
    backgroundColor: Colors.AccentFaint,
  },
  linkText: {
    color: Colors.AccentOn,
    textDecorationLine: "underline",
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
  },
});

export default InviteFriendBox;
