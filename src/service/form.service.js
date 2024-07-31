import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { acFormValues } from "../redux/active";
import { setDocuments } from "../redux/deleteFoods";

export const ClearForm = (selector) => {
  return document.querySelector(selector).reset();
};

export const useActionItemService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ckddt = useSelector((state) => state.deleteFoods);

  const actionItem = useCallback((page_code, item, acItem, setCh, setA, p = false) => {
    const mutationItem = { ...item };
    delete mutationItem?.ingredients;
    // const id = !p ? acItem?.id : acItem?.food_id             
    const id = acItem?.id;

    dispatch(acFormValues("A_F_V", mutationItem));
    dispatch(setDocuments(page_code, item));
    navigate(`?page-code=${page_code}`);
    if (setCh) {
      setCh(id ? [] : item?.ingredients);
    }
    setA(id && ckddt[page_code]?.length > 1 ? { id: null, ingredients: [] } : item);
  }, [dispatch, navigate, ckddt]);

  const getProductService = useCallback((item, status, acItem, setCheckedData, action_type = "", invoice_group = "") => {
    const itemId = item?.item_id;
    const acItemId = acItem?.id;
    const e = acItem?.ingredients?.some((i) => i.item_id === itemId);

    setCheckedData((prevData) => {
      const isChecked = prevData.some((i) => i.item_id === itemId);
      if (status === 0) {
        if (acItemId) {
          return prevData.map((i) => i.item_id === itemId ? { ...item, status: "delete" } : i);
        }
        return prevData.filter((i) => i.item_id !== itemId);
      }
      if (isChecked) {
        return prevData.map((i) => i.item_id === itemId ? { ...item, id: acItem.id, status: acItemId && e ? "update_amount" : item.status } : i);
      }
      return [...prevData, { ...item, action_type, invoice_group, status: acItemId ? "add" : undefined }];
    });
  }, []);

  return { actionItem, getProductService };
};
