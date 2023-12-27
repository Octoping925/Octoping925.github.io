import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Button variant="outlined" onClick={() => router.back()}>
        뒤로
      </Button>
      <br />
      {children}
    </>
  );
}
