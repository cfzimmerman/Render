import { VaultPostFullViewUsecaseTypes } from "../../../home_vault/pages/VaultPostFullView";

interface InputTypes {
  usecase: VaultPostFullViewUsecaseTypes;
  navigation: any;
  index: number;
}

const EnterComments = ({ usecase, navigation, index }: InputTypes) => {
  if (
    usecase === "gallery" ||
    usecase === "otherusergallery" ||
    usecase === "stories" ||
    usecase === "addedfeed" ||
    usecase === "publicfeed" ||
    usecase === "universal" ||
    usecase === "HVGameSearch" ||
    usecase === "vault" ||
    usecase === "PGLanding"
  ) {
    navigation.navigate("CommentsMain", { usecase, index });
  }
};

export default EnterComments;
