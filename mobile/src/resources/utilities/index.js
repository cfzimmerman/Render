// Rounds numerical function exports to X decimal points (currently set to 3)
export { default as TransformDimensions } from "./TransformDimensions";

// Checks if post dimensions require vertical or horizontal constraint. Returns object of post height and width appropriate for current screen.
export { default as GetPostDimensions } from "./GetPostDimensions";

// Wrapper accepting page children that dismisses a keyboard on tap
export { default as DismissKeyboard } from "./DismissKeyboard";

// Checks if the system setting is Light or Dark mode. Used to manually compel native components to comply with system settings.
export { default as IsDarkMode } from "./IsDarkMode";

// Rotates screen orientation to Portrait mode
export { default as ToPortrait } from "./ToPortrait";

// Watches user's posts and initiates local updates when triggered
export { default as ObservePostDB } from "./Global/ObservePostDB";

// Takes date object or string and returns "Month YYYY" string
export { default as GetDate } from "./GetDate";

export { default as CopyToClipboard } from "./CopyToClipboard";

export { default as CorrectNextToken } from "./CorrectNextToken";
