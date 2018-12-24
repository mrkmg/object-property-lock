Object Property Lock
====================

A small and simple javascript library to lock properties on an object or class
from being reassigned.

Under the hood, `Object.defineProperty` is used. This requires ES5 
compatibility. 

Features:

- Simple use, clear syntax.
- No external dependencies.
- Fully tested.
- Works on plain objects and ES6 classes.

## Usage

There are two different ways to use this library. On classes via decorators, or
on plain objects via a function.

When using the decorator method, locked properties on a class may only be set in
the constructor.

When using the function method, locked properties are locked as they are when
the lock is applied.

### Class Decorators

To allow a class to be locked, you must apply the `@Lockable()` decorator to the
entire class. You can then apply the `@Locked()` decorator to any field you wish
to lock.

In the following example, the `id` property of `Person` is Locked, and if you
try to set it, it will throw an Error.

```javascript
import {Lockable, Locked} from "object-property-lock";

@Lockable()
class Person {
    @Locked() id;
    firstName;
    lastName;
    
    constructor(id) {
        this.id = id;
    }
}
```

If you want to lock all the properties of a class, making it immutable, you can
pass `{all: true}` to the `@Lockable` decorator.

```javascript
import {Lockable, Locked} from "object-property-lock";

@Lockable({all: true})
class Person {
    id;
    firstName;
    lastName;
    
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

### Functional Method

To lock properties on an already instantiated class or plain object, you can use
the `lock` function.

```javascript
import {lock} from "object-property-lock";

const person = {
    id: 3,
    _oldId: 7,
    firstName: "Joe",
    lastName: "Dirt"
};

lock(person); // Lock all properties
lock(person, "id"); // Lock just the id property
lock(person, ["id", "_oldId"]); // Lock the id and _oldId properties
```

## Documentation

### Decorators

**@Lockable(opts)**

Applied to a class, allows properties on a class to be locked. opts are
optional.

opts:
```
{
    // Optional
    // Default: false
    // If set to true, any assignment to locked properties will fail silently.
    silent: true | false,
    
    // Optional
    // Default: false
    // If true, lock all properties.
    all: true | false,
    
    // Optional
    // Default: null,
    // A list of properties to lock
    properties: Array<string>,
}
```

**@Locked(opts)**

Applied to a property, locks that property from modification after construction.

opts:
```
{
    // Optional
    // Default: false
    // If set to true, any assignment the property will fail silently.
    silent: true | false,
}
```

### Functional

**lock(obj, opts)**

Locks properties on obj according to opts.

opts:
```
{
    // Optional
    // Default: false
    // If set to true, any assignment to locked properties will fail silently.
    silent: true | false,
    
    // Optional
    // Default: false
    // If true, lock all properties.
    all: true | false,
    
    // Optional
    // Default: null,
    // A list of properties to lock
    properties: Array<string>,
}
```

**lock(obj, prop)**

Locks prop on obj.

prop: `string`

**lock(obj, props)**

Locks each prop of props on obj.

props: `Array<string>`

**lock(obj, prop | props, true)**

Locks each prop of props or prop silently.

prop: `string`
props: `Array<string>`

## Examples

```javascript
import {lock, Locked, Lockable} from "object-lock-property";

// Locks all properties
lock(obj);

// Locks only the `prop` property
lock(obj, "prop");

// Locks only the `prop1` and `prop2` properties
lock(obj, ["prop1", "prop2"]);

// Locks all properties silently
lock(obj, true);

// Locks only the `prop` property silently
lock(obj, "prop", true);

// Locks only the `prop1` and `prop2` properties silently
lock(obj, ["prop1", "prop2"], true);

// Silently lock `prop1` and `prop2`
lock(obj, {silent: true, properties: ["prop1", "prop2"]});

// Lock all properties on obj
lock(obj, {all: true});

// Lock prop silently
@Lockable()
class Test {
    @Locked({silent: true}) 
    prop = "A";
}

// Lock all props silently
@Lockable({all: true, silent: true})
class Test {
    prop = "A";
}

// Lock `prop1`
@Lockable({properties: ["prop1"]})
class Test {
    prop1 = "A";
    prop2 = "B";
}
```

## LICENSE

MIT License

Copyright (c) 2018 Kevin Gravier <kevin@mrkmg.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
