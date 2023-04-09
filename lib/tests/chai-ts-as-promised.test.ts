import { expect, use } from 'chai';

import { ChaiTSAsPromised } from '../src/chai-ts-as-promised';

use(ChaiTSAsPromised);

describe('chai-ts-as-promised', () => {
  it('README', async () => {
    await expect(Promise.resolve(5)).to.eventually.be.narrowEqual(5);
    await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEqls([1, 2, 3]);

    await expect(Promise.resolve(5)).to.eventually.be.matchEq(5);
    await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEql([1, 2, 3]);

    const n: number = await expect(Promise.resolve(3 + 1))
      .to.eventually.be.equal(4)
      .yieldValue();
    expect(n).to.equal(4);
  });

  describe('JSDoc', () => {
    it('narrowEq', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.narrowEq(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEq(5);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEq(5);
    });

    it('narrowEqual', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.narrowEqual(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEqual(5);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEqual(5);
    });

    it('narrowEquals', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.narrowEquals(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.narrowEquals(5);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.narrowEquals(5);
    });

    it('narrowEql', async () => {
      await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEql([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3] as unknown[])).to.eventually.be.narrowEql([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.narrowEql([1, 2, 3]);
    });

    it('narrowEqls', async () => {
      await expect(Promise.resolve([1, 2, 3])).to.eventually.be.narrowEqls([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3] as unknown[])).to.eventually.be.narrowEqls([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.narrowEqls([1, 2, 3]);
    });

    it('narrowEqual', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.matchEq(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEq(5 as unknown);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEq<unknown>(5);
    });

    it('matchEqual', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.matchEqual(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEqual(5 as unknown);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEqual<unknown>(5);
    });

    it('matchEquals', async () => {
      await expect(Promise.resolve(5)).to.eventually.be.matchEquals(5);
      await expect(Promise.resolve(5) as unknown).to.eventually.be.matchEquals(5 as unknown);
      await expect(Promise.resolve(5) as Promise<unknown>).to.eventually.be.matchEquals<unknown>(5);
    });

    it('matchEql', async () => {
      await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEql([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEql([1, 2, 3] as unknown[]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEql<unknown[]>([1, 2, 3]);
    });

    it('matchEqls', async () => {
      await expect(Promise.resolve([1, 2, 3])).to.eventually.matchEqls([1, 2, 3]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEqls([1, 2, 3] as unknown[]);
      await expect(Promise.resolve([1, 2, 3]) as Promise<unknown[]>).to.eventually.be.matchEqls<unknown[]>([1, 2, 3]);
    });

    it('yieldValue', async () => {
      const a: unknown = await expect(Promise.resolve(5)).to.eventually.be.equal(5).yieldValue();
      expect(a).to.equal(5);
    });

    it('typed yieldValue', async () => {
      const a: number = await expect(Promise.resolve(5)).to.eventually.be.equal(5).yieldValue();
      expect(a).to.equal(5);
    });
  });

  it('narrowEqual', async () => {
    await expect(Promise.resolve(5)).to.eventually.equal(5);

    await expect(Promise.resolve(5)).to.eventually.narrowEqual(5).and.to.equal(5);
    await expect(Promise.resolve(5)).eventually.not.narrowEqual(4).and.to.equal(4);

    await expect<Promise<string | number>>(Promise.resolve(5)).eventually.narrowEqual(5).and.to.equal(5);
    await expect<Promise<string | number>>(Promise.resolve(5)).eventually.to.not.narrowEqual(4).and.to.equal(4);

    await expect(Promise.resolve(5))
      .eventually // @ts-expect-error should require <number>
      .narrowEqual(5 as string | number)
      .and.to.equal(5);
    await expect(Promise.resolve(5))
      .eventually.to.not // @ts-expect-error should require <number>
      .narrowEqual(4 as string | number)
      .and.to.equal(4);

    await expect<Promise<string | number>>(Promise.resolve(5))
      .eventually.narrowEqual(5 as string | number)
      .and.to.equal(5);
    await expect<Promise<string | number>>(Promise.resolve(5))
      .eventually.not.narrowEqual(4 as string | number)
      .and.to.equal(4);

    await expect(Promise.resolve(5) as unknown as Promise<string>)
      .to.eventually // @ts-expect-error should require <string>
      .narrowEqual(5)
      .and.to.equal(5);
    await expect(Promise.resolve(5) as unknown as Promise<string>)
      .eventually.not // @ts-expect-error should require <string>
      .narrowEqual(4)
      .and.to.equal(4);
  });

  it('matchEqual', async () => {
    await expect(Promise.resolve(5)).eventually.matchEqual(5).and.to.equal(5);
    await expect(Promise.resolve(5)).eventually.not.matchEqual(4).and.to.equal(4);

    // @ts-expect-error should require <string | number>
    await expect<Promise<string | number>>(Promise.resolve(5)).eventually.to.matchEqual(5).and.to.equal(5);
    // @ts-expect-error should require <string | number>
    await expect<Promise<string | number>>(Promise.resolve(5)).eventually.to.not.matchEqual(4).and.to.equal(4);

    await expect(Promise.resolve(5))
      .to.eventually // @ts-expect-error should require <number>
      .matchEqual(5 as string | number)
      .and.to.equal(5);
    await expect(Promise.resolve(5))
      .eventually.not.to // @ts-expect-error should require <number>
      .matchEqual(4 as string | number)
      .and.to.equal(4);

    await expect<Promise<string | number>>(Promise.resolve(5))
      .eventually.matchEqual(5 as string | number)
      .and.to.equal(5);
    await expect<Promise<string | number>>(Promise.resolve(5))
      .eventually.not.matchEqual(4 as string | number)
      .and.to.equal(4);

    await expect(Promise.resolve(5) as unknown as Promise<string>)
      .eventually.to.be // @ts-expect-error should require <string>
      .matchEqual(5)
      .and.to.equal(5);
    await expect(Promise.resolve(5) as unknown as Promise<string>)
      .eventually.not // @ts-expect-error should require <string>
      .matchEqual(4)
      .and.to.equal(4);
  });

  it('narrowEql', async () => {
    await expect(Promise.resolve([1, 2, 3]))
      .eventually.narrowEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3]))
      .eventually.not.narrowEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);

    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.narrowEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.not.narrowEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);

    await expect(Promise.resolve([1, 2, 3]))
      .eventually // @ts-expect-error should require <number[]>
      .narrowEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3]))
      .eventually.not // @ts-expect-error should require <number[]>
      .narrowEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.narrowEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.not.narrowEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    await expect(Promise.resolve([1, 2, 3]) as unknown as Promise<string[]>)
      .eventually // @ts-expect-error should require <string[]>
      .narrowEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3]) as unknown as Promise<string[]>)
      .eventually.not // @ts-expect-error should require <string[]>
      .narrowEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);
  });

  it('matchEql', async () => {
    await expect(Promise.resolve([1, 2, 3]))
      .eventually.matchEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3])).eventually.not.matchEql([1, 2, 4]);

    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      // @ts-expect-error should require <number[] | string[]>
      .eventually.matchEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    // @ts-expect-error should require <number[] | string[]>
    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3])).eventually.not.matchEql([1, 2, 4]);

    await expect(Promise.resolve([1, 2, 3]))
      .eventually // @ts-expect-error should require <number[]>
      .matchEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3]))
      .eventually.not // @ts-expect-error should require <number[]>
      .matchEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.matchEql([1, 2, 3] as number[] | string[])
      .and.to.eql([1, 2, 3]);
    await expect<Promise<number[] | string[]>>(Promise.resolve([1, 2, 3]))
      .eventually.not.matchEql([1, 2, 4] as number[] | string[])
      .and.to.eql([1, 2, 4]);

    await expect(Promise.resolve([1, 2, 3]) as unknown as Promise<string[]>)
      .eventually // @ts-expect-error should require <string[]>
      .matchEql([1, 2, 3])
      .and.to.eql([1, 2, 3]);
    await expect(Promise.resolve([1, 2, 3]) as unknown as Promise<string[]>)
      .eventually.not // @ts-expect-error should require <string[]>
      .matchEql([1, 2, 4])
      .and.to.eql([1, 2, 4]);
  });

  describe('yieldValue', () => {
    it('sync', async () => {
      const value = expect({ a: 5 }).to.be.matchEql({ a: 5 }).yieldValue();
      expect(value.a).to.equal(5);
    });

    it('async', async () => {
      const value = await expect(Promise.resolve({ a: 5 }))
        .to.eventually.be.matchEql({ a: 5 })
        .yieldValue();
      expect(value.a).to.equal(5);
    });
  });
});
