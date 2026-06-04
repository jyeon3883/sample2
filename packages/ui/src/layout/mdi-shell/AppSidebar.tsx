"use client";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import type { ShellMenuItem } from "./types";

type Props = {
  menuItems: ShellMenuItem[];
};

export function AppSidebar({ menuItems }: Props) {
  return (
    <List disablePadding sx={{ pt: 1 }}>
      {menuItems.map((item, idx) => (
        <div key={item.href}>
          {idx > 0 && <Divider />}
          <ListItemButton component={Link} href={item.href}>
            <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
          </ListItemButton>
        </div>
      ))}
    </List>
  );
}
