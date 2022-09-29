const TransitionToFullView = ({ id, navigation, data, usecase }) => {
  // const FindId = (( element ) => element.id === id)
  // prop.navigation.navigate('SignupCode', {email: input})

  const startindex = data.findIndex((item) => item.id === id);

  navigation.navigate("VaultPostFullView", { startindex, usecase });
};

export default TransitionToFullView;
