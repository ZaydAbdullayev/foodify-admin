import { MdDashboard, MdFastfood } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { RiBoxingFill } from "react-icons/ri";
import { MdFormatListBulleted, MdAddBusiness } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
const dep = JSON?.parse(localStorage?.getItem("department")) || null;

export const Menu = [
  {
    id: "098765",
    path: "",
    name: "Dashboard",
    icon: <MdDashboard />,
    list: false,
  },
  {
    id: "0765435",
    path: "/restaurant",
    name: "Restaurants",
    icon: <SiHomeassistantcommunitystore />,
    list: true,
  },
  {
    id: "243567",
    path: "/product",
    name: "Products",
    icon: <IoIosRestaurant />,
    list: true,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
    list: false,
  },
];

export const Menu_customer = [
  {
    id: "098346",
    path: dep === "owner" ? "/" : "/historical",
    name: "Dashboard",
    icon: <MdDashboard />,
    list: false,
    permission: dep === "owner" || dep === "kassir" ? true : false,
  },
  {
    id: "098765",
    path: dep === "owner" ? "/orders" : "/",
    name: "Buyurtmalar",
    icon: <RiBoxingFill />,
    list: false,
    permission: dep ? true : false,
  },
  {
    id: "243567",
    path: "/product",
    name: "Taomlar",
    icon: <IoIosRestaurant />,
    list: true,
    permission: dep ? true : false,
  },
  {
    id: "345674",
    path: "/cooking/food",
    name: "Tayyorlanayotgan taomlar",
    icon: <GiCook />,
    list: false,
    permission: dep ? true : false,
  },
  {
    id: "344343",
    path: "/prepared/food",
    name: "Tayyor bo'lgan taomlar",
    icon: <MdFastfood />,
    list: false,
    permission: dep ? true : false,
  },
  {
    id: "765423",
    path: "/payment",
    name: "To'lov kiritish",
    icon: <BsCashCoin />,
    list: false,
    permission: dep ? true : false,
  },
  {
    id: "102938",
    path: "/workers",
    name: "Ishchilar",
    icon: <HiMiniUserGroup />,
    list: true,
    permission: dep === "owner" ? true : false,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
    list: false,
    permission: dep ? true : false,
  },
];

export const Category = [
  {
    id: "0765435",
    name: "Restaurant list",
    path: "",
    icon: <MdFormatListBulleted />,
  },
  {
    id: "0765435",
    name: "Add restaurant",
    path: "/add",
    icon: <MdAddBusiness />,
  },
  {
    id: "243567",
    name: "Taomlar ro'yxati",
    path: "",
    icon: <HiOutlineClipboardList />,
  },
  {
    id: "243567",
    name: "Taom qo'shish",
    path: dep === "kassir" ? "/add" : "",
    icon: <FiPlusCircle />,
  },
];
