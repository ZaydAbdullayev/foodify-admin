import React, { useEffect } from "react";
import "./mobile.transaction.css";
import { useFetchDataQuery } from "../../service/fetch.service";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "../../hooks/generate.tags";
import { acNavStatus } from "../../redux/navbar.status";

export const MobileInvoice = () => {
  const res_id = useSelector((state) => state.res_id);
  const dispatch = useDispatch();
  const { data: invoiceData = [] } = useFetchDataQuery({
    url: `get/InvoiceGroups/${res_id}`,
    tags: ["invoice-group"],
  });
  const { data: cashboxData = [] } = useFetchDataQuery({
    url: `get/cashbox/${res_id}`,
    tags: ["cashboxes"],
  });
  const activityData = [
    {
      name: "Operativ",
    },
    {
      name: "Sarmoya",
    },
    {
      name: "Pul",
    },
  ];

  const paymentData = [
    {
      name: "Naqd",
    },
    {
      name: "Plastik",
    },
    {
      name: "Bank",
    },
    {
      name: "Elektron",
    },
  ];

  useEffect(() => {
    dispatch(acNavStatus([0, 1, 2, 3]));
  }, [dispatch]);
  return (
    <form className="mobile-invoice container_box">
      <p>To'lov harakalari</p>
      <div className="activity-type">
        <p>Kassa * :</p>
        <div className="activity-types">
          {cashboxData?.data?.map((item) => (
            <CheckBox label={item.name} value={item.name} name={"cashbox"} />
          ))}
        </div>
      </div>
      <div className="activity-type">
        <p>Harakat guruhi * :</p>
        <div className="activity-types">
          {invoiceData?.data?.map((item) => (
            <CheckBox
              label={item.name}
              value={item.name}
              description="Harakat guruhi"
              name={"transaction_group"}
            />
          ))}
        </div>
      </div>
      <div className="activity-type">
        <p>Harakat turi * :</p>
        <div className="activity-types">
          {activityData?.map((item) => (
            <CheckBox
              label={item.name}
              value={item.name}
              name={"activity_kind"}
            />
          ))}
        </div>
      </div>
      <div className="activity-type">
        <p>To'lov turi * :</p>
        <div className="activity-types">
          {paymentData?.map((item) => (
            <CheckBox
              label={item.name}
              value={item.name}
              name={"payment_type"}
            />
          ))}
        </div>
      </div>
      <div className="activity-type">
        <p>Tafsilot :</p>
        <div className="activity-types">
          <textarea name="description" placeholder="Tafsilot"></textarea>
        </div>
      </div>
      <div className="activity-type">
        <p>Miqdori :</p>
        <div className="activity-types">
          <input type="number" name="paid" placeholder="Miqdori" />
        </div>
      </div>
    </form>
  );
};
