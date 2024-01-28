import {
    PrefixSpec,
    UnitPrefixes,
    bestPrefixByValue,
    prefixMatchers,
} from './UnitPrefix';
import { Parser } from './helpers';

const scalarMatcher = new RegExp(
    `^([+-]?[0-9]+(?:\\.[0-9]*)?(?:[eE][+-]?[0-9]+)?)\\s*${prefixMatchers.capturingOptional}(\p{L}*)$`,
    'gu',
);

const defaultPrecision = 3;

interface ScalarBuilder<T> {
    value: number;
    unit: T;
}

class BaseScalar<T> {
    #value: number;
    #unit: T;
    constructor({ value, unit }: ScalarBuilder<T>) {
        this.#value = value;
        this.#unit = unit;
    }

    get value() {
        return this.#value;
    }

    get unit() {
        return this.#unit;
    }

    toRawString(): string {
        return `${this.#value} ${this.#unit}`;
    }

    toPrefixedString(digits: number, prefix?: PrefixSpec): string {
        prefix ??= bestPrefixByValue(this.#value);
        const value = this.#value / Math.pow(10, prefix.exp);
        return `${value.toFixed(digits)} ${prefix.symbol}${this.#unit}`;
    }

    toString(): string {
        return this.toPrefixedString(defaultPrecision);
    }

    static parse<T>(input: string, unitParser: Parser<T>): BaseScalar<T> {
        const match = input.match(scalarMatcher);

        if (match) {
            const [, givenValue, prefix, unit] = match;
            const value =
                parseFloat(givenValue) *
                Math.pow(10, UnitPrefixes[prefix]?.exp ?? 0);
            return new BaseScalar({ value, unit: unitParser(unit) });
        } else {
            throw new Error('Invalid scalar');
        }
    }

    static tryParse<T>(
        input: string,
        unitParser: (unit: string) => T,
    ): BaseScalar<T> | undefined {
        try {
            return BaseScalar.parse(input, unitParser);
        } catch {
            return undefined;
        }
    }
}

abstract class Scalar<T> extends BaseScalar<T> {
    abstract convert(to: T): Scalar<T>;
}

export type { ScalarBuilder };
export { BaseScalar, Scalar };
