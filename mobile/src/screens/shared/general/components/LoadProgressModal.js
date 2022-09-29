import react, { useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import { useDispatch, useSelector } from "react-redux";
import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
} from "../../../../redux/shared/loadprogressmessage";

import { Environment, Colors, GlobalStyles } from "../../../../global";
import { HalfbarButton } from "../atoms";
import CancelUpload from "../../../plus/operations/CancelUpload";

const LoadProgressModal = () => {
  const [imBored, setImBored] = useState(0);

  const loadprogressgeneral = useSelector(
    (state) => state.loadprogressmessage.general
  );
  const percentcomplete = useSelector(
    (state) => state.loadprogressmessage.percentcomplete
  );
  const uploadobject = useSelector(
    (state) => state.loadprogressmessage.uploadobject
  );

  // const imBoredArray = ["I'm bored", "👀", "you too?", "Must be", "another", "slow upload.", "Lol", "you probably", "even pay", "for good", "wifi.", "Well,", "the devs", "try their", "best.", "Maybe", "consider", "giving them", "a shoutout.", "Or try", "uploading", "a smaller", "file next", "time", "I mean,", "this is", "a little", "excessive, no?", "Your call.", "Regardless,", ]

  const imBoredArray = [
    Colors.Primary,
    "#590000",
    "#023d38",
    "#4d0133",
    "#524100",
    "#2b2b2b",
  ];

  const dispatch = useDispatch();

  function HBButtonHolder({
    uploadobject,
    imBoredArray,
    imBored,
    dispatch,
    percentcomplete,
  }) {
    if (
      uploadobject === null ||
      uploadobject.image.key != null ||
      percentcomplete === "Processing"
    ) {
      return null;
    }
    const NewIndex = () => {
      if (imBored === imBoredArray.length - 1) {
        setImBored(0);
      } else if (typeof imBoredArray[imBored + 1] !== "undefined") {
        setImBored(imBored + 1);
      }
    };

    return (
      <View style={styles.optionsholder}>
        <HalfbarButton
          label="Cancel"
          active={false}
          Action={() => CancelUpload({ dispatch, uploadobject })}
        />
        <HalfbarButton
          label={"I'm bored"}
          active={false}
          Action={() => NewIndex()}
        />
      </View>
    );
  }

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
        <View
          style={[
            styles.modalbox,
            GlobalStyles.shadow,
            { backgroundColor: imBoredArray[imBored] },
          ]}
        >
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

import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import { UserDialogue } from '../../../resources/project'
import { SystemmessageModal } from "../../../resources/molecules";

const Helper = () => {
    if (condition === met) {
        dispatch(setSystemmessageActive(UserDialogue().systemmessage.resendcodesuccess))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <SystemmessageModal />
        ...
    )
}

export default Example;
*/
