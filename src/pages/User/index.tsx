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
  stores?: StoreModel[];
};

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const User = (props: GetServerSideProps & UserProps) => {
  console.log("User props", props);
  const { user, stores = [] } = props;

  // userページ内で使用するユーザー情報
  const LoginUserModel: LoginUserModel = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  // userページ内で使用するstore情報
  const storeNames = stores.map((store) => {
    return store.name;
  });

  return (
    <>
      <UserContextProvider>
        <Header loginStatus={true} />
        <UserLogic LoginUserModel={LoginUserModel} storeNames={storeNames} />
        <CreateStoreDialog />
      </UserContextProvider>
    </>
  );
};

export default User;
