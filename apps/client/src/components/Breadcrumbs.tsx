import { Breadcrumbs, Link, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useThemeStore } from "../store/theme";
import { capitalizeFirstLetter } from "../utils";

export const BreadcrumbsToolBar = () => {
  const menuLocation = useLocation();
  //TODO bad implementation need to improve here
  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);
  const { currentSideBarLink } = useThemeStore();
  useEffect(() => {
    const values = menuLocation.pathname
      .split("/")
      .filter((value) => value)
      .map((value) => {
        return capitalizeFirstLetter(value);
      });

    values.shift();
    setBreadCrumbs(values);
  }, [menuLocation]);

  return (
    <Toolbar
      sx={{
        justifyContent: "flex-start",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumbs.length > 1 ? (
          breadCrumbs.map((breadCrumb, index) =>
            index === 0 ? (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href={currentSideBarLink ?? ""}
              >
                {breadCrumb}
              </Link>
            ) : (
              <Typography key={index} color="text.primary">
                {breadCrumb}{" "}
              </Typography>
            )
          )
        ) : (
          <Typography color="text.primary">
            {breadCrumbs.length > 0 ? breadCrumbs[0] : "Dashboard"}{" "}
          </Typography>
        )}
      </Breadcrumbs>
    </Toolbar>
  );
};
