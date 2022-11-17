import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useThemeStore } from "../store/theme";
import { MenuItemsType } from "../utils/types";

export const SideBarMenuItems = () => {
  const { currentSideBarTitle, setCurrentSideBarTitle, setCurrentSideBarLink } =
    useThemeStore();

  const menuLocation = useLocation();

  const [activeMenu, setActiveMenu] = useState<MenuItemsType | null>(null);

  const menuItems: MenuItemsType[] = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <DashboardIcon />,
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: <PeopleIcon />,
    },
  ];

  useEffect(() => {
    const link =
      "/" +
      menuLocation.pathname
        .split("/")
        .filter((x) => x)
        .splice(0, 2)
        .join("/");

    const currentActiveLink = menuItems.find((menuItem) => {
      return menuItem.link === link;
    });

    if (currentActiveLink !== undefined) {
      setActiveMenu(currentActiveLink);
      if (currentSideBarTitle !== currentActiveLink.name) {
        setCurrentSideBarTitle(currentActiveLink.name);
        setCurrentSideBarLink(currentActiveLink.link);
      }
    }
  }, [menuLocation]);

  return (
    <>
      {menuItems.map((item, index) => (
        <Link color="inherit" key={index} underline="none" href={item.link}>
          <ListItemButton selected={activeMenu?.link === item.link}>
            <ListItemIcon
              style={{
                color: activeMenu?.link === item.link ? "#ffff" : "#9da5b1",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              style={{
                color: activeMenu?.link === item.link ? "#ffff" : "#9da5b1",
              }}
              primary={item.name}
            />
          </ListItemButton>
        </Link>
      ))}
    </>
  );
};
