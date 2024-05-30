import { Header } from "@/components/Header";
import { DialySaleComparisonLogic } from "./components/DialySaleComparisonLogic";

export const DialySaleComparison = () => {
  return (
    <>
      <Header loginStatus={true} />
      <DialySaleComparisonLogic />;
    </>
  );
};

export default DialySaleComparison;
