import React from "react";
import { useDrag } from "react-dnd";
import Delete from "../../components/Delete";
import Drag from "../../components/Drag";
export default function SideBar({ selected, handleSetSelected }) {
  const [, drag] = useDrag(() => ({
    type: "span",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { role: "add" },
  }));

  let nkFlexColumn =
    " is-flex is-flex-direction-column	is-align-content-center	is-align-items-center ";

  return (
    <section className={` section ${nkFlexColumn}`}>
      <div className={`nk-half box  ${nkFlexColumn}`}>
        <span className="icon is-large is-clickable">
          <i className="fa-solid fa-rotate-left fa-lg"></i>
        </span>
      </div>
      <div className={`nk-half   ${nkFlexColumn}`}>
        <Drag
          selected={selected}
          handleSetSelected={handleSetSelected}
          drag={drag}
        />
        <span
          className={`icon is-large is-clickable nk-sideBarIcon 
          ${selected === "transition" ? "nk-selected" : ""}`}
          onClick={handleSetSelected("transition")}
        >
          <i className="fa-solid fa-arrow-up-long  fa-lg "></i>
        </span>
        <span
          className={`icon is-large is-clickable  ${
            selected === "type" ? "nk-selected" : ""
          }`}
          onClick={handleSetSelected("type")}
        >
          <i className="fa-solid fa-arrow-pointer fa-lg"></i>
        </span>
      </div>

      <div className={`nk-half box  ${nkFlexColumn}`}>
        <Delete selected={selected} handleSetSelected={handleSetSelected} />
      </div>
    </section>
  );
}
