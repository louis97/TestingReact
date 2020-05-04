import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Like from "../Like";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <Like/>,
      container
    );
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Testing Like component',()=>{
    it("Defaults to Inactive p", () => {
        const p = container.querySelector("p");
        expect(p.textContent).toBe("Likes: 0");
      });

      it("Like p changes when clicked +1", () => {
        const increment = container.querySelector("#increment");
        const p = container.querySelector("p");
        act(() => {
            increment.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(p.textContent).toBe("Likes: 1");
      });

      it("Like p changes when clicked -1", () => {
        const decrement = container.querySelector("#decrement");
        const p = container.querySelector("p");
        act(() => {
            decrement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(p.textContent).toBe("Likes: -1");
      });
})
