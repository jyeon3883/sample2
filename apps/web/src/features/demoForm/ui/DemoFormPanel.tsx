"use client";

import { useState } from "react";
import { LabeledSelect, SearchInput, Typography } from "@repo/ui";

export function DemoFormPanel() {
  const [keyword, setKeyword] = useState("");
  const [environment, setEnvironment] = useState("local");

  return (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "420px" }}>
      <SearchInput value={keyword} onChange={setKeyword} label="키워드" />
      <LabeledSelect
        label="환경"
        value={environment}
        onChange={setEnvironment}
        options={[
          { label: "Local", value: "local" },
          { label: "Dev", value: "dev" },
          { label: "Prod", value: "prod" },
        ]}
      />
      <Typography variant="body2" color="text.secondary">
        검색어: {keyword || "(없음)"} / 환경: {environment}
      </Typography>
    </div>
  );
}
