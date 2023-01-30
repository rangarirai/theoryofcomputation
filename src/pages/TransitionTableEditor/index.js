import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import TransitionTable from "../../components/TransitionTable";
import DropMenu from "./DropMenu";
import AddState from "./AddState";
import PlayGroundContainerB from "./PlayGroundContainerB";
import Drag from "../../components/Drag";
import Delete from "../../components/Delete";

export default function TransitionTableEditor() {
  const context = useContext(myContext);
  const [handleAddState, setHandleAddState] = useState(false);
  const [stateId, setStateId] = useState(1);
  const [transitionId, setTransitionId] = useState(1);
  const [usedLabels, setUsedLabels] = useState([]);
  const [statesClone, setStatesClone] = useState({});
  const [inputValueId, setInputValueId] = useState(1);
  const [handleAddXYPoints, setHandleAddXYPoints] = useState(null);
  const [selected, setSelected] = useState("state");
  const handleSetSelected = (icon) => {
    return () => {
      setSelected(icon);
    };
  };
  useEffect(() => {
    context.setPage("editor2");
  });

  return (
    <div className="columns">
      <div className="column is-3">
        <TransitionTable
          statesClone={statesClone}
          usedLabels={usedLabels}
          setHandleAddXYPoints={setHandleAddXYPoints}
        >
          <AddState setHandleAddState={setHandleAddState} />
          <DropMenu />
          <Drag
            selected={selected}
            handleSetSelected={handleSetSelected}
            drag={null}
          />
          <Delete selected={selected} handleSetSelected={handleSetSelected} />
        </TransitionTable>
      </div>
      <div className="column is-9">
        <PlayGroundContainerB
          setStatesClone={setStatesClone}
          handleAddState={handleAddState}
          setHandleAddState={setHandleAddState}
          selected={selected}
          setStateId={setStateId}
          setTransitionId={setTransitionId}
          setUsedLabels={setUsedLabels}
          setInputValueId={setInputValueId}
          stateId={stateId}
          transitionId={transitionId}
          inputValueId={inputValueId}
          handleAddXYPoints={handleAddXYPoints}
          setHandleAddXYPoints={setHandleAddXYPoints}
        />
      </div>
    </div>
  );
}
