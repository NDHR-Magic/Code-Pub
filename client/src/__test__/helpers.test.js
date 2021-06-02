import { format_date } from "../helpers/formatDate";

it("Should format a default date from DATE js obj to MM/DD/YYYY", () => {
    const testDate = format_date(1622614953178); // Date.now() response for time on 06/02/2021

    expect(testDate).toBe("06/02/2021");
    expect(testDate).not.toBe("6/2/2021");
    expect(testDate).not.toBe("05/02/2021");
});