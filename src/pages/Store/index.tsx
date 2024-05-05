import { Header } from "@/components/Header";
import { StoreLogic } from "./components/StoreLogic";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { UserModel } from "../User/type/model/UserModel";
import { StoreModel } from "./type/model/StoreModel";

export type StoreProps = {
  user: UserModel;
  stores?: StoreModel[];
};

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const Store = (props: GetServerSideProps & StoreProps) => {
  const { user, stores } = props;

  const router = useRouter();

  const storeModel: StoreModel | undefined = stores?.find((store) => store.id === Number(router.query.id));

  return (
    <>
      <Header loginStatus={true} />
      <StoreLogic userModel={user} storeModel={storeModel} />
    </>
  );
};

export default Store;
