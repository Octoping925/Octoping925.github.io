import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SideBar } from "./SideBar";
import { useState } from "react";

export const ButtonAppBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideBarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            영엑 블로그
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar open={sideBarOpen} setOpen={setSideBarOpen} menus={Menus} />
    </Box>
  );
};

const Menus = [
  { text: "홈", href: "/" },
  { text: "코어 목표치까지 얼마 먹을까 계산기", href: "/core-calc" },
  { text: "경코젬 먹이면 몇 렙될까 계산기", href: "/exp-core-calc" },
];
