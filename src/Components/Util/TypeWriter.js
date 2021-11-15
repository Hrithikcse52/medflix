import React from "react";
import TypewriterComponent from "typewriter-effect";

const TypeWriter = ({ first, sec, thrd }) => {
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
            .typeString("<strong>" + first + "</strong>")
            // .callFunction(() => {
            //   console.log("String typed out!");
            // })
            .pauseFor(100)
            .deleteAll()
            .callFunction(() => {
              console.log("Reshape your Health");
            })
            .pauseFor(100)
            .typeString("<strong>" + sec + "</strong>")
            .pauseFor(300)
            .deleteChars(46)
            .typeString("<strong>" + thrd + "</strong>")
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
