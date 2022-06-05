import { Environment } from "../project";
import TransformDimensions from "./TransformDimensions";

// This function outputs the image dimensions that should be displayed in a full view post

const GetPostDimensions = (aspectratio) => {
  // console.log('prop: ' + JSON.stringify(prop))
  if (aspectratio >= Environment.PostViewAspectRatio) {
    const NewHeight = Environment.FullBar / aspectratio;
    const Dimensions = {
      width: Environment.FullBar,
      height: TransformDimensions(NewHeight),
      comp: "standard",
    };
    return Dimensions;
  }
  const NewWidth = Environment.PostViewHeight * aspectratio;
  const Dimensions = {
    width: TransformDimensions(NewWidth),
    height: Environment.PostViewHeight,
    comp: "oversize",
  };
  return Dimensions;
};

export default GetPostDimensions;
