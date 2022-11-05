import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../../redux";
import { CurrentUserType } from "../../../../global/CommonTypes";
import { Environment } from "../../../../global";
import {
  GetStartedExportDescription,
  GetStartedSaveDescription,
  GetStartedSortDescription,
  GetStartedUploadDescription,
  GetStartedWelcomeDescription,
} from "../components/GetStartedDescriptions";
import GetStartedFooter from "../components/GetStartedFooter";
import GetStartedPageItem from "../components/GetStartedPageItem";

export interface GetStartedPageDataTypes {
  id: number;
  headerImageURL: string;
  titleText: string;
  descriptionTextBlock: Function;
}

const totalNumberOfScreens = 5;

const GetStartedPageData: GetStartedPageDataTypes[] = [
  {
    id: 0,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted1-0.jpg",
    titleText: "Welcome!",
    descriptionTextBlock: GetStartedWelcomeDescription,
  },
  {
    id: 1,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted2-4.png",
    titleText: "Upload",
    descriptionTextBlock: GetStartedUploadDescription,
  },
  {
    id: 2,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted3-1.jpg",
    titleText: "Save",
    descriptionTextBlock: GetStartedSaveDescription,
  },
  {
    id: 3,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted4-0.jpg",
    titleText: "Sort",
    descriptionTextBlock: GetStartedSortDescription,
  },
  {
    id: 4,
    headerImageURL:
      "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/GetStarted5-0.jpg",
    titleText: "Export",
    descriptionTextBlock: GetStartedExportDescription,
  },
];

const GetStartedLanding = ({ navigation }) => {
  const currentUser: CurrentUserType = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  const dispatch = useDispatch();

  const renderItem = ({ index, item }) => {
    return (
      <GetStartedPageItem
        item={item}
        index={index}
        totalNumberOfScreens={totalNumberOfScreens}
        navigation={navigation}
        currentUser={currentUser}
        dispatch={dispatch}
      />
    );
  };

  const ListFooter = () => {
    return <GetStartedFooter navigation={navigation} dispatch={dispatch} />;
  };

  return (
    <FlatList
      data={GetStartedPageData}
      renderItem={renderItem}
      style={styles.flatlistWrapper}
      horizontal={true}
      snapToInterval={Environment.ScreenWidth}
      decelerationRate="fast"
      ListFooterComponent={ListFooter()}
    />
  );
};

const styles = StyleSheet.create({
  flatlistWrapper: {
    flex: 1,
  },
});

export default GetStartedLanding;
