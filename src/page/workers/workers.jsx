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

export const Workers = () => {
  // const res = JSON.parse(localStorage.getItem("user"))?.user || [];
  const search = useSelector((state) => state.search);
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(null);
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

  const filteredWorkers = workersData?.innerData?.filter((worker) =>
    worker?.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container_box">
      <div className="workers_header">
        <p>Ishchilar</p>
        <button onClick={() => setOpen(true)}>
          Ishchi qo'shish <HiUserPlus />
        </button>
      </div>
      <div
        className="worker"
        style={{ borderBottom: "1px solid #ccc", padding: "0.5% 2%" }}
      >
        <p></p>
        <p>Ismi</p>
        <p>Parol</p>
        <p>Bo'limi</p>
        <p>Kod</p>
        <p></p>
      </div>
      <div className="workers_body">
        {filteredWorkers?.map((worker) => {
          return (
            <div className="worker" key={worker.id}>
              <p>
                <span
                  style={{
                    color: worker.active ? "lime" : "red",
                  }}
                  onClick={() =>
                    handleEdit({ id: worker.id, status: !worker.status })
                  }
                >
                  <GoDotFill />
                </span>
              </p>
              {update === worker.id ? (
                <input
                  type="text"
                  name="name"
                  defaultValue={worker.name}
                  onChange={(e) => handleInfoChange("name", e.target.value)}
                />
              ) : (
                <p>{worker.name}</p>
              )}
              <p>{worker.password && "••••••"}</p>
              <p>
                {update === worker.id ? (
                  <>
                    <input
                      type="text"
                      name="department"
                      defaultValue={worker.department}
                      onChange={(e) => handleEdit("department", e.target.value)}
                    />
                    {/* <datalist id="department">
                      <option value="cashier" />
                      <option value="waiter" />
                      <option value="cheff" />
                    </datalist> */}
                  </>
                ) : (
                  <span
                    style={{
                      background:
                        worker.department === "cashier"
                          ? "#f9c74f"
                          : worker.department === "waiter"
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
                    defaultValue={worker.code}
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
        })}
      </div>
      <AddWorker open={open} setOpen={setOpen} />
    </div>
  );
};

// const workers = [
//   {
//     id: "355335",
//     name: "Murod",
//     password: "123456",
//     department: "cashier",
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
//     department: "cashier",
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
//     department: "cashier",
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
