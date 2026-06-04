"use client";

import { useRef, useState } from "react";
import { Tab, TabPanel, Tabs, Typography } from "@repo/ui";
import { EChart, type EChartsOption } from "@repo/ui/chart";
import { QCELLGrid, type QCELLGridRef } from "@repo/ui/qcell";
import { PublicEndpointPanel } from "@/features/apiPlayground";
import { DemoFormPanel } from "@/features/demoForm";
import { ZodDemoPanel } from "@/features/zodDemo";
import { ZustandDemoPanel } from "@/features/zustandDemo";

const qcellObjProperty = {
  id: "qcell-demo",
  rowheaders: ["sequence"] as const,
  onechlikedit: true,
  columns: [
    { key: "id", title: ["ID"], width: "5%", type: "html" },
    { key: "name", title: ["이름"], width: "20%", type: "html" },
    { key: "role", title: ["역할"], width: "20%", type: "html" },
    { key: "active", title: ["활성"], width: "5%", type: "html" },
    { key: "actions", title: ["Actions"], width: "20%", type: "html" },
    { key: "createdAt", title: ["작성일"], width: "30%", type: "html" },
  ],
  data: {
    input: [
      { id: 1, name: "Kim", role: "Admin", active: "Y", actions: "Edit", createdAt: "2026-01-01" },
      { id: 2, name: "Lee", role: "Editor", active: "Y", actions: "Edit", createdAt: "2026-01-01" },
      { id: 3, name: "Park", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 4, name: "Choi", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 5, name: "Kwon", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 6, name: "Kim", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 7, name: "Lee", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 8, name: "Park", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 9, name: "Choi", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 10, name: "Kwon", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
    ],
  },
};

const chartOption: EChartsOption = {
  tooltip: { trigger: "axis" },
  legend: { data: ["활성 사용자"] },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "활성 사용자",
      type: "line",
      data: [120, 200, 150, 80, 70, 110, 130],
      smooth: true,
    },
  ],
};

export function DemoDashboard() {
  const [tab, setTab] = useState(0);
  const qcellRef = useRef<QCELLGridRef>(null);

  return (
    <>
      <div style={{ marginTop: "1.5rem" }}>
        <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)}>
          <Tab label="폼 예제" />
          <Tab label="API 예제" />
          <Tab label="그리드 예제" />
          <Tab label="차트 예제" />
          <Tab label="Zod 예제" />
          <Tab label="Zustand 예제" />
        </Tabs>
      </div>

      <TabPanel value={tab} index={0}>
        <DemoFormPanel />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <PublicEndpointPanel />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          QCELL React 샘플입니다.
        </Typography>
        <div
          id="qcell-demo-wrap"
          style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}
        >
          <QCELLGrid
            ref={qcellRef}
            width="100%"
            height="320px"
            objProperty={qcellObjProperty}
          />
        </div>
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ECharts 라인 차트 샘플입니다.
        </Typography>
        <div style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}>
          <EChart option={chartOption} height={360} />
        </div>
      </TabPanel>

      <TabPanel value={tab} index={4}>
        <ZodDemoPanel />
      </TabPanel>

      <TabPanel value={tab} index={5}>
        <ZustandDemoPanel />
      </TabPanel>
    </>
  );
}
