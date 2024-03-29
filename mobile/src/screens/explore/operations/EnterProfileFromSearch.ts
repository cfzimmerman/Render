import GetFullUserRelationship from "./GetFullUserRelationship";
import { setOtherUser } from "../../../redux/shared/otheruserprofile";

export interface OtherUserType {
  id: string;
  displayname: string;
  gamertag: string;
  cognitosub: string;
  pfpurl: string;
  addedmecount: number;
}

const EnterProfileFromSearch = ({
  item,
  navigation,
  dispatch,
  currentuser,
}) => {
  async function AssembleData() {
    const otheruser: OtherUserType = {
      id: item.id,
      displayname: item.displayname,
      gamertag: item.gamertag,
      cognitosub: item.cognitosub,
      pfpurl: item.pfpurl,
      addedmecount: item.addedmecount,
    };

    dispatch(setOtherUser(otheruser));

    navigation.navigate("Explore", {
      screen: "OtherUserProfileLanding",
      initial: false,
    });
  }

  AssembleData();
  GetFullUserRelationship({
    targetID: item.id,
    dispatch,
    currentuser,
  });
};

export default EnterProfileFromSearch;
