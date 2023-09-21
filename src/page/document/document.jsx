import React from "react";
import "./document.css";
import { useNavigate } from "react-router-dom";

export const Document = () => {
  const navigate = useNavigate();

  const getCategry = (name) => {
    const category = name?.split(" ").join("+");
    navigate(`/historical/?ct=${category}`);
  };

  return (
    <div className="document container_box">
      <h1>Barcha hisobotlar</h1>
      <div className="document_body">
        {category.map((item) => {
          return (
            <div
              className="document_item"
              key={item.id}
              onClick={() => getCategry(item?.name)}
            >
              <h3>{item.name}</h3>
              <p>bugun sotildi</p>
              <span>{item.sold}</span>
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
