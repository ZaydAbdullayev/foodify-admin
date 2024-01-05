import { MdDashboard, MdFastfood, MdTableBar } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoIosRestaurant } from "react-icons/io";
import { GiCook, GiRiceCooker } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { RiBoxingFill } from "react-icons/ri";
import { MdFormatListBulleted, MdAddBusiness } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
// import { FiPlusCircle } from "react-icons/fi";
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
import { LiaListAlt } from "react-icons/lia";

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
    id: "1453",
    path: "/",
    name: "Dashboard",
    positions: [65, -65, 70],
    icon: <MdDashboard />,
  },
  {
    id: "1",
    path: "",
    name: "Taomlar",
    positions: [65, -65, 70],
    icon: <IoIosRestaurant />,
  },
  {
    id: "1",
    path: "/workers",
    name: "Ishchilar",
    positions: [0, 0, 65],
    icon: <HiMiniUserGroup />,
  },
  {
    id: "1",
    name: "Envantarizatsiya",
    path: "/envantarisation",
    positions: [-65, 65, 70],
    icon: <LiaListAlt />,
  },
  {
    id: "2",
    path: "/",
    name: "Buyurtmalar",
    positions: [90, -90, 90],
    icon: <RiBoxingFill />,
  },

  {
    id: "2",
    path: "/cooking/food",
    name: "Tayyorlanayotgan taomlar",
    positions: [45, -45, 90],
    icon: <GiCook />,
  },
  {
    id: "2",
    path: "/prepared/food",
    name: "Tayyor bo'lgan taomlar",
    positions: [0, 0, 90],
    icon: <MdFastfood />,
  },
  {
    id: "2",
    name: "Oldindan buyurtma",
    path: "/pre-orders",
    positions: [-45, 45, 90],
    icon: <GiRiceCooker />,
  },
  {
    id: "2",
    name: "Stollar & Xonalar",
    path: "/tables",
    positions: [-90, 90, 90],
    icon: <MdTableBar />,
  },

  {
    id: "3",
    path: "",
    name: "To'lov kiritish",
    positions: [90, -90, 90],
    icon: <BsCashCoin />,
  },
  {
    id: "3",
    name: "Tranzaksiyalar",
    path: "/cashbox/transactions",
    positions: [45, -45, 90],
    icon: <MdStorage />,
  },
  {
    id: "3",
    name: "Kassa hisoboti",
    path: "/cashbox/transaction-report",
    positions: [0, 0, 90],
    icon: <MdStorage />,
  },
  {
    id: "3",
    name: "Kassalar",
    path: "/cashbox",
    positions: [-45, 45, 90],
    icon: <MdStorage />,
  },
  {
    id: "3",
    name: "Buyurtmalar hisoboti",
    path: "/orders",
    positions: [-90, 90, 90],
    icon: <TbReport />,
  },
  {
    id: "4",
    name: "To'lovlar",
    path: "",
    positions: [90, -90, 90],
    icon: <FaMoneyCheckDollar />,
  },
  {
    id: "4",
    name: "Chiqimlar",
    path: "/expenses",
    positions: [45, -45, 90],
    icon: <TbFileInvoice />,
  },
  {
    id: "4",
    name: "Taqsimlash",
    path: "/cutting",
    positions: [0, 0, 90],
    icon: <GiPizzaCutter />,
  },
  {
    id: "4",
    name: "Zararlangan taomlar",
    path: "/damaget-items",
    positions: [-45, 45, 90],
    icon: <RiFileDamageFill />,
  },
  {
    id: "4",
    name: "Ko'chirib o'tkazish",
    path: "/carry-up",
    positions: [-90, 90, 90],
    icon: <MdMoveUp />,
  },
  {
    id: "4",
    name: "Mahsulot tayyorlash",
    path: "/making-food",
    positions: [],
    icon: <GiRiceCooker />,
  },
  {
    id: "5",
    name: "Yetkazuvchilar",
    path: "/suppliers",
    positions: [90, -90, 90],
    icon: <TbTruckDelivery />,
  },
  {
    id: "5",
    path: "/storage",
    name: "Ombor",
    positions: [45, -45, 90],
    icon: <FaLayerGroup />,
  },
  {
    id: "5",
    name: "Bo'limlar",
    path: "/departments",
    positions: [0, 0, 90],
    icon: <BiSolidComponent />,
  },
  {
    id: "5",
    name: "Categoriyalar",
    path: "/categories",
    positions: [-45, 45, 90],
    icon: <BiSolidCategory />,
  },
  {
    id: "5",
    name: "Guruhlar",
    path: "/groups",
    positions: [-90, 90, 90],
    icon: <MdStorage />,
  },
  {
    id: "5",
    name: "Ingredientlar",
    path: "/ingredients",
    positions: [],
    icon: <HiOutlineClipboardList />,
  },
  {
    id: "5",
    name: "Mahsulotlar",
    path: "/s-products",
    positions: [],
    icon: <GiRiceCooker />,
  },
  {
    id: "5",
    name: "To'lov guruhlari",
    path: "/invoice-group",
    positions: [],
    icon: <MdStorage />,
  },
  {
    id: "5",
    name: "To'lov guruhlari",
    path: "/cashbox/transaction-group",
    positions: [],
    icon: <MdStorage />,
  },
  {
    id: "765433",
    name: "Taomlar hisoboti",
    path: "/items",
    positions: [],
    icon: <MdRestaurantMenu />,
  },
  {
    id: "765433",
    name: "Bekor qilindan taomlar",
    path: "/rejects",
    positions: [],
    icon: <TbPlaylistX />,
  },
  {
    id: "765433",
    name: "Yetkazuvchi hisoboti",
    path: "/supplier",
    positions: [],
    icon: <TbPlaylistX />,
  },
  {
    id: "765433",
    name: "Mahsulotlar hisoboti",
    path: "/ingredients",
    positions: [],
    icon: <PiDotsNineFill />,
  },
  {
    id: "0765435",
    name: "Restaurant list",
    path: "",
    positions: [],
    icon: <MdFormatListBulleted />,
  },
  {
    id: "0765435",
    name: "Add restaurant",
    path: "/add",
    positions: [],
    icon: <MdAddBusiness />,
  },
];
