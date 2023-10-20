import React from "react";
import "./addWorker.css";
import { useAddWorkerMutation } from "../../../service/workers.service";
import { enqueueSnackbar as es } from "notistack";
import { useNavigate } from "react-router-dom";

export const AddWorker = ({ open, setOpen }) => {
  const res = JSON.parse(localStorage.getItem("user"))?.user || [];
  const [addWorkerMutation] = useAddWorkerMutation();
  const navigate = useNavigate();

  const addWorker = async (e) => {
    e.preventDefault();
    const wdata = new FormData(e.target);
    const value = Object.fromEntries(wdata.entries());
    console.log(value);
    const { error, data } = await addWorkerMutation(value);
    if (error) {
      return es("Xatolik", { variant: "error" });
    }
    if (data) {
      setOpen(false);
      es("Ishchi qo'shildi", { variant: "success" });
      navigate("/workers");
    }
  };

  return (
    <div className={open ? "addWorker_container open" : "addWorker_container"}>
      <div className="add_worker_box">
        <form className="add_worker" onSubmit={addWorker}>
          <p>Yangi ishchi qo'shish</p>
          <input
            type="text"
            name="name"
            required
            autoComplete="off"
            placeholder="Ishchining ismi*"
          />
          <input
            type="text"
            name="department"
            required
            autoComplete="off"
            placeholder="Bo'lim kiriting*"
          />
          <input
            type="text"
            name="pin"
            required
            autoComplete="off"
            placeholder="Ishchi uchun kirish kodi*"
          />
          <input
            type="text"
            name="password"
            required
            autoComplete="off"
            placeholder="Ruxsat paroli*"
          />
          <input type="hidden" name="res_id" value={res?.id} />
          <input type="hidden" name="login" value={res?.username} />
          <button>Qo'shish</button>
        </form>
        <i onClick={() => setOpen(false)}></i>
      </div>
    </div>
  );
};
