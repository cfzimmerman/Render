import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const GetContentName = (uri) => {
  const uuid = uuidv4();

  const uriarray = uri.split(".");
  const filetype = uriarray.reverse()[0];

  const filename = `${uuid}.${filetype}`;

  return filename;
};

export default GetContentName;
