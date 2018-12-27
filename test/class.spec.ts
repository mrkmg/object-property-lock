import {Locked} from "..";
import {Lockable} from "../index";

@Lockable()
class LoudSingleLock {
    @Locked()
    Locked: string = "A";
    Unlocked: string = "B";
}

@Lockable({all: true})
class LoudAllLocked {
    Locked1: string = "A";
    Locked2: string = "B";
}

@Lockable()
class SilentSingleLock {
    @Locked({silent: true})
    Locked: string = "A";
    Unlocked: string = "B";
}

@Lockable({silent: true, all: true})
class SilentAllLocked {
    Locked1: string = "A";
    Locked2: string = "B";
}

@Lockable()
class LoudExtendedLock extends LoudSingleLock {
    @Locked()
    Locked2: string = "C";
    Unlocked2: string = "D";
}

@Lockable({properties: ["Locked"]})
class LoudByProperties {
    Locked: string = "A";
    Unlocked: string = "B";
}

@Lockable({all: true, silent: true})
class OverrideProperty {
    LockedByAll: string = "A";

    @Locked({silent: false})
    LockedByProp: string = "B";
}

describe("Class - Other", () => {
    it("should lock inheritance chain", () => {
        const a = new LoudExtendedLock();
        expect(() => a.Locked = "1").toThrow();
        expect(() => a.Unlocked = "2").not.toThrow();
        expect(() => a.Locked2 = "3").toThrow();
        expect(() => a.Unlocked2 = "4").not.toThrow();

        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
        expect(a.Locked2).toBe("C");
        expect(a.Unlocked2).toBe("4");
    });

    it("should lock via properties option", () => {
        const a = new LoudByProperties();
        expect(() => a.Locked = "1").toThrow();
        expect(() => a.Unlocked = "2").not.toThrow();

        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
    });

    it("should allow property to override class", () => {
        const a = new OverrideProperty();
        expect(() => a.LockedByAll = "1").not.toThrow();
        expect(() => a.LockedByProp = "2").toThrow();

        expect(a.LockedByAll).toBe("A");
        expect(a.LockedByProp).toBe("B");
    });
});

describe("Class - Loud", () => {
    it("should lock specified properties after constructors called", () => {
        const a = new LoudSingleLock();
        expect(() => a.Locked = "1").toThrow();
        expect(() => a.Unlocked = "2").not.toThrow();

        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
    });

    it("should lock all properties after constructors called", () => {
        const a = new LoudAllLocked();
        expect(() => a.Locked1 = "1").toThrow();
        expect(() => a.Locked2 = "2").toThrow();

        expect(a.Locked1).toBe("A");
        expect(a.Locked2).toBe("B");
    });
});

describe("Class - Silent", () => {
    it("should lock specified properties after constructors called", () => {
        const a = new SilentSingleLock();
        expect(() => a.Locked = "1").not.toThrow();
        expect(() => a.Unlocked = "2").not.toThrow();

        expect(a.Locked).toBe("A");
        expect(a.Unlocked).toBe("2");
    });

    it("should lock all properties after constructors called", () => {
        const a = new SilentAllLocked();
        expect(() => a.Locked1 = "1").not.toThrow();
        expect(() => a.Locked2 = "2").not.toThrow();

        expect(a.Locked1).toBe("A");
        expect(a.Locked2).toBe("B");
    });
});