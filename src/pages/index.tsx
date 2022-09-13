// import { signInWithPopup, signOut } from "firebase/auth";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
// import { authProvider, firebaseAuth } from "../firebase/setup";
// import useAuth from "../firebase/useAuth";

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
