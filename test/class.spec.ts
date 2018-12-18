import {Lock} from "..";
import {Lockable} from "../index";

@Lockable()
class LoudSingleLock {
    @Lock()
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
    @Lock({silent: true})
    Locked: string = "A";

    Unlocked: string = "B";
}

@Lockable({silent: true, all: true})
class SilentAllLocked {
    Locked1: string = "A";
    Locked2: string = "B";
}

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