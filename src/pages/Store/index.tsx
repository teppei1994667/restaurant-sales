import { Header } from "@/components/Header";
import { StoreLogic } from "./components/StoreLogic";

export const Store = () => {
  return (
    <>
      <Header loginStatus={true} />
      <StoreLogic />
    </>
  );
};

export default Store;
