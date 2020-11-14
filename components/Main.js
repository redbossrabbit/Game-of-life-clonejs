import { component, create as c, style, createClone } from "../clone.js";

component("Board", () => c("div", {}, ["board"], ["runBtn"]), {
  props: {
    board() {
      return c("div");
    },
    runBtn() {
      return c("div");
    }
  },
  states: {
    STRIKE() {
      const widthVal = this.width;

      style(
        {
          display: "flex",
          "flex-direction": "column"
        },
        this.main
      );

      style(
        {
          display: "flex",
          "flex-wrap": "wrap",
          width: `${widthVal}px`,
          margin: "auto"
        },
        this.board
      );

      const limit = this.limit;
      const boardWidth = widthVal / 10;

      this.start = () => {
        const cellsObj = this.allCells;
        let initialCellStates = {};

        for (let i = 0; i < limit; i++) {
          const cell = cellsObj[i];
          cell.alive ? cell.birth() : cell.kill();
          initialCellStates[i] = cell.alive;
        }

        for (let i = 0; i < limit; i++) {
          let neighboursState = [];
          if (cellsObj[i + 1]) neighboursState.push(initialCellStates[i + 1]);

          if (cellsObj[i - 1]) neighboursState.push(initialCellStates[i - 1]);

          if (cellsObj[i - boardWidth])
            neighboursState.push(initialCellStates[i - boardWidth]);

          if (cellsObj[i - boardWidth + 1])
            neighboursState.push(initialCellStates[i - boardWidth + 1]);

          if (cellsObj[i - boardWidth - 1])
            neighboursState.push(initialCellStates[i - boardWidth - 1]);

          if (cellsObj[i + boardWidth])
            neighboursState.push(initialCellStates[i + boardWidth]);

          if (cellsObj[i + boardWidth + 1])
            neighboursState.push(initialCellStates[i + boardWidth + 1]);

          if (cellsObj[i + boardWidth - 1])
            neighboursState.push(initialCellStates[i + boardWidth - 1]);

          let liveNeighbours = 0;

          for (let i = 0; i < neighboursState.length; i++) {
            if (neighboursState[i]) liveNeighbours += 1;
          }

          const cellIsAlive = initialCellStates[i];

          if ((cellIsAlive && liveNeighbours === 2) || liveNeighbours === 3)
            cellsObj[i].alive = true;
          else if (cellIsAlive && liveNeighbours < 2) cellsObj[i].alive = false;
          else if (cellIsAlive && liveNeighbours > 3) cellsObj[i].alive = false;
          else if (!cellIsAlive && liveNeighbours === 3)
            cellsObj[i].alive = true;
        }
        requestAnimationFrame(this.start);
      };
    },
    allCells: {},
    limit: 3000,
    width: 600
  }
});
export const boardCLone = createClone("Board", document.getElementById("root"));
