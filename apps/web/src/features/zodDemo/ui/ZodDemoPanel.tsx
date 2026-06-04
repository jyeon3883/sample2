"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { Tab, TabPanel, Tabs } from "@repo/ui";
import { QueryPanel } from "./QueryPanel";
import { FormPanel } from "./FormPanel";

export function ZodDemoPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="조회 (스키마 파싱)" />
        <Tab label="등록/수정 (폼 검증)" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <QueryPanel />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <FormPanel />
      </TabPanel>
    </Box>
  );
}
