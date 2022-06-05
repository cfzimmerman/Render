// This function is used to round numbers to three decimal points. Outputs a float with 3 decimal points.

// Number of decimals reach dimension is rounded to
const DecimalCount = 3;

// First, rounds number to three decimal places (returns a string). Then, converts string to float.
const TransformDimensions = (prop) => parseFloat(prop.toFixed(DecimalCount));

export default TransformDimensions;
