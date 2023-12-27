import { ReactNode } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

export function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.back()}>뒤로</Button>
      <br />
      {children}
    </>
  );
}
