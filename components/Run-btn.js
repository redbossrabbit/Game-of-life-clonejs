import { component, create as c, style, createClone } from "../clone.js";
import { boardCLone } from "./Main.js";

component(
  "Run-btn",
  () =>
    c(
      "div",
      {},
      c(
        "p",
        {
          style: "margin: auto"
        },
        "RUN!"
      )
    ),
  {
    props: {},
    states: {
      STRIKE() {
        style(
          {
            margin: "10px auto",
            display: "flex",
            width: "80px",
            height: "50px",
            color: "white",
            "background-color": "green"
          },
          this.main
        );
        this.main.addEventListener("click", () => {
          boardCLone.start();
        });
      }
    }
  }
);
createClone("Run-btn", boardCLone.runBtn);
