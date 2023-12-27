import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { Layout } from "@/component/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <br />
      <Link href="/core-calc">코어 목표치까지 얼마 먹을까 계산기</Link>
      <br />
      <br />
      <Link href="/exp-core-calc">경코젬 먹이면 몇 렙될까 계산기</Link>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
