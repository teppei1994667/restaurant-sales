import { DialySalesContextProvider } from "@/pages/AddDialySale/context/DialySalesContextProvider";
import { GetServerSideProps } from "next";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { Header } from "@/components/Header";
import { AddDialySaleLogic } from "./components/AddDialySaleLogic";
import { useRouter } from "next/router";
import { StoreModel } from "../Store/type/model/StoreModel";
import { UserModel } from "../User/type/model/UserModel";

export type AddDialySaleProps = {
  user: UserModel;
  stores?: StoreModel[];
};

export const getServerSideProps: GetServerSideProps =
  authenticationPossibleServerSideProps("users");

export const AddDialySale = (props: GetServerSideProps & AddDialySaleProps) => {
  const { user, stores } = props;

  const router = useRouter();

  // Userページから選択された(クエリパラメーターに設定されたid)のStoreModelを取得
  const storeModel: StoreModel | undefined = stores?.find(
    (store) => store.id === Number(router.query.id)
  );

  // Userページから選択されていない(クエリパラメーターに設定されたid以外)のStoreModelを取得
  const otherStoreModels: StoreModel[] | undefined = stores?.filter(
    (store) => store.id !== Number(router.query.id)
  );

  return (
    <>
      <DialySalesContextProvider>
        <Header loginStatus={true} callerPage="dialySale" />
        <AddDialySaleLogic
          userModel={user}
          storeModel={storeModel}
          otherStoreModels={otherStoreModels}
        />
      </DialySalesContextProvider>
    </>
  );
};

export default AddDialySale;
