import React from "react";
import "./about.css";
import aboutImage from "../../assets/about-image.png";

 function About () {
  return (
    <div className="about-container">
      <div className="about-description">
        <h2> <strong>About Us</strong></h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          beatae! Doloribus fuga aperiam magni ipsum repellat voluptates itaque
          error, atque, exercitationem fugit ab, modi ut voluptatum sequi ad
          eum! Rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Minus quia suscipit deserunt, neque nemo veniam adipisci deleniti
          culpa dolor dolores omnis, rem veritatis assumenda eaque dignissimos
          ut, nam debitis numquam!
        </p>
        </div>
      <div className="about-image-container">
        <img src={aboutImage} alt="About" />
      </div>
    </div>
  );
};

export default About