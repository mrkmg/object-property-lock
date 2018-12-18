"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var __1 = require("..");
var index_1 = require("../index");
var LoudSingleLock = (function () {
    function LoudSingleLock() {
        this.Locked = "A";
        this.Unlocked = "B";
    }
    __decorate([
        __1.Lock()
    ], LoudSingleLock.prototype, "Locked");
    LoudSingleLock = __decorate([
        index_1.Lockable()
    ], LoudSingleLock);
    return LoudSingleLock;
}());
var LoudAllLocked = (function () {
    function LoudAllLocked() {
        this.Locked1 = "A";
        this.Locked2 = "B";
    }
    LoudAllLocked = __decorate([
        index_1.Lockable({ all: true })
    ], LoudAllLocked);
    return LoudAllLocked;
}());
var SilentSingleLock = (function () {
    function SilentSingleLock() {
        this.Locked = "A";
        this.Unlocked = "B";
    }
    __decorate([
        __1.Lock({ silent: true })
    ], SilentSingleLock.prototype, "Locked");
    SilentSingleLock = __decorate([
        index_1.Lockable()
    ], SilentSingleLock);
    return SilentSingleLock;
}());
var SilentAllLocked = (function () {
    function SilentAllLocked() {
        this.Locked1 = "A";
        this.Locked2 = "B";
    }
    SilentAllLocked = __decorate([
        index_1.Lockable({ silent: true, all: true })
    ], SilentAllLocked);
    return SilentAllLocked;
}());
describe("Class - Loud", function () {
    it("should lock specified properties after constructors called", function () {
        var a = new LoudSingleLock();
        expect(function () { return a.Locked = "1"; }).toThrow();
        expect(function () { return a.Unlocked = "2"; }).not.toThrow();
        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
    });
    it("should lock all properties after constructors called", function () {
        var a = new LoudAllLocked();
        expect(function () { return a.Locked1 = "1"; }).toThrow();
        expect(function () { return a.Locked2 = "2"; }).toThrow();
        expect(a.Locked1).toBe("A");
        expect(a.Locked2).toBe("B");
    });
});
describe("Class - Silent", function () {
    it("should lock specified properties after constructors called", function () {
        var a = new SilentSingleLock();
        expect(function () { return a.Locked = "1"; }).not.toThrow();
        expect(function () { return a.Unlocked = "2"; }).not.toThrow();
        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
    });
    it("should lock all properties after constructors called", function () {
        var a = new SilentAllLocked();
        expect(function () { return a.Locked1 = "1"; }).not.toThrow();
        expect(function () { return a.Locked2 = "2"; }).not.toThrow();
        expect(a.Locked1).toBe("A");
        expect(a.Locked2).toBe("B");
    });
});
//# sourceMappingURL=class.spec.js.map