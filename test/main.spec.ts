/**
 * Kevin Gravier <kevin@mrkmg.com>
 *
 * MIT License 2018
 */

import {lock} from "../";

function createTestObject() {
    return {
        StringProp: "A",
        NumberProp: 1,
        FunctionProp: () => "Func",
    };
}

describe("Loud", () => {
    it("should lock single property", () => {
        const obj = createTestObject();

        lock(obj, "StringProp");

        expect(() => obj.StringProp = "B").toThrow();
        expect(obj.StringProp).toBe("A");
    });

    it("should not lock unspecified property", () => {
        const obj = createTestObject();

        lock(obj, "StringProp");

        expect(() => obj.NumberProp = 2).not.toThrow();
        expect(obj.NumberProp).toBe(2);
    });

    it("should lock multiple properties", () => {
        const obj = createTestObject();

        lock(obj, ["StringProp", "NumberProp"]);

        expect(() => obj.StringProp = "A").toThrow();
        expect(() => obj.NumberProp = 2).toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
    });

    it("should lock all properties", () => {
        const obj = createTestObject();

        lock(obj);

        expect(() => obj.StringProp = "A").toThrow();
        expect(() => obj.NumberProp = 2).toThrow();
        expect(() => obj.FunctionProp = () => "Other").toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
        expect(obj.FunctionProp()).toBe("Func");
    });

    it("should lock select properties via properties option", () => {
        const obj = createTestObject();

        lock(obj, {properties: ["StringProp"]});

        expect(() => obj.StringProp = "A").toThrow();
        expect(() => obj.NumberProp = 2).not.toThrow();
        expect(() => obj.FunctionProp = () => "Other").not.toThrow();

        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(2);
        expect(obj.FunctionProp()).toBe("Other");
    });
});

describe("Silent", () => {
    it("should lock single property", () => {
        const obj = createTestObject();

        lock(obj, "StringProp", true);

        expect(() => obj.StringProp = "B").not.toThrow();
        expect(obj.StringProp).toBe("A");
    });

    it("should not lock unspecified property", () => {
        const obj = createTestObject();

        lock(obj, "StringProp");

        expect(() => obj.NumberProp = 2).not.toThrow();
        expect(obj.NumberProp).toBe(2);
    });

    it("should lock multiple properties", () => {
        const obj = createTestObject();

        lock(obj, ["StringProp", "NumberProp"], true);

        expect(() => obj.StringProp = "A").not.toThrow();
        expect(() => obj.NumberProp = 2).not.toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
    });

    it("should lock all properties", () => {
        const obj = createTestObject();

        lock(obj, true);

        expect(() => obj.StringProp = "A").not.toThrow();
        expect(() => obj.NumberProp = 2).not.toThrow();
        expect(() => obj.FunctionProp = () => "Other").not.toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
        expect(obj.FunctionProp()).toBe("Func");
    });
});