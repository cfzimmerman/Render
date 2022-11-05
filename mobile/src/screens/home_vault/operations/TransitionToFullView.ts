const TransitionToFullView = ({ id, navigation, data, usecase }) => {
  const startindex = data.findIndex((item) => item.id === id);

  navigation.navigate("VaultPostFullView", { startindex, usecase });
};

export default TransitionToFullView;
