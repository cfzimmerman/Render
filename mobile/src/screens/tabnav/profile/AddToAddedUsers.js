import { addToAdded } from "../../../redux/profile/relationships";

const AddToAddedUsers = ({ dispatch, user, pfpurl }) => {
  const User = {
    id: user.id,
    cognitosub: user.cognitosub,
    displayname: user.displayname,
    gamertag: user.gamertag,
    pfpurl,
    addedmecount: user.addedmecount,
  };

  dispatch(addToAdded(User));
};

export default AddToAddedUsers;
