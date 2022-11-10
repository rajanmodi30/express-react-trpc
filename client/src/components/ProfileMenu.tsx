import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Avatar, Box, Link, Menu, MenuItem, Tooltip } from "@mui/material";
import { LogOut } from "./LogOut";

export const ProfileMenu = () => {
  const settings = [
    { name: "Profile", link: "" },
    { name: "Change Password", link: "/admin/users/change-password" },
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <Link
            href={setting.link}
            key={index}
            color="inherit"
            underline="none"
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          </Link>
        ))}
        <LogOut />
      </Menu>
    </Box>
  );
};
