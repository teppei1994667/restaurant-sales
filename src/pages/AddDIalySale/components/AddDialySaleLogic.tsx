import { DialySale } from "@/type/DialySale";
import { useCallback, useContext, useEffect, useState } from "react";
import { AddDialySaleView } from "./AddDialySaleView";
import { UserModel } from "@/pages/User/type/model/UserModel";
import { StoreModel } from "@/pages/Store/type/model/StoreModel";
import {
  DialySalesContext,
  DialySalesDispatch,
} from "../context/DialySalesContextProvider";
import { DialySaleContextActionType } from "../context/DialySalesContextReducer";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { convertDialySaleAxios } from "@/util/convertAxios";
import { calculateTotalDialySales } from "../util/DialySaleUtil";

export type AddDialySaleLogicProps = {
  userModel: UserModel;
  storeModel?: StoreModel;
  otherStoreModels?: StoreModel[];
};

export const AddDialySaleLogic = (props: AddDialySaleLogicProps) => {
  const { userModel, storeModel, otherStoreModels } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSearchDialySalesDispalay, setIsSearchDialySalesDispalay] =
    useState(false);

  // チェックボックスで選択した行のデータを保持
  const [rowSelectionModelValue, setRowSelectionModelValue] =
    useState<DialySale>();

  const dialySalesContext = useContext(DialySalesContext);
  const dialySalesDispatch = useContext(DialySalesDispatch);

  // authenticationPossibleServerSidePropsで取得した情報をcontextに保存
  useEffect(() => {
    dialySalesDispatch({
      type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
      payload: { userModel, storeModel, otherStoreModels },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherStoreModels, storeModel, userModel]);

  // 「期間を指定して表示する」押下時
  const handleKikanShiteiOnClick = () => {
    setIsSearchDialySalesDispalay((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // 変更ボタン押下時
  const handleEditBtnOnClick = useCallback(() => {
    if (dialySalesContext.rowSelectionModel) {
      if (dialySalesContext.rowSelectionModel.length > 1) {
        alert(
          "同時に複数のデータの変更はできません。変更したいデータを１つだけ選択してください。"
        );
        return;
      }
      if (dialySalesContext.rowSelectionModel.length < 1) {
        alert("編集するデータを選択してください。");
        return;
      }
    }
    // 選ばれている行のデータをstateにセット
    dialySalesContext.DialySaleModels?.map((dialySaleModel) => {
      if (dialySaleModel.id === Number(dialySalesContext.rowSelectionModel)) {
        setRowSelectionModelValue(dialySaleModel);
      }
    });
    setIsEditDialogOpen(true);
  }, [dialySalesContext.DialySaleModels, dialySalesContext.rowSelectionModel]);

  // 削除ボタン押下時の処理
  const handleDeleteOnClick = useCallback(async () => {
    // 選択行がない場合
    if (
      !dialySalesContext.rowSelectionModel ||
      dialySalesContext.rowSelectionModel.length === 0
    ) {
      confirm("削除したい行を選択してください");
      return;
    }
    // 確認のダイアログを表示し「いいえ」を押下した場合処理終了
    if (!confirm("本当に削除しますか")) {
      return;
    }
    try {
      //APIを呼び出して、DialySaleを削除する
      const deleteIds: GridRowSelectionModel =
        dialySalesContext.rowSelectionModel;
      const res = await convertDialySaleAxios.delete(`/${deleteIds[0]}`, {
        data: {
          deleteIds,
          storeId: dialySalesContext.StoreModel?.id,
        },
      });

      // totalDialySaleを計算
      const totalDialySale = calculateTotalDialySales(res.data);

      dialySalesDispatch({
        type: DialySaleContextActionType.SAVE_DIALY_SALE_INFORMATION,
        payload: {
          dialySaleModels: res.data,
          totalDialySaleModel: totalDialySale,
        },
      });

      dialySalesDispatch({
        type: DialySaleContextActionType.UPDATE_SNACKBAR,
        payload: {
          isSnackBarOpen: true,
          snackBarText: "営業データを削除しました。",
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [
    dialySalesContext.StoreModel?.id,
    dialySalesContext.rowSelectionModel,
    dialySalesDispatch,
  ]);

  // snackBarのクローズイベント
  const handleSnackBarOnClose = useCallback(() => {
    dialySalesDispatch({
      type: DialySaleContextActionType.UPDATE_SNACKBAR,
      payload: { isSnackBarOpen: false, snackBarText: "" },
    });
  }, [dialySalesDispatch]);

  return (
    <>
      <AddDialySaleView
        isLoading={isLoading}
        isEditDialogOpen={isEditDialogOpen}
        isSearchDialySalesDispalay={isSearchDialySalesDispalay}
        rowSelectionModelValue={rowSelectionModelValue}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleKikanShiteiOnClick={handleKikanShiteiOnClick}
        handleEditBtnOnClick={handleEditBtnOnClick}
        handleDeleteOnClick={handleDeleteOnClick}
        handleSnackBarOnClose={handleSnackBarOnClose}
      />
    </>
  );
};
