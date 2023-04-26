import { expect, use } from 'chai';

import { ChaiTS } from '../src/chai-ts';

use(ChaiTS);

describe('chai-ts', () => {
  describe('README', () => {
    it('narrow*', () => {
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

      // ---

      // @ts-expect-error <unknown> cannot be assigned to <number>
      expect(add(5, 1)).to.narrowEqual<unknown>(6);

      // @ts-expect-error <readonly number[]> cannot be assigned to <number>
      expect([0, 1]).to.narrowEql([0, 1] as const);
    });

    it('matcb*', () => {
      const add = (v1: number, v2: number): number => v1 + v2;
      const divide = (v1: number, v2: number): number | undefined => (v2 ? v1 / v2 : undefined);

      // add returns <number>
      expect(add(5, 1)).to.matchEqual(6);

      // divide returns <number | undefined>
      expect(divide(4, 2)).to.matchEqual(2 as number | undefined);
      expect(divide(4, 0)).to.matchEqual<number | undefined>(undefined);

      expect([0, 1]).to.matchEql([0, 1]);
      expect([0, 1] as const).to.matchEql([0, 1] as const);

      // ---

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
    });

    it('yieldValue', () => {
      const u: unknown = expect(5).to.be.equal(5).yieldValue();
      expect(u).to.be.a('number');

      const n: number = expect(5).to.be.equal(5).yieldValue();
      expect(n).to.be.a('number');
    });
  });

  describe('JSDoc', () => {
    it('narrowEq', () => {
      expect(5).narrowEq(5);
      expect(5 as unknown).to.be.narrowEq(5);
    });

    it('narrowEqual', () => {
      expect(5).narrowEqual(5);
      expect(5 as unknown).to.be.narrowEqual(5);
    });

    it('narrowEquals', () => {
      expect(5).narrowEquals(5);
      expect(5 as unknown).to.be.narrowEquals(5);
    });

    it('narrowEql', () => {
      expect([1, 2, 3]).narrowEql([1, 2, 3]);
      expect([1, 2, 3] as unknown[]).to.narrowEql([1, 2, 3]);
      expect({ a: 1, b: true, c: 'value' }).narrowEql({ a: 1, b: true, c: 'value' });
    });

    it('narrowEqls', () => {
      expect([1, 2, 3]).narrowEqls([1, 2, 3]);
      expect([1, 2, 3] as unknown[]).to.narrowEqls([1, 2, 3]);
      expect({ a: 1, b: true, c: 'value' }).narrowEqls({ a: 1, b: true, c: 'value' });
    });

    it('narrowEqual', () => {
      expect(5).matchEq(5);
      expect(5 as unknown).to.matchEq(5 as unknown);
      expect(5 as unknown).to.be.matchEq<unknown>(5);
    });

    it('matchEqual', () => {
      expect(5).matchEqual(5);
      expect(5 as unknown).to.matchEqual(5 as unknown);
      expect(5 as unknown).to.be.matchEqual<unknown>(5);
    });

    it('matchEquals', () => {
      expect(5).matchEquals(5);
      expect(5 as unknown).to.matchEquals(5 as unknown);
      expect(5 as unknown).to.be.matchEquals<unknown>(5);
    });

    it('matchEql', () => {
      expect([1, 2, 3]).to.be.matchEql([1, 2, 3]);
      expect([1, 2, 3] as unknown[]).matchEql([1, 2, 3] as unknown[]);
      expect([1, 2, 3] as unknown[]).to.be.matchEql<unknown[]>([1, 2, 3]);
    });

    it('matchEqls', () => {
      expect([1, 2, 3]).to.be.matchEqls([1, 2, 3]);
      expect([1, 2, 3] as unknown[]).matchEqls([1, 2, 3] as unknown[]);
      expect([1, 2, 3] as unknown[]).to.be.matchEqls<unknown[]>([1, 2, 3]);
    });

    it('yieldValue', () => {
      const a: unknown = expect(5).to.be.greaterThan(4).yieldValue();
      expect(a).to.equal(5);
    });

    it('typed yieldValue', () => {
      const a: number = expect(5).to.be.narrowEqual(5).yieldValue();
      expect(a).to.equal(5);
    });
  });

  it('narrowEqual', () => {
    expect(5).to.narrowEqual(5).and.to.equal(5);
    expect(5).not.to.narrowEqual(4).and.to.equal(4);

    expect<string | number>(5).narrowEqual(5).and.to.equal(5);
    expect<string | number>(5).not.narrowEqual(4).and.to.equal(4);

    expect(5)
      // @ts-expect-error require <number>
      .to.be.narrowEqual(5 as string | number)
      .and.to.equal(5);

    expect(5)
      .to.not // @ts-expect-error require <number>
      .narrowEqual(4 as string | number)
      .and.to.equal(4);

    expect<string | number>(5)
      .narrowEqual(5 as string | number)
      .and.to.equal(5);

    expect<string | number>(5)
      .not.narrowEqual(4 as string | number)
      .and.to.equal(4);

    expect(5 as unknown as string)
      // @ts-expect-error require <string>
      .narrowEqual(5)
      .and.to.equal(5);

    expect(5 as unknown as string)
      .not // @ts-expect-error require <string>
      .narrowEqual(4)
      .and.to.equal(4);
  });

  it('matchEqual', () => {
    expect(5).matchEqual(5).and.to.equal(5);
    expect(5).not.matchEqual(4).and.to.equal(4);

    // @ts-expect-error require <string | number>
    expect<string | number>(5).matchEqual(5).and.to.equal(5);
    // @ts-expect-error require <string | number>
    expect<string | number>(5).not.matchEqual(4).and.to.equal(4);

    expect(5)
      // @ts-expect-error require <number>
      .to.matchEqual(5 as string | number)
      .and.to.equal(5);
    expect(5)
      .not // @ts-expect-error require <number>
      .matchEqual(4 as string | number)
      .and.to.equal(4);

    expect<string | number>(5)
      .matchEqual(5 as string | number)
      .and.to.equal(5);

    expect<string | number>(5)
      .not.matchEqual(4 as string | number)
      .and.to.equal(4);

    expect(5 as unknown as string)
      // @ts-expect-error require <string>
      .matchEqual(5)
      .and.to.equal(5);
    expect(5 as unknown as string)
      .not // @ts-expect-error require <string>
      .to.matchEqual(4)
      .and.to.equal(4);
  });

  it('narrowEql', () => {
    expect([1, 2, 3]).narrowEql([1, 2, 3]).and.to.eql([1, 2, 3]);
    expect([1, 2, 3]).not.narrowEql([1, 2, 4]).and.to.eql([1, 2, 4]);

    expect<number[] | string[]>([1, 2, 3]).narrowEql([1, 2, 3]).and.to.eql([1, 2, 3]);
    expect<number[] | string[]>([1, 2, 3]).not.narrowEql([1, 2, 4]).and.to.eql([1, 2, 4]);

    expect([1, 2, 3])
      // @ts-expect-error require <number[]>
      .narrowEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    expect([1, 2, 3])
      .not // @ts-expect-error require <number[]>
      .narrowEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    expect<number[] | string[]>([1, 2, 3])
      .narrowEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    expect<number[] | string[]>([1, 2, 3])
      .to.not.narrowEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    expect([1, 2, 3] as unknown as string[])
      // @ts-expect-error require <string[]>
      .narrowEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    expect([1, 2, 3] as unknown as string[])
      .not.to // @ts-expect-error require <string[]>
      .narrowEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);
  });

  it('matchEql', () => {
    expect([1, 2, 3]).matchEql([1, 2, 3]).and.to.eql([1, 2, 3]);
    expect([1, 2, 3]).not.matchEql([1, 2, 4]);

    // @ts-expect-error require <number[] | string[]>
    expect<number[] | string[]>([1, 2, 3]).matchEql([1, 2, 3]).and.to.eql([1, 2, 3]);
    // @ts-expect-error require <number[] | string[]>
    expect<number[] | string[]>([1, 2, 3]).not.matchEql([1, 2, 4]);

    expect([1, 2, 3])
      // @ts-expect-error require <number[]>
      .matchEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    expect([1, 2, 3])
      .not // @ts-expect-error require <number[]>
      .matchEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    expect<number[] | string[]>([1, 2, 3])
      .matchEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    expect<number[] | string[]>([1, 2, 3])
      .not.matchEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    expect([1, 2, 3] as unknown as string[])
      // @ts-expect-error require <string[]>
      .matchEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    expect([1, 2, 3] as unknown as string[])
      .not // @ts-expect-error require <string[]>
      .matchEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);
  });

  it('yieldValue', () => {
    const value = expect(5).to.matchEqual(5).yieldValue();
    const type = typeof value;
    expect(type).to.equal('number');
  });
});
