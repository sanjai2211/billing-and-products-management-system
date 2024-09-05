import {
  Aperture,
  ArrowLeftToLine,
  ArrowRightToLine,
  BadgeCheck,
  BarChart3,
  Boxes,
  Braces,
  Cable,
  CalendarCheck,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronsUpDown,
  ChevronUp,
  CircleCheckBig,
  CircleX,
  ClipboardList,
  ClipboardPlus,
  CloudCog,
  DiamondPercent,
  Download,
  Eye,
  FileBarChart,
  FileBarChart2,
  FileBox,
  FilePen,
  FileSpreadsheet,
  FileStack,
  FileText,
  FolderArchive,
  FolderOpen,
  Folders,
  FolderSymlink,
  Grid2x2Check,
  HandCoins,
  Headset,
  Home,
  IndianRupee,
  Landmark,
  Layers,
  LayoutDashboard,
  LayoutList,
  LineChart,
  List,
  ListChecks,
  ListPlus,
  ListTodo,
  LogOut,
  Mail,
  MapPinned,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  PackagePlus,
  Pen,
  Pencil,
  Percent,
  Phone,
  PhoneCall,
  Plus,
  Printer,
  Receipt,
  ReceiptText,
  RefreshCcw,
  Ribbon,
  Route,
  Save,
  ScanBarcode,
  ScrollText,
  Search,
  Settings,
  Sheet,
  ShoppingBasket,
  Slack,
  SlidersHorizontal,
  SquareKanban,
  SquarePlus,
  SquareUserRound,
  Store,
  Sun,
  Target,
  Trash,
  Trash2,
  User,
  UserCog,
  UserCog2,
  UserPlus,
  Users,
} from "lucide-react";
import { FC } from "react";

const iconMap = {
  ArrowLeftToLine,
  ArrowRightToLine,
  Aperture,
  BarChart3,
  BadgeCheck,
  Braces,
  Boxes,
  Cable,
  CalendarClock,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ChevronsUpDown,
  CircleCheckBig,
  CircleX,
  ClipboardList,
  ClipboardPlus,
  CloudCog,
  DiamondPercent,
  Download,
  Eye,
  FolderArchive,
  Folders,
  FolderOpen,
  FileBarChart,
  FileBarChart2,
  FileBox,
  FilePen,
  FolderSymlink,
  FileSpreadsheet,
  FileStack,
  FileText,
  Grid2x2Check,
  HandCoins,
  Headset,
  Home,
  IndianRupee,
  Landmark,
  Layers,
  LayoutDashboard,
  LayoutList,
  LineChart,
  List,
  ListChecks,
  ListPlus,
  ListTodo,
  LogOut,
  Mail,
  MapPinned,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  PackagePlus,
  Pen,
  Pencil,
  Percent,
  Plus,
  Phone,
  PhoneCall,
  Printer,
  ReceiptText,
  RefreshCcw,
  Ribbon,
  Route,
  Save,
  ScanBarcode,
  ScrollText,
  Search,
  Settings,
  Sheet,
  ShoppingBasket,
  SlidersHorizontal,
  SquareKanban,
  SquarePlus,
  SquareUserRound,
  Store,
  Sun,
  Target,
  Trash,
  Trash2,
  User,
  UserCog,
  UserCog2,
  UserPlus,
  Users,
  
} as const;

type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  [key: string]: any;
}

export const Icon: FC<IconProps> = ({ name, ...rest }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...rest} />;
};
