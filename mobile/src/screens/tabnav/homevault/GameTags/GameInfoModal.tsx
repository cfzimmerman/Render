import React from "react";
import { View, StyleSheet, Text, Modal, Image } from "react-native";
import { BlurView } from "expo-blur";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setGameInfoModal } from "../../../../redux/homevault/homevaultmain";
import { RootStateType } from "../../../../redux/store";
import {
  Environment,
  Colors,
  GlobalStyles,
} from "../../../../resources/project";
import GetGameCoverURL from "./GetGameCoverURL";

export interface SetGameInfoModalInputs {
  active: boolean;
  gameID: string | null;
  coverID: string | null;
  title: string | null;
}

const defaultGameInfoModal: SetGameInfoModalInputs = {
  active: false,
  gameID: null,
  coverID: null,
  title: null,
};

const AreEqual = (previousProps, nextProps) => {
  return true;
};

const GameInfoModal = () => {
  const { active, gameID, coverID, title } = useSelector(
    (state: RootStateType) => state.homevaultmain.gameInfoModal
  );
  const dispatch = useDispatch();

  return (
    <Modal
      visible={active}
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => dispatch(setGameInfoModal(defaultGameInfoModal))}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setGameInfoModal(defaultGameInfoModal))}
        style={styles.modalContainer}
      >
        <BlurView tint="dark" intensity={80} style={styles.blurWrapper}>
          <View style={[GlobalStyles.shadow, styles.imageShadowWrapper]}>
            <Image
              source={{ uri: GetGameCoverURL({ coverID }) }}
              style={styles.coverImage}
            />
          </View>
          <Text
            numberOfLines={2}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.h2text,
              styles.gameTitle,
            ]}
          >
            {title}
          </Text>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
  },
  blurWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imageShadowWrapper: {
    width: Environment.HalfBar * 1.5,
    height: Environment.HalfBar * 1.5 * (4 / 3),
    borderRadius: Environment.StandardRadius,
  },
  coverImage: {
    width: Environment.HalfBar * 1.5,
    height: Environment.HalfBar * 1.5 * (4 / 3),
    borderRadius: Environment.StandardRadius,
  },
  gameTitle: {
    color: Colors.AccentOn,
    margin: Environment.LargePadding,
    textAlign: "center",
  },
});

export default React.memo(GameInfoModal, AreEqual);
