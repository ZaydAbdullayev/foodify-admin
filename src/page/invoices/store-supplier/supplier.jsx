import React, { useState } from "react";
import { UniversalModal } from "../../../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { acActiveThing, acPassiveThing } from "../../../redux/active";
import { useGetStSuplierQuery } from "../../../service/suplier.service";
import { PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { setAllDocuments, setRelease } from "../../../redux/deleteFoods";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { setDocuments } from "../../../redux/deleteFoods";

export const StorageSupplier = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const acItem = useSelector((state) => state.activeThing);
  const ckddt = useSelector((state) => state.delRouter);
  const [sort, setSort] = useState({ id: null, state: false });
  const [type, setType] = useState();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: suplierData = [], isLoading } = useGetStSuplierQuery();
  React.useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);
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
      <UniversalFilterBox />
      <div className="storage_body">
        <p>
          <span>Yetkazuvchilar</span>
        </p>
        <div className="storage_body_item _item-header">
          <label>
            <input
              type="checkbox"
              name="id"
              onClick={() => {
                setChecked(checked ? false : true);
                dispatch(
                  checked
                    ? setRelease("supplier")
                    : setAllDocuments("supplier", suplierData?.data)
                );
              }}
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
              const check = ckddt?.supplier?.some((el) => el.id === item.id);
              return (
                <div key={item.id} className={"storage_body__box"}>
                  <div
                    className={
                      acItem === item.id
                        ? "storage_body_item active"
                        : "storage_body_item"
                    }
                    key={item.id}
                    onDoubleClick={() => {
                      dispatch(
                        !acItem?.id ? acActiveThing(item) : acPassiveThing()
                      );
                      dispatch(setDocuments("supplier", item));
                      navigate(`?page-code=supplier`);
                    }}
                  >
                    <label
                      onClick={() => {
                        dispatch(
                          !acItem?.id ? acActiveThing(item) : acPassiveThing()
                        );
                        dispatch(setDocuments("supplier", item));
                        navigate(`?page-code=supplier`);
                      }}
                    >
                      <input type="checkbox" defaultChecked={check} />
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
                </div>
              );
            })
          )}
        </div>
      </div>
      <UniversalModal
        type="supp"
        setChecked={setChecked}
        title="Yetkazuvchi qo'shish"
        status={acItem?.id ? false : true}
      >
        <input
          type="text"
          name="name"
          defaultValue={acItem?.name}
          placeholder="Yetkazuvchi nomi*"
          required
        />
        <select name="type" onChange={(e) => setType(e.target.value)}>
          <option value={acItem?.type}>
            {acItem?.type === "person" ? "Oddiy shaxs" : "Yuridik shaxs"}
          </option>
          <option value="person">Oddiy shaxs</option>
          <option value="juridical">Yuridik shaxs</option>
        </select>
        {acItem?.type === "person" ? (
          <>
            <input
              type="text"
              name="fullname"
              defaultValue={acItem?.fullname}
              placeholder="To'liq ism/familiyasi"
              required
            />
            <label>
              <input
                type="text"
                name="passport"
                defaultValue={acItem?.passport}
                placeholder="Passport ma'limotlari"
                required
              />
              <input
                type="text"
                name="SNILS"
                defaultValue={acItem?.SNILS}
                placeholder="SNLS"
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="code"
                defaultValue={acItem?.code}
                placeholder="Bo'lim kodi"
                required
              />
              <input
                type="text"
                name="date"
                defaultValue={acItem?.date}
                placeholder="Berilgan vaqti"
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="INN"
                defaultValue={acItem?.INN}
                placeholder="INN"
                required
              />
              <input
                type="text"
                name="issued_by"
                defaultValue={acItem?.issued_by}
                placeholder="Kim tomonidan berilgan"
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="registered_address"
                defaultValue={acItem?.registered_address}
                placeholder="Bazoviy manzili"
                required
              />
              <input
                type="text"
                name="residence_address"
                defaultValue={acItem?.residence_address}
                placeholder="Yashash manzili"
                required
              />
            </label>
            <PatternFormat
              defaultValue={acItem?.number}
              format="+998 ## ### ## ##"
              name="number"
              mask="_"
              placeholder="+998"
              required
            />
          </>
        ) : (
          acItem?.type === "juridical" && (
            <>
              <input
                type="text"
                name="fullOrganizationName"
                defaultValue={acItem?.fullOrganizationName}
                placeholder="Kompaniya to'liq nomi"
                required
              />
              <label>
                <input
                  type="text"
                  name="shortOrganizationName"
                  defaultValue={acItem?.shortOrganizationName}
                  placeholder="Kompaniya qisqa nomi"
                  required
                />
                <input
                  type="text"
                  name="INN"
                  defaultValue={acItem?.INN}
                  placeholder="INN"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="code"
                  defaultValue={acItem?.code}
                  placeholder="email"
                  required
                />
                <PatternFormat
                  defaultValue={acItem?.number}
                  format="+998 ## ### ####"
                  name="number"
                  mask="_"
                  placeholder="+998"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="KPP"
                  defaultValue={acItem?.KPP}
                  placeholder="KPP"
                  required
                />
                <input
                  type="text"
                  name="OKPO"
                  defaultValue={acItem?.OKPO}
                  placeholder="OKPO"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="ORGN"
                  defaultValue={acItem?.ORGN}
                  placeholder="ORGN"
                  required
                />
                <input
                  type="text"
                  name="headDirector"
                  defaultValue={acItem?.headDirector}
                  placeholder="Direktor ismi"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  name="Yuridik_address"
                  defaultValue={acItem?.Yuridik_address}
                  placeholder="Bazoviy manzili"
                  required
                />
                <input
                  type="text"
                  name="ActualAddress"
                  defaultValue={acItem?.ActualAddress}
                  placeholder="Yashash manzili"
                  required
                />
              </label>
            </>
          )
        )}
        <input type="hidden" name="res_id" value={user?.id} />
        {acItem.id && <input type="hidden" name="id" value={acItem.id} />}
      </UniversalModal>
    </div>
  );
};
