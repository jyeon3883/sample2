"use client";

import { usePublicEndpoint } from "@repo/api-client";
import { Button } from "@repo/ui";

export function PublicEndpointPanel() {
  const { data, isPending: isLoading, isError, mutate: refetch } = usePublicEndpoint();

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Button onClick={() => refetch()}>Health API 호출</Button>
      </div>
      <pre
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#f4f4f5",
          borderRadius: "8px",
        }}
      >
        {isLoading && "로딩 중..."}
        {isError && "API 호출 실패 (백엔드 미실행 시 정상)"}
        {!isLoading && !isError && JSON.stringify(data ?? { hint: "버튼을 눌러 호출" }, null, 2)}
      </pre>
    </>
  );
}
