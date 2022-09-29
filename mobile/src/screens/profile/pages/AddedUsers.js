import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Environment, Colors, GlobalStyles } from "../../../global";
import { BackArrow } from "../../../resources/atoms";
import GetAddedUsers from "../operations/GetAddedUsers";
import RelationUserTile from "../components/RelationUserTile";

function AddedUsers({ navigation }) {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const addedusers = useSelector((state) => state.relationships.added);
  const addednexttoken = useSelector(
    (state) => state.relationships.addednexttoken
  );

  if (addedusers.length === 0 && addednexttoken === null) {
    GetAddedUsers({
      currentuser,
      dispatch,
      addednexttoken,
      addedusers,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerwrapper}>
        <BackArrow />
        <Text style={[GlobalStyles.h1text, styles.headertext]}> Added</Text>
      </View>
      <FlatList
        data={addedusers}
        renderItem={({ item, index }) => (
          <RelationUserTile
            item={item}
            index={index}
            dispatch={dispatch}
            navigation={navigation}
            currentuser={currentuser}
            origin="AddedUsers"
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.flatlistcolumnstyle}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (addednexttoken != null) {
            GetAddedUsers({
              cognitosub: currentuser.cognitosub,
              dispatch,
              addednexttoken,
              addedusers,
            });
          }
        }}
      />
    </SafeAreaView>
  );
}

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

export default AddedUsers;
