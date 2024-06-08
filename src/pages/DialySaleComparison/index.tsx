import { Header } from "@/components/Header";
import { DialySaleComparisonLogic } from "./components/DialySaleComparisonLogic";
import { GetServerSideProps } from "next";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { useRouter } from "next/router";
import { StoreModel } from "../Store/type/model/StoreModel";
import { UserModel } from "../User/type/model/UserModel";
import { DialySaleComparisonContextProvider } from "./context/DIalySaleConparisonContextProvider";

export type DialySaleComparisonProps = {
  user: UserModel;
  stores?: StoreModel[];
};

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const DialySaleComparison = (props: GetServerSideProps & DialySaleComparisonProps) => {
  const { user, stores } = props;

  const router = useRouter();

  // Userページから選択された(クエリパラメーターに設定されたid)のStoreModelを取得
  const storeModel: StoreModel | undefined = stores?.find((store) => store.id === Number(router.query.id));

  // Userページから選択されていない(クエリパラメーターに設定されたid以外)のStoreModelを取得
  const otherStoreModels: StoreModel[] | undefined = stores?.filter((store) => store.id !== Number(router.query.id));

  return (
    <>
      <DialySaleComparisonContextProvider>
        <Header loginStatus={true} />
        <DialySaleComparisonLogic userModel={user} storeModel={storeModel} otherStoreModels={otherStoreModels} />
      </DialySaleComparisonContextProvider>
    </>
  );
};

export default DialySaleComparison;
