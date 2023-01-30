import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../App";
import satImage from "./sat.png";
import transtableImage from "./transtable.png";

export default function Home() {
  const navigate = useNavigate();

  const context = useContext(myContext);
  useEffect(() => {
    context.setPage("home");
  });
  return (
    <>
      <div class="columns block mt-2 mx-3">
        <div class="column is-4 has-text-centered	">
          <h1 className="is-size-1">About A3S</h1>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                A3S provides a simulated environment where you will be able to
                make DFAs (Deterministic Finite Automata), NFAs
                (Non-Deterministic Finite Automata), and see their working
                through animations. Here you will be able to learn DFA
                minimization, NFA to DFA conversion and much more. A3S will give
                you an experience like no other. We promise to enhance your
                automata skills while making your journey exciting.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="is-size-3 has-text-centered">Editors</h1>
        <div class="columns block mt-2 mx-3">
          <div class="column">
            <div
              class="card is-clickable"
              onClick={() => {
                navigate("/editor1");
              }}
            >
              <div class="card-image  has-text-centered ">
                <figure class="image  mx-auto" style={{ width: "70%" }}>
                  <img src={satImage} alt="Placeholder" />
                </figure>
              </div>
              <div class="card-content has-text-centered has-text-weight-semibold	">
                <div class="content">Create Using States And Transitions</div>
              </div>
            </div>
          </div>
          <div class="column">
            <div
              class="card  is-clickable"
              onClick={() => {
                navigate("/editor2");
              }}
            >
              <div class="card-image  has-text-centered">
                <figure class="image mx-auto" style={{ width: "50%" }}>
                  <img src={transtableImage} alt="Placeholder" />
                </figure>
              </div>
              <div class="card-content has-text-centered has-text-weight-semibold	">
                <div class="content">Create Using Transition Table</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
