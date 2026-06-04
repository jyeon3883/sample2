"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { Tab, TabPanel, Tabs } from "@repo/ui";
import { VolatilePanel } from "./VolatilePanel";
import { PersistentPanel } from "./PersistentPanel";

export function ZustandDemoPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Volatile (리로드 시 초기화)" />
        <Tab label="Persistent (리로드 후 유지)" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <VolatilePanel />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <PersistentPanel />
      </TabPanel>
    </Box>
  );
}
