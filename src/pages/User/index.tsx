import { Header } from "@/components/Header";
import { noPossibleAuthServerSideProps } from "@/util/authRedirect";
import { GetServerSideProps } from "next";
import { CreateStoreDialog } from "./components/CreateStore";
import { UserContextProvider } from "./context/UserContextProvider";

import { LoginUserModel } from "./const/LoginUserModel";
import { UserLogic } from "./components/UserLogic";

export const getServerSideProps: GetServerSideProps = noPossibleAuthServerSideProps("users");

export const User = (props: GetServerSideProps & LoginUserModel) => {
  console.log("Userページ");

  const LoginUserModel: LoginUserModel = {
    id: props.id,
    name: props.name,
    email: props.email,
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
