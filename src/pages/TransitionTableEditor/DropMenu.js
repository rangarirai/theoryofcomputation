import React, { useContext, useState } from "react";
import { myContext } from "../../App";
import FinalStateInput from "../StateAndTransitionsEditor/FinalStateInput";
import InitialStateInput from "../StateAndTransitionsEditor/InitialStateInput";
import LabelInput from "../StateAndTransitionsEditor/LabelInput";
import TransitionLabel from "./TransitionLabel";

function DropMenu({
  id,
  top,
  left,
  usedLabels,
  statesClone,
  setHandleAddXYPoints,
}) {
  const [open, setOpen] = useState(false);
  const [openTs, setOpenTs] = useState(false);
  const context = useContext(myContext);

  return (
    <div className={`dropdown ${open ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          ariaControls="dropdown-menu"
          onClick={() => {
            setOpen((prev) => !prev);
            setOpenTs("");
            context.setSATModalProps({});
          }}
        >
          <span>Edit</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="field has-addons">
            <p className="control">
              <button
                className="button"
                onClick={() => {
                  context.setSATModalProps({ id, type: "state" });
                }}
              >
                <span className="icon is-small">
                  <i className="fa-regular fa-circle fa-lg"></i>
                </span>
                <span>States</span>
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                onClick={() => {
                  context.setSATModalProps({ id: null, type: "transition" });
                  setOpenTs("");
                }}
              >
                <span className="icon is-small">
                  <i className="fa-solid fa-arrow-up-long  fa-lg "></i>
                </span>
                <span>Transitions</span>
              </button>
            </p>
          </div>
          <hr className="dropdown-divider" />
          {context.SATModalProps.type === "state" ? (
            <LabelInput
              context={context}
              usedLabelsProp={usedLabels}
              displaylabels={false}
            />
          ) : null}
          {context.SATModalProps.type === "state" ? (
            <InitialStateInput context={context} />
          ) : null}
          {context.SATModalProps.type === "state" ? (
            <FinalStateInput context={context} />
          ) : null}

          {context.SATModalProps.type === "transition" && (
            <>
              <div className="is-flex">
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"a"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"b"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"^"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
              </div>
              <div className="is-flex">
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"a,b"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"a,^"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"b,^"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
              </div>
              <div className="is-flex">
                <TransitionLabel
                  openTs={openTs}
                  setOpenTs={setOpenTs}
                  label={"a,b,^"}
                  statesClone={statesClone}
                  setHandleAddXYPoints={setHandleAddXYPoints}
                  startState={{ id, top, left }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropMenu;
