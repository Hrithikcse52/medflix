import React from "react";
import TypewriterComponent from "typewriter-effect";
import Doctor from "../../images/doctor";
import TypeWriter from "../Util/TypeWriter";
import "./hero.css";

const Hero = ({
  imgLeft = false,
  children,
  text,
  type = false,
  typeText = {},
}) => {
  console.log("type", type);
  console.log("text", text);
  let render =
    imgLeft == true ? (
      <>
        <div className="content_img">{children}</div>
        <div className="content_text">
          {type === true ? <TypeWriter data={typeText} /> : text}
        </div>
      </>
    ) : (
      <>
        <div className="content_text">
          {type === true ? <TypeWriter data={typeText} /> : text}
        </div>
        <div className="content_img">{children}</div>
      </>
    );
  return (
    <>
      <main>
        <div className="main_container">{render}</div>
      </main>
    </>
  );
};

export default Hero;
