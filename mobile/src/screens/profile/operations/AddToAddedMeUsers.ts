import { addToAddedMe } from "../../../redux/shared/relationships";
import { addToAddBackUsers } from "../../../redux/profilemain";
import { DispatchType } from "../../../redux";

export interface AddedMeUsersType {
  id: string;
  cognitosub: string;
  displayname: string;
  gamertag: string;
  pfpurl: string;
  addedmecount: number;
  relationship: boolean;
}

interface AddToAddedMeProps {
  dispatch: DispatchType;
  user: {
    id: string;
    cognitosub: string;
    displayname: string;
    gamertag: string;
    pfp: string;
    addedmecount: number;
  };
  pfpurl: string;
  relationship: boolean;
}

const AddToAddedMeUsers = ({
  dispatch,
  user,
  pfpurl,
  relationship,
}: AddToAddedMeProps) => {
  const newUser: AddedMeUsersType = {
    id: user.id,
    cognitosub: user.cognitosub,
    displayname: user.displayname,
    gamertag: user.gamertag,
    pfpurl: pfpurl,
    addedmecount: user.addedmecount,
    relationship: relationship,
  };

  dispatch(addToAddedMe(newUser));

  if (relationship === false) {
    dispatch(addToAddBackUsers(newUser));
  }
};

export default AddToAddedMeUsers;
