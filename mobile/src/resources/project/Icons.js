import {
  Home,
  Compass,
  Aperture,
  Lock,
  User,
  ChevronLeft,
  ArrowRight,
  X,
  Check,
  List,
  Search,
  Anchor,
  Maximize,
  Trash,
  Share,
  Book,
  Star,
  Settings,
  UserCheck,
  Plus,
  PlusSquare,
  Phone,
  Smartphone,
  Globe,
  UserPlus,
  Mail,
  Play,
  Pause,
  Video,
  Server,
  MoreVertical,
  Edit,
  Clock,
  Type,
  FileText,
} from "react-native-feather";
import Environment from "./Environment";
import Colors from "./Colors";

// Imports icons from the Feather library and bundles them into a JS object. Allows easy changing of global icons and steers around name duplication issues

// Functions that resize icons that must be larger or smaller than 24px

function BackButton() {
  const Size = Environment.StandardPadding * 7;
  return <ChevronLeft width={Size} height={Size} stroke={Colors.AccentOff} />;
}

const OriginalSizeIcons = {
  HomeIcon: Home,
  ExploreIcon: Compass,
  PlusIcon: PlusSquare,
  VaultIcon: Lock,
  ProfileIcon: User,
  NextIcon: ArrowRight,
  X,
  Checkmark: Check,
  List,
  Search,
  FullScreen: Maximize,
  Trash,
  Share,
  Gallery: Book,
  Saved: Star,
  Settings,
  Friends: UserCheck,
  Phone: Smartphone,
  Web: Globe,
  AddUser: UserPlus,
  CurrentFriend: UserCheck,
  Play,
  Pause,
  Social: Server,
  More: MoreVertical,
  Edit,
  Clock,
  Anchor,
  Text: FileText,
};

const ResizedIcons = {
  BackButton,
};

const Icons = {
  OriginalSize: OriginalSizeIcons,
  Resized: ResizedIcons,
};

export default Icons;