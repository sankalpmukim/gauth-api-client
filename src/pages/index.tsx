import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("../components/Home"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <DynamicHome />
    </>
  );
};

export default Home;
