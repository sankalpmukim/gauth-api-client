// import { signInWithPopup, signOut } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { signIn, signOut } from "../auth";
// import { authProvider, firebaseAuth } from "../firebase/setup";
// import useAuth from "../firebase/useAuth";

const Home: NextPage = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [body, setBody] = useState("");
  const [method, setMethod] = useState("GET");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);
  const isLoggedIn = !!user;
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {" "}
        <h1>{`This is an API testbed!`}</h1>
        {isLoggedIn ? (
          <div>
            <h2>{`You are logged in as ${user["wt"]["Ad"]}`}</h2>
            <h3>{`Your user ID is ${user["wt"]["NT"]}`}</h3>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                signOut();
              }}
            >{`Logout`}</button>
          </div>
        ) : (
          <div>
            {" "}
            <h2>{`You are not logged in.`}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                // await signInWithPopup(firebaseAuth, authProvider);
                const user = await signIn();
                console.log(user);
                setUser(user);
              }}
            >{`Login`}</button>
          </div>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            fetch(`${baseUrl}/${endPoint}`, {
              method,
              body: method === "GET" ? undefined : body,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.xc?.id_token ?? `cry`}`,
              },
              credentials: "include",
              mode: "cors",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              })
              .catch(console.error);
          }}
          className="flex flex-col justify-center items-center gap-5"
        >
          <div className="flex gap-10 items-center justify-center">
            {/* Enter base url */}
            <div>
              <label
                htmlFor="baseUrl"
                className="block text-gray-700 text-sm font-bold mb-2"
              >{`Base URL`}</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="baseUrl"
                name="baseUrl"
                placeholder="https://api.example.com"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                }}
              />
            </div>
            {/* Enter target endpoint */}
            <div>
              <label
                htmlFor="endpoint"
                className="block text-gray-700 text-sm font-bold mb-2"
              >{`Endpoint`}</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="endpoint"
                name="endpoint"
                placeholder="/api/v1/endpoint"
                value={endPoint}
                onChange={(e) => {
                  // remove / from e.target.value if it's at the beginning of the string
                  setEndPoint(e.target.value.replace(/^\/+/, ""));
                }}
              />
            </div>
          </div>
          <div className="flex gap-10 items-center justify-center">
            {/* Enter request method */}
            <label
              htmlFor="method"
              className="block text-gray-700 text-sm font-bold"
            >{`Method`}</label>
            <select
              id="method"
              name="method"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={method}
              onChange={(e) => {
                console.log(e.target.value);
                setMethod(e.target.value);
              }}
            >
              <option value="GET">{`GET`}</option>
              <option value="POST">{`POST`}</option>
              <option value="PUT">{`PUT`}</option>
              <option value="DELETE">{`DELETE`}</option>
            </select>
          </div>
          <div>
            {/* Enter request body */}
            <label
              htmlFor="body"
              className="block text-gray-700 text-sm font-bold mb-2"
            >{`Body`}</label>
            <textarea
              id="body"
              name="body"
              placeholder='{"key": "value"}'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </div>
          {/* Submit request */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >{`Submit`}</button>
        </form>
        {/* Output from API */}
      </main>
    </>
  );
};

export default Home;