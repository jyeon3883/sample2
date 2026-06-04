"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  title: string;
  actions?: React.ReactNode;
};

export function AppHeader({ title, actions }: Props) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {title}
        </Typography>
        {actions && <Box sx={{ display: "flex", alignItems: "center" }}>{actions}</Box>}
      </Toolbar>
    </AppBar>
  );
}
