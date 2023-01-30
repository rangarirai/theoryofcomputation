import { useCallback, useEffect } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
export function useDFA({
  context,

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
}) {
  useEffect(() => {
    setStatesClone({ ...states });
  }, [states, setStatesClone]);

  useEffect(() => {
    if (context.updateStateLabel === true) {
      setStates((prev) => {
        let tempState = { ...prev[context.SATModalProps.id] };
        setUsedLabels((prev) => [...prev, context.label.toLowerCase().trim()]);
        tempState.label = context.label.toLowerCase().trim();
        return { ...prev, [context.SATModalProps.id]: { ...tempState } };
      });
      context.setUpdateStateLabel(false);
      context.setLabel("");
    }
    if (context.updateTransitionLabel === true) {
      let inputValueExists = false;
      setTransitions((prev) => {
        let tempTransition = { ...prev[context.SATModalProps.id] };
        let startStateId = tempTransition.startStateId;
        tempTransition.label = context.label.toLowerCase().trim();
        setStates((prev) => {
          let nextStateId =
            prev[startStateId].transitionsIds[context.SATModalProps.id]
              .nextStateId;
          let currentInputValues = { ...prev[startStateId].inputValues };
          let inputValueExistsLength = Object.keys(currentInputValues).filter(
            (key) => {
              let transitionLabel = Object.keys(currentInputValues[key])[0];
              let inputs = transitionLabel.split(",");
              let inputsTrimmed = inputs.map((input) => input.trim());
              let tempInputs = tempTransition.label.split(",");
              let tempInputsTrimmed = tempInputs.map((input) => input.trim());
              let exists = false;
              tempInputsTrimmed.forEach((element) => {
                if (inputsTrimmed.includes(element)) {
                  exists = true;
                }
              });
              if (exists) {
                return true;
              } else {
                return false;
              }
            }
          ).length;
          inputValueExists = !!inputValueExistsLength;
          if (inputValueExists) {
            alert("the input already exists for this node");
            return {
              ...prev,
            };
          } else {
            return {
              ...prev,
              [startStateId]: {
                ...prev[startStateId],
                inputValues: {
                  ...prev[startStateId].inputValues,
                  [context.SATModalProps.id]: {
                    [tempTransition.label]: {
                      nextStateId: nextStateId,
                      id: inputValueId + "nodeToNode",
                    },
                  },
                },
              },
            };
          }
        });
        if (inputValueExists) {
          return {
            ...prev,
          };
        } else {
          return { ...prev, [context.SATModalProps.id]: { ...tempTransition } };
        }
      });

      context.setUpdateTransitionLabel(false);
      context.setLabel("");
      if (!inputValueExists) {
        setInputValueId((prev) => prev + 1);
      }
    }
    if (context.updateInitialState === true) {
      setStates((prev) => {
        let tempState1 = { ...prev[context.SATModalProps.id] };
        if (tempState1.initialState) {
          return { ...prev };
        }
        tempState1.initialState = true;
        let tempState2 = null;
        let tempState2Id = null;
        let toUpdate = {
          ...prev,
          [context.SATModalProps.id]: { ...tempState1 },
        };
        if (context.initialState !== "") {
          tempState2 = { ...prev[context.initialState] };
          tempState2Id = context.initialState;
          tempState2.initialState = false;
          toUpdate = { ...toUpdate, [tempState2Id]: { ...tempState2 } };
        }
        context.setInitialState(context.SATModalProps.id);
        return toUpdate;
      });
      context.setUpdateInitialState(false);
    }
    if (context.updateFinalState === true) {
      setStates((prev) => {
        let tempState = { ...prev[context.SATModalProps.id] };
        tempState.finalState = !tempState.finalState;
        let toUpdate = {
          ...prev,
          [context.SATModalProps.id]: { ...tempState },
        };

        return toUpdate;
      });
      context.setUpdateFinalState(false);
    }
  }, [
    context,
    setUsedLabels,
    setInputValueId,
    inputValueId,
    setStates,
    setTransitions,
  ]);
  const moveState = useCallback(
    (id, left, top) => {
      setStates(
        update(states, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [states, setStates]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "span",
      drop: (item, monitor) => {
        if (selected === "state") {
          if (item.role === "add") {
            return addState();
          }
          if (item.role === "move") {
            return calculatePosition(item, monitor);
          }
        }
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [moveState, selected]
  );

  const addState = useCallback(() => {
    let id = "state" + stateId;
    setStateId((prev) => prev + 1);
    const left = Math.round(stateId * context.stateSize * 2.3);
    const top = Math.round(+context.stateSize + 20);

    setStates((prev) => {
      return {
        ...prev,
        [id]: {
          top,
          left,
          finalState: false,
        },
      };
    });
  }, [setStates, context.stateSize, setStateId, stateId]);
  const calculatePosition = (item, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    const transitionsToMove = item.transitionsIds;
    moveState(item.id, left, top);
    transitionsToMove.map((transitionToMove) => {
      return moveTransition(
        transitionToMove.id,
        transitionToMove.props,
        left,
        top
      );
    });

    return undefined;
  };
  const moveTransition = (id, props, x, y) => {
    setTransitions((prev) => {
      let tempTransition = { ...prev[id] };
      tempTransition[props[0]] = x;
      tempTransition[props[1]] = y;
      return { ...prev, [id]: { ...tempTransition } };
    });
  };

  const deleteTransition = (id) => {
    setTransitions((prev) => {
      let temp = { ...prev };
      delete temp[id];
      return temp;
    });
    setStates((prev) => {
      let temp = { ...prev };
      Object.keys(temp).forEach((key) => {
        if (temp[key]?.inputValues) {
          Object.keys(temp[key]?.inputValues).forEach((key2) => {
            if (key2 === id) {
              delete temp[key].inputValues[id];
            }
          });
        }

        delete temp[key].transitionsIds[id];
      });
      return temp;
    });
    context.setTransionToDelete(id);
    context.setDeleteTransition(true);
  };
  const deleteState = (id) => {
    setStates((prev) => {
      let temp = { ...prev };
      let usedLabel = temp[id].label;
      if (temp[id].transitionsIds) {
        Object.keys(temp[id].transitionsIds).forEach((key) => {
          deleteTransition(key);
        });
      }
      setUsedLabels((prev) => {
        let tempLabels = [...prev];
        tempLabels = tempLabels.filter((lab) => lab !== usedLabel);
        return tempLabels;
      });
      delete temp[id];
      return temp;
    });
  };
  const getInitialState = () => {
    let result = {
      found: false,
      id: null,
    };
    Object.keys(states).forEach((key) => {
      if (states[key].initialState) {
        result.found = true;
        result.id = key;
      }
    });
    return result;
  };
  const getNextState = (currentStateId, input, pos, lastPos, string) => {
    setTimeout(() => {
      context.setInputPos(pos);
      let currentState = states[currentStateId];
      let result = {};
      Object.keys(currentState.inputValues).forEach((key) => {
        let transLabel = Object.keys(currentState.inputValues[key])[0];
        let transLabelInputs = transLabel
          .split(",")
          .map((input) => input.trim());
        if (transLabelInputs.includes(input)) {
          let nextStateId =
            currentState.inputValues[key][transLabel].nextStateId;
          result.nextStateId = nextStateId;
          result.finalState = states[nextStateId].finalState;
        }
      });
      if (pos === lastPos) {
        //result contains the nextstate it is going or has gone after the passed input
        // it also contains info of whether that state is final or not
        context.setMarkedState(result.nextStateId);

        if (result.finalState) {
          // the return stopped working after i put the lgic inside a settimout function
          // so i am now changing the state from here
          context.setResult("string is valid");
          return { msg: "string is valid" };
        } else {
          context.setResult("string not valid");
          return { msg: "string not valid" };
        }
      } else {
        context.setMarkedState(result.nextStateId);
        return getNextState(
          result.nextStateId,
          string[pos + 1],
          pos + 1,
          lastPos,
          string
        );
      }
    }, 5000);
  };
  const testString = (string) => {
    if (string.length === 0) {
      return { msg: "string must of length greater than 0" };
    }
    let initialState = getInitialState();
    if (initialState.found) {
      context.setMarkedState(initialState.id);
      let result = getNextState(
        initialState.id,
        string[0],
        0,
        string.length - 1,
        string
      );
      return result;
    } else {
      return { msg: "state machine doesn't have an initial state" };
    }
  };
  return { drop, addState, deleteTransition, deleteState, testString };
}
