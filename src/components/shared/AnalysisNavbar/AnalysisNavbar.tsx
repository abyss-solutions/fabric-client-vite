import Link from "@mui/material/Link";
import { Box, Button, Menu, MenuList, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { BugReport, ChromeReaderMode } from "@mui/icons-material";
import { NavbarLinks, selectMenuStyles } from "./styles";
import { REPORT_A_BUG, USAGE_GUIDE } from "@/constants";
import { useFeatureFlag, useRouter } from "@/hooks";
import { iconStyles, InfoMenuItem, Navbar } from "@/components/shared/Navbar/Navbar";

const AnalysisPages = () => {
  const inspection = window.location.pathname.split("/")[2];

  const isAlphaUser = useFeatureFlag("alpha-user");
  const canReadPOI = true;
  const router = useRouter();

  const pages = useMemo(() => {
    return [
      {
        title: "Insights",
        route: "insights",
        isVisible: true,
      },
      {
        title: "Viewer",
        route: "viewer",
        isVisible: true,
      },
      {
        title: "Deck Plan",
        route: "deckplan",
        isVisible: true,
      },
      {
        title: "Reports",
        route: "reports",
        isVisible: canReadPOI,
      },
      {
        title: "Fabric Tools",
        route: "idms",
        isVisible: isAlphaUser,
      },
      {
        title: "Activity",
        route: "activity",
        isVisible: false,
      },
    ];
  }, [canReadPOI, isAlphaUser]);

  const handlePageClick = (route: string) => {
    router.push({ pathname: `/analysis/${inspection}/${route}` });
  };

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "baseline" }}>
      {pages
        .filter((page) => page.isVisible)
        .map((page) => (
          <Button
            key={page.route}
            onClick={() => handlePageClick(page.route)}
            sx={NavbarLinks}
            style={{
              borderColor: router.route.includes(page.route)
                ? "#fff"
                : "transparent",
            }}
          >
            {page.title}
          </Button>
        ))}
    </Stack>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const leftNav = (_inspectionId: string) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Link href="/">
        <img
          src="/assets/abyss_fabric_logo_white.png"
          alt="Abyss Fabric"
          style={{
            height: "2rem",
            cursor: "pointer",
          }}
        />
      </Link>
      <Box sx={selectMenuStyles}>Lucius</Box>
    </Stack>
  );
};

const menuItems = [
  {
    url: USAGE_GUIDE,
    icon: <ChromeReaderMode sx={iconStyles} />,
    label: "Usage guide",
    show: true,
  },
  {
    url: REPORT_A_BUG,
    icon: <BugReport sx={iconStyles} />,
    label: "Report a bug",
    show: true,
  },
];

const RightNav = () => {
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
      </Menu>
    </Stack>
  );
};

export const AnalysisNavbar = () => {
  const inspection = "123";

  if (!inspection) {
    window.location.href = "/";
    return <></>;
  }

  return (
    <Navbar
      left={leftNav(inspection as string)}
      center={<AnalysisPages />}
      right={RightNav()}
    />
  );
};
