import React, { useState } from "react";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { acCloseUModal } from "../../redux/u-modal";
import { useAddStoreMutation } from "../../service/store.service";
import { useUpdateStoreMutation } from "../../service/store.service";
import { enqueueSnackbar as es } from "notistack";
import { LoadingBtn } from "../../components/loading/loading";

export const UniversalModal = ({ children, type }) => {
  const open = useSelector((state) => state.uModal);
  const dispatch = useDispatch();
  const [addStorage] = useAddStoreMutation();
  const [updateStorage] = useUpdateStoreMutation();
  const [loading, setLoading] = useState(false);

  const fetchValues = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const value = Object.fromEntries(formdata.entries());
    try {
      if (type === "main") {
        const { data, error } = await addStorage(value);
        if (error) return es({ message: "Xatolik", variant: "error" });
        if (data) {
          dispatch(acCloseUModal());
          e.target.reset();
          return;
        }
      }
    } catch (err) {
      console.log(err);
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
