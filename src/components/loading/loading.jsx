// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import "./loading.css";

// export const Loading = () => {
//   const mainSVGRef = useRef(null);
//   const pizzaBaseRef = useRef(null);
//   const ingredientGroupRef = useRef(null);

//   useEffect(() => {
//     const gsapConfig = { trialWarn: false };
//     gsap.config(gsapConfig);

//     const select = (s) => document.querySelector(s);
//     const toArray = (s) => gsap.utils.toArray(s);
//     const pizzaSpinDuration = 4;
//     const mainSVG = select("#mainSVG");
//     const pizzaBase = pizzaBaseRef.current;
//     const allIngredients = toArray(".ingredient");
//     const allMushrooms = toArray(".mushroom");
//     const allSalami = toArray(".salami");
//     const allOlive = toArray(".olive");
//     const allPeppers = toArray(".pepper");

//     gsap.set("svg", {
//       visibility: "visible",
//     });

//     let pizzaProp = gsap.getProperty("#pizzaBase");

//     function addToPizza(el) {
//       let pizzaRot = pizzaProp("rotation");
//       gsap.set(el, {
//         rotation: 360 - pizzaRot,
//         svgOrigin: "400 300",
//       });
//       pizzaBase.appendChild(el);
//     }

//     function reset() {
//       allIngredients.forEach((c) => {
//         ingredientGroupRef.current.appendChild(c);
//         gsap.set(c, {
//           rotation: 0,
//           y: 0,
//         });
//       });
//       gsap.set("#egg .eggBits", {
//         scale: 0,
//         svgOrigin: "400 300",
//       });
//       gsap.set("#eggShine", {
//         opacity: 0,
//       });
//     }

//     let tl = gsap.timeline({ repeat: -1, onRepeat: reset });
//     tl.to("#pizzaBase", {
//       duration: pizzaSpinDuration,
//       rotation: -360,
//       repeat: 2,
//       svgOrigin: "400 300",
//       ease: "none",
//     })
//       .to(
//         "#egg",
//         {
//           duration: pizzaSpinDuration,
//           rotation: -360,
//           repeat: 2,
//           ease: "none",
//         },
//         0
//       )
//       .to(
//         allMushrooms,
//         {
//           duration: 1.2,
//           opacity: 1,
//           y: "+=158",
//           stagger: {
//             each: pizzaSpinDuration / allMushrooms.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         0.47
//       )
//       .to(
//         allPeppers,
//         {
//           opacity: 1,
//           y: "+=200",
//           stagger: {
//             each: pizzaSpinDuration / allPeppers.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power1.in",
//         },
//         1
//       )
//       .to(
//         allSalami,
//         {
//           opacity: 1,
//           y: "+=152",
//           stagger: {
//             each: pizzaSpinDuration / allSalami.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         1.5
//       )
//       .to(
//         allOlive,
//         {
//           opacity: 1,
//           y: "+=180",
//           stagger: {
//             each: pizzaSpinDuration / allOlive.length,
//             onComplete: function () {
//               addToPizza(this.targets()[0]);
//             },
//           },
//           ease: "power3.in",
//         },
//         0.78
//       )
//       .to(
//         "#egg .eggBits",
//         {
//           duration: 1,
//           scale: 1,
//           stagger: {
//             amount: 0.2,
//           },
//           ease: "elastic(0.6, 0.5)",
//         },
//         "-=4"
//       )
//       .to(
//         "#eggShine",
//         {
//           opacity: 0.6,
//         },
//         "-=3.65"
//       )
//       .to(
//         ".ingredient, #egg, #eggShine",
//         {
//           opacity: 0,
//         },
//         "-=0.5"
//       );

//     gsap.globalTimeline.timeScale(1.25);
//     reset();
//   }, []);
//   return (
//     <div className="loading">
//       <svg
//         id="mainSVG"
//         ref={mainSVGRef}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 800 600"
//       >
//         <g id="pizzaBase" ref={pizzaBaseRef}>
//           <circle cx="400" cy="300" r="110.05" fill="#EEB554" />
//           <circle cx="400" cy="300" r="99.4" fill="#FDC372" />
//         </g>
//         <g id="ingredientGroup" ref={ingredientGroupRef}>
//           <g id="mushrooms">
//             <g className="ingredient mushroom">
//               <path
//                 fill="#A08B75"
//                 d="M405.4,322.5c-7.7,0-13.9-6.2-13.9-13.9c0-7.7,6.2-13.9,13.9-13.9s13.9,6.2,13.9,13.9
//               C419.4,316.3,413.2,322.5,405.4,322.5z"
//               />
//               <path
//                 fill="#FFFFFF"
//                 d="M399.7,317.6c-0.7,0.8-2.7,1.9-5.4,1.9c-3.7,0-6.7-3-6.7-6.7c0-2.5,1.4-4.7,3.5-5.9
//               c0.3-2.1,1.7-3.9,3.6-4.5c-0.1-0.1-0.2-0.2-0.3-0.3c-0.5-0.5-0.6-1.3-0.2-2c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.2-0.2,0.3-0.2
//               c0.1,0,0.3,0,0.4,0.1c1.6,0.6,2.8,2.1,3.1,3.8c2.4,0.7,4,3,4,5.6c0,3.7-3,6.7-6.7,6.7C402.3,319.7,400.5,318.5,399.7,317.6z"
//               />
//             </g>
//           </g>
//           <g id="salami">
//             <g className="ingredient salami">
//               <path
//                 fill="#ED2A24"
//                 d="M418.6,324.2c-7.3,0-13.1-5.9-13.1-13.1c0-7.3,5.9-13.1,13.1-13.1s13.1,5.9,13.1,13.1
//               C431.7,318.4,425.8,324.2,418.6,324.2z"
//               />
//               <circle fill="#FFFFFF" cx="424.1" cy="316.2" r="4.1" />
//               <circle fill="#FFFFFF" cx="422.3" cy="318.3" r="2" />
//               <circle fill="#FFFFFF" cx="421" cy="319.5" r="1.1" />
//             </g>
//           </g>
//           <g id="olives">
//             <g className="ingredient olive">
//               <path
//                 fill="#4F4D47"
//                 d="M402.7,340.5c-3.7,0-6.7-3-6.7-6.7c0-3.7,3-6.7,6.7-6.7c3.7,0,6.7,3,6.7,6.7
//               C409.4,337.5,406.4,340.5,402.7,340.5z"
//               />
//               <circle fill="#FFFFFF" cx="403.5" cy="334" r="2.8" />
//               <circle fill="#FFFFFF" cx="401.7" cy="336" r="1.5" />
//               <circle fill="#FFFFFF" cx="400.7" cy="337" r="0.7" />
//             </g>
//           </g>
//           <g id="peppers">
//             <g className="ingredient pepper">
//               <path
//                 fill="#F9B233"
//                 d="M421.4,339.4c-1.7,0-3-1.4-3-3v-5.2c0-1.7,1.4-3,3-3s3,1.4,3,3v5.2C424.4,338.1,423.1,339.4,421.4,339.4z"
//               />
//               <path
//                 fill="#F9B233"
//                 d="M425.1,334.5c0.3-1.5,1.6-2.7,3.2-2.7h2.7c1.7,0,3,1.4,3,3s-1.4,3-3,3h-2.7
//               C426.7,337.5,425.4,336.1,425.1,334.5z"
//               />
//               <path
//                 fill="#F9B233"
//                 d="M429.6,330.8h5.2c1.7,0,3,1.4,3,3s-1.4,3-3,3h-5.2c-1.7,0-3-1.4-3-3S427.9,330.8,429.6,330.8z"
//               />
//               <path
//                 fill="#F9B233"
//                 d="M434.5,334.5c-0.3,1.5-1.6,2.7-3.2,2.7h-2.7c-1.7,0-3-1.4-3-3s1.4-3,3-3h2.7
//               C432.9,331.5,434.2,332.9,434.5,334.5z"
//               />
//               <path
//                 fill="#F9B233"
//                 d="M429.6,338.1h-5.2c-1.7,0-3-1.4-3-3s1.4-3,3-3h5.2c1.7,0,3,1.4,3,3S431.3,338.1,429.6,338.1z"
//               />
//             </g>
//           </g>
//           <g id="egg">
//             <path
//               fill="#F9F0D1"
//               d="M398.9,320.1c0-1.3-1.1-2.4-2.4-2.4h-9.3c-1.3,0-2.4,1.1-2.4,2.4v9.3c0,1.3,1.1,2.4,2.4,2.4h9.3
//             c1.3,0,2.4-1.1,2.4-2.4V320.1z"
//             />
//             <path
//               fill="#F9F0D1"
//               d="M390.4,319.5c-0.3-0.3-0.7-0.5-1.2-0.5h-3.4c-0.9,0-1.7,0.7-1.7,1.7v3.4c0,0.5,0.2,0.9,0.5,1.2l3.1,3.1
//             c0.3,0.3,0.7,0.5,1.2,0.5h3.4c0.9,0,1.7-0.7,1.7-1.7v-3.4c0-0.5-0.2-0.9-0.5-1.2L390.4,319.5z"
//             />
//             <path
//               id="eggShine"
//               fill="#FFFFFF"
//               opacity="0.6"
//               d="M396.1,324.4c-0.1-0.1-0.2-0.3-0.3-0.4l-1.3-1.3c-0.2-0.2-0.6-0.2-0.8,0
//             l-2.9,2.9c-0.2,0.2-0.2,0.6,0,0.8l1.3,1.3c0.1,0.1,0.3,0.2,0.4,0.3l0.7,0.7c0.1,0.1,0.3,0.1,0.4,0l2.2-2.2
//             C396.3,324.8,396.3,324.6,396.1,324.4z"
//             />
//             <g id="eggBits">
//               <path
//                 fill="#F9F0D1"
//                 d="M393.2,324.7c0-0.6-0.5-1.1-1.1-1.1h-2.6c-0.6,0-1.1,0.5-1.1,1.1v2.6c0,0.6,0.5,1.1,1.1,1.1h2.6
//               c0.6,0,1.1-0.5,1.1-1.1V324.7z"
//               />
//               <path
//                 fill="#F9F0D1"
//                 d="M392.4,323.6c-0.2-0.2-0.4-0.3-0.7-0.3h-2c-0.4,0-0.8,0.3-0.8,0.8v2c0,0.2,0.1,0.4,0.3,0.7l1.7,1.7
//               c0.2,0.2,0.5,0.3,0.7,0.3h2c0.4,0,0.8-0.3,0.8-0.8v-2c0-0.4-0.3-0.8-0.8-0.8L392.4,323.6z"
//               />
//             </g>
//           </g>
//         </g>
//       </svg>
//     </div>
//   );
// };
