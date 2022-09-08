import { addToUserSearchResult } from "../../../redux/explore/exploremain";

const AddUserSearchResult = ({ dispatch, pfpurl, item, relationship }) => {
  const user = {
    id: item.id,
    displayname: item.displayname,
    gamertag: item.gamertag,
    cognitosub: item.cognitosub,
    addedmecount: item.addedmecount,
    pfpurl,
    relationship,
  };

  dispatch(addToUserSearchResult(user));
};

export default AddUserSearchResult;
