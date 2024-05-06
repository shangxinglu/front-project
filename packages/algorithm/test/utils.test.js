import { isSorted } from "../src/utils";

describe("utils", () => {
    describe("isSorted", () => {
        it("should return true if the array is sorted", () => {
        expect(isSorted([1, 2, 3, 4, 5])).toBe(true);
        });
    
        it("should return false if the array is not sorted", () => {
        expect(isSorted([1, 2, 3, 5, 4])).toBe(false);
        });
    });
});