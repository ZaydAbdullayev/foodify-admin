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

export const gs = {
  address: "&4-stoll",
  cashier: "",
  description: "",
  food_total: 34000,
  id: "b9645110",
  latitude: "",
  longitude: "",
  online_paymentToken: "token",
  order_type: "offline",
  padyezd: "",
  paid: 0,
  payment_status: 0,
  payment_type: "",
  prime_cost: 5700,
  product_data:
    '{"1":{"pd":[{"id":"a698de","name":"somsa","category":"fast food","storage":"oshxona sklad","price":"12000","res_id":"2899b5","prime_cost":"4000","profit":"8000","markup":"3","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"2\\"}]","date":"2024-01-08T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":4,"quantity":1},{"id":"161efe","name":"sandvich","category":"fast food","storage":"oshxona sklad","price":"22000","res_id":"2899b5","prime_cost":"1700","profit":"20300","markup":"12.94","ingredients":"[{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":0,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"338b7d\\",\\"name\\":\\"oshko\'k\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.5\\"},{\\"id\\":\\"49c458\\",\\"name\\":\\"salat bargi\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.5\\"},{\\"id\\":\\"d2a4d1\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.1\\"}]","date":"2024-01-07T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":4,"quantity":1}],"received_at":"2024-01-18T13:07:48.886Z"}}',
  qavat: "",
  receivedAt: "2024-01-18T13:07:48.000Z",
  restaurant_id: "2899b5",
  service: 3400,
  status: 2,
  t_location: "tashqari",
  table_name: "4",
  total: 340003400,
  user_id: "fdfc62",
  worker_id: "2899b5",
  worker_name: "owner",
};

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
