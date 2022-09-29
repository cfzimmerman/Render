const CheckForFillErrors = ({ id, vaultfeeddata }) => {
  const result = vaultfeeddata.find((item) => item.id === id);

  if (typeof result === "undefined") {
    // No error
    return false;
  }
  // Error
  return true;
};

export default CheckForFillErrors;
