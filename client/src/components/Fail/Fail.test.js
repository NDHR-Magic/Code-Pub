import React from "react";
import { render } from "@testing-library/react";

import Fail from "./index";

describe("This should fail for testing CI", () => {
    test("that it fails", () => {
        render(<Fail />);
    });
});