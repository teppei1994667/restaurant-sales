import { DialySalesContextProvider } from "@/pages/AddDialySale/context/DialySalesContextProvider";
import { SelectDialySalesContextProvider } from "@/context/SelectDialySalesContext";
import { GetServerSideProps } from "next";
import { authenticationPossibleServerSideProps } from "@/util/authRedirect";
import { Header } from "@/components/Header";
import { AddDialySaleLogic } from "./components/AddDialySaleLogic";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = authenticationPossibleServerSideProps("users");

export const AddDialySale = (props: GetServerSideProps) => {
  console.log("AddDialySale", props);

  const router = useRouter();

  return (
    <>
      <Header loginStatus={true} />
      <DialySalesContextProvider>
        <SelectDialySalesContextProvider>
          <AddDialySaleLogic />
        </SelectDialySalesContextProvider>
      </DialySalesContextProvider>
    </>
  );
};

export default AddDialySale;
