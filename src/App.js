import "./App.css";
import StateAndTransitions from "./pages/StateAndTransitionsEditor";
// import { HTML5Backend } from "react-dnd-html5-backend";
import MouseBackEnd from "react-dnd-mouse-backend";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { createContext, useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import TransitionTable from "./pages/TransitionTableEditor";
export const myContext = createContext({});

function App() {
  const [stateSize, setStateSize] = useState(30);
  const [result, setResult] = useState("");
  const [markedState, setMarkedState] = useState("");
  const [SATModalValue, setSATModalValue] = useState(false);
  const [SATModalProps, setSATModalProps] = useState({});
  const [label, setLabel] = useState("");
  const [updateStateLabel, setUpdateStateLabel] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");
  const [updateTransitionLabel, setUpdateTransitionLabel] = useState(false);
  const [updateInitialState, setUpdateInitialState] = useState(false);
  const [initialState, setInitialState] = useState("");
  const [updateFinalState, setUpdateFinalState] = useState(false);
  const [inputValues, setInputValues] = useState(["a", "b", "^"]);
  const [page, setPage] = useState("");
  const [transitionsIdsExt, setTransitionsIdsExt] = useState({
    id: "",
    data: [],
  });

  const [deleteTransition, setDeleteTransition] = useState(false);
  const [transionToDelete, setTransionToDelete] = useState("");
  const [showTestString, setShowTestString] = useState(false);
  const [string, setString] = useState([]);
  const [inputPos, setInputPos] = useState(-10);

  const router = createBrowserRouter([
    {
      element: <NavBar />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/editor1",
          element: <StateAndTransitions />,
        },
        {
          path: "/editor2",
          element: <TransitionTable />,
        },
      ],
    },
  ]);
  return (
    <myContext.Provider
      value={{
        showTestString,
        setShowTestString,
        transionToDelete,
        setTransionToDelete,
        deleteTransition,
        setDeleteTransition,
        transitionsIdsExt,
        setTransitionsIdsExt,
        page,
        setPage,
        stateSize,
        setStateSize,
        SATModalValue,
        setSATModalValue,
        SATModalProps,
        setSATModalProps,
        label,
        setLabel,
        updateStateLabel,
        setUpdateStateLabel,
        transitionLabel,
        setTransitionLabel,
        updateTransitionLabel,
        setUpdateTransitionLabel,
        updateInitialState,
        setUpdateInitialState,
        initialState,
        setInitialState,
        updateFinalState,
        setUpdateFinalState,
        inputValues,
        setInputValues,
        markedState,
        setMarkedState,
        result,
        setResult,
        string,
        setString,
        inputPos,
        setInputPos,
      }}
    >
      <DndProvider backend={MouseBackEnd}>
        <RouterProvider router={router} />
      </DndProvider>
    </myContext.Provider>
  );
}

export default App;
