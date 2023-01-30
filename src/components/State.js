import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { myContext } from "../App";
export default function State({
  id,
  left,
  top,
  addXYPoints,
  selected,
  label,
  initialState,
  finalState,
  deleteState,
}) {
  const context = useContext(myContext);
  const [transitionsIds, setTransitionsIds] = useState([]);
  useEffect(() => {}, [transitionsIds]);

  useEffect(() => {
    Object.keys(context.transitionsIdsExt).forEach((key) => {
      if (key === id) {
        if (context.transitionsIdsExt[key].sameNode) {
          setTransitionsIds((prev) => [
            ...prev,
            ...context.transitionsIdsExt[key].data,
          ]);
        } else {
          setTransitionsIds((prev) => [
            ...prev,
            context.transitionsIdsExt[key],
          ]);
        }
      }
    });
  }, [context.transitionsIdsExt, setTransitionsIds, id]);

  useEffect(() => {
    if (context.deleteTransition) {
      setTransitionsIds((prev) => {
        let temp = [...prev];
        temp = temp.filter((data) => data.id !== context.transionToDelete);
        return temp;
      });
      context.setDeleteTransition(false);
    }
  }, [context]);

  const [, drag] = useDrag(
    () => ({
      type: "span",
      item: { id, left, top, role: "move", transitionsIds },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, transitionsIds]
  );
  const showForm = () => {
    context.setSATModalValue(true);
    context.setSATModalProps({ id, type: "state" });
  };
  return (
    <>
      {initialState && (
        <line
          x1={left - +context.stateSize * 2}
          y1={top}
          x2={left - +context.stateSize}
          y2={top}
          stroke="black"
          style={{
            position: "absolute",
            markerEnd: "url(#markerArrow2)",
          }}
        />
      )}
      {finalState && (
        <circle
          cx={left}
          cy={top}
          r={context.stateSize * 0.8}
          stroke="black"
          strokeWidth="2"
          key={id + "inner"}
          style={{ position: "absolute", cursor: "move", fillOpacity: "0" }}
        />
      )}

      <text
        x={left}
        y={top}
        textAnchor="middle"
        fill={context.markedState === id ? "red" : "black"}
        fontSize={+context.stateSize + 2}
        dominantBaseline="middle"
      >
        {label}
      </text>
      <circle
        cx={left}
        cy={top}
        r={context.stateSize}
        stroke="black"
        strokeWidth="2"
        // fill="red"
        key={id}
        ref={drag}
        style={{ position: "absolute", cursor: "move", fillOpacity: "0" }}
        onClick={() => {
          if (selected === "transition") {
            addXYPoints(left, top, setTransitionsIds, id);
          }
          if (selected === "type") {
            showForm();
          }
          if (selected === "delete") {
            let result = window.confirm(
              "are you sure you want to delete this state"
            );
            if (result === true) {
              deleteState(id);
            } else {
              return;
            }
          }
        }}
      />
    </>
  );
}
