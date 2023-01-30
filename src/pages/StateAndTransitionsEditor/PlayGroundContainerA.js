import React, { useContext, useRef, useState } from "react";
import { myContext } from "../../App";
import PlayGround from "../../components/PlayGround";
import { useDFA } from "../../components/useDFA";
export default function PlayGroundContainerA({
  selected,
  setStatesClone,
  setStateId,
  setTransitionId,
  setUsedLabels,
  setInputValueId,
  stateId,
  transitionId,
  inputValueId,
}) {
  const [states, setStates] = useState({});
  const [transitions, setTransitions] = useState({});
  const [transitionPoints, setTransitionPoints] = useState([]);
  const containerRef = useRef();
  const context = useContext(myContext);
  const { drop, deleteTransition, deleteState, testString } = useDFA({
    context,
    setTransitionId,
    transitionId,
    transitions,
    setTransitions,
    setStates,
    states,
    setStatesClone,
    stateId,
    setUsedLabels,
    setInputValueId,
    inputValueId,
    selected,
    setStateId,
  });

  const addXYPoints = (x, y, setTransitionsIds, stateId) => {
    if (selected === "transition") {
      if (transitionPoints.length === 1) {
        let startAndEndPointsAlreadyExist = false;
        Object.keys(transitions).map((key) => {
          if (
            transitions[key].startStateId === transitionPoints[0].stateId &&
            transitions[key].endStateId === stateId
          ) {
            startAndEndPointsAlreadyExist = true;
          }
          return null;
        });
        if (startAndEndPointsAlreadyExist) {
          alert("this transition already exists");
          return;
        }
        setTransitionsIds((prev) => [
          ...prev,
          { id: transitionPoints[0].id, props: ["x2", "y2"] },
        ]);
        setTransitions((prev) => {
          return {
            ...prev,
            [transitionPoints[0].id]: {
              x1: transitionPoints[0].x,
              y1: transitionPoints[0].y,
              x2: x,
              y2: y,
              startStateId: transitionPoints[0].stateId,
              endStateId: stateId,
            },
          };
        });
        setStates((prev) => {
          return {
            ...prev,
            [transitionPoints[0].stateId]: {
              ...prev[transitionPoints[0].stateId],
              transitionsIds: {
                ...prev[transitionPoints[0].stateId].transitionsIds,
                [transitionPoints[0].id]: { nextStateId: stateId },
              },
            },
          };
        });
        setTransitionPoints([]);
        setTransitionId((prev) => prev + 1);
      } else {
        let id = "transition" + transitionId;
        setTransitionPoints((prev) => [...prev, { x, y, id, stateId }]);
        setTransitionsIds((prev) => [...prev, { id, props: ["x1", "y1"] }]);
      }
    }
  };

  return (
    <>
      <PlayGround
        containerRef={containerRef}
        drop={drop}
        states={states}
        addXYPoints={addXYPoints}
        selected={selected}
        transitions={transitions}
        deleteTransition={deleteTransition}
        deleteState={deleteState}
        testString={testString}
      />
    </>
  );
}
