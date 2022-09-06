import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import GetGameCoverURL from "../homevault/GameTags/GetGameCoverURL";
import { SafeAreaView } from "react-native-safe-area-context";

interface FullGameItemType {
  id: string;
  title: string;
  coverID: string;
  backgroundID: string;
  series: string | null;
  releaseDate: string;
  numUserGames: number;
}

const fullGameItem: FullGameItemType = {
  id: "6a16a3a9-327a-4ac9-bd20-7dd07d3c00c4",
  title: "Teslagrad 2",
  coverID: "co54c7",
  backgroundID: "sciijh",
  series: null,
  releaseDate: "2023-06-30T00:00:00.000Z",
  numUserGames: 1,
};

const PGLanding = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Secondary }}>
      <View
        style={{
          height: Environment.ScreenWidth + Environment.CubeSize,
          width: Environment.ScreenWidth,
          backgroundColor: "crimson",
          justifyContent: "flex-end",
        }}
      >
        <Image
          style={{
            height: Environment.ScreenWidth + Environment.CubeSize,
            width: Environment.ScreenWidth,
            position: "absolute",
          }}
          blurRadius={3}
          source={{
            uri: GetGameCoverURL({
              coverID: fullGameItem.backgroundID,
            }),
          }}
        />
        <View
          style={{
            height: Environment.ScreenWidth + Environment.CubeSize,
            width: Environment.ScreenWidth,
            position: "absolute",
            backgroundColor: Colors.Background + "20",
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            marginTop:
              Platform.OS === "android" ? Environment.StandardPadding : 0,
            justifyContent: "center",
            paddingHorizontal: Environment.SmallPadding,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={[
                GlobalStyles.shadow,
                { borderRadius: Environment.StandardRadius },
              ]}
            >
              <Image
                style={{
                  height: Environment.HalfBar * (4 / 3),
                  width: Environment.HalfBar,
                  borderRadius: Environment.StandardRadius,
                }}
                source={{
                  uri: GetGameCoverURL({ coverID: fullGameItem.coverID }),
                }}
              />
            </View>
            <View
              style={{
                width: Environment.HalfBar,
                height: Environment.HalfBar * (4 / 3),
                backgroundColor: "moccasin",
              }}
            ></View>
          </View>
        </SafeAreaView>
        <LinearGradient
          colors={["transparent", Colors.Secondary]}
          style={{
            height: Environment.CubeSize,
            width: Environment.ScreenWidth,
          }}
        />
      </View>
    </View>
  );
};

export default PGLanding;
