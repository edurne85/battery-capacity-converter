import {
    PrefixSpec,
    UnitPrefixes,
    bestPrefixByValue,
    prefixMatchers,
} from './UnitPrefix';
import { KeyAsValueObject, Parser } from './helpers';

const scalarMatcher = new RegExp(
    `^([+-]?[0-9]+(?:\\.[0-9]*)?(?:[eE][+-]?[0-9]+)?)\\s*${prefixMatchers.capturingOptional}(\\p{L}*)$`,
    'u',
);

const defaultPrecision = 3;

interface ScalarBuilder<T extends KeyAsValueObject<keyof T & string>> {
    value: number;
    unit: keyof T;
}

class BaseScalar<T extends KeyAsValueObject<keyof T & string>> {
    #value: number;
    #unit: keyof T;
    constructor({ value, unit }: ScalarBuilder<T>) {
        this.#value = value;
        this.#unit = unit;
    }

    get value(): number {
        return this.#value;
    }

    get unit(): keyof T {
        return this.#unit;
    }

    toRawString(): string {
        return `${this.#value} ${String(this.#unit)}`;
    }

    toPrefixedString(digits: number, prefix?: PrefixSpec): string {
        prefix ??= bestPrefixByValue(this.#value);
        const value = this.#value / Math.pow(10, prefix.exp);
        return `${value.toFixed(digits)} ${prefix.symbol}${String(this.#unit)}`;
    }

    toString(): string {
        return this.toPrefixedString(defaultPrecision);
    }

    static parse<T extends KeyAsValueObject<keyof T & string>>(
        input: string,
        unitParser: Parser<keyof T>,
    ): BaseScalar<T> {
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

    static tryParse<T extends KeyAsValueObject<keyof T & string>>(
        input: string,
        unitParser: Parser<keyof T>,
    ): BaseScalar<T> | undefined {
        try {
            return BaseScalar.parse(input, unitParser);
        } catch {
            return undefined;
        }
    }
}

abstract class Scalar<
    T extends KeyAsValueObject<keyof T & string>,
> extends BaseScalar<T> {
    abstract convert(to: keyof T): Scalar<T>;
}

export type { ScalarBuilder };
export { BaseScalar, Scalar };
