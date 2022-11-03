interface InputTypes {
  linkType: "post";
  itemID: string;
}

const baseURL = "https://www.app.render.game/";
const postShareExtension = "view/";

const CreateShareableLink = ({ linkType, itemID }: InputTypes): string => {
  if (linkType === "post" && typeof itemID === "string") {
    return baseURL + postShareExtension + itemID;
  }
  return "error";
};

export default CreateShareableLink;
