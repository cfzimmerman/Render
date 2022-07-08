import { View, Text } from "react-native";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import CardFlip from "react-native-card-flip";
import { TouchableOpacity } from "react-native-gesture-handler";

const NotificationIconTile = ({ cardRef }) => {
  return (
    <TouchableOpacity onPress={() => cardRef.flip()}>
      <View
        style={[
          GlobalStyles.shadow,
          {
            height: Environment.CubeSize + Environment.StandardPadding * 3,
            width: (Environment.FullBar - Environment.StandardPadding) / 2,
            borderRadius: Environment.StandardRadius,
            backgroundColor: Colors.AccentOn,
            alignItems: "center",
            justifyContent: "center",
            padding: Environment.StandardPadding,
          },
        ]}
      >
        <Icons.OriginalSize.X
          stroke={Colors.Primary}
          style={GlobalStyles.irregularshadow}
          height={Environment.IconSize * 1.25}
          width={Environment.IconSize * 1.25}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            { color: Colors.Primary, marginTop: Environment.SmallPadding },
          ]}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationFront = ({ item, cardRef }) => {
  return (
    <TouchableOpacity onPress={() => cardRef.flip()}>
      <View
        style={[
          GlobalStyles.shadow,
          {
            width: Environment.FullBar,
            padding: Environment.StandardPadding,
            backgroundColor: Colors.Primary,
            height: Environment.CubeSize + Environment.StandardPadding * 3,
            marginTop: Environment.StandardPadding,
          },
        ]}
      >
        <View
          style={{
            width: Environment.FullBar - Environment.LargePadding,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              { color: Colors.AccentOn },
            ]}
          >
            {item.title}
          </Text>
          <View
            style={[
              GlobalStyles.shadow,
              {
                height: Environment.StandardPadding * 1.5,
                width: Environment.StandardPadding * 1.5,
                borderRadius: Environment.SmallPadding,
                backgroundColor: Colors.WarmAccent,
              },
            ]}
          />
        </View>
        <View
          style={{
            width: Environment.FullBar - Environment.LargePadding,
            marginTop: Environment.SmallPadding,
          }}
        >
          <Text
            style={[GlobalStyles.p1text, { color: Colors.Accent90 }]}
            numberOfLines={2}
          >
            {item.preview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NotificationBack = ({ cardRef }) => {
  return (
    <View
      style={[
        {
          width: Environment.FullBar,
          height: Environment.CubeSize + Environment.StandardPadding * 3,
          marginTop: Environment.StandardPadding,
          justifyContent: "space-between",
          flexDirection: "row",
        },
      ]}
    >
      <NotificationIconTile cardRef={cardRef} />
    </View>
  );
};

const NotificationUnit = ({ item }) => {
  // Remake this whole deal. Make a new file that's NotificationUnit. Either use this or a real ref and put the components under the function so they can access it.
  var cardRef;
  return (
    <CardFlip
      ref={(card) => (cardRef = card)}
      style={{
        width: Environment.FullBar,
        height: Environment.CubeSize + Environment.StandardPadding * 3,
      }}
    >
      <NotificationFront item={item} cardRef={cardRef} />
      <NotificationBack cardRef={cardRef} />
    </CardFlip>
  );
};

export { NotificationFront, NotificationBack, NotificationUnit };
