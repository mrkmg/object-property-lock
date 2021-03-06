"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
function createTestObject() {
    return {
        StringProp: "A",
        NumberProp: 1,
        FunctionProp: function () { return "Func"; },
    };
}
describe("Loud", function () {
    it("should lock single property", function () {
        var obj = createTestObject();
        __1.lock(obj, "StringProp");
        expect(function () { return obj.StringProp = "B"; }).toThrow();
        expect(obj.StringProp).toBe("A");
    });
    it("should not lock unspecified property", function () {
        var obj = createTestObject();
        __1.lock(obj, "StringProp");
        expect(function () { return obj.NumberProp = 2; }).not.toThrow();
        expect(obj.NumberProp).toBe(2);
    });
    it("should lock multiple properties", function () {
        var obj = createTestObject();
        __1.lock(obj, ["StringProp", "NumberProp"]);
        expect(function () { return obj.StringProp = "A"; }).toThrow();
        expect(function () { return obj.NumberProp = 2; }).toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
    });
    it("should lock all properties", function () {
        var obj = createTestObject();
        __1.lock(obj);
        expect(function () { return obj.StringProp = "A"; }).toThrow();
        expect(function () { return obj.NumberProp = 2; }).toThrow();
        expect(function () { return obj.FunctionProp = function () { return "Other"; }; }).toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
        expect(obj.FunctionProp()).toBe("Func");
    });
    it("should lock select properties via properties option", function () {
        var obj = createTestObject();
        __1.lock(obj, { properties: ["StringProp"] });
        expect(function () { return obj.StringProp = "A"; }).toThrow();
        expect(function () { return obj.NumberProp = 2; }).not.toThrow();
        expect(function () { return obj.FunctionProp = function () { return "Other"; }; }).not.toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(2);
        expect(obj.FunctionProp()).toBe("Other");
    });
});
describe("Silent", function () {
    it("should lock single property", function () {
        var obj = createTestObject();
        __1.lock(obj, "StringProp", true);
        expect(function () { return obj.StringProp = "B"; }).not.toThrow();
        expect(obj.StringProp).toBe("A");
    });
    it("should not lock unspecified property", function () {
        var obj = createTestObject();
        __1.lock(obj, "StringProp");
        expect(function () { return obj.NumberProp = 2; }).not.toThrow();
        expect(obj.NumberProp).toBe(2);
    });
    it("should lock multiple properties", function () {
        var obj = createTestObject();
        __1.lock(obj, ["StringProp", "NumberProp"], true);
        expect(function () { return obj.StringProp = "A"; }).not.toThrow();
        expect(function () { return obj.NumberProp = 2; }).not.toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
    });
    it("should lock all properties", function () {
        var obj = createTestObject();
        __1.lock(obj, true);
        expect(function () { return obj.StringProp = "A"; }).not.toThrow();
        expect(function () { return obj.NumberProp = 2; }).not.toThrow();
        expect(function () { return obj.FunctionProp = function () { return "Other"; }; }).not.toThrow();
        expect(obj.StringProp).toBe("A");
        expect(obj.NumberProp).toBe(1);
        expect(obj.FunctionProp()).toBe("Func");
    });
});
//# sourceMappingURL=main.spec.js.map