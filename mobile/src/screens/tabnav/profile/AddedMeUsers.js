import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import { BackArrow } from "../../../resources/atoms";
import GetAddedMeUsers from "./GetAddedMeUsers";
import RelationUserTile from "./RelationUserTile";

const AddedMeUsers = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const addedmeusers = useSelector((state) => state.relationships.addedme);
  const addedmenexttoken = useSelector(
    (state) => state.relationships.addedmenexttoken
  );
  const addbackusers = useSelector((state) => state.profilemain.addbackusers);

  if (addedmeusers.length === 0 && addedmenexttoken === null) {
    GetAddedMeUsers({
      addedmenexttoken,
      dispatch,
      currentuser,
      addedmeusers,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerwrapper}>
        <BackArrow />
        <Text style={[GlobalStyles.h1text, styles.headertext]}> Added Me</Text>
      </View>

      <FlatList
        data={addedmeusers}
        renderItem={({ item, index }) => (
          <RelationUserTile
            item={item}
            index={index}
            dispatch={dispatch}
            navigation={navigation}
            currentuser={currentuser}
            origin="AddedMeUsers"
            addbackusers={addbackusers}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.flatlistcolumnstyle}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (addedmenexttoken != null) {
            GetAddedMeUsers({
              cognitosub: currentuser.cognitosub,
              dispatch,
              addedmenexttoken,
              addedmeusers,
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
  },
  headertext: {
    color: Colors.AccentOn,
  },
  flatlistcolumnstyle: {
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
  },
});

export default AddedMeUsers;
