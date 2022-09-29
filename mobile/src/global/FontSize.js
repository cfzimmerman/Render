// Generates dynamic font sizes (int) given screen width
// prop is StandardPadding from Environment.js

const FontSize = (standardPadding) => {
  const FontSizes = {
    h1text: Math.round(standardPadding * 4),
    h2text: Math.round(standardPadding * 3),
    h3text: Math.round(standardPadding * 2),
    h4text: Math.round(standardPadding * 1.75),
    p1text: Math.round(standardPadding * 1.5),
    p2text: Math.round(standardPadding * 1.25),
  };

  return FontSizes;
};

export default FontSize;
