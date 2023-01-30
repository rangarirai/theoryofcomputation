import React, { useContext } from "react";
import { myContext } from "../../App";
import FinalStateInput from "./FinalStateInput";
import InitialStateInput from "./InitialStateInput";
import LabelInput from "./LabelInput";

export default function SATModal({ usedLabels }) {
  const context = useContext(myContext);
  return (
    <div
      className={`modal ${context.SATModalValue ? "is-active" : ""}`}
      id="SATModal"
    >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Changing {context.SATModalProps.type} Values
          </p>
          <button
            className="delete"
            ariaLabel="close"
            onClick={() => {
              context.setSATModalValue(false);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <LabelInput context={context} usedLabelsProp={usedLabels} />
          {context.SATModalProps.type === "state" ? (
            <InitialStateInput context={context} />
          ) : null}
          {context.SATModalProps.type === "state" ? (
            <FinalStateInput context={context} />
          ) : null}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button"
            onClick={() => {
              context.setSATModalValue(false);
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
