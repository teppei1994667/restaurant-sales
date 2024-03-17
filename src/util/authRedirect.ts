import { LOCAL_ADDRESS } from "@/constants/serverAdress";
import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req, res } = context;
    console.log("req.cookies._uid", req.cookies._uid);
    console.log("req.cookies._client", req.cookies._client);
    console.log("req.cookies._access_token", req.cookies._access_token);

    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");
    authHeaders.append("uid", req.cookies["_uid"] ? req.cookies["_uid"] : "");
    authHeaders.append("client", req.cookies["_client"] ? req.cookies["_client"] : "");
    authHeaders.append("_access-token", req.cookies["_access-token"] ? req.cookies["_access-token"] : "");
    console.log("uid", authHeaders.get("uid"));
    console.log("client", authHeaders.get("client"));
    console.log("_access-token", authHeaders.get("_access-token"));

    const response = await fetch(`${LOCAL_ADDRESS}/${url}`, {
      headers: authHeaders,
    });

    console.log("response", response.ok);
    console.log("response", response.status);

    if (!response.ok && response.status === 401) {
      console.log("signInにリダイレクトします");
      return {
        redirect: {
          destination: "/SignIn",
          permanent: false,
        },
      };
    }

    const props = await response.json();

    return { props };
  };
};
