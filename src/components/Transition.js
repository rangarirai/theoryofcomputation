import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App";

export default function Transition({
  x1,
  y1,
  x2,
  y2,
  id,
  selected,
  label,
  deleteTransition,
}) {
  const context = useContext(myContext);
  const [offsetX1, setOffsetX1] = useState(1);
  const [offsetY1, setOffsetY1] = useState(1);
  const [offsetX2, setOffsetX2] = useState(1);
  const [offsetY2, setOffsetY2] = useState(1);
  const [curve, setCurve] = useState("M0 0");
  const [controlPoint, setControlPoint] = useState({});

  useEffect(() => {
    let tempOffsetY = 0.7 * context.stateSize;
    let tempOffsetX = Math.sqrt(
      context.stateSize ** 2 - (0.7 * context.stateSize) ** 2
    );
    if (x1 === x2) {
      //diff direction
      setOffsetX1(-tempOffsetX);
      setOffsetX2(tempOffsetX);
      //same direction
      setOffsetY1(-tempOffsetY);
      setOffsetY2(-tempOffsetY);
    } else if (x2 < x1) {
      setOffsetX1(-tempOffsetX);
      setOffsetX2(tempOffsetX);
      //same direction
      setOffsetY1(tempOffsetY);
      setOffsetY2(tempOffsetY);
    } else {
      //diff direction
      setOffsetX1(tempOffsetX);
      setOffsetX2(-tempOffsetX);
      //same direction
      setOffsetY1(-tempOffsetY);
      setOffsetY2(-tempOffsetY);
    }
  }, [x2, x1, context.stateSize]);

  useEffect(() => {
    let px1 = x1 + offsetX1;
    let py1 = y1 + offsetY1;
    let px2 = x2 + offsetX2;
    let py2 = y2 + offsetY2;

    // mid-point of line:
    let mpx = (px2 + px1) * 0.5;
    let mpy = (py2 + py1) * 0.5;

    // angle of perpendicular to line:
    let theta = Math.atan2(py2 - py1, px2 - px1) - Math.PI / 2;

    // distance of control point from mid-point of line:
    let offset = 1.6 * context.stateSize;

    // location of control point:
    let cx1 = mpx + offset * Math.cos(theta);
    let cy1 = mpy + offset * Math.sin(theta);
    // construct the command to draw a quadratic curve
    let tempCurve =
      "M" + px1 + " " + py1 + " Q " + cx1 + " " + cy1 + " " + px2 + " " + py2;
    setCurve(tempCurve);
    setControlPoint({ cx1, cy1 });
  }, [
    offsetX1,
    offsetX2,
    offsetY1,
    offsetY2,
    x1,
    x2,
    y1,
    y2,
    context.stateSize,
  ]);
  const showForm = () => {
    context.setSATModalValue(true);
    context.setSATModalProps({ id, type: "transition" });
  };

  return (
    <>
      <text
        x={controlPoint.cx1}
        y={controlPoint.cy1}
        textAnchor="middle"
        fill="black"
        fontSize={+context.stateSize * 0.7}
        dominantBaseline="middle"
      >
        {label}
      </text>
      <path
        onClick={() => {
          if (selected === "type") {
            showForm();
          }
          if (selected === "delete") {
            let result = window.confirm(
              "are you sure you want to delete this transition"
            );
            if (result === true) {
              deleteTransition(id);
            } else {
              return;
            }
          }
        }}
        id="curve"
        d={curve}
        stroke="green"
        strokeLinecap="round"
        fill="transparent"
        key={id}
        style={{
          position: "absolute",
          cursor: "move",
          markerEnd: "url(#markerArrow1)",
        }}
      ></path>
    </>
  );
}
