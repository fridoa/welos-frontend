import { BiCar } from "react-icons/bi";
import { CiCalendarDate, CiGrid41, CiUser, CiWallet } from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <CiGrid41 />,
  },
  {
    key: "kendaraan",
    label: "Kendaraan",
    href: "/admin/kendaraan",
    icon: <BiCar />,
  },
  {
    key: "pelanggan",
    label: "Pelanggan",
    href: "/admin/pelanggan",
    icon: <CiUser />,
  },
  {
    key: "booking",
    label: "Booking",
    href: "/admin/booking",
    icon: <CiCalendarDate />,
  },
  {
    key: "transactions",
    label: "Transactions",
    href: "/admin/transactions",
    icon: <CiWallet />,
  },
];

export { SIDEBAR_ADMIN };
