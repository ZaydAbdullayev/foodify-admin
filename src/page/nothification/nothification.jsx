import React, { useState } from "react";
import "./nothification.css";
import { io } from "socket.io-client";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://bvtrj1n0-80.euw.devtunnels.ms");

export const NothificationPage = () => {
  const [data, setData] = useState(fd);
  console.log(data);

  socket.on("/get/nothification", (data) => {
    setData(data);
  });
  return (
    <div className="container_box nothification">
      <p>Bildirishnomalar</p>
      <div className=" container_box nothification_box">
        {data?.map((item) => (
          <div className="nothification-item">
            <span>{item.table_number}</span>
            <div className="nothification-item-info">
              <p>{item.position}</p>
              <span>
                {item.status === "ready" ? "Tayyor" : "Bekor qilindi"}
              </span>
              {item.status === "ready" ? (
                <p>buyurtmadagi {item.describtion} lar tayyor bo'ldi</p>
              ) : (
                <p>buyurtmadagi {item.describtion} lar bekor qilindi</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const fd = [
  {
    id: "453gre",
    order_id: "348934",
    table_number: "6",
    position: "tashqari",
    describtion: ["osh", "shashlik", "salat"],
    status: "cancel",
  },
  {
    id: "w43g3e",
    order_id: "234544",
    table_number: "2",
    position: "ichkari",
    describtion: [],
    status: "ready",
  },
];
