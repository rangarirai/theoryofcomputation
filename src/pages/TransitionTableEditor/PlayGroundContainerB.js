import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { myContext } from "../../App";
import PlayGround from "../../components/PlayGround";
import { useDFA } from "../../components/useDFA";
export default function PlayGroundContainerB({
  selected,
  setStatesClone,
  setStateId,
  setTransitionId,
  setUsedLabels,
  setInputValueId,
  stateId,
  transitionId,
  inputValueId,
  handleAddState,
  setHandleAddState,
  handleAddXYPoints,
  setHandleAddXYPoints,
}) {
  const [states, setStates] = useState({});
  const [transitions, setTransitions] = useState({});
  const containerRef = useRef();
  const context = useContext(myContext);
  const { drop, addState, deleteState, deleteTransition, testString } = useDFA({
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
  const addXYPoints = useCallback(
    (extData, setHandleAddXYPoints) => {
      let startAndEndPointsAlreadyExist = false;
      Object.keys(transitions).map((key) => {
        if (
          transitions[key].startStateId === extData.startStateId &&
          transitions[key].endStateId === extData.endStateId
        ) {
          startAndEndPointsAlreadyExist = true;
        }
        return null;
      });
      if (startAndEndPointsAlreadyExist) {
        alert("this transition already exists");
        setHandleAddXYPoints(null);
        return;
      }
      let id = "transition" + transitionId;
      let sameNode = false;
      sameNode = extData.startStateId === extData.endStateId;
      if (sameNode) {
        context.setTransitionsIdsExt(() => ({
          [extData.startStateId]: {
            data: [
              { id: id, props: ["x1", "y1"] },
              { id: id, props: ["x2", "y2"] },
            ],
            sameNode,
          },
        }));
      } else {
        context.setTransitionsIdsExt(() => ({
          [extData.startStateId]: { id: id, props: ["x1", "y1"] },
          [extData.endStateId]: { id: id, props: ["x2", "y2"] },
        }));
      }

      setTransitions((prev) => {
        return {
          ...prev,
          [id]: {
            x1: extData.x1,
            y1: extData.y1,
            x2: extData.x2,
            y2: extData.y2,
            startStateId: extData.startStateId,
            endStateId: extData.endStateId,
          },
        };
      });
      setStates((prev) => {
        return {
          ...prev,
          [extData.startStateId]: {
            ...prev[extData.startStateId],
            transitionsIds: {
              ...prev[extData.startStateId].transitionsIds,
              [id]: { nextStateId: extData.endStateId },
            },
          },
        };
      });
      context.setSATModalProps({ id, type: "transition" });
      context.setUpdateTransitionLabel(true);
      setTransitionId((prev) => prev + 1);
      setHandleAddXYPoints(null);
    },
    [
      context,
      setTransitionId,
      transitionId,
      transitions,
      setStates,
      setTransitions,
    ]
  );
  useEffect(() => {
    if (handleAddState) {
      addState();
      setHandleAddState(false);
    }
  }, [handleAddState, setHandleAddState, addState]);

  useEffect(() => {
    if (handleAddXYPoints) {
      addXYPoints(handleAddXYPoints, setHandleAddXYPoints);
    }
  }, [handleAddXYPoints, setHandleAddXYPoints, addXYPoints]);

  return (
    <PlayGround
      containerRef={containerRef}
      drop={drop}
      states={states}
      addXYPoints={addXYPoints}
      selected={selected}
      transitions={transitions}
      deleteState={deleteState}
      deleteTransition={deleteTransition}
      testString={testString}
    />
  );
}
