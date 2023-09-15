import { MdDashboard, MdFastfood } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { GiCook } from "react-icons/gi";

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
    id: "098765",
    path: "/",
    name: "Buyurtmalar",
    icon: <MdDashboard />,
    list: false,
  },
  {
    id: "243567",
    path: "/product",
    name: "Products",
    icon: <IoIosRestaurant />,
    list: true,
  },
  // {
  //   id: "345674",
  //   path: "/cooking/food",
  //   name: "Tayyorlanayotgan taomlar",
  //   icon: <GiCook />,
  //   list: false,
  // },
  {
    id: "344343",
    path: "/prepared/food",
    name: "Tayyor bo'lgan taomlar",
    icon: <MdFastfood />,
    list: false,
  },
  {
    id: "765433",
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting />,
    list: false,
  },
];

export const Category = [
  {
    id: "0765435",
    name: "Restaurant list",
    path: "",
  },
  {
    id: "0765435",
    name: "Add restaurant",
    path: "/add",
  },
  {
    id: "243567",
    name: "Product list",
    path: "",
  },
  {
    id: "243567",
    name: "Add product",
    path: "/add",
  },
];
