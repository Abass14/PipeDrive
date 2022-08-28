import { capitalize } from "../utils/textUtils"

test("capitalize first letters of text string", () => {
    expect(capitalize("abass")).toBe("Abass")
    expect(capitalize("jOhn")).toBe("JOhn")
})