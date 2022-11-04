import { Dimensions } from "react-native";
import TransformDimensions from "../screens/shared/general/operations/TransformDimensions";
import FontSize from "./FontSize";

// Divides all components into a screen ratio of "intervalvariable"
const IntervalVariable = 0.029;

// Screen height and width. ScreenWidth is primary input for component dimensions.
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

// First, rounds number to three decimal places (returns a string). Then, converts string to float.

// Used as interior padding for the window width. Used as vertical padding between distinct, related components
// Primary input for screen dimensions
const StandardPadding = TransformDimensions(ScreenWidth * IntervalVariable);

// Used as padding between unrelated items (most often, posts on home screen)
const LargePadding = TransformDimensions(StandardPadding * 2);

// Used as border padding between closely-related items
const SmallPadding = TransformDimensions(StandardPadding / 2);

// Used as height dimension for text input bars and square buttons
const CubeSize = TransformDimensions(StandardPadding * 5);

// Width of item filling whole screen (with horizontal padding)
const FullBar = TransformDimensions(ScreenWidth - StandardPadding);

// Width of side-by-side components including search result cards and dual-select buttons
const HalfBar = TransformDimensions((FullBar - StandardPadding) / 2);

// Used to determine vertical or horizontal maximization of image when in full (not focus) view
const PostViewAspectRatio = TransformDimensions(
  ScreenWidth / (ScreenHeight - CubeSize * 2)
);

// The border radius practically every shape and card in the app is cut to
const StandardRadius = TransformDimensions(StandardPadding * 1.5);

// Dimensions of square thumbnails shown in feed when a user posts a picture
const SmallPfp = TransformDimensions(CubeSize * 0.6);

// The border radius that SmallPfPs are cut to
const SmallRadius = StandardPadding;

// Maximum height a piece of content in FullView may be.
const PostViewHeight = TransformDimensions(ScreenHeight - CubeSize * 2);

// Width of a textinput or touchableopacity with a cubesize X button to the right
const TextBarOption = TransformDimensions(FullBar - CubeSize - StandardPadding);

// Object with variable font size options fed to GlobalStyles.
const FontDimensions = FontSize(StandardPadding);

// In a lineup of 6 cubesize buttons, this output is the (right side?) margin each must have to stay within FullBar width and fill the available space (use only when FlexBox capabilities aren't available)
const InputMargin6 = TransformDimensions(
  (ScreenWidth - LargePadding - CubeSize * 6) / 10
);

// Standard size of an Icon. Feather, our current library, uses baseline 20 which is a little small and isn't dynamic.
const IconSize = TransformDimensions(StandardPadding * 2.3);

const BlurRadius = 20;

const BackgroundOpacity = 0.6;

const GetVaultDataLimit = 10;

const DeletedBufferInDays = 10;

const NotificationItemHeight = CubeSize + StandardPadding * 4;

const GameCoverWidth = HalfBar - 2 * StandardPadding;

const Environment = {
  Region: "us-east-1",
  ScreenWidth,
  ScreenHeight,
  StandardPadding,
  LargePadding,
  SmallPadding,
  CubeSize,
  FullBar,
  HalfBar,
  PostViewAspectRatio,
  StandardRadius,
  SmallPfp,
  SmallRadius,
  PostViewHeight,
  FontDimensions,
  TextBarOption,
  InputMargin6,
  IconSize,
  BlurRadius,
  BackgroundOpacity,
  GetVaultDataLimit,
  DeletedBufferInDays,
  NotificationItemHeight,
  GameCoverWidth,
};

export default Environment;
