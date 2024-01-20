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

export const sp = {
  address: "&4-stoll",
  cashier: "",
  description: "",
  food_total: 52000,
  id: "df3b6142",
  latitude: "",
  longitude: "",
  online_paymentToken: "token",
  order_type: "offline",
  padyezd: "",
  paid: 0,
  payment_status: 0,
  payment_type: "",
  prime_cost: 40950,
  product_data:
    '{"1":{"pd":[{"id":"22ad50","name":"sho\'rva","category":"lagman","storage":"oshxona sklad","price":"40000","res_id":"2899b5","prime_cost":"36950","profit":"3050","markup":"1.08","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.1\\"},{\\"id\\":\\"338b7d\\",\\"name\\":\\"oshko\'k\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.1\\"},{\\"id\\":\\"6c1afe\\",\\"name\\":\\"semichka yog\'i\\",\\"unit\\":\\"l\\",\\"group\\":\\"yog\'\\",\\"res_id\\":\\"2899b5\\",\\"price\\":180000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.2\\"},{\\"id\\":\\"894c2d\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":3000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.2\\"},{\\"id\\":\\"d2a4d1\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.1\\"}]","date":"2024-01-07T19:00:00.000Z","type":"taom","department":"suyuq taomlar","img":"","status":1,"quantity":1},{"id":"a698de","name":"somsa","category":"fast food","storage":"oshxona sklad","price":"12000","res_id":"2899b5","prime_cost":"4000","profit":"8000","markup":"3","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"2\\"}]","date":"2024-01-08T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":1,"quantity":1}],"received_at":"2024-01-19T12:25:16.536Z"},"2":[{"id":"22ad50","name":"sho\'rva","category":"lagman","storage":"oshxona sklad","price":"40000","res_id":"2899b5","prime_cost":"36950","profit":"3050","markup":"1.08","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.1\\"},{\\"id\\":\\"338b7d\\",\\"name\\":\\"oshko\'k\\",\\"unit\\":\\"ta\\",\\"group\\":\\"ko\'katlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"0.1\\"},{\\"id\\":\\"6c1afe\\",\\"name\\":\\"semichka yog\'i\\",\\"unit\\":\\"l\\",\\"group\\":\\"yog\'\\",\\"res_id\\":\\"2899b5\\",\\"price\\":180000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.2\\"},{\\"id\\":\\"894c2d\\",\\"name\\":\\"kartoshka\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":3000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.2\\"},{\\"id\\":\\"d2a4d1\\",\\"name\\":\\"sabzi\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":2000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"0.1\\"}]","date":"2024-01-07T19:00:00.000Z","type":"taom","department":"suyuq taomlar","img":"","status":1,"quantity":1},{"id":"a698de","name":"somsa","category":"fast food","storage":"oshxona sklad","price":"12000","res_id":"2899b5","prime_cost":"4000","profit":"8000","markup":"3","ingredients":"[{\\"id\\":\\"1c4a67\\",\\"name\\":\\"piyoz\\",\\"unit\\":\\"kg\\",\\"group\\":\\"sabzavotlar\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1000,\\"type\\":\\"Ingredient\\",\\"storage_id\\":null,\\"amount\\":\\"1\\"},{\\"id\\":\\"225081\\",\\"name\\":\\"hamir\\",\\"unit\\":\\"kg\\",\\"group\\":\\"hamir\\",\\"res_id\\":\\"2899b5\\",\\"price\\":1500,\\"type\\":\\"Ingredient\\",\\"storage_id\\":\\"1f1a3e\\",\\"amount\\":\\"2\\"}]","date":"2024-01-08T19:00:00.000Z","type":"taom","department":"somsalar","img":"","status":1,"quantity":1}]}',
  qavat: "",
  receivedAt: "2024-01-19T12:25:16.000Z",
  restaurant_id: "2899b5",
  service: 5200,
  status: 0,
  t_location: "ichkari",
  table_name: "4",
  total: 520005200,
  user_id: "aff0f6",
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

export const TypingAnimation = () => {
  const originalText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sed optio assumenda itaque quia doloremque amet, ipsa dignissimos placeat. Corporis expedita harum est explicabo odio natus sequi nemo ratione modi quia voluptatum quo maiores ut accusantium consequatur architecto itaque, ipsa, aperiam quaerat, dolore alias fugiat magni? Earum exercitationem, ut dolores odio voluptates in fugiat voluptate. Dolores aspernatur dolorem aperiam veritatis deleniti consequuntur velit esse eum cum quia. Minus error expedita sapiente esse nam odit id magni molestiae suscipit. Reprehenderit nostrum qui labore quia vitae nobis voluptatem libero laudantium, eos eaque dolore blanditiis aspernatur consequuntur ad adipisci laborum vero, quaerat pariatur!...";

  const [displayText, setDisplayText] = useState("");
  const typingRef = useRef(null); // Yeni eklenen ref

  useEffect(() => {
    let currentIndex = 0;

    const animateText = () => {
      setDisplayText(originalText.slice(0, currentIndex));
      typingRef.current.style.width = `${typingRef.current.scrollWidth}px`; // Genişlik güncellemesi
      currentIndex++;

      if (currentIndex <= originalText.length) {
        requestAnimationFrame(animateText);
      }
    };

    if (currentIndex === 0) {
      animateText();
    }
  }, []);

  return (
    <p className="typing-text" ref={typingRef}>
      {displayText}
    </p>
  );
};
