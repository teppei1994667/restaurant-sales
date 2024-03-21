import { LOCAL_ADDRESS } from "@/constants/serverAdress";
import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req } = context;

    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");
    authHeaders.append("uid", req.cookies["_uid"] ? req.cookies["_uid"] : "");
    authHeaders.append("client", req.cookies["_client"] ? req.cookies["_client"] : "");
    authHeaders.append("access-token", req.cookies["_access-token"] ? req.cookies["_access-token"] : "");

    const response = await fetch(`${LOCAL_ADDRESS}/${url}`, {
      headers: authHeaders,
    });

    if (!response.ok && response.status === 401) {
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
