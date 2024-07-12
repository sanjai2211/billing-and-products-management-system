import { ArrowLeftToLine,ArrowRightToLine,BadgeCheck,BarChart3,Boxes,Cable, ChevronLeft, ClipboardList, CloudCog, FileBarChart, FileBarChart2, HandCoins, Headset, Home, IndianRupee, Layers, LayoutDashboard, LayoutList, LineChart, List,ListChecks,ListPlus, ListTodo,LogOut,Mail,MapPinned,Moon, MoreHorizontal, MoreVertical, Pen, Pencil, Phone, Plus, Save, Settings,SlidersHorizontal,SquarePlus,Store,Sun, Trash, Trash2, User, UserCog, UserCog2 } from 'lucide-react';
import { FC } from 'react';

const iconMap = {
    ArrowLeftToLine,
    ArrowRightToLine,
    BarChart3,
    BadgeCheck,
    Boxes,
    Cable,
    ChevronLeft,
    ClipboardList,
    CloudCog,
    FileBarChart, 
    FileBarChart2,
    HandCoins,
    Headset,
    Home,
    IndianRupee,
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
    Plus,
    Phone,
    Save,
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
