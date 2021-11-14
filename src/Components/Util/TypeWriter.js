import React from "react";
import TypewriterComponent from "typewriter-effect";

const TypeWriter = ({ data }) => {
  return (
    <>
      <TypewriterComponent
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            // .typeString("Welcome to Aakriti Hospital!")
            .typeString(data.first)
            // .callFunction(() => {
            //   console.log("String typed out!");
            // })
            .pauseFor(100)
            .deleteAll()
            .callFunction(() => {
              console.log("Reshape your Health");
            })
            .pauseFor(100)
            .typeString(data.secnd)
            .pauseFor(300)
            .deleteChars(46)
            .typeString(data.thrd)
            // .typeString(
            //   '<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>'
            // )
            .pauseFor(1000)
            .start();
        }}
      />
    </>
  );
};

export default TypeWriter;
