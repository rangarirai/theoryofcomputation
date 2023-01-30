import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { myContext } from "../App";

function NavBar() {
  const context = useContext(myContext);

  return (
    <>
      <nav
        className="navbar mx-5 is-info mt-1"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://nakara.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            A3S
          </a>
          <span
            role="button"
            className="navbar-burger"
            ariaLabel="menu"
            ariaExpanded="false"
            dataTarget="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div
            className="navbar-start"
            style={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Link className="navbar-item" to={`/`}>
              Home
            </Link>
            {context.page !== "home" && (
              <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link">Tools</Link>

                <div className="navbar-dropdown is-right">
                  <Link
                    className="navbar-item"
                    onClick={() => {
                      context.setShowTestString(true);
                    }}
                  >
                    Test String{" "}
                  </Link>
                  <Link
                    className="navbar-item"
                    onClick={() => {
                      context.setShowTestString(false);
                    }}
                  >
                    Minimize DFA
                  </Link>
                </div>
              </div>
            )}

            <Link className="navbar-item" to={`/`}>
              Help
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {context.page === "editor1"
                ? "Editor (States And Transitions)"
                : context.page === "editor2"
                ? "Editor (Transition Table)"
                : null}
            </div>
            <div className="navbar-item has-dropdown is-hoverable navbar-end">
              <Link className="navbar-link">Editor</Link>

              <div className="navbar-dropdown is-right">
                <Link className="navbar-item" to={`/editor1`}>
                  Using States And Transitions
                </Link>
                <Link className="navbar-item" to={`/editor2`}>
                  Using Transition Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
