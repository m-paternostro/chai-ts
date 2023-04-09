import ChaiAsPromised from 'chai-as-promised';

import type { Matches } from './chai-ts';
import { ChaiTS } from './chai-ts';

declare global {
  export namespace Chai {
    interface TypedAssertion<A> extends Assertion {
      // From chai-as-promise
      eventually: TypedPromisedAssertion<A>;
    }

    interface PromisedAssertion {
      /**
       * Returns a promise that resolves to the tested value.
       *
       * @example
       * const a: unknown = await expect(Promise.resolve(5)).to.eventually.be.equal(5).yieldValue();
       * expect(a).to.equal(5);
       */
      yieldValue(): Promise<unknown>;
    }

    interface TypedPromisedAssertion<A> extends TypedEventually<A>, PromiseLike<unknown> {
      /**
       * Returns a promise that resolves to the tested value cast to the appropriate type.
       *
       * @example
       * const a: number = await expect(Promise.resolve(5)).to.eventually.be.equal(5).yieldValue();
       * expect(a).to.equal(5);
       */
      yieldValue(): Promise<Awaited<A>>;
    }

    interface TypedEventually<A> extends Eventually {
      /**
       * Same as the default `eq` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.narrowEq(5)
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEq(5);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEq(5);
       */
      narrowEq: NarrowPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `equal` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.narrowEqual(5)
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEqual(5);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEqual(5);
       */
      narrowEqual: NarrowPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `equals` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.narrowEquals(5);
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEquals(5);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEquals(5);
       */
      narrowEquals: NarrowPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `eql` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEql([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3] as unknown[])).to.eventually.be.narrowEql([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.narrowEql([1, 2, 3]);
       */
      narrowEql: NarrowPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `eqls` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEqls([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3] as unknown[])).to.eventually.be.narrowEqls([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.narrowEqls([1, 2, 3]);
       */
      narrowEqls: NarrowPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `eq` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.matchEq(5);
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEq(5 as unknown);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEq<unknown>(5);
       */
      matchEq: MatchPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `equal` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.matchEqual(5);
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEqual(5 as unknown);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEqual<unknown>(5);
       */
      matchEqual: MatchPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `equals` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * await expect(Promise.resolve(5)).to.eventually.be.matchEquals(5);
       * await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEquals(5 as unknown);
       * await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEquals<unknown>(5);
       */
      matchEquals: MatchPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `eql` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEql([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEql([1, 2, 3] as unknown[]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEql<unknown[]>([1, 2, 3]);
       */
      matchEql: MatchPromisedEqual<Awaited<A>>;

      /**
       * Same as the default `eqls` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEqls([1, 2, 3]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEqls([1, 2, 3] as unknown[]);
       * await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEqls<unknown[]>([1, 2, 3]);
       */
      matchEqls: MatchPromisedEqual<Awaited<A>>;

      // Assertion Properties
      a: TypedPromisedAssertion<A>;
      an: TypedPromisedAssertion<A>;
      arguments: TypedPromisedAssertion<A>;
      Arguments: TypedPromisedAssertion<A>;
      be: TypedPromisedAssertion<A>;
      empty: TypedPromisedAssertion<A>;
      exist: TypedPromisedAssertion<A>;
      extensible: TypedPromisedAssertion<A>;
      false: TypedPromisedAssertion<A>;
      finite: TypedPromisedAssertion<A>;
      frozen: TypedPromisedAssertion<A>;
      itself: TypedPromisedAssertion<A>;
      key(string: string): TypedPromisedAssertion<A>;
      NaN: TypedPromisedAssertion<A>;
      not: TypedPromisedAssertion<A>;
      null: TypedPromisedAssertion<A>;
      ok: TypedPromisedAssertion<A>;
      sealed: TypedPromisedAssertion<A>;
      string(string: string, message?: string): TypedPromisedAssertion<A>;
      to: TypedPromisedAssertion<A>;
      true: TypedPromisedAssertion<A>;
      undefined: TypedPromisedAssertion<A>;

      // Equal Properties
      equal: TypedPromisedEqual<Awaited<A>>;
      equals: TypedPromisedEqual<Awaited<A>>;
      eq: TypedPromisedEqual<Awaited<A>>;
      eql: TypedPromisedEqual<Awaited<A>>;
      eqls: TypedPromisedEqual<Awaited<A>>;
    }

    interface TypedPromisedEqual<A> {
      (value: unknown, message?: string): TypedPromisedAssertion<A>;
    }

    interface NarrowPromisedEqual<A> {
      (value: A, message?: string): TypedPromisedAssertion<A>;
    }

    interface MatchPromisedEqual<A> {
      <E>(value: Matches<A, E> extends true ? E : never, message?: string): TypedPromisedAssertion<A>;
    }
  }
}

/**
 * Initializer for the `chai-ts-as-promised` plugin, which also initializes the
 * `chai-ts` and `chai-as-promised` plugins.
 *
 * @example
 * import { use } from chai;
 * import { ChaiTSAsPromised } from 'chai-ts';
 * use(ChaiTSAsPromised);
 */
export const ChaiTSAsPromised: Chai.ChaiPlugin = (chai) => {
  chai.use(ChaiTS);

  const assertionPrototype = chai.Assertion.prototype as unknown as { yieldValue: unknown };

  // we need to ensure that ChaiAsPromised as is not replacing the yield value because it
  // always returns the assertion object if there is no eventually (see chai-as-promised.doAsserterAsyncAndAddThen)
  const yieldValue = assertionPrototype.yieldValue;

  chai.use(ChaiAsPromised);

  if (assertionPrototype.yieldValue !== yieldValue) {
    (chai.Assertion.prototype as unknown as { yieldValue: unknown }).yieldValue = yieldValue;
  }
};
