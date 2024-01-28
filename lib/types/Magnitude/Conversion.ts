import { BaseScalar, Scalar, ScalarBuilder } from './Scalar';

type Conversion<T> = (magnitude: BaseScalar<T>, to: T) => Scalar<T>;

function makeConversions<T extends string>(
    conversions: {
        [keys in T]: number;
    },
    constructor: ({ value, unit }: ScalarBuilder<T>) => Scalar<T>,
): Conversion<T> {
    return (magnitude: BaseScalar<T>, to: T): Scalar<T> => {
        return constructor({
            value:
                (magnitude.value * conversions[magnitude.unit]) /
                conversions[to],
            unit: to,
        });
    };
}

function add<T extends string>(
    unit: T,
    conversion: Conversion<T>,
    ...magnitudes: BaseScalar<T>[]
): Scalar<T> {
    const value = magnitudes.reduce((sum, magnitude) => {
        const converted = conversion(magnitude, unit);
        return sum + converted.value;
    }, 0);
    return conversion(new BaseScalar({ value, unit }), unit);
}

export type { Conversion };
export { makeConversions, add };
