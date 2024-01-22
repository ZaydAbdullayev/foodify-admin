import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import "./touch.css";

import audio from "../../assets/images/nothification.mp3";

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
