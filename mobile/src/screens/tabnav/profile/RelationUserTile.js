import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import {
  Environment,
  GlobalStyles,
  Colors,
  Icons,
} from "../../../resources/project";
import EnterProfileFromSearch from "../explore/EnterProfileFromSearch";
import ChangeUserRelationship from "../explore/ChangeUserRelationship";

const TileInteraction = ({ item, navigation, dispatch, currentuser }) => {
  EnterProfileFromSearch({
    item,
    navigation,
    dispatch,
    currentuser,
  });
};

const FindAddBackUsersIndex = ({ addbackusers, targetcognitosub }) => {
  if (addbackusers.length > 0) {
    const index = addbackusers.findIndex(
      (item) => item.cognitosub === targetcognitosub
    );
    return index;
  }
  return null;
};

const FindAddedMeUsersIndex = ({ addedmeusers, targetcognitosub }) => {
  if (addedmeusers.length > 0) {
    const index = addedmeusers.findIndex(
      (item) => item.cognitosub === targetcognitosub
    );
    return index;
  }
  return null;
};

const TileBottom = ({
  origin,
  item,
  dispatch,
  currentuserid,
  currentusercognitosub,
  index,
  addbackusers,
  addedmeusers,
}) => {
  if (origin === "AddedUsers" || item.relationship === true) {
    return (
      <View style={styles.tbtruewrapper}>
        <View style={styles.tbtruetextwrapper}>
          <Text
            style={[
              GlobalStyles.p1text,
              GlobalStyles.irregularshadow,
              styles.displayname,
            ]}
          >
            {item.displayname}
          </Text>
          <Text
            style={[
              GlobalStyles.p2text,
              GlobalStyles.irregularshadow,
              styles.gamertag,
            ]}
          >
            @{item.gamertag}
          </Text>
        </View>
      </View>
    );
  }
  if (origin === "AddedMeUsers" && item.relationship === false) {
    return (
      <View style={styles.tbfalsewrapper}>
        <View style={styles.tbfalsetextwrapper}>
          <Text
            style={[
              GlobalStyles.p1text,
              GlobalStyles.irregularshadow,
              styles.displayname,
            ]}
          >
            {item.displayname}
          </Text>
          <Text
            style={[
              GlobalStyles.p2text,
              GlobalStyles.irregularshadow,
              styles.gamertag,
            ]}
          >
            @{item.gamertag}
          </Text>
        </View>
        <TouchableOpacity
          style={GlobalStyles.shadow}
          onPress={() => {
            const userindex = FindAddBackUsersIndex({
              targetcognitosub: item.cognitosub,
              addbackusers,
            });
            ChangeUserRelationship({
              action: "add",
              dispatch,
              currentuserid,
              currentusercognitosub,
              targetuserid: item.id,
              targetusercognitosub: item.cognitosub,
              origin,
              index,
              addbackusersindex: userindex,
            });
          }}
        >
          <View style={styles.tbiconwrapper}>
            <Icons.OriginalSize.AddUser
              stroke={Colors.Primary}
              height={Environment.IconSize}
              width={Environment.IconSize}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if (origin === "ProfileLanding") {
    return (
      <View style={styles.tbfalsewrapper}>
        <View style={styles.tbfalsetextwrapper}>
          <Text
            style={[
              GlobalStyles.p1text,
              GlobalStyles.irregularshadow,
              styles.displayname,
            ]}
          >
            {item.displayname}
          </Text>
          <Text
            style={[
              GlobalStyles.p2text,
              GlobalStyles.irregularshadow,
              styles.gamertag,
            ]}
          >
            @{item.gamertag}
          </Text>
        </View>
        <TouchableOpacity
          style={GlobalStyles.shadow}
          onPress={() => {
            const userindex = FindAddedMeUsersIndex({
              targetcognitosub: item.cognitosub,
              addedmeusers,
            });
            ChangeUserRelationship({
              action: "add",
              dispatch,
              currentuserid,
              currentusercognitosub,
              targetuserid: item.id,
              targetusercognitosub: item.cognitosub,
              origin,
              index,
              addedmeusersindex: userindex,
            });
          }}
        >
          <View style={styles.tbiconwrapper}>
            <Icons.OriginalSize.AddUser
              stroke={Colors.Primary}
              height={Environment.IconSize}
              width={Environment.IconSize}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

function RelationUserTile({
  item,
  index,
  navigation,
  dispatch,
  currentuser,
  origin,
  addbackusers,
  addedmeusers,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        TileInteraction({
          item,
          navigation,
          dispatch,
          currentuser,
        })
      }
    >
      <View style={[GlobalStyles.shadow, styles.container]}>
        <View style={GlobalStyles.shadow}>
          <Image style={styles.userpfp} source={{ uri: item.pfpurl }} />
        </View>
        <TileBottom
          origin={origin}
          item={item}
          dispatch={dispatch}
          currentuserid={currentuser.id}
          currentusercognitosub={currentuser.cognitosub}
          index={index}
          addbackusers={addbackusers}
          addedmeusers={addedmeusers}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Environment.HalfBar,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
  },
  userpfp: {
    height: Environment.HalfBar - Environment.LargePadding,
    width: Environment.HalfBar - Environment.LargePadding,
    borderRadius: Environment.StandardRadius,
  },
  tbtruewrapper: {
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
  },
  tbfalsewrapper: {
    marginTop: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tbtruetextwrapper: {
    width: Environment.HalfBar - Environment.LargePadding,
  },
  tbfalsetextwrapper: {
    width:
      Environment.HalfBar -
      Environment.LargePadding -
      Environment.StandardPadding -
      Environment.IconSize,
  },
  displayname: {
    color: Colors.AccentOn,
  },
  gamertag: {
    color: Colors.AccentPartial,
  },
  tbiconwrapper: {
    backgroundColor: Colors.AccentOn,
    padding: Environment.SmallPadding,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Environment.SmallRadius,
  },
});

export default RelationUserTile;
