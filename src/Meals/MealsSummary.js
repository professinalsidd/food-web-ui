import React from "react";
import classes from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious food, Delivered To You</h2>
      <p>
        Food is one of the basic necessities of life. Food contains
        nutrients—substances essential for the growth, repair, and maintenance
        of body tissues and for the regulation of vital processes.{" "}
      </p>
      <p>
        Nutrients provide the energy our bodies need to function. The energy in
        food is measured in units called calories.
      </p>
    </section>
  );
}

export default MealsSummary;
