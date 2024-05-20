import {
  AppBar,
  Button,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import React, { useState, useMemo } from "react";
import { BugReport, ChromeReaderMode } from "@mui/icons-material";
import { Logo } from "./styles";
import { useFeatureFlag } from "@/hooks/index";
import { REPORT_A_BUG, TAGGING_GUIDE, USAGE_GUIDE } from "@/constants";
import { primary } from "@/theme/colors";
import LoginButton from "@/components/LoginButton";
import { Link } from "react-router-dom";

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.JSX.Element;
};

type InfoMenuItemProps = {
  handleClose: () => void;
  url: string;
  icon: React.ReactNode;
  label: string;
  show: boolean;
};

const menuItemStyles = { px: 3, py: 1.7 };
const linkStyles = { display: "flex", alignItems: "center", height: "100%" };
export const iconStyles = { color: primary.darkBlue, mr: 2 };

export const InfoMenuItem = ({
  handleClose,
  url,
  icon,
  label,
  show,
}: InfoMenuItemProps) => {
  if (!show) {
    return <></>;
  }
  return (
    <MenuItem onClick={handleClose} sx={menuItemStyles}>
      <Link
        to={url}
        color="inherit"
        target="_blank"
        style={{
          ...linkStyles,
          textDecoration: "none",
          color: "inherit",
          width: "100%",
        }}
      >
        {icon}
        {label}
      </Link>
    </MenuItem>
  );
};

const DefaultLeft: React.ReactNode = (
  <Stack
    direction="row"
    spacing={2}
    sx={{ display: "flex", alignItems: "center" }}
  >
    <Link to="/">
      <Logo src="/assets/abyss_fabric_logo_white.png" alt="Abyss Fabric" />
    </Link>
    <LoginButton />
  </Stack>
);

export const DefaultRight = () => {
  const [anchorElement, setAnchorElement] = useState<undefined | HTMLElement>(
    undefined
  );
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(undefined);
  };

  const isTaggingDeployment = useMemo(() => {
    const pathname = window.location.pathname.split("/");
    return pathname.includes("analysis") && pathname.includes("inspection");
  }, []);

  const isAitEngineer = useFeatureFlag("ait-engineer");

  const menuItems = [
    {
      url: TAGGING_GUIDE,
      icon: <ChromeReaderMode sx={iconStyles} />,
      label: "Tagging guide",
      show: isAitEngineer && isTaggingDeployment,
    },
    {
      url: USAGE_GUIDE,
      icon: <ChromeReaderMode sx={iconStyles} />,
      label: "Usage guide",
      show: !isTaggingDeployment,
    },
    {
      url: REPORT_A_BUG,
      icon: <BugReport sx={iconStyles} />,
      label: "Report a bug",
      show: true,
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={4}
      justifyContent="flex-end"
      alignItems="center"
    >
      <Button onClick={handleClick} sx={{ color: "white", minWidth: 0 }}>
        <HelpOutlineIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList sx={{ p: 0, width: 220 }}>
          {menuItems.map((item) => (
            <InfoMenuItem
              key={item.label}
              handleClose={handleClose}
              {...item}
            />
          ))}
        </MenuList>
        <LoginButton />
      </Menu>
    </Stack>
  );
};
export const Navbar = ({
  left = DefaultLeft,
  center,
  right = DefaultRight(),
}: Props) => {
  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      data-testid="navbar-container"
    >
      <Toolbar>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            md={6}
            xl={3}
            sx={{
              flexDirection: "row",
              alignItems: "stretch",
              display: "flex",
            }}
          >
            {left}
          </Grid>
          <Grid
            item
            md={4}
            xl={6}
            sx={{ justifyContent: "space-evenly", display: "flex", flex: 1 }}
          >
            {center}
          </Grid>
          <Grid item md={2} xl={3}>
            {right}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
