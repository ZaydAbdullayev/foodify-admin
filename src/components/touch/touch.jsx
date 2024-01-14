import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
// import Sound from "react-sound";
import "./touch.css";

import audio from "../../assets/images/nothification.mp3";

export const AssistiveTouch = () => {
  return (
    <div class="grid-container">
      <div class="item_grid item_grid1">1</div>
      <div class="item_grid item_grid2">2</div>
      <div class="item_grid item_grid3">3</div>
      <div class="item_grid item_grid4">4</div>
      <div class="item_grid item_grid5">5</div>
    </div>
  );
};

const SoundButton = () => {
  const sound = new Howl({
    src: [audio],
    html5: true,
  });

  const oynatSes = () => {
    sound.play();
  };

  setTimeout(() => {
    sound.play();
  }, 2000);

  return (
    <div>
      <button onClick={oynatSes}>Ses Çal</button>
    </div>
  );
};

export default SoundButton;

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

export const Test = () => {
  const [showContent, setShowContent] = useState(false);
  const pressTimer = useRef(null);

  const handleMouseDown = () => {
    pressTimer.current = setTimeout(() => {
      setShowContent(true);
    }, 5000);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer.current);
    setShowContent(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(pressTimer.current);
    };
  }, []);

  return (
    <div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {showContent && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            İçerik burada görünmelidir.
          </div>
        )}
      </div>
    </div>
  );
};
