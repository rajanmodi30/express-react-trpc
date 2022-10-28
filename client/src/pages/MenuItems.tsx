import { Fragment } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { LogOut } from "../components/LogOut";
import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";

let activeStyle = {
  textDecoration: "underline",
};

export const mainListItems = (
  <Fragment>
    <Link
      // component={NavLink}
      //  style={({ isActive }) =>
      //         isActive ? activeStyle : undefined
      //       }
      color="inherit"
      underline="none"
      href="/admin"
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>{" "}
    <Link color="inherit" underline="none" href="/admin/users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <LogOut />
  </Fragment>
);
