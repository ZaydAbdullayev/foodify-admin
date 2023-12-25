import React, { useState } from "react";
import { TweenMax, Elastic } from "gsap";
import "./touch.css";

export const AssistiveTouch = () => {
  const [assistOn, setAssistOn] = useState(false);

  const assistiveHandler = () => {
    // Toggle assistOn state
    setAssistOn(!assistOn);

    // Animation logic
    if (!assistOn) {
      TweenMax.to(".assistiveItems", 0.5, {
        width: "80%",
        height: "80%",
        ease: Elastic.easeOut,
      });

      TweenMax.staggerTo(
        ".atItem",
        0.5,
        {
          y: -50,
          opacity: 1,
          ease: Elastic.easeOut,
        },
        0.1
      );
    } else {
      TweenMax.to(".assistiveItems", 0.5, {
        width: 0,
        height: 0,
        ease: Elastic.easeOut,
      });

      TweenMax.staggerTo(
        ".atItem",
        0.5,
        {
          y: 0,
          opacity: 0,
          ease: Elastic.easeOut,
        },
        0.1
      );
    }
  };

  return (
    <div
      className={`assistiveTouch ${assistOn ? "active" : ""}`}
      onClick={assistiveHandler}
    >
      <div className="box"></div>
      <div className="assistiveItems">
        <ul>
          <li className="atItem">
            <a href="javascript" data-history-back className="btnAtItem">
              2
            </a>
          </li>
          <li className="atItem">
            <a href="javascript" className="btnAtItem">
              1
            </a>
          </li>
          {/* Diğer itemleri buraya ekleyebilirsiniz */}
        </ul>
      </div>
    </div>
  );
};
