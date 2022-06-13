import React from "react";
import { View, Text } from "react-native";
import {
  Environment,
  Icons,
  GlobalStyles,
  Colors,
} from "../../../resources/project";

const CommentsEmptyComponent = ({
  fetchingcomments,
  gotComments,
}: {
  fetchingcomments: boolean;
  gotComments: boolean;
}) => {
  if (fetchingcomments === false && gotComments === true) {
    return (
      <View
        style={{
          width: Environment.FullBar,
          height: Environment.PostViewHeight - Environment.CubeSize,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Icons.OriginalSize.Comment
            stroke={Colors.AccentPartial}
            height={Environment.IconSize * 5}
            width={Environment.IconSize * 5}
            style={GlobalStyles.irregularshadow}
          />
          <Text
            style={[
              GlobalStyles.h4text,
              GlobalStyles.irregularshadow,
              {
                color: Colors.AccentPartial,
                marginTop: Environment.StandardPadding,
              },
            ]}
          >
            Start the conversation
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default CommentsEmptyComponent;
