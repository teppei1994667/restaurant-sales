import { LoginUserModel } from "@/pages/User/type/model/LoginUserModel";
import { StoreView } from "./StoreView";
import { StoreModel } from "../type/model/StoreModel";

export type StoreLogicProps = {
  user: LoginUserModel;
  store?: StoreModel;
};

export const StoreLogic = (prop: StoreLogicProps) => {
  return (
    <>
      <StoreView />
    </>
  );
};
