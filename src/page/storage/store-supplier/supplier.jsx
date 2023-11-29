import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { UniversalUModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActive } from "../../../redux/active";
import { useGetStSuplierQuery } from "../../../service/suplier.service";
import { PatternFormat } from "react-number-format";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";

export const StorageSupplier = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const [sort, setSort] = useState({ id: null, state: false });
  const [type, setType] = useState("default");
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState(null);
  const acItem = useSelector((state) => state.active);
  const dispatch = useDispatch();
  const { data: suplierData = [], isLoading } = useGetStSuplierQuery();

  const sortData =
    suplierData?.data &&
    [...suplierData.data].sort((a, b) => {
      if (sort.state) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="storage_container">
      <div className="storage_header"></div>
      <div className="storage_body">
        <p>Yetkazuvchilar</p>
        <div className="storage_body_item">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => setChecked(!checked)}
            />
          </label>
          <p>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}
          >
            <p>Ism/Familiya</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}
          >
            <p>Shaxsi</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}
          >
            <p>INN</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}
          >
            <p>Telefon N.</p>
            {sort.id === 1 && sort.state ? (
              <RiArrowUpSLine />
            ) : (
              <RiArrowDownSLine />
            )}
          </label>
        </div>
        <div className="storage_body_box">
          {isLoading ? (
            <span>
              <LoadingBtn />
            </span>
          ) : (
            sortData?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={
                    showMore === item.id
                      ? "storage_body__box active"
                      : "storage_body__box"
                  }
                >
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() =>
                      dispatch(
                        acActive({
                          id: !acItem.id ? item.id : null,
                          name: !acItem.name ? item.name : "",
                        })
                      )
                    }
                  >
                    <label
                      onClick={() =>
                        dispatch(
                          acActive({
                            id: !acItem.id ? item.id : null,
                            name: !acItem.name ? item.name : "",
                          })
                        )
                      }
                    >
                      {checked ? (
                        <input type="checkbox" name="id" checked />
                      ) : (
                        <input type="checkbox" name="id" />
                      )}
                    </label>
                    <p>{index + 1}</p>
                    <p
                      style={{ "--data-line-size": "22%", textAlign: "center" }}
                    >
                      {item.name}
                    </p>
                    <p style={{ "--data-line-size": "22%" }}>{item.type}</p>
                    <p style={{ "--data-line-size": "22%" }}>{item.INN}</p>
                    <p style={{ "--data-line-size": "22%" }}>
                      <a
                        href={`tel:${item.number}`}
                        style={{ color: "#787aff" }}
                      >
                        <PatternFormat
                          value={item.number}
                          format="+### ## ### ####"
                          displayType="text"
                        />
                      </a>
                    </p>
                  </div>
                  <div className=" storage-body_inner_item">
                    <div className="storage_body_item">
                      <p
                        style={{
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        №
                      </p>
                      <p
                        style={{
                          "--data-line-size": "25%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Mahsulot turi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                          borderRight: "1px solid #ccc5",
                        }}
                      >
                        Nomi
                      </p>
                      <p
                        style={{
                          "--data-line-size": "35%",
                        }}
                      >
                        O'lchov birligi
                      </p>
                    </div>
                    {item?.data?.map((product, ind) => {
                      return (
                        <div className="storage_body_item inner_item" key={ind}>
                          <p
                            style={{
                              borderRight: "1px solid #ccc5",
                            }}
                          >
                            {ind + 1}
                          </p>
                          <p style={{ "--data-line-size": "25%" }}>
                            {product.name}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.password}
                          </p>
                          <p style={{ "--data-line-size": "35%" }}>
                            {product.code}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal type="supp">
        <p>Guruh qo'shish</p>
        <input
          type="text"
          name="name"
          placeholder="Yetkazuvchi nomi*"
          required
        />
        <select name="type" onChange={(e) => setType(e.target.value)}>
          <option value="default">Yetkazuvchi turi</option>
          <option value="person">Oddiy shaxs</option>
          <option value="juridical">Yuridik shaxs</option>
        </select>
        {type === "person" ? (
          <>
            <input
              type="text"
              name="fullname"
              placeholder="To'liq ism/familiyasi"
              required
            />
            <label>
              <input
                type="text"
                name="passport"
                placeholder="Passport ma'limotlari"
                required
              />
              <input type="text" name="SNILS" placeholder="SNLS" required />
            </label>
            <label>
              <input
                type="text"
                name="code"
                placeholder="Bo'lim kodi"
                required
              />
              <input
                type="text"
                name="date"
                placeholder="Berilgan vaqti"
                required
              />
            </label>
            <label>
              <input type="text" name="INN" placeholder="INN" required />
              <input
                type="text"
                name="issued_by"
                placeholder="Kim tomonidan berilgan"
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="registered_address"
                placeholder="Bazoviy manzili"
                required
              />
              <input
                type="text"
                name="residence_address"
                placeholder="Yashash manzili"
                required
              />
            </label>
            <PatternFormat
              format="+998 ## ### ## ##"
              name="number"
              mask="_"
              placeholder="+998"
              required
            />
          </>
        ) : (
          type === "juridical" && (
            <>
              <input
                type="text"
                name="fullOrganizationName"
                placeholder="Kompaniya to'liq nomi"
                required
              />
              <label>
                <input
                  type="text"
                  name="shortOrganizationName"
                  placeholder="Kompaniya qisqa nomi"
                  required
                />
                <input type="text" name="INN" placeholder="INN" required />
              </label>
              <label>
                <input type="text" name="code" placeholder="email" required />
                <PatternFormat
                  format="+998 ## ### ####"
                  name="number"
                  mask="_"
                  placeholder="+998"
                  required
                />
              </label>
              <label>
                <input type="text" name="KPP" placeholder="KPP" required />
                <input type="text" name="OKPO" placeholder="OKPO" required />
              </label>
              <label>
                <input type="text" name="ORGN" placeholder="ORGN" required />
                <input
                  type="text"
                  name="headDirector"
                  placeholder="Direktor ismi"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="Yuridik_address"
                  placeholder="Bazoviy manzili"
                  required
                />
                <input
                  type="text"
                  name="ActualAddress"
                  placeholder="Yashash manzili"
                  required
                />
              </label>
            </>
          )
        )}
        <input type="hidden" name="res_id" value={user?.id} />
      </UniversalModal>
      <UniversalUModal type="group">
        <p>Taxrirlash</p>
        <input
          type="text"
          name="name"
          placeholder="Guruh nomi*"
          defaultValue={acItem.name}
          required
        />
        <input type="hidden" name="res_id" value={user?.id} />
        <input type="hidden" name="id" value={acItem?.id} />
      </UniversalUModal>
    </div>
  );
};
