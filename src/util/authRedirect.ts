import { LOCAL_ADDRESS } from "@/constants/serverAdress";
import { GetServerSideProps } from "next";
import { convertAxios } from "./convertAxios";

export const authenticationPossibleServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const cookies = context.req.cookies;

    try {
      const response = await convertAxios.get(`${LOCAL_ADDRESS}/${url}`, {
        headers: {
          "Content-Type": "application/json",
          uid: cookies["_uid"] ? cookies["_uid"] : "",
          client: cookies["_client"] ? cookies["_client"] : "",
          "access-token": cookies["_access-token"] ? cookies["_access-token"] : "",
        },
      });

      const props = await response.data;
      console.log("User 成功");
      return { props };
    } catch (error) {
      console.log("User 失敗");
      return {
        redirect: {
          destination: "/SignIn",
          permanent: false,
        },
      };
    }
  };
};

export const authenticationNotPossibleServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const cookies = context.req.cookies;

    try {
      const response = await convertAxios.get(`${LOCAL_ADDRESS}/${url}`, {
        headers: {
          "Content-Type": "application/json",
          uid: cookies["_uid"] ? cookies["_uid"] : "",
          client: cookies["_client"] ? cookies["_client"] : "",
          "access-token": cookies["_access-token"] ? cookies["_access-token"] : "",
        },
      });

      console.log("Userページにリダイレクト");
      return {
        redirect: {
          destination: "/User",
          permanent: false,
        },
      };
    } catch {
      console.log("Sign catch");
      return { props: {} };
    }
  };
};
