import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";

type Menu = {
  text: string;
  href: string;
};

type DrawerProps = {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  menus: Menu[];
};

export const SideBar = ({ open, setOpen, menus }: DrawerProps) => {
  const router = useRouter();
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
        <List>
          {menus.map(({ href, text }) => (
            <ListItem
              key={text}
              onClick={() => router.push(href)}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
