import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Environment, GlobalStyles, Colors } from "../../../resources/project";
import GetStartedPageItem from "./GetStartedPageItem";

interface GetStartedPageDataTypes {
  id: number;
  headerImageURL: string;
  titleText: string;
  descriptionText: string;
}

const GetStartedPageData: GetStartedPageDataTypes[] = [
  {
    id: 0,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted1-0.jpg",
    titleText: "",
    descriptionText: "Render is the best place to save your screen captures.",
  },
];

/*
const renderItem = ({ index, item }) => {
  return <GetStartedPageItem />;
};
*/

const renderItem = () => {
  return (
    <SafeAreaView
      style={{
        height: Environment.ScreenHeight,
        alignItems: "center",
        paddingVertical:
          Platform.OS === "android" ? Environment.StandardPadding : 0,
      }}
    >
      <View
        style={{
          backgroundColor: "crimson",
          width: Environment.FullBar,
          flex: 1,
        }}
      ></View>
    </SafeAreaView>
  );
};

const GetStartedLanding = () => {
  return (
    <FlatList
      data={GetStartedPageData}
      renderItem={renderItem}
      style={{ flex: 1, backgroundColor: "moccasin" }}
    />
  );
};

export default GetStartedLanding;
