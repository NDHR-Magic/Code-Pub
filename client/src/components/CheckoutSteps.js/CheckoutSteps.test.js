import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CheckoutSteps from "./index";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders without props", () => {
    act(() => {
        render(<CheckoutSteps />, container);
    });
    expect(container.querySelector(".checkout-steps").children[0].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[1].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[2].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[3].classList).not.toContain("active");
});

it("renders active className with appropriate props", () => {
    act(() => {
        render(<CheckoutSteps step1 step2 />, container);
    });
    expect(container.querySelector(".checkout-steps").children[0].classList).toContain("active");
    expect(container.querySelector(".checkout-steps").children[1].classList).toContain("active");
    expect(container.querySelector(".checkout-steps").children[2].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[3].classList).not.toContain("active");
});

it("renders none active with random props", () => {
    act(() => {
        render(<CheckoutSteps step5 step6 />, container);
    });
    expect(container.querySelector(".checkout-steps").children[0].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[1].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[2].classList).not.toContain("active");
    expect(container.querySelector(".checkout-steps").children[3].classList).not.toContain("active");
});

it("renders all active className with appropriate props", () => {
    act(() => {
        render(<CheckoutSteps step1 step2 step3 step4 />, container);
    });
    expect(container.querySelector(".checkout-steps").children[0].classList).toContain("active");
    expect(container.querySelector(".checkout-steps").children[1].classList).toContain("active");
    expect(container.querySelector(".checkout-steps").children[2].classList).toContain("active");
    expect(container.querySelector(".checkout-steps").children[3].classList).toContain("active");
});