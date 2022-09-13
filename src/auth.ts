import { gapi, loadAuth2 } from "gapi-script";

const CLIENT_ID =
  "728562250889-sinae236t1h6a0guba47sj85cg7h8ga1.apps.googleusercontent.com";

// const prm = import("gapi-script")
//   .then((pack) => pack.gapi)
//   .then((gapi) => {
//     return new Promise((resolve, reject) => {
//       gapi.load("client:auth2", () => {
//         gapi.auth2
//           .init({
//             client_id: CLIENT_ID,
//             scope: "profile email",
//           })
//           .then(() => {
//             resolve(gapi);
//           })
//           .catch(reject);
//       });
//     });
//   });

export const signIn = async () => {
  const auth2 = await loadAuth2(gapi, CLIENT_ID, "profile email");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await auth2.signIn();
};

export const signOut = async () => {
  const auth2 = await loadAuth2(gapi, CLIENT_ID, "profile email");
  return await auth2.signOut();
};
