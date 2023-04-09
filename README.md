# Chai Assertions for TypeScript

**Chai TS** extends [Chai](http://chaijs.com/) to allow validating types when testing [Typescript](https://www.typescriptlang.org) code.

```typescript
expect(myFunction1()).to.narrowEqual(5);
expect(myFunction2()).to.matchEql({ a: 1 });
```

As hinted above, **Chai TS** has been created with Chai's `expect` interface in mind. It should however work with the `should` and `assert` interfaces as well.

## Assertions

### `narrow{Eq, Equal, Equals, Eql, Eqls}`

A `narrow*` assertion performs the same equality test as its counterparts (so `narrowEq` behaves like `eq`), while validating if the type of its argument can be assigned to the type of the tested value - the "tested value" is typically the argument passed to the `expect` method.

Valid: (the tests pass and the code compiles)

```typescript
const add = (v1: number, v2: number): number => v1 + v2;
expect(add(5, 1)).to.narrowEqual(6);

const divide = (v1: number, v2: number): number | undefined => (v2 ? v1 / v2 : undefined);
expect(divide(4, 2)).to.narrowEqual(2);
expect(divide(4, 0)).to.narrowEqual(undefined);

// <number[]> can be assigned to readonly [0, 1]
expect([0, 1] as const).to.narrowEql([0, 1]);

// <string[]> can be assigned to <(string | number)[]>
expect(['a'] as (string | number)[]).to.narrowEql(['a'] as string[]);

// <number[]> can be assigned to <(string | number)[]>
expect([1] as (string | number)[]).to.narrowEql([1] as number[]);

// <(string | number)[]> is <(string | number)[]>
expect([1] as (string | number)[]).to.narrowEql([1] as (string | number)[]);
```

Not Valid: (the tests pass but the code does not compile)

```typescript
// @ts-expect-error <unknown> cannot be assigned to <number>
expect(add(5, 1)).to.narrowEqual<unknown>(6);

// @ts-expect-error <readonly number[]> cannot be assigned to <number>
expect([0, 1]).to.narrowEql([0, 1] as const);
```

### `match{Eq, Equal, Equals, Eql, Eqls}`

A `match*` assertion performs the same equality test as it's counterpart (so `matchEq` behaves like `eq`), while validating if the type of its argument [matches](#matches) the type of the tested value.

Valid:

```typescript
// add returns <number>
expect(add(5, 1)).to.matchEqual(6);

// divide returns <number | undefined>
expect(divide(4, 2)).to.matchEqual(2 as number | undefined);
expect(divide(4, 0)).to.matchEqual<number | undefined>(undefined);

expect([0, 1]).to.matchEql([0, 1]);
expect([0, 1] as const).to.matchEql([0, 1] as const);
```

Not Valid:

```typescript
// @ts-expect-error <6> is not <number>
expect(add(5, 1)).to.matchEqual<6>(6);

// @ts-expect-error <number> is not <number | undefined>
expect(divide(4, 2)).to.matchEqual(2);

// @ts-expect-error <undefined> is not <number | undefined>
expect(divide(4, 0)).to.matchEqual(undefined);

// @ts-expect-error <number[]> is not the tuple <[0, 1]>
expect([0, 1] as const).to.matchEql([0, 1]);

// @ts-expect-error the tuple <[0, 1]> is not <number[]>
expect([0, 1]).to.matchEql([0, 1] as const);
```

### `yieldValue`

The `yieldValue` method terminates the assertion chain and returns the tested value.

Examples:

```typescript
const u: unknown = expect(5).to.be.equal(5).yieldValue();
expect(u).to.be.a('number');

const n: number = expect(5).to.be.equal(5).yieldValue();
expect(n).to.be.a('number');
```

## As Promised

**Chai TS** can be used with [chai-as-promised](https://github.com/domenic/chai-as-promised) to test asynchronous values.

```typescript
await expect(Promise.resolve(5)).to.eventually.be.narrowEqual(5);
await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEqls([1, 2, 3]);

await expect(Promise.resolve(5)).to.eventually.be.matchEq(5);
await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEql([1, 2, 3]);

const n: number = await expect(Promise.resolve(3 + 1))
  .to.eventually.be.equal(4)
  .yieldValue();
expect(n).to.equal(4);
```

## Installation

```bash
npm install --save-dev chai-ts
```

After installing, it's necessary to initialize **Chai TS** using Chai's `use` method:

```typescript
import { use } from 'chai';
import { ChaiTS } from 'chai-ts';

use(ChaiTS);
```

When using with **Chai As Promise** to test asynchronous code, it's necessary to install both plugins:

```bash
npm install --save-dev chai-ts chai-as-promised
```

However the initialization of **Chai TS** handles both plugins:

```typescript
import { use } from 'chai';
import { ChaiTSAsPromised } from 'chai-ts';

use(ChaiTSAsPromised);
```

## Details

### Matches

The [`match*`](#matcheq-equal-equals-eql-eqls) assertions provided by **Chai TS** use the following type to determine if types are a match:

```typescript
export type Matches<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
```

This `Matches` implementation is a "best effort" approach to compare types and may not cover all cases - see this TypeScript [Feature Request](https://github.com/microsoft/TypeScript/issues/27024) for details.

As hinted above, the Matches type is exported and can be used as follows:

```typescript
import type { Matches } from 'chai-ts';

type RequiresNumber<T> = Matches<T, number> extends true ? T : never;
```

### Completeness

With time, the goal is to enable the **Chai TS** assertions to be used after any assertions from both **Chai** and **Chai As Promised**. However, at the moment, the assertions provided here (like `narrowEqual` and `yieldValue`) can only be used after the following methods and properties:

```
// assertions
a
an
arguments
Arguments
be
empty
exist
extensible
false
finite
frozen
itself
key(string: string)
NaN
not
null
ok
sealed
string(string: string, message?: string)
to
true
undefined

// equality
equal
equals
eq
eql
eqls

// promised
eventually
```

## License

Copyright (c) Marcelo Paternostro. All rights reserved.

Licensed under the MIT license.
