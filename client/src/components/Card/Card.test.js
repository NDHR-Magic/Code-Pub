import React from "react";
import { render } from "@testing-library/react";

import Card from "./index";

describe("Card component for drink randomizer", () => {
    test("It should render and pass props. It should also have dynamic bg or text color properties", () => {
        const { getByText } = render(<Card
            headerBg={"#555"}
            headerColor={"#fff"}
            bodyBg={"rgb(255, 182, 193)"}
            bodyColor={"teal"}
            name={"Test Drink"}
            ingredients={["Item1, Item2"]}
            instructions={"Enter desc"}
        />);

        getByText("Test Drink");
        getByText("Item1, Item2");
        getByText("Enter desc");
        expect(document.querySelector(".custom-card-header").style.backgroundColor).toBe("rgb(85, 85, 85)");
        expect(document.querySelector(".custom-card-header").style.color).toBe("rgb(255, 255, 255)");
        expect(document.querySelector(".custom-card-body").style.backgroundColor).toBe("rgb(255, 182, 193)");
        expect(document.querySelector(".custom-card-body").style.color).toBe("teal");
    });
});