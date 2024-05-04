import { Header } from "@/components/Header";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { GetServerSideProps } from "next";
import { CreateStoreDialog } from "./components/CreateStore";
import { UserContextProvider } from "./context/UserContextProvider";

import { UserModel } from "./type/model/UserModel";
import { UserLogic } from "./components/UserLogic";
import { StoreModel } from "../Store/type/model/StoreModel";

export type UserProps = {
  user: UserModel;
  stores?: StoreModel[];
};

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const User = (props: GetServerSideProps & UserProps) => {
  console.log("User props", props);
  const { user, stores = [] } = props;

  // userページ内で使用するユーザー情報
  const UserModel: UserModel = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  // userページ内で使用するstore情報
  // const store = stores.map((store) => {
  //   return store.name;
  // });

  return (
    <>
      <UserContextProvider>
        <Header loginStatus={true} />
        <UserLogic UserModel={UserModel} StoreModels={stores} />
        <CreateStoreDialog />
      </UserContextProvider>
    </>
  );
};

export default User;
