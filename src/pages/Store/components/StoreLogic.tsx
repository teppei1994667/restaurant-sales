import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreView } from "./StoreView";
import { StoreModel } from "../type/model/StoreModel";

export type StoreLogicProps = {
  user: UserModel;
  store?: StoreModel;
};

export const StoreLogic = (prop: StoreLogicProps) => {
  return (
    <>
      <StoreView />
    </>
  );
};
