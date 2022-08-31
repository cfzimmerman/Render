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

export interface GetStartedPageDataTypes {
  id: number;
  headerImageURL: string;
  titleText: string;
  descriptionText: string;
}

const totalNumberOfScreens = 5;

const GetStartedPageData: GetStartedPageDataTypes[] = [
  {
    id: 0,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted1-0.jpg",
    titleText: "Welcome!",
    descriptionText: "Render is the best place to save your screen captures.",
  },
  {
    id: 1,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted2-3.png",
    titleText: "Upload",
    descriptionText: "Use our web portal or app to upload captures.",
  },
  {
    id: 2,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted3-0.jpg",
    titleText: "Save",
    descriptionText: "The Vault is your private cloud storage library.",
  },
  {
    id: 3,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted4-0.jpg",
    titleText: "Sort",
    descriptionText: "Tag games, add text, and order by date.",
  },
  {
    id: 4,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted5-0.jpg",
    titleText: "Export",
    descriptionText: "Download, export to other apps, or share within Render.",
  },
];

const renderItem = ({ index, item }) => {
  return (
    <GetStartedPageItem
      item={item}
      index={index}
      totalNumberOfScreens={totalNumberOfScreens}
    />
  );
};

const GetStartedLanding = () => {
  return (
    <FlatList
      data={GetStartedPageData}
      renderItem={renderItem}
      style={{ flex: 1 }}
      horizontal={true}
      snapToInterval={Environment.ScreenWidth}
      decelerationRate="fast"
    />
  );
};

export default GetStartedLanding;
