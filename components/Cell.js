import { component, create as c, style, createClone } from "../clone.js";
import { boardCLone } from "../components/Main.js";

let index = 0;
component("Cell", () => c("div"), {
  props: {},
  states: {
    STRIKE() {
      style(
        {
          margin: "auto",
          width: "8px",
          height: "8px",
          border: "1px solid #000"
        },
        this.main
      );
      this.index = index;
      boardCLone.allCells[index] = this;
      index += 1;
      this.main.addEventListener("click", () => {
        this.alive ? this.kill() : this.birth();
      });
    },
    alive: false,
    birth() {
      this.alive = true;
      style(
        {
          margin: "auto",
          width: "8px",
          height: "8px",
          "background-color": "#000",
          border: "1px solid #fff"
        },
        this.main
      );
    },
    kill() {
      this.alive = false;
      style(
        {
          margin: "auto",
          width: "8px",
          height: "8px",
          "background-color": "#fff",
          border: "1px solid #000"
        },
        this.main
      );
    },
    index: undefined
  }
});
for (let i = 0; i < boardCLone.limit; i++) {
  createClone("Cell", boardCLone.board);
}
