import { BaseScalar, Scalar, ScalarBuilder } from './Scalar';
import { KeyAsValueObject } from './helpers';

type Conversion<
    T extends KeyAsValueObject<keyof T & string>,
    R extends Scalar<T> = Scalar<T>,
> = (magnitude: BaseScalar<T>, to: keyof T) => R;

function makeConversions<
    T extends KeyAsValueObject<keyof T & string>,
    R extends Scalar<T> = Scalar<T>,
>(
    factors: {
        [keys in keyof T]: number;
    },
    constructor: ({ value, unit }: ScalarBuilder<T>) => R,
): Conversion<T, R> {
    return (magnitude: BaseScalar<T>, to: keyof T): R => {
        return constructor({
            value: (magnitude.value * factors[magnitude.unit]) / factors[to],
            unit: to,
        });
    };
}

function add<
    T extends KeyAsValueObject<keyof T & string>,
    R extends Scalar<T> = Scalar<T>,
>(
    conversion: Conversion<T, R>,
    unit: keyof T,
    ...magnitudes: BaseScalar<T>[]
): R {
    const value = magnitudes.reduce((sum, magnitude) => {
        const converted = conversion(magnitude, unit);
        return sum + converted.value;
    }, 0);
    return conversion(new BaseScalar({ value, unit }), unit);
}

export type { Conversion };
export { makeConversions, add };
