import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Environment, Colors, GlobalStyles } from "../../../global";
import BackArrow from "../../shared/general/components/BackArrow";
import GetAddedUsers from "../operations/GetAddedUsers";
import RelationUserTile from "../components/RelationUserTile";
import { RootStateType } from "../../../redux";

function AddedUsers({ navigation }) {
  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const addedusers = useSelector(
    (state: RootStateType) => state.relationships.added
  );
  const addednexttoken = useSelector(
    (state: RootStateType) => state.relationships.addednexttoken
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
            // 🛑 Again, figure out what the deal here is
            addbackusers={addedusers}
            addedmeusers={addedusers}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.flatlistcolumnstyle}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (addednexttoken != null) {
            GetAddedUsers({
              dispatch,
              addednexttoken,
              addedusers,
              currentuser,
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
