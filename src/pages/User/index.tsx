import { Header } from "@/components/Header";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { GetServerSideProps } from "next";
import { CreateStoreDialog } from "./components/CreateStore";
import { UserContextProvider } from "./context/UserContextProvider";

import { LoginUserModel } from "./type/model/LoginUserModel";
import { UserLogic } from "./components/UserLogic";

// TODO: storeページ作成後にstore/type/storeModelに移動
export type StoreModel = {
  userId: number;
  name: string;
  adress: string;
  phoneNumber: string;
  floorSpace: number;
  seatingCapacity: number;
};

export type UserProps = {
  user: LoginUserModel;
  store: StoreModel;
};

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const User = (props: GetServerSideProps & UserProps) => {
  console.log("Userページ", props);

  const LoginUserModel: LoginUserModel = {
    id: props.user.id,
    name: props.user.name,
    email: props.user.email,
  };

  return (
    <>
      <UserContextProvider>
        <Header loginStatus={true} />
        <UserLogic LoginUserModel={LoginUserModel} />
        <CreateStoreDialog />
      </UserContextProvider>
    </>
  );
};

export default User;
