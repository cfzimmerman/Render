import { PostType } from "../../../../global/CommonTypes";

const FindIsHeader = ({
  vaultfeeddata,
  postID,
}: {
  vaultfeeddata: PostType[];
  postID: string;
}): boolean => {
  const postIndex = vaultfeeddata.findIndex(
    (item: PostType) => item.id === postID
  );
  if (postIndex === -1 || typeof vaultfeeddata[postIndex].header != "boolean") {
    return false;
  }
  return vaultfeeddata[postIndex].header;
};

export default FindIsHeader;
