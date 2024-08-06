import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acFormValues } from "../redux/active";
import { setDocuments } from "../redux/deleteFoods";
import { useSearchAppParams } from "../hooks/useSearchParam";

export const ClearForm = (selector) => {
  return document.querySelector(selector).reset();
};

export const getProductService = (item, status, acItem = {}, setCheckedData, action_type = "", invoice_group = "") => {
  const itemId = item?.item_id;
  const acItemId = acItem?.id;
  const e = acItem?.ingredients?.some((i) => i?.item_id === itemId);

  setCheckedData((prevData) => {
    const isChecked = prevData.some((i) => i?.item_id === itemId);
    if (status === 0) {
      if (acItemId) {
        return prevData.map((i) => i?.item_id === itemId ? { ...item, status: "delete" } : i);
      }
      return prevData.filter((i) => i?.item_id !== itemId);
    }
    if (isChecked) {
      return prevData.map((i) => i?.item_id === itemId ? { ...item, id: acItemId, status: acItemId && e ? "update_amount" : item?.status } : i);
    }
    return [...prevData, { ...item, action_type, invoice_group, status: acItemId ? "add" : undefined }];
  });
};

export const useActionItemService = () => {
  const dispatch = useDispatch();
  const { setParams, removeParamsByKeys } = useSearchAppParams();
  const ckddt = useSelector((state) => state.delRouter);

  const actionItem = useCallback((page_code, item, c) => {
    const mutationItem = { ...item };
    delete mutationItem?.ingredients;
    dispatch(setDocuments(page_code, { id: item?.id, st1_id: item?.st1_id }));

    if (ckddt?.[page_code]?.length === 0) {
      setParams({ pagecode: page_code, id: item?.id, st1_id: item?.st1_id });
      dispatch(acFormValues("A_F_V", mutationItem));
    } else if (ckddt?.[page_code]?.length === 2 && c) {
      setParams({ pagecode: page_code, id: ckddt?.[page_code]?.[0]?.id, st1_id: ckddt?.[page_code]?.[0]?.st1_id });
      dispatch(acFormValues("A_F_V", mutationItem));
    } else {
      dispatch(acFormValues("A_F_V", {}));
      removeParamsByKeys(["id", "st1_id"]);
    }
  }, [ckddt, dispatch, removeParamsByKeys, setParams]);

  return { actionItem };
};
