import React, { useState } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { useSelector } from "react-redux";
import { setLoadProgressInactive } from "../../../../redux/shared/loadprogressmessage";

import { Environment, Colors, GlobalStyles } from "../../../../global";
import { RootStateType } from "../../../../redux";

export interface LoadProgressActiveTypes {
  title: string;
  description: string;
}

const LoadProgressModal = () => {
  const [imBored, setImBored] = useState(0);

  const loadprogressgeneral = useSelector(
    (state: RootStateType) => state.loadprogressmessage.general
  );
  const percentcomplete = useSelector(
    (state: RootStateType) => state.loadprogressmessage.percentcomplete
  );

  // const imBoredArray = ["I'm bored", "👀", "you too?", "Must be", "another", "slow upload.", "Lol", "you probably", "even pay", "for good", "wifi.", "Well,", "the devs", "try their", "best.", "Maybe", "consider", "giving them", "a shoutout.", "Or try", "uploading", "a smaller", "file next", "time", "I mean,", "this is", "a little", "excessive, no?", "Your call.", "Regardless,", ]
  // ^ Nov. 2022: That's a remnant from such a badass feature I have no interest in deleting it. (Was removed because batched state updates made it look buggy)

  return (
    <Modal
      animationType="fade"
      transparent
      visible={loadprogressgeneral.isactive}
      onRequestClose={() => {
        setLoadProgressInactive();
      }}
    >
      <View style={styles.modalcontainer}>
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[styles.modalbox, GlobalStyles.shadow]}>
          <Text style={[styles.header, GlobalStyles.h1text]}>
            {percentcomplete}
          </Text>
          <Text style={[styles.header, GlobalStyles.h2text]}>
            {loadprogressgeneral.title}
          </Text>
          <Text style={[styles.description, GlobalStyles.p1text]}>
            {loadprogressgeneral.description}
          </Text>
        </View>
        {/* <HBButtonHolder uploadobject={uploadobject} imBoredArray={imBoredArray} imBored={imBored} dispatch={dispatch} percentcomplete={percentcomplete} /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalbox: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.Primary,
  },
  header: {
    color: Colors.AccentOn,
  },
  description: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
  optionsholder: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hbplaceholder: {
    width: Environment.HalfBar,
    height: Environment.CubeSize,
  },
});

export default LoadProgressModal;

/* Example:

import { useDispatch } from 'react-redux';

import { setSystemMessageActive } from "../../../redux/system/systemmessage";
import { UserDialogue } from '../../../resources/project'
import { SystemMessageModal } from "../../../resources/molecules";

const Helper = () => {
    if (condition === met) {
        dispatch(setSystemMessageActive(UserDialogue().systemmessage.resendcodesuccess))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <SystemMessageModal />
        ...
    )
}

export default Example;
*/
