import { roundOff } from "./roundOff";

test("fixed decimal to 2 point 10/3 should be 3.33", () => {
  expect(roundOff(10 / 3, 2)).toBe(3.33);
});
