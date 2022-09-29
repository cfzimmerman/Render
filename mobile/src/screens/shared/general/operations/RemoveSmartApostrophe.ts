const RemoveSmartApostrophe = (text: string): string => {
  return text.replace(/[’]/g, "'");
};

export default RemoveSmartApostrophe;
