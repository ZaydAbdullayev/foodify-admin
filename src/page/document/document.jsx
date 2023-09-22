import React from "react";
import "./document.css";
import { useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import AnimatedNumber from "animated-number-react";

export const Document = () => {
  const navigate = useNavigate();

  const getCategry = (name) => {
    const category = name?.split(" ").join("+");
    navigate(`/historical/${category}`);
  };

  const formatValue = (value) => value.toFixed(0);

  return (
    <div className="container_box">
      <div className="document_header">
        <h1>Barcha hisobotlar</h1>

        <form className="filter_date">
          <label>
            <input type="date" name="fdate" data-stution="Start:" />
          </label>
          <LuArrowLeftRight />
          <label>
            <input type="date" name="tdate" data-stution="End:" />
          </label>
        </form>
      </div>
      <div className="document_body">
        {category.map((item) => {
          return (
            <div
              className="document_item"
              key={item.id}
              onClick={() => getCategry(item?.name)}
            >
              <p>
                <MdDateRange />
                <span>bugun:</span>
                <span style={{ textTransform: "lowercase" }}>
                  <AnimatedNumber value={item.sold} formatValue={formatValue} />{" "}
                  ta
                </span>
              </p>
              <h3>{item.name}</h3>
              <span>
                $ :{" "}
                <AnimatedNumber
                  value={item.id * item.sold}
                  formatValue={formatValue}
                />{" "}
                sum
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const category = [
  {
    id: 432,
    name: "ichimliklar",
    sold: 303,
  },
  {
    id: 421,
    name: "fast food",
    sold: 340,
  },
  {
    id: 412,
    name: "lagman",
    sold: 412,
  },
  {
    id: 232,
    name: "osh",
    sold: 123,
  },
  {
    id: 422,
    name: "shashlik",
    sold: 234,
  },
  {
    id: 402,
    name: "somsa",
    sold: 134,
  },
  {
    id: 392,
    name: "manti",
    sold: 234,
  },
  {
    id: 382,
    name: "suyuq taomlar",
    sold: 634,
  },
];
