"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var index_1 = require("../index");
var LoudSingleLock = /** @class */ (function () {
    function LoudSingleLock() {
        this.Locked = "A";
        this.Unlocked = "B";
    }
    __decorate([
        __1.Locked()
    ], LoudSingleLock.prototype, "Locked", void 0);
    LoudSingleLock = __decorate([
        index_1.Lockable()
    ], LoudSingleLock);
    return LoudSingleLock;
}());
var LoudAllLocked = /** @class */ (function () {
    function LoudAllLocked() {
        this.Locked1 = "A";
        this.Locked2 = "B";
    }
    LoudAllLocked = __decorate([
        index_1.Lockable({ all: true })
    ], LoudAllLocked);
    return LoudAllLocked;
}());
var SilentSingleLock = /** @class */ (function () {
    function SilentSingleLock() {
        this.Locked = "A";
        this.Unlocked = "B";
    }
    __decorate([
        __1.Locked({ silent: true })
    ], SilentSingleLock.prototype, "Locked", void 0);
    SilentSingleLock = __decorate([
        index_1.Lockable()
    ], SilentSingleLock);
    return SilentSingleLock;
}());
var SilentAllLocked = /** @class */ (function () {
    function SilentAllLocked() {
        this.Locked1 = "A";
        this.Locked2 = "B";
    }
    SilentAllLocked = __decorate([
        index_1.Lockable({ silent: true, all: true })
    ], SilentAllLocked);
    return SilentAllLocked;
}());
var LoudExtendedLock = /** @class */ (function (_super) {
    __extends(LoudExtendedLock, _super);
    function LoudExtendedLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Locked2 = "C";
        _this.Unlocked2 = "D";
        return _this;
    }
    __decorate([
        __1.Locked()
    ], LoudExtendedLock.prototype, "Locked2", void 0);
    LoudExtendedLock = __decorate([
        index_1.Lockable()
    ], LoudExtendedLock);
    return LoudExtendedLock;
}(LoudSingleLock));
var LoudByProperties = /** @class */ (function () {
    function LoudByProperties() {
        this.Locked = "A";
        this.Unlocked = "B";
    }
    LoudByProperties = __decorate([
        index_1.Lockable({ properties: ["Locked"] })
    ], LoudByProperties);
    return LoudByProperties;
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
    it("should lock inheritance chain", function () {
        var a = new LoudExtendedLock();
        expect(function () { return a.Locked = "1"; }).toThrow();
        expect(function () { return a.Unlocked = "2"; }).not.toThrow();
        expect(function () { return a.Locked2 = "3"; }).toThrow();
        expect(function () { return a.Unlocked2 = "4"; }).not.toThrow();
        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
        expect(a.Locked2).toBe("C");
        expect(a.Unlocked2).toBe("4");
    });
    it("should lock via properties option", function () {
        var a = new LoudByProperties();
        expect(function () { return a.Locked = "1"; }).toThrow();
        expect(function () { return a.Unlocked = "2"; }).not.toThrow();
        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
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