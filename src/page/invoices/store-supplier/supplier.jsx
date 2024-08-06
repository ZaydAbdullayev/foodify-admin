import React, { useState, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
import { setAllDocuments, setRelease } from "../../../redux/deleteFoods";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LoadingBtn } from "../../../components/loading/loading";
import { acNavStatus } from "../../../redux/navbar.status";
import { UniversalFilterBox } from "../../../components/filter/filter";
import { useFetchDataQuery } from "../../../service/fetch.service";
import { useActionItemService } from "../../../service/form.service";
const UniversalModal = lazy(() => import("../../../components/modal/modal"));

export const StorageSupplier = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user || null;
  const acItem = useSelector((state) => state.values)?.vl;
  const ckddt = useSelector((state) => state.delRouter);
  const open = useSelector((state) => state.uModal);
  const [sort, setSort] = useState({ id: null, state: false });
  const [type, setType] = useState();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { actionItem } = useActionItemService()
  const { data: suplierData = [], isLoading } = useFetchDataQuery({ url: `get/suppliers/${user?.id}`, tags: ["suplier"], });
  useEffect(() => { dispatch(acNavStatus([0, 1, 2, 3])); }, [dispatch]);
  const sortData = suplierData?.data && [...suplierData.data].sort((a, b) => {
    if (sort.state) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const groupedInputs = (inputs) => (
    <>
      {inputs.map((group, index) => (
        <label key={index}>
          {group.map((input, subIndex) => (
            <input
              key={subIndex}
              type="text"
              name={input.name}
              defaultValue={acItem?.[input.name]}
              placeholder={input.placeholder}
              required
            />
          ))}
        </label>
      ))}
    </>
  );

  const personGroupedInputs = [
    [{ name: "passport", placeholder: "Passport ma'limotlari" }, { name: "SNILS", placeholder: "SNLS" }],
    [{ name: "code", placeholder: "Bo'lim kodi" }, { name: "date", placeholder: "Berilgan vaqti" }],
    [{ name: "INN", placeholder: "INN" }, { name: "issued_by", placeholder: "Kim tomonidan berilgan" }],
    [{ name: "registered_address", placeholder: "Bazoviy manzili" }, { name: "residence_address", placeholder: "Yashash manzili" }]
  ];

  const juridicalGroupedInputs = [
    [{ name: "shortOrganizationName", placeholder: "Kompaniya qisqa nomi" }, { name: "INN", placeholder: "INN" }],
    [{ name: "code", placeholder: "email" }, { name: "number", placeholder: "Telefon Numarası" }],
    [{ name: "KPP", placeholder: "KPP" }, { name: "OKPO", placeholder: "OKPO" }],
    [{ name: "ORGN", placeholder: "ORGN" }, { name: "headDirector", placeholder: "Direktor ismi" }],
    [{ name: "Yuridik_address", placeholder: "Bazoviy manzili" }, { name: "ActualAddress", placeholder: "Yashash manzili" }]
  ];

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
              checked={checked}
              onChange={() => {
                setChecked(checked ? false : true);
                dispatch(checked ? setRelease("supplier") : setAllDocuments("supplier", suplierData?.data));
              }}
              aria-label="checked this elements"
            />
          </label>
          <p style={{ inlineSize: "var(--univslH)" }}>№</p>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}>
            <p>Ism/Familiya</p>
            {sort.id === 1 && sort.state ? (<RiArrowUpSLine />) : (<RiArrowDownSLine />)}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}>
            <p>Shaxsi</p>
            {sort.id === 1 && sort.state ? (<RiArrowUpSLine />) : (<RiArrowDownSLine />)}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}>
            <p>INN</p>
            {sort.id === 1 && sort.state ? (<RiArrowUpSLine />) : (<RiArrowDownSLine />)}
          </label>
          <label
            onClick={() => setSort({ id: 1, state: !sort.state })}
            style={{ "--data-line-size": "22%" }}>
            <p>Telefon N.</p>
            {sort.id === 1 && sort.state ? (<RiArrowUpSLine />) : (<RiArrowDownSLine />)}
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
                    onDoubleClick={() => actionItem("supplier", item, check)}>
                    <label aria-label="checked this elements">
                      <input
                        type="checkbox"
                        checked={check}
                        onChange={() => actionItem("supplier", item, check)}
                      />
                    </label>
                    <p style={{ inlineSize: "var(--univslH)" }}>{index + 1}</p>
                    <p
                      style={{
                        "--data-line-size": "22%",
                        textAlign: "center",
                      }}>
                      {item.name}
                    </p>
                    <p style={{ "--data-line-size": "22%" }}>{item.type}</p>
                    <p style={{ "--data-line-size": "22%" }}>{item.INN}</p>
                    <p style={{ "--data-line-size": "22%" }}>
                      <a
                        href={`tel:${item.number}`}
                        style={{ color: "#787aff" }}>
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
      {open && <Suspense>
        <UniversalModal
          type="supp"
          setChecked={setChecked}
          title="Yetkazuvchi qo'shish"
          status={acItem?.id ? false : true}>
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
          {acItem?.type === "person" || type === "person" ? (
            <>
              <input
                type="text"
                name="fullname"
                defaultValue={acItem?.fullname}
                placeholder="To'liq ism/familiyasi"
                required
              />
              {groupedInputs(personGroupedInputs)}
              <PatternFormat
                defaultValue={acItem?.number}
                format="+998 ## ### ## ##"
                name="number"
                mask="_"
                placeholder="+998"
                required
              />
            </>
          ) : ((acItem?.type === "juridical" || type === "juridical") &&
            <>
              <input
                type="text"
                name="fullOrganizationName"
                defaultValue={acItem?.fullOrganizationName}
                placeholder="Kompaniya to'liq nomi"
                required
              />
              {groupedInputs(juridicalGroupedInputs)}
            </>
          )}
          <input type="hidden" name="res_id" value={user?.id} />
          {acItem?.id && <input type="hidden" name="id" value={acItem?.id} />}
        </UniversalModal>
      </Suspense>
      }
    </div>
  );
};
