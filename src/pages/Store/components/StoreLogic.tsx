import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreView } from "./StoreView";
import { StoreModel } from "../type/model/StoreModel";

export type StoreLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
};

export const StoreLogic = (props: StoreLogicProps) => {
  const { userModel, storeModel } = props;
  console.log("StoreLogic", props);
  return (
    <>
      <StoreView />
    </>
  );
};
