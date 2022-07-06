import GetFullUserRelationship from "./GetFullUserRelationship";
import { setOtherUser } from "../../../redux/explore/otheruserprofile";

const EnterProfileFromSearch = ({
  item,
  navigation,
  dispatch,
  currentuser,
}) => {
  async function AssembleData() {
    const otheruser = {
      id: item.id,
      displayname: item.displayname,
      gamertag: item.gamertag,
      cognitosub: item.cognitosub,
      pfpurl: item.pfpurl,
      addedmecount: item.addedmecount,
      cognitosub: item.cognitosub,
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
