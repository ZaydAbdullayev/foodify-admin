import { MdDashboard, MdFastfood, MdTableBar } from "react-icons/md";
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
import { MdMoveUp, MdRestaurantMenu } from "react-icons/md";
import { TbReport, TbPlaylistX } from "react-icons/tb";
import { PiDotsNineFill } from "react-icons/pi";
import { FaSitemap } from "react-icons/fa6";

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
    id: "1",
    path: "/managment",
    name: "Bashqaruv paneli ",
    icon: <MdDashboard />,
    list: true,
    permission: true,
  },
  {
    id: "2",
    path: "/orders",
    name: "Buyurtmalar boshqaruvi",
    icon: <RiBoxingFill />,
    list: true,
    permission: true,
  },
  {
    id: "3",
    path: "/financial",
    name: "Kassa boshqaruvi",
    icon: <BsCashCoin />,
    list: true,
    permission: true,
  },
  {
    id: "4",
    path: "/storage",
    name: "Ombor boshqaruvi",
    icon: <FaLayerGroup />,
    list: true,
    permission: true,
  },
  {
    id: "5",
    path: "/sections",
    name: "Bo'limlar boshqaruvi",
    icon: <FaSitemap />,
    list: true,
    permission: true,
  },
];

export const Category = [
  {
    id: "1",
    path: dep === "owner" ? "/" : "/historical",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "2",
    path: dep === "owner" ? "/orders" : "/",
    name: "Buyurtmalar",
    icon: <RiBoxingFill />,
  },
  {
    id: "1",
    path: "/product",
    name: "Taomlar",
    icon: <IoIosRestaurant />,
  },
  {
    id: "2",
    path: "/cooking/food",
    name: "Tayyorlanayotgan taomlar",
    icon: <GiCook />,
  },
  {
    id: "2",
    path: "/prepared/food",
    name: "Tayyor bo'lgan taomlar",
    icon: <MdFastfood />,
  },
  {
    id: "3",
    path: "/payment",
    name: "To'lov kiritish",
    icon: <BsCashCoin />,
  },
  {
    id: "5",
    path: "/workers",
    name: "Ishchilar",
    icon: <HiMiniUserGroup />,
  },
  {
    id: "5",
    path: "/storage",
    name: "Ombor",
    icon: <FaLayerGroup />,
  },
  // {
  //   id: "765444",
  //   path: "s",
  //   name: "Hisobotlar",
  //   icon: <TbReport />,
  // },

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
  // {
  //   id: "1",
  //   name: "Taomlar ro'yxati",
  //   path: "",
  //   icon: <HiOutlineClipboardList />,
  // },
  {
    id: "1",
    name: "Taom qo'shish",
    path: dep === "kassir" || dep === "owner" ? "/add" : "",
    icon: <FiPlusCircle />,
  },
  {
    id: "5",
    name: "Bo'limlar",
    path: "/departments",
    icon: <BiSolidComponent />,
  },
  {
    id: "5",
    name: "Categoriyalar",
    path: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    id: "5",
    name: "Guruhlar",
    path: "/groups",
    icon: <MdStorage />,
  },
  {
    id: "5",
    name: "Ingredientlar",
    path: "/ingredients",
    icon: <HiOutlineClipboardList />,
  },
  {
    id: "5",
    name: "Mahsulotlar",
    path: "/s-products",
    icon: <GiRiceCooker />,
  },
  {
    id: "5",
    name: "Yetkazuvchilar",
    path: "/suppliers",
    icon: <TbTruckDelivery />,
  },
  {
    id: "4",
    name: "To'lovlar",
    path: "/invoices",
    icon: <FaMoneyCheckDollar />,
  },
  {
    id: "4",
    name: "Chiqimlar",
    path: "/expenses",
    icon: <TbFileInvoice />,
  },
  {
    id: "4",
    name: "Taqsimlash",
    path: "/cutting",
    icon: <GiPizzaCutter />,
  },
  {
    id: "4",
    name: "Zararlangan taomlar",
    path: "/damaget-items",
    icon: <RiFileDamageFill />,
  },
  {
    id: "4",
    name: "Ko'chirib o'tkazish",
    path: "/carry-up",
    icon: <MdMoveUp />,
  },
  {
    id: "5",
    name: "To'lov guruhlari",
    path: "/invoice-group",
    icon: <MdStorage />,
  },
  {
    id: "4",
    name: "Mahsulot tayyorlash",
    path: "/making-food",
    icon: <GiRiceCooker />,
  },
  {
    id: "2",
    name: "Oldindan buyurtma",
    path: "/pre-orders",
    icon: <GiRiceCooker />,
  },
  {
    id: "2",
    name: "Stollar & Xonalar",
    path: "/tables",
    icon: <MdTableBar />,
  },
  {
    id: "765433",
    name: "Buyurtmalar hisoboti",
    path: "/orders",
    icon: <TbReport />,
  },
  {
    id: "765433",
    name: "Taomlar hisoboti",
    path: "/items",
    icon: <MdRestaurantMenu />,
  },
  {
    id: "765433",
    name: "Bekor qilindan taomlar",
    path: "/rejects",
    icon: <TbPlaylistX />,
  },
  {
    id: "765433",
    name: "Yetkazuvchi hisoboti",
    path: "/supplier",
    icon: <TbPlaylistX />,
  },
  {
    id: "765433",
    name: "Mahsulotlar hisoboti",
    path: "/ingredients",
    icon: <PiDotsNineFill />,
  },
  {
    id: "5",
    name: "Kassalar",
    path: "/cashbox",
    icon: <MdStorage />,
  },
  {
    id: "5",
    name: "To'lov guruhlari",
    path: "/cashbox/transaction-group",
    icon: <MdStorage />,
  },
  {
    id: "3",
    name: "Tranzaksiyalar",
    path: "/cashbox/transactions",
    icon: <MdStorage />,
  },
  {
    id: "3",
    name: "Kassa hisoboti",
    path: "/cashbox/transaction-report",
    icon: <MdStorage />,
  },
];
