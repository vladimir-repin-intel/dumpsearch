# @b08/array, seeded from @b08/library-seed, library type: dry
Set of DRY functions to work with array. Typescript style.\
Why not lodash? lodash is heavy, this package is light as air. \
And supports es5/es6/esnext in compile time, i.e. a bit more efficient code in node and chrome without runtime checks for platform.\
To use it with ES5, import it as "@b08/array/es5"

# all
Method returns true if all items in the array fulfill the condition. Empty array also yields true.

```
import { all } from "@b08/array"

const a = [1, 2, 3];

const allHigher = all(a, item => item > 2); // false
const allNumbers = all(a, isNumber); // true
```

# areEqual
Method returns true if two arrays are equal by criteria, and go in the same order.

```
const a = [ 
  { id: 1, name: 'a' }, 
  { id: 2, name: 'b' }
];

const b = [ 
  { id: 1, name: 'c' }, 
  { id: 2, name: 'd' }
];

const c = [ 
  { id: 2, name: 'b' }, 
  { id: 1, name: 'a' }
];

const anb = areEqual(a, b, item => item.id); // true
const anc = areEqual(a, c, item => item.id); // false
```

# areEquivalent
Method returns true if two arrays are equal by criteria, order does not matter.

# contains
Returns true if item is present in the array. Useful if array.prototype.includes is not available

# intersect and except
intersect returns items present in both arrays, except return items from first array not present in second array

```
const a = [1, 2];
const b = [2, 3];

const result1 = intersect(a, b); // [2]
const result2 = except(a, b); // [1]
```

# flatMap
Combination of map and then flatten, aka concatenation of array of arrays.

const a = [1, 2];

const b = flatMap(a, item => [item, 3]); // [1, 3, 2, 3];

# hasElements
Returns true if array is an instance of Array and contains at least one element

# first and last
Returns first and last elements of array satisfying the criteria, or undefined if no such elements present.

```
const a = [1, 2, 3];

const result1 = first(a, item => item > 1); // 2
const result2 = last(a, item => item > 1); // 3
```

# min and max
Returns element minimal or maximal by given criteria

```
const a = [1, 2, 3];

const result1 = min(a, item => -item); // 3
const result2 = max(a, item => -item); // 1
```

# regexToArray
Current interface of working with /g regex is a bit inconvenient. This method transforms it to array of matches. So you can execute .map on it and etc.

```
const matches = regexToArray(/\d/g, 'a1b2c'); 
// two matches, matches[0][0] = '1', matches[1][0] = '2'
```

# splitInGroups
Splits array into a provided number of arrays

```
const a = [1, 2, 3, 4, 5, 6];
const result = splitInGroups(a, 2); // [[1, 2, 3], [4, 5, 6]];
```

# splitInGroupsBy
Splits array into arrays of given size

```
const a = [1, 2, 3, 4, 5, 6];
const result = splitInGroups(a, 2); // [[1, 2], [3, 4], [5, 6]];
```

# unique
Returns items from array unique by given criteria

```
const a = [ 
  { id: 1, name: 'a' }, 
  { id: 1, name: 'b' },
  { id: 2, name: 'c' }, 
  { id: 2, name: 'd' }
];

const result = unique(a, item => item.id); //  [a[0], a[2]]
```

# range
Returns array of numbers from start(inclusive) to end(non-inclusive)

# trim
Removes amount of items from end of the array, one by default.

```
const items = [1, 2, 3, 4];

const result = trim(items, 2); // [1, 2] 