import React, { useState } from "react";
import "./addWorker.css";
import { useAddWorkerMutation } from "../../../service/workers.service";
import { useGetDepQuery } from "../../../service/user.service";
import { usePermissionMutation } from "../../../service/user.service";
import { enqueueSnackbar as es } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoadingBtn } from "../../../components/loading/loading";

export const AddWorker = ({ open, setOpen, state }) => {
  const res = JSON.parse(localStorage.getItem("user"))?.user || [];
  const [newDep, setNewDep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addWorkerMutation] = useAddWorkerMutation();
  const { data: depData = [] } = useGetDepQuery(res.id);
  const [permissionMutation] = usePermissionMutation();
  const navigate = useNavigate();

  const addWorker = async (e) => {
    e.preventDefault();
    const wdata = new FormData(e.target);
    const value = Object.fromEntries(wdata.entries());
    console.log(value);
    try {
      const { data } = await addWorkerMutation(value).unwrap();
      if (data) {
        setOpen(false);
        es("Ishchi qo'shildi", { variant: "success" });
        navigate("/workers");
      }
    } catch (err) {
      return es("Xatolik", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const create_login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);
    try {
      setLoading(true);
      const { data } = await permissionMutation(value);
      localStorage.setItem("permission", JSON.stringify(data));
      window.location.reload();
    } catch (err) {
      return es("Xatolik", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={open ? "addWorker_container open" : "addWorker_container"}>
      <div className="add_worker_box">
        {state === 1 ? (
          <form className="add_worker relative" onSubmit={addWorker}>
            <p>Yangi ishchi qo'shish</p>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="Ishchining ismi*"
            />

            <select
              name="department"
              onChange={(e) => setNewDep(e.target.value)}
            >
              <option value="">Bo'lim tanlang</option>
              {depData?.innerData?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="new">Yangi bo'lim oshish</option>
            </select>
            {newDep === "new" && (
              <input
                type="text"
                name="department"
                required
                autoComplete="off"
                placeholder="Yangi bo'lim kiriting*"
              />
            )}
            <input
              type="text"
              name="pin"
              required
              autoComplete="off"
              placeholder="Ishchi uchun kirish kodi*"
            />
            <input type="hidden" name="res_id" value={res?.id} />
            <button className="relative">
              {loading ? <LoadingBtn /> : "Qo'shish"}
            </button>
            <span className="close_btn">×</span>
          </form>
        ) : (
          <form className="add_worker relative" onSubmit={create_login}>
            <input
              type="text"
              name="workers"
              placeholder="Username"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="workerpass"
              placeholder="Password"
              required
              autoComplete="off"
            />
            <button className="relative">
              {loading ? <LoadingBtn /> : "Qo'shish"}
            </button>
            <span className="close_btn"></span>
          </form>
        )}

        <i onClick={() => setOpen(false)}></i>
      </div>
    </div>
  );
};
