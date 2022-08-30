import { View, Image, StyleSheet, Text } from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

const GetStartedPageItem = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={[
          GlobalStyles.shadow,
          {
            height: "59%",
            width: Environment.FullBar,
            borderRadius: Environment.StandardRadius,
          },
        ]}
      >
        <Image
          style={{
            width: Environment.FullBar,
            height: "100%",
            borderRadius: Environment.StandardRadius,
          }}
          source={{
            uri: "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted1-0.jpg",
          }}
        />
      </View>

      <View
        style={{
          width: Environment.FullBar,
          height: "39%",
          // backgroundColor: "moccasin",
        }}
      >
        <View
          style={[
            GlobalStyles.shadow,
            {
              flex: 1,
              backgroundColor: Colors.Primary,
              borderRadius: Environment.StandardRadius,
              padding: Environment.StandardPadding,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                GlobalStyles.irregularshadow,
                GlobalStyles.h2text,
                { color: Colors.AccentOn },
              ]}
            ></Text>
            <Text
              style={[
                GlobalStyles.h4text,
                GlobalStyles.irregularshadow,
                {
                  color: Colors.AccentOn,
                  textAlign: "center",
                  margin: Environment.StandardPadding,
                },
              ]}
            >
              Render is the best place to save your screen captures.
            </Text>
          </View>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              {
                color: Colors.AccentPartial,
                textAlign: "right",
                marginTop: Environment.StandardPadding,
              },
            ]}
          >
            1 / 5: Swipe →
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GetStartedPageItem;
