Object Property Lock
====================

A small and simple javascript library to lock properties on an object from being reassigned.


## Usage

Lock a single property on an object.

```javascript
import {lock} from "object-lock-property";

const person = {
    id: 3,
    firstName: "Joe",
    lastName: "Dirt"
}

lock(person, "id");

person.id = 4; // Throws Error in strict mode

console.log(person.id); // 3
```

Lock multiple properties on an object silently (Do not throw an error on assignment)

```javascript
'use strict'
import {lock} from "object-lock-property";

const transaction = {
    id: 1000,
    reference: "ABC123",
    amount: 10.04,
    date: "2010-01-01"
};

// Lock id and reference from modification, with no errors to be thrown.
lock(transaction, ["id", "reference"], false);

transaction.id = 1001; // This is ignored, even in strict mode
transaction.reference = "DEF456"; // This is ignored, even in strict mode

console.log(transaction.id); // 1000
console.log(transaction.reference); // ABC123
```

Below are all possible usages

```javascript
import {lock} from "object-lock-property";


// With errors
lock(obj); // Locks all properties
lock(obj, "prop"); // Locks only the `prop` property
lock(obj, ["prop1", "prop2"]); // Locks only the `prop1` and `prop2` properties

// Silently (Without errors)
lock(obj, true); // Locks all properties
lock(obj, "prop", true); // Locks only the `prop` property
lock(obj, ["prop1", "prop2"], true); // Locks only the `prop1` and `prop2` properties
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
