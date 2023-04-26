export type Matches<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

declare global {
  export namespace Chai {
    interface Assertion {
      /**
       * Returns the tested value.
       *
       * @example
       * const a: unknown = expect(5).to.be.greaterThan(4).yieldValue();
       * expect(a).to.equal(5);
       */
      yieldValue(): unknown;
    }

    interface TypedAssertion<A> extends Assertion {
      /**
       * Same as the default `eq` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * expect(5).narrowEq(5);
       * expect(5 as unknown).to.be.narrowEq(5);
       */
      narrowEq: NarrowEqual<A>;

      /**
       * Same as the default `equal` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * expect(5).narrowEqual(5);
       * expect(5 as unknown).to.be.narrowEqual(5);
       */
      narrowEqual: NarrowEqual<A>;

      /**
       * Same as the default `equals` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * @example
       * expect(5).narrowEquals(5);
       * expect(5 as unknown).to.be.narrowEquals(5);
       */
      narrowEquals: NarrowEqual<A>;

      /**
       * Same as the default `eql` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * Besides testing the type, this method simplifies implementing tests because it enables
       * code completion when writing the expected value.
       *
       * @example
       * expect([1, 2, 3]).narrowEql([1, 2, 3]);
       * expect([1, 2, 3] as unknown[]).to.narrowEql([1, 2, 3]);
       * expect({ a: 1, b: true, c: 'value' }).narrowEqls({ a: 1, b: true, c: 'value' });
       */
      narrowEql: NarrowEqual<A>;

      /**
       * Same as the default `eqls` however expecting an argument whose type narrows the
       * type of the tested value - i.e., if the expected value can be assigned to a variable
       * that has the type of the tested value.
       *
       * Besides testing the type, this method simplifies implementing tests because it enables
       * code completion when writing the expected value.
       *
       * @example
       * expect([1, 2, 3]).narrowEqls([1, 2, 3]);
       * expect([1, 2, 3] as unknown[]).to.narrowEqls([1, 2, 3]);
       * expect({ a: 1, b: true, c: 'value' }).narrowEqls({ a: 1, b: true, c: 'value' });
       */
      narrowEqls: NarrowEqual<A>;

      /**
       * Same as the default `eq` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * expect(5).matchEq(5);
       * expect(5 as unknown).to.matchEq(5 as unknown);
       * expect(5 as unknown).to.be.matchEq<unknown>(5);
       */
      matchEq: MatchEqual<A>;

      /**
       * Same as the default `equal` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * expect(5).matchEqual(5);
       * expect(5 as unknown).to.matchEqual(5 as unknown);
       * expect(5 as unknown).to.be.matchEqual<unknown>(5);
       */
      matchEqual: MatchEqual<A>;

      /**
       * Same as the default `equals` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * expect(5).matchEquals(5);
       * expect(5 as unknown).to.matchEquals(5 as unknown);
       * expect(5 as unknown).to.be.matchEquals<unknown>(5);
       */
      matchEquals: MatchEqual<A>;

      /**
       * Same as the default `eql` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * expect([1, 2, 3]).to.be.matchEql([1, 2, 3]);
       * expect([1, 2, 3] as unknown[]).matchEql([1, 2, 3] as unknown[]);
       * expect([1, 2, 3] as unknown[]).to.be.matchEql<unknown[]>([1, 2, 3]);
       */
      matchEql: MatchEqual<A>;

      /**
       * Same as the default `eqls` however expecting an argument whose type matches the
       * type of the tested value - i.e., if the expected value can only be assigned to a variable
       * that has the exact type of the tested value.
       *
       * @example
       * expect([1, 2, 3]).to.be.matchEqls([1, 2, 3]);
       * expect([1, 2, 3] as unknown[]).matchEqls([1, 2, 3] as unknown[]);
       * expect([1, 2, 3] as unknown[]).to.be.matchEqls<unknown[]>([1, 2, 3]);
       */
      matchEqls: MatchEqual<A>;

      /**
       * Returns the tested value, cast to the appropriate type.
       *
       * @example
       * const a: number = expect(5).to.be.narrowEqual(5).yieldValue();
       * expect(a).to.equal(5);
       */
      yieldValue(): A;

      // Assertion Properties
      a: TypedAssertion<A>;
      an: TypedAssertion<A>;
      arguments: TypedAssertion<A>;
      Arguments: TypedAssertion<A>;
      be: TypedAssertion<A>;
      empty: TypedAssertion<A>;
      exist: TypedAssertion<A>;
      extensible: TypedAssertion<A>;
      false: TypedAssertion<A>;
      finite: TypedAssertion<A>;
      frozen: TypedAssertion<A>;
      itself: TypedAssertion<A>;
      key(string: string): TypedAssertion<A>;
      NaN: TypedAssertion<A>;
      not: TypedAssertion<A>;
      null: TypedAssertion<A>;
      ok: TypedAssertion<A>;
      sealed: TypedAssertion<A>;
      string(string: string, message?: string): TypedAssertion<A>;
      to: TypedAssertion<A>;
      true: TypedAssertion<A>;
      undefined: TypedAssertion<A>;

      // Equal Properties
      equal: TypedEqual<A>;
      equals: TypedEqual<A>;
      eq: TypedEqual<A>;
      eql: TypedEqual<A>;
      eqls: TypedEqual<A>;
    }

    interface TypedEqual<A> {
      (value: unknown, message?: string): TypedAssertion<A>;
    }

    interface NarrowEqual<A> {
      (value: A, message?: string): TypedAssertion<A>;
    }

    interface MatchEqual<A> {
      <E>(value: Matches<A, E> extends true ? E : never, message?: string): TypedAssertion<A>;
    }

    interface ExpectStatic {
      <A>(val: A, message?: string): TypedAssertion<A>;
    }
  }
}

/**
 * Initializer for the `chai-ts` plugin.
 *
 * @example
 * import { use } from chai;
 * import { ChaiTS } from 'chai-ts';
 * use(ChaiTS);
 */
export const ChaiTS: Chai.ChaiPlugin = (chai) => {
  function equal(this: Chai.AssertionStatic, value: unknown, message?: string) {
    return (this as unknown as Chai.Assertion).equal(value, message);
  }

  chai.Assertion.addMethod('narrowEq', equal);
  chai.Assertion.addMethod('narrowEqual', equal);
  chai.Assertion.addMethod('narrowEquals', equal);

  chai.Assertion.addMethod('matchEq', equal);
  chai.Assertion.addMethod('matchEqual', equal);
  chai.Assertion.addMethod('matchEquals', equal);

  function eql(this: Chai.AssertionStatic, value: unknown, message?: string) {
    return (this as unknown as Chai.Assertion).eql(value, message);
  }

  chai.Assertion.addMethod('narrowEql', eql);
  chai.Assertion.addMethod('narrowEqls', eql);

  chai.Assertion.addMethod('matchEql', eql);
  chai.Assertion.addMethod('matchEqls', eql);

  chai.Assertion.addMethod('yieldValue', function yieldValue() {
    return this._obj as unknown;
  });
};
