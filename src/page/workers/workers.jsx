import React, { useState } from "react";
import "./workers.css";
import {
  useGetWorkersQuery,
  useDeleteWorkerMutation,
  useUpdateWorkerMutation,
} from "../../service/workers.service";
import { enqueueSnackbar as es } from "notistack";
import { useSelector } from "react-redux";

import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HiUserPlus } from "react-icons/hi2";
import { AddWorker } from "./addWorker/addWorker";
import { FaCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaUserLock } from "react-icons/fa";

export const Workers = () => {
  const permission = JSON.parse(localStorage.getItem("permission")) || null;
  const search = useSelector((state) => state.search);
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(null);
  const [type, setType] = useState(1); // 1 - add worker, 2 - add permission
  const [info, setInfo] = useState({});
  const { data: workersData = [] } = useGetWorkersQuery();
  const [deleteWorkerMutation] = useDeleteWorkerMutation();
  const [updateWorkerMutation] = useUpdateWorkerMutation();

  const handleEdit = async (value) => {
    const { error, data } = await updateWorkerMutation(value);
    if (error) {
      return es("Xatolik", { variant: "error" });
    }
    if (data) {
      setUpdate(null);
      setInfo({});
      return es("Muvoffaqiyatli", { variant: "success" });
    }
  };

  const handleInfoChange = (key, value) => {
    setInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  const handleDelete = async (id) => {
    const { error, data } = await deleteWorkerMutation(id);
    if (error) {
      return es("Xatolik", { variant: "error" });
    }
    if (data) {
      return es("Ishchi o'chirildi", { variant: "success" });
    }
  };

  const openModal = (value) => {
    setOpen(true);
    setType(value);
  };

  const filteredWorkers = workersData?.innerData?.filter((worker) =>
    worker?.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container_box">
      <div className="workers_header">
        <p>Ishchilar</p>
        {permission && (
          <button onClick={() => openModal(1)}>
            Ishchi qo'shish <HiUserPlus />
          </button>
        )}
      </div>
      <div
        className="worker"
        style={{ borderBottom: "1px solid #ccc", padding: "0.5% 2%" }}
      >
        <p>a/p</p>
        <p>Ismi</p>
        <p>Parol</p>
        <p>Bo'limi</p>
        <p>Kod</p>
        <p></p>
      </div>
      <div className="workers_body">
        {permission ? (
          filteredWorkers?.map((worker) => {
            return (
              <div className="worker" key={worker.id}>
                <p>
                  <span
                    style={
                      worker?.status === 1
                        ? { color: "lime" }
                        : { color: "red" }
                    }
                    onClick={() =>
                      handleEdit({ id: worker.id, status: !worker.status })
                    }
                  >
                    <GoDotFill />
                  </span>
                </p>
                <p>
                  {update === worker.id ? (
                    <input
                      type="text"
                      name="name"
                      autoFocus
                      defaultValue={worker.name}
                      onChange={(e) => handleInfoChange("name", e.target.value)}
                    />
                  ) : (
                    <span style={{ textTransform: "capitalize" }}>
                      {worker.name}
                    </span>
                  )}
                </p>
                <p>{worker.workerpass && "••••••"}</p>
                <p>
                  {update === worker.id ? (
                    <>
                      <input
                        type="text"
                        name="department"
                        defaultValue={worker.department}
                        onChange={(e) =>
                          handleInfoChange("department", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <span
                      style={{
                        background:
                          worker.department === "kassir"
                            ? "#f9c74f"
                            : worker.department === "offitsant"
                            ? "#43aa8b"
                            : "#f25c54",
                      }}
                    >
                      {worker.department}
                    </span>
                  )}
                </p>
                <p className="w_pin">
                  {update === worker.id ? (
                    <input
                      type="text"
                      name="pin"
                      defaultValue={worker.pin}
                      onChange={(e) => handleInfoChange("pin", e.target.value)}
                    />
                  ) : (
                    <>
                      <span>{show === worker.id ? worker.pin : "••••••"}</span>
                      <span
                        onClick={() => setShow(show === "" ? worker.id : "")}
                        style={show !== worker.id ? {} : { color: "orange" }}
                      >
                        {show !== worker.id ? <BsEyeSlash /> : <BsEye />}
                      </span>
                    </>
                  )}
                </p>
                <div className="w_btns">
                  {update === worker.id && (
                    <button
                      style={{ background: "red" }}
                      onClick={() => setUpdate(null)}
                    >
                      <ImCancelCircle />
                    </button>
                  )}
                  {update === worker.id ? (
                    <button
                      style={{ background: "#76c893" }}
                      onClick={() => handleEdit({ ...info, id: worker.id })}
                    >
                      <FaCheck />
                    </button>
                  ) : (
                    <button
                      style={{ background: "#76c893" }}
                      onClick={() => setUpdate(worker.id)}
                    >
                      <MdModeEditOutline />
                    </button>
                  )}
                  <button onClick={() => handleDelete(worker.id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <button className="universal_key" onClick={() => openModal(2)}>
            <span>+</span>
            <FaUserLock />
          </button>
        )}
      </div>
      <AddWorker open={open} setOpen={setOpen} state={type} />
    </div>
  );
};

// const workers = [
//   {
//     id: "355335",
//     name: "Murod",
//     password: "123456",
//     department: "kassir",
//     code: "123456",
//     active: true,
//   },
//   {
//     id: "765433",
//     name: "Saidakbar",
//     password: "123456",
//     department: "waiter",
//     code: "123456",
//   },
//   {
//     id: "234567",
//     name: "Asadbek",
//     password: "123456",
//     department: "cheff",
//     code: "123456",
//   },
//   {
//     id: "355335",
//     name: "Murod",
//     password: "123456",
//     department: "kassir",
//     code: "123456",
//     active: true,
//   },
//   {
//     id: "765433",
//     name: "Saidakbar",
//     password: "123456",
//     department: "waiter",
//     code: "123456",
//     active: true,
//   },
//   {
//     id: "234567",
//     name: "Asadbek",
//     password: "123456",
//     department: "cheff",
//     code: "123456",
//   },
//   {
//     id: "355335",
//     name: "Murod",
//     password: "123456",
//     department: "kassir",
//     code: "123456",
//   },
//   {
//     id: "765433",
//     name: "Saidakbar",
//     password: "123456",
//     department: "waiter",
//     code: "123456",
//   },
//   {
//     id: "234567",
//     name: "Asadbek",
//     password: "123456",
//     department: "cheff",
//     code: "123456",
//   },
// ];
