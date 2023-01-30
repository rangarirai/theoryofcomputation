import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import SATModal from "./SATModal";
import SideBar from "./SideBar";
import TransitionTable from "../../components/TransitionTable";
import PlayGroundContainerA from "./PlayGroundContainerA";
import DisplayString from "../../components/DisplayString";

export default function StatesAndTransitionsEditor() {
  const context = useContext(myContext);
  const [stateId, setStateId] = useState(1);
  const [transitionId, setTransitionId] = useState(1);
  const [usedLabels, setUsedLabels] = useState([]);
  const [statesClone, setStatesClone] = useState({});
  const [inputValueId, setInputValueId] = useState(1);

  useEffect(() => {
    context.setPage("editor1");
  });
  const [selected, setSelected] = useState("");
  const handleSetSelected = (icon) => {
    return () => {
      setSelected(icon);
    };
  };
  return (
    <>
      <div className="columns">
        <div className="column is-1">
          <SideBar handleSetSelected={handleSetSelected} selected={selected} />
        </div>
        <div className="column is-7">
          <PlayGroundContainerA
            selected={selected}
            setStatesClone={setStatesClone}
            setStateId={setStateId}
            setTransitionId={setTransitionId}
            setUsedLabels={setUsedLabels}
            setInputValueId={setInputValueId}
            stateId={stateId}
            transitionId={transitionId}
            inputValueId={inputValueId}
          />
        </div>
        <div className="column is-3">
          <TransitionTable statesClone={statesClone} />
          <DisplayString/>
        </div>
      </div>
      <SATModal usedLabels={usedLabels} />
    </>
  );
}
