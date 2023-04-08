import { useState, useEffect } from "react";

//MUI
import { Grid } from "@mui/material";

export default function FilteredProgramBoxes(props) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  var columnWidth = 12;
  var boxesRendered;

  if (windowSize[0] > 600) {
    columnWidth = 6;
    // Convenient for alphabetical order from top to bottom
    const firstRow = props.propgramBoxes.filter((e, i) => i % 2 !== 0);
    const secondRow = props.propgramBoxes.filter((e, i) => i % 2 === 0);

    //TWO ROWS

    boxesRendered = (
      <Grid container>
        <Grid item xs={columnWidth}>
          {firstRow.length !== 0
            ? firstRow.map((box, index) => (
                <Grid
                  key={index + secondRow.length}
                  item
                  xs={12}
                  style={{ float: "right" }}
                >
                  {box}
                </Grid>
              ))
            : secondRow.map((box, index) => (
                <Grid key={index} item xs={12}>
                  {box}
                </Grid>
              ))}
        </Grid>
        <Grid item xs={columnWidth}>
          {firstRow.length !== 0
            ? secondRow.map((box, index) => (
                <Grid key={index} item xs={12} style={{ float: "left" }}>
                  {box}
                </Grid>
              ))
            : ""}
        </Grid>
      </Grid>
    );
  } else {
    // ONE ROW
    boxesRendered = props.propgramBoxes.map((box, i) => {
      return (
        <Grid key={i} item xs={12}>
          {box}
        </Grid>
      );
    });
  }

  return boxesRendered;
}
