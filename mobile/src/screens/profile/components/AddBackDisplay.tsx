import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../global";
import RelationUserTile from "./RelationUserTile";

function AddBackDisplay({
  addbackusers,
  dispatch,
  navigation,
  currentuser,
  addedmeusers,
}) {
  if (addbackusers.length < 1) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerwrapper}>
        <Text
          style={[
            GlobalStyles.h4text,
            GlobalStyles.irregularshadow,
            styles.headertext,
          ]}
        >
          Add back
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddedMeUsers")}>
          <Text
            style={[
              GlobalStyles.h4text,
              GlobalStyles.irregularshadow,
              styles.labeltext,
            ]}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addbackusers}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.usergrid}>
            <RelationUserTile
              item={item}
              index={index}
              dispatch={dispatch}
              navigation={navigation}
              currentuser={currentuser}
              origin="ProfileLanding"
              addbackusers={addbackusers}
              addedmeusers={addedmeusers}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Environment.StandardPadding,
    width: Environment.FullBar,
    marginTop: Environment.LargePadding,
    marginBottom: Environment.HalfBar,
  },
  headerwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Environment.StandardPadding,
  },
  headertext: {
    color: Colors.AccentOn,
    textAlign: "right",
    alignSelf: "center",
  },
  labeltext: {
    color: Colors.AccentPartial,
    textAlign: "right",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  usergrid: {
    marginRight: Environment.StandardPadding,
  },
});

export default AddBackDisplay;
