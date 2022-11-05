import { addToAddedUsers } from "../../../redux/shared/relationships";
import { OtherUserType } from "../../explore/operations/EnterProfileFromSearch";

const AddToAddedUsers = ({ dispatch, user, pfpurl }) => {
  const newAddedUser: OtherUserType = {
    id: user.id,
    cognitosub: user.cognitosub,
    displayname: user.displayname,
    gamertag: user.gamertag,
    pfpurl,
    addedmecount: user.addedmecount,
  };

  dispatch(addToAddedUsers(newAddedUser));
};

export default AddToAddedUsers;
