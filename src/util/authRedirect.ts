import { LOCAL_ADDRESS } from "@/constants/serverAdress";
import { GetServerSideProps } from "next";
import { convertAxios } from "./convertAxios";

export const authenticationPossibleServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req } = context;

    const response = await convertAxios.get(`${LOCAL_ADDRESS}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["_uid"] ? req.cookies["_uid"] : "",
        client: req.cookies["_client"] ? req.cookies["_client"] : "",
        "access-token": req.cookies["_access-token"] ? req.cookies["_access-token"] : "",
      },
    });

    console.log("1", response.data);

    if (response.status === 401) {
      return {
        redirect: {
          destination: "/User",
          permanent: false,
        },
      };
    }

    const props = await response.data;

    return { props };
  };
};

export const authenticationNotPossibleServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req } = context;

    const response = await convertAxios.get(`${LOCAL_ADDRESS}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["_uid"] ? req.cookies["_uid"] : "",
        client: req.cookies["_client"] ? req.cookies["_client"] : "",
        "access-token": req.cookies["_access-token"] ? req.cookies["_access-token"] : "",
      },
    });

    console.log("2", response.data);

    if (response.status === 200) {
      return {
        redirect: {
          destination: "/User",
          permanent: false,
        },
      };
    }

    const props = await response.data;

    return { props };
  };
};
