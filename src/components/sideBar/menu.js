import { MdDashboard, MdFastfood } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { GiCook, GiRiceCooker } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { RiBoxingFill } from "react-icons/ri";
import { MdFormatListBulleted, MdAddBusiness } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FiPlusCircle } from "react-icons/fi";
import { MdStorage } from "react-icons/md";
import { BiSolidCategory, BiSolidComponent } from "react-icons/bi";
import { FaLayerGroup, FaMoneyCheckDollar } from "react-icons/fa6";
import { TbFileInvoice, TbTruckDelivery } from "react-icons/tb";
import { RiFileDamageFill } from "react-icons/ri";
import { GiPizzaCutter } from "react-icons/gi";
import { MdMoveUp } from "react-icons/md";
import { TbReport } from "react-icons/tb";

const dep = JSON.parse(localStorage.getItem("department")) || null;

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
    list: false,
    permission: dep === "owner" ? true : false,
  },
  {
    id: "765433",
    path: "/storage",
    name: "Ombor",
    icon: <FaLayerGroup />,
    list: true,
    permission: dep ? true : false,
  },
  // {
  //   id: "765444",
  //   path: "/reports",
  //   name: "Hisobotlar",
  //   icon: <TbReport />,
  //   list: true,
  //   permission: dep ? true : false,
  // },
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
  {
    id: "765433",
    name: "Bo'limlar",
    path: "/departments",
    icon: <BiSolidComponent />,
  },
  {
    id: "765433",
    name: "Categoriyalar",
    path: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    id: "765433",
    name: "Guruhlar",
    path: "/groups",
    icon: <MdStorage />,
  },
  {
    id: "765433",
    name: "Ingredientlar",
    path: "/ingredients",
    icon: <HiOutlineClipboardList />,
  },
  {
    id: "765433",
    name: "Mahsulotlar",
    path: "/s-products",
    icon: <GiRiceCooker />,
  },
  {
    id: "765433",
    name: "Yetkazuvchilar",
    path: "/suppliers",
    icon: <TbTruckDelivery />,
  },
  {
    id: "765433",
    name: "To'lovlar",
    path: "/invoices",
    icon: <FaMoneyCheckDollar />,
  },
  {
    id: "765433",
    name: "Chiqimlar",
    path: "/expenses",
    icon: <TbFileInvoice />,
  },
  {
    id: "765433",
    name: "Taqsimlash",
    path: "/cutting",
    icon: <GiPizzaCutter />,
  },
  {
    id: "765433",
    name: "Zararlangan taomlar",
    path: "/damaget-items",
    icon: <RiFileDamageFill />,
  },
  {
    id: "765433",
    name: "Ko'chirib o'tkazish",
    path: "/carry-up",
    icon: <MdMoveUp />,
  },
  {
    id: "765433",
    name: "Hisobotlar",
    path: "/report/orders",
    icon: <TbReport />,
  },
];
