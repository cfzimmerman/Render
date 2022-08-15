import { format } from "date-fns";
import { PostHeaderType } from "../../../resources/CommonTypes";
import { addVaultPostDataObject } from "../../../redux/vault/vaultpostdata";

import { CreateNewMonthPropsType } from "./GetVaultData";

const GetDate = (contentdate: string): string => {
  const fulldate = new Date(contentdate);
  const simpledate = format(fulldate, "MMMM yyyy");
  return simpledate;
};

const CreateNewMonth = ({
  dispatch,
  item,
  signedurl,
  thumbnailurl,
}: CreateNewMonthPropsType) => {
  const NewMonth: PostHeaderType = {
    header: {
      title: GetDate(item.contentdate),
      post: {
        id: item.id,
        aspectratio: 1,
        contenttype: item.contenttype,
        contentkey: item.contentkey,
        publicpost: item.publicpost,
        publicpostdate: item.publicpostdate,
        contentdate: item.contentdate,
        posttext: item.posttext,
        signedurl: signedurl,
        thumbnailurl: thumbnailurl,
        userid: null,
        gamesID: item.Games === null ? null : item.Games.id,
        coverID: item.Games === null ? null : item.Games.coverID,
      },
    },
    data: [],
  };
  dispatch(addVaultPostDataObject(NewMonth));
};

export default CreateNewMonth;
