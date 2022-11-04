import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import format from "date-fns/format";
import { GlobalStyles, Colors, Environment } from "../../../global";

import PostTextDisplay from "../../social/components/PostTextDisplay";

const AreEqual = (previousProps, nextProps) => {
  if (previousProps.item.contentkey === nextProps.item.contentkey) {
    return true;
  }
  return false;
};

const GalleryTile = ({ navigation, item, index, usecase }) => {
  const formatteddate = format(new Date(item.publicpostdate), "PP");
  if (item.contenttype === "video") {
    return (
      <TouchableOpacity
        style={[styles.wrapper]}
        onPress={() =>
          navigation.navigate("VaultPostFullView", {
            startindex: index,
            usecase,
          })
        }
      >
        <View>
          <Text
            style={[
              GlobalStyles.h4text,
              styles.description,
              GlobalStyles.irregularshadow,
            ]}
          >
            {formatteddate}
          </Text>
        </View>
        <View style={GlobalStyles.shadow}>
          <Image source={{ uri: item.thumbnailurl }} style={styles.mainimage} />
        </View>
        <PostTextDisplay
          item={item}
          Action={() =>
            navigation.navigate("VaultPostFullView", {
              startindex: index,
              usecase,
            })
          }
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.wrapper]}
      onPress={() =>
        navigation.navigate("VaultPostFullView", {
          startindex: index,
          usecase,
        })
      }
    >
      <View>
        <Text
          style={[
            GlobalStyles.h4text,
            styles.description,
            GlobalStyles.irregularshadow,
          ]}
        >
          {formatteddate}
        </Text>
      </View>
      <View style={GlobalStyles.shadow}>
        <Image source={{ uri: item.signedurl }} style={styles.mainimage} />
      </View>
      <PostTextDisplay
        item={item}
        Action={() =>
          navigation.navigate("VaultPostFullView", {
            startindex: index,
            usecase,
          })
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Environment.StandardPadding,
  },
  description: {
    textAlign: "right",
    color: Colors.AccentOn,
    marginVertical: Environment.StandardPadding,
  },
  mainimage: {
    height: Environment.FullBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    resizeMode: "cover",
  },
});

// export default GalleryTile;
export default React.memo(GalleryTile, AreEqual);
