import { render } from "@testing-library/react";
import MessageBox from ".";

describe("Message box component", () => {
    test("It renders with passed text and default styling of alert-info", () => {
        const { getByText } = render(<MessageBox>Jest Test</MessageBox>);

        const message = getByText("Jest Test");
        expect(message.classList.contains("alert-info")).toBe(true);
        expect(message.classList.contains("alert-danger")).toBe(false);
    });

    test("Should pass props.variant to styling as alert-{props.variant}", () => {
        const { getByText } = render(<MessageBox variant={"danger"}>Jest error 2</MessageBox>);

        const error = getByText("Jest error 2");
        expect(error.classList.contains("alert-danger")).toBe(true);
        expect(error.classList.contains("alert-info")).toBe(false);
    });
});