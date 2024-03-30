import { ReactNode } from "react";
import { ButtonAppBar } from "./AppBar";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <ButtonAppBar />
      <div style={{ margin: "10px" }}>{children}</div>
    </>
  );
}
