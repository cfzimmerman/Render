import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

import { setTextActive } from "../../../../redux/shared/vaultpostdata";
import { Environment, GlobalStyles, Colors } from "../../../../global";
import { RootStateType } from "../../../../redux";

const PostTextModal = ({ dispatch, item }) => {
  const textactive = useSelector(
    (state: RootStateType) => state.vaultpostdata.textactive
  );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={textactive}
      onRequestClose={() => {
        dispatch(setTextActive(false));
      }}
    >
      <TouchableWithoutFeedback onPress={() => dispatch(setTextActive(false))}>
        <View style={styles.container}>
          <BlurView
            tint="dark"
            intensity={60}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView style={styles.safeareawrapper}>
            <View style={[GlobalStyles.shadow, styles.textholder]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollviewstyle}
              >
                <TouchableWithoutFeedback
                  onPress={() => dispatch(setTextActive(false))}
                >
                  <Text style={[GlobalStyles.p1text, styles.posttext]}>
                    {item.posttext}
                  </Text>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeareawrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  textholder: {
    backgroundColor: Colors.BackgroundPartial,
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    width: Environment.FullBar,
  },
  scrollviewstyle: {
    flexShrink: 0,
  },
  posttext: {
    color: Colors.AccentOn,
  },
});

export default PostTextModal;
