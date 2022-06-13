import { format } from "date-fns";
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
  const NewMonth = {
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
      },
    },
    data: [],
  };
  dispatch(addVaultPostDataObject(NewMonth));
};

export default CreateNewMonth;
