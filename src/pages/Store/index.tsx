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

  const store: StoreModel | undefined = stores?.find((store) => {
    store.id === router.query.id;
  });

  return (
    <>
      <Header loginStatus={true} />
      <StoreLogic user={user} store={store} />
    </>
  );
};

export default Store;
