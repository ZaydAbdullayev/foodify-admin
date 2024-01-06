import React, { useState } from "react";
import "./touch.css";

export const AssistiveTouch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <div
        className={`menu-item main-item ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`menu-item item-1 ${isOpen ? "open" : ""}`}>1</div>
      <div className={`menu-item item-2 ${isOpen ? "open" : ""}`}>2</div>
      <div className={`menu-item item-3 ${isOpen ? "open" : ""}`}>3</div>
      <div className={`menu-item item-4 ${isOpen ? "open" : ""}`}>4</div>
    </div>
  );
};

export const gs = [
  {
    address: "&3-stoll",
    cashier: "",
    description: "",
    food_total: 72000,
    id: "4572c420",
    latitude: "",
    longitude: "",
    online_paymentToken: "token",
    order_type: "Restoran",
    padyezd: "",
    paid: 0,
    payment_status: 0,
    payment_type: "",
    prime_cost: 2300,
    product_data:
      '[{"id":"b7faeb","name":"chuchvara","category":"lagmonlar","storage":"oshxona sklad","price":"24000","res_id":"2899b5","prime_cost":"2300","profit":"21700.00","markup":"10.43","ingredients":"[{\\"id\\":\\"5d49b2\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"chuchvaralar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1200,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"1\\"},{\\"id\\":\\"2941f6\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"0.01\\"},{\\"id\\":\\"8a7def\\",\\"name\\":\\"Salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"ad0e04\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"2\\"}]","date":"2024-01-03T19:00:00.000Z","type":"taom","department":"suyuq taomlar","quantity":3,"received_at":"01/06/2024, 03:04 PM"}]',
    qavat: "",
    receivedAt: "2024-01-06T10:03:58.000Z",
    restaurant_id: "2899b5",
    service: 7200,
    status: 0,
    t_location: "ichkari",
    table_name: "3",
    total: 720007200,
    user_id: "c3b530",
    worker_id: "2899b5",
    worker_name: "owner",
  },
  {
    id: "nh383d",
    address: "&12-stoll",
    food_total: 72000,
    online_paymentToken: "token",
    order_type: "Restoran",
    paid: 0,
    prime_cost: 2300,
    product_data:
      '[{"id":"b7faeb","name":"chuchvara","category":"lagmonlar","storage":"oshxona sklad","price":"24000","res_id":"2899b5","prime_cost":"2300","profit":"21700.00","markup":"10.43","ingredients":"[{\\"id\\":\\"5d49b2\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"chuchvaralar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1200,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"1\\"},{\\"id\\":\\"2941f6\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"0.01\\"},{\\"id\\":\\"8a7def\\",\\"name\\":\\"Salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"ad0e04\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"2\\"}]","date":"2024-01-03T19:00:00.000Z","type":"taom","department":"suyuq taomlar","quantity":3},{"id":"b7dww3","name":"chuchvara","category":"lagmonlar","storage":"oshxona sklad","status":"2","price":"24000","res_id":"2899b5","prime_cost":"2300","profit":"21700.00","markup":"10.43","ingredients":"[{\\"id\\":\\"5d49b2\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"chuchvaralar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1200,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"1\\"},{\\"id\\":\\"2941f6\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"0.01\\"},{\\"id\\":\\"8a7def\\",\\"name\\":\\"Salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"ad0e04\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"2\\"}]","date":"2024-01-03T19:00:00.000Z","type":"taom","department":"suyuq taomlar","quantity":3},{"id":"34ffe3","name":"chuchvara","category":"lagmonlar","storage":"oshxona sklad","status":"2","price":"24000","res_id":"2899b5","prime_cost":"2300","profit":"21700.00","markup":"10.43","ingredients":"[{\\"id\\":\\"5d49b2\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"chuchvaralar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1200,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"1\\"},{\\"id\\":\\"2941f6\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"0.01\\"},{\\"id\\":\\"8a7def\\",\\"name\\":\\"Salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"ad0e04\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"2\\"}]","date":"2024-01-03T19:00:00.000Z","type":"taom","department":"suyuq taomlar","quantity":3}]',
    restaurant_id: "2899b5",
    service: "7200.00",
    t_location: "ichkari",
    table_name: "10",
    total: "720007200.00",
    user_id: "060104",
    worker_id: "2899b5",
    worker_name: "owner",
  },
];

export const dep = {
  id: "1f72e5ae",
  one: [],
  product_data:
    '[{"id":"b7faeb","name":"chuchvara","category":"lagmonlar","storage":"oshxona sklad","price":"24000","res_id":"2899b5","prime_cost":"2300","profit":"21700.00","markup":"10.43","ingredients":"[{\\"id\\":\\"5d49b2\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"chuchvaralar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1200,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"1\\"},{\\"id\\":\\"2941f6\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"296142\\",\\"amount\\":\\"0.01\\"},{\\"id\\":\\"8a7def\\",\\"name\\":\\"Salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":100,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"ad0e04\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"2\\"}]","date":"2024-01-03T19:00:00.000Z","type":"taom","department":"suyuq taomlar","quantity":3,"status":2}]',
  receivedAt: "2024-01-05T14:25:15.000Z",
  status: 1,
  two: [],
};

