import React from "react";
import CardBrief from "../Card/CardBrief";
import "./detailsone.css";

const Detailsone = () => {
  return (
    <>
      <section className="details_container">
        <div className="main_header">Here are our services</div>
        <div className="sections">
          <div className="section_item">
            <CardBrief />
          </div>
          <div className="section_item">
            <CardBrief />
          </div>
          <div className="section_item">
            <CardBrief />
          </div>
        </div>
      </section>
    </>
  );
};

export default Detailsone;
