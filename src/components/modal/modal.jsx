import React, { useState } from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { acCloseUModal, acCloseUModalU } from "../../redux/u-modal";
import { useAddStoreMutation } from "../../service/store.service";
import { useUpdateStoreMutation } from "../../service/store.service";
import { useAddStoreDepMutation } from "../../service/dep.service";
import { enqueueSnackbar as es } from "notistack";
import { LoadingBtn } from "../../components/loading/loading";
import { useAddStCategoryMutation } from "../../service/category.service";
import { useUpdateStCategoryMutation } from "../../service/category.service";
import { acActive } from "../../redux/active";
import { useAddStGroupsMutation } from "../../service/groups.service";
import { useUpdateStGroupsMutation } from "../../service/groups.service";
import { useUpdateDepMutation } from "../../service/dep.service";
import { useAddStIngredientsMutation } from "../../service/ingredient.service";
import { useUpdateStIngredientsMutation } from "../../service/ingredient.service";
import { useAddStSuplierMutation } from "../../service/suplier.service";
import { useAddStInvoiceGroupMutation } from "../../service/invoice-group.service";
import { useAddCashboxMutation } from "../../service/cashbox.service";
import { useAddCashboxGrMutation } from "../../service/cashbox-group.service";
import { useAddCashTransactionMutation } from "../../service/cash-transaction.service";
import { useUpdateStSuplierMutation } from "../../service/suplier.service";
import { useUpdateStInvoiceGroupMutation } from "../../service/invoice-group.service";
import { useUpdateCashboxMutation } from "../../service/cashbox.service";
import { useUpdateCashboxGrMutation } from "../../service/cashbox-group.service";
import { useUpdateCashTransactionMutation } from "../../service/cash-transaction.service";

export const UniversalModal = ({ children, type, newGrData, setChecked }) => {
  const open = useSelector((state) => state.uModal);
  const dispatch = useDispatch();
  const [addStorage] = useAddStoreMutation();
  const [addStorageDep] = useAddStoreDepMutation();
  const [addStCategory] = useAddStCategoryMutation();
  const [addStGroups] = useAddStGroupsMutation();
  const [addStIngredients] = useAddStIngredientsMutation();
  const [addStSuplier] = useAddStSuplierMutation();
  const [addStInvoiceGroup] = useAddStInvoiceGroupMutation();
  const [addCashbox] = useAddCashboxMutation();
  const [addCashboxGr] = useAddCashboxGrMutation();
  const [addCashTransaction] = useAddCashTransactionMutation();
  const [loading, setLoading] = useState(false);

  const fetchValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());

    if (value.department === "default") {
      return es({ message: "Taxrirlash tugallanmadi!", variant: "warning" });
    }

    if (type === "supp") {
      value.number.split(" ").join("");
    }

    try {
      let result;

      switch (type) {
        case "main":
          result = await addStorage(value);
          break;
        case "dep":
          result = await addStorageDep(value);
          break;
        case "category":
          result = await addStCategory(value);
          break;
        case "group":
          result = await addStGroups(value);
          break;
        case "ing":
          result = await addStIngredients(value);
          break;
        case "newIngGr":
          result = await addStGroups(newGrData);
          result = await addStIngredients(value);
          break;
        case "supp":
          result = await addStSuplier(value);
          break;
        case "invGr":
          result = await addStInvoiceGroup(value);
          break;
        case "cashbox":
          result = await addCashbox(value);
          break;
        case "cashboxGr":
          result = await addCashboxGr(value);
          break;
        case "trsn":
          result = await addCashTransaction(value);
          break;
        default:
          break;
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else if (result?.data) {
        dispatch(acCloseUModal());
        setChecked(false);
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setClose = () => {
    dispatch(acCloseUModal());
  };
  return (
    <div className={open ? "u_modal_container open" : "u_modal_container"}>
      <div className="u_modal_box">
        <form className="u_modal" onSubmit={fetchValues}>
          {children}
          <button className="relative">
            {loading ? <LoadingBtn /> : "Qo'shish"}
          </button>
        </form>
        <i onClick={() => setClose()}></i>
      </div>
    </div>
  );
};

export const UniversalUModal = ({ children, type, newGrData, setChecked }) => {
  const open = useSelector((state) => state.uModalU);
  const dispatch = useDispatch();
  const [updateStorage] = useUpdateStoreMutation();
  const [updateStCategory] = useUpdateStCategoryMutation();
  const [updateStGroups] = useUpdateStGroupsMutation();
  const [updateDep] = useUpdateDepMutation();
  const [updateStIngredients] = useUpdateStIngredientsMutation();
  const [addStGroups] = useAddStGroupsMutation();
  const [updateStSuplier] = useUpdateStSuplierMutation();
  const [updateStInvoiceGroup] = useUpdateStInvoiceGroupMutation();
  const [updateCashbox] = useUpdateCashboxMutation();
  const [updateCashboxGr] = useUpdateCashboxGrMutation();
  const [updateCashTransaction] = useUpdateCashTransactionMutation();
  const [loading, setLoading] = useState(false);

  const fetchValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());

    try {
      let result;

      switch (type) {
        case "main":
          result = await updateStorage(value);
          break;
        case "dep":
          result = await updateDep(value);
          break;
        case "category":
          result = await updateStCategory(value);
          break;
        case "group":
          result = await updateStGroups(value);
          break;
        case "ing":
          result = await updateStIngredients(value);
          break;
        case "newIngGr":
          result = await addStGroups(newGrData);
          result = await updateStIngredients(value);
          break;
        case "supp":
          result = await updateStSuplier(value);
          break;
        case "invGr":
          result = await updateStInvoiceGroup(value);
          break;
        case "cashbox":
          result = await updateCashbox(value);
          break;
        case "cashboxGr":
          result = await updateCashboxGr(value);
          break;
        case "trsn":
          result = await updateCashTransaction(value);
          break;
        default:
          break;
      }

      if (result?.error) {
        es({ message: "Xatolik", variant: "error" });
      } else if (result?.data) {
        dispatch(acCloseUModalU());
        dispatch(acActive({ id: null }));
        e.target.reset();
        setChecked(false);
        es({ message: "Taxrirlash muvoffaqiyatli!", variant: "success" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={open ? "u_modal_container open" : "u_modal_container"}>
      <div className="u_modal_box">
        <form className="u_modal" onSubmit={fetchValues}>
          {children}
          <button className="relative">
            {loading ? <LoadingBtn /> : "Taxrirlash"}
          </button>
        </form>
        <i onClick={() => dispatch(acCloseUModalU())}></i>
      </div>
    </div>
  );
};
