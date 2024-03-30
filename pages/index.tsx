import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { Layout } from "../component/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>반갑습니다! 영엑 블로그입니다</h1>
      <div>와 주셔서 감사합니다..</div>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
