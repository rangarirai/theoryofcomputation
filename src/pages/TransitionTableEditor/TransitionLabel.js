import React, { useContext } from "react";
import { myContext } from "../../App";

function TransitionLabel({
  openTs,
  setOpenTs,
  label,
  statesClone,
  setHandleAddXYPoints,
  startState,
}) {
  const context = useContext(myContext);

  return (
    <div className={`dropdown block`}>
      <div class="dropdown-trigger">
        <button
          className="button"
          ariahaspopup="true"
          ariacontrols="dropdown-menu3"
          onClick={() => {
            if (openTs !== "") {
              setOpenTs("");
              return;
            }
            setOpenTs(label);
          }}
        >
          <span>for input ({label}) go to </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      {openTs === label && (
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
          <div className="dropdown-content">
            <ul>
              {Object.keys(statesClone).map((key) => {
                let state = statesClone[key];
                return (
                  <li>
                    <div
                      className="dropdown-item is-clickable"
                      onClick={() => {
                        context.setLabel(label);
                        setHandleAddXYPoints({
                          label,
                          startStateId: startState.id,
                          endStateId: key,
                          x1: startState.left,
                          y1: startState.top,
                          x2: state.left,
                          y2: state.top,
                        });
                      }}
                    >
                      <p>{state.label}</p>
                    </div>
                    <hr className="dropdown-divider" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransitionLabel;
