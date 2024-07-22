import { ArrowLeftToLine,ArrowRightToLine,BadgeCheck,BarChart3,Boxes,Cable, CalendarCheck, CalendarClock, Check, ChevronDown, ChevronLeft, ChevronsUpDown, ChevronUp, CircleCheckBig, CircleX, ClipboardList, ClipboardPlus, CloudCog, Eye, FileBarChart, FileBarChart2, FilePen, FileStack, FolderSymlink, HandCoins, Headset, Home, IndianRupee, Landmark, Layers, LayoutDashboard, LayoutList, LineChart, List,ListChecks,ListPlus, ListTodo,LogOut,Mail,MapPinned,Moon, MoreHorizontal, MoreVertical, Pen, Pencil, Percent, Phone, PhoneCall, Plus, Receipt, ReceiptText, RefreshCcw, Save, ScrollText, Search, Settings,SlidersHorizontal,SquarePlus,Store,Sun, Trash, Trash2, User, UserCog, UserCog2 } from 'lucide-react';
import { FC } from 'react';

const iconMap = {
    ArrowLeftToLine,
    ArrowRightToLine,
    BarChart3,
    BadgeCheck,
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
    Eye,
    FileBarChart, 
    FileBarChart2,
    FilePen,
    FolderSymlink,
    FileStack,
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
    Pen,
    Pencil,
    Percent,
    Plus,
    Phone,
    PhoneCall,
    ReceiptText,
    RefreshCcw,
    Save,
    ScrollText,
    Search,
    Settings,
    SlidersHorizontal,
    SquarePlus,
    Store,
    Sun,
    Trash,
    Trash2,
    User,
    UserCog,
    UserCog2,
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
