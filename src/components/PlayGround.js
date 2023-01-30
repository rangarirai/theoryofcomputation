import React, { useContext } from "react";
import Size from "./Size";
import State from "./State";
import Transition from "./Transition";
import TestString from "./TestString";
import { myContext } from "../App";

function PlayGround({
  containerRef,
  drop,
  states,
  addXYPoints,
  selected,
  transitions,
  deleteTransition,
  deleteState,
  testString,
}) {
  const context = useContext(myContext);

  return (
    <section className="section nk-full-width-height" ref={containerRef}>
      <svg
        width="100%"
        height="100%"
        className="content has-background-grey-lighter"
        ref={drop}
        style={{
          position: "relative",
        }}
      >
        <defs>
          <marker
            id="markerArrow1"
            markerWidth="13"
            markerHeight="13"
            refX="6"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" fill="red" />
          </marker>
          <marker
            id="markerArrow2"
            markerWidth="13"
            markerHeight="13"
            refX="6"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" fill="black" />
          </marker>
        </defs>
        {Object.keys(states).map((key) => {
          const { left, top, label, initialState, finalState } = states[key];
          return (
            <State
              key={key}
              id={key}
              left={left}
              top={top}
              addXYPoints={addXYPoints}
              selected={selected}
              label={label}
              initialState={initialState}
              finalState={finalState}
              deleteState={deleteState}
            />
          );
        })}
        {Object.keys(transitions).map((key) => {
          const { x1, y1, x2, y2, label } = transitions[key];
          return (
            <Transition
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              key={key}
              id={key}
              selected={selected}
              label={label}
              deleteTransition={deleteTransition}
            />
          );
        })}
      </svg>
      <Size />
      {context.showTestString && <TestString testString={testString} />}
    </section>
  );
}

export default PlayGround;
