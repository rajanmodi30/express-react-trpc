import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { LogOut } from "../components/LogOut";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";

export const SideBarMenuItems = () => {
  const activeMenuLink =
    "/" +
    useLocation()
      .pathname.split("/")
      .filter((x) => x)
      .splice(0, 2)
      .join("/");

  const menuItems = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <DashboardIcon />,
      active: false,
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: <PeopleIcon />,
      active: false,
    },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <Link key={index} underline="none" href={item.link}>
          <ListItemButton selected={activeMenuLink === item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </Link>
      ))}
      <LogOut />
    </>
  );
};
