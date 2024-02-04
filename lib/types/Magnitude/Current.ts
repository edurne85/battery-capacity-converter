import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const CurrentUnit = {
    A: 'A',
} as const;
Object.freeze(CurrentUnit);

class Current extends Scalar<typeof CurrentUnit> {
    static #converter: Conversion<typeof CurrentUnit, Current>;
    constructor({ value, unit }: ScalarBuilder<typeof CurrentUnit>) {
        super({ value, unit });
    }

    static {
        Current.#converter = makeConversions<typeof CurrentUnit, Current>(
            {
                A: 1,
            },
            ({ value, unit }) =>
                new Current({ value, unit: unit as keyof typeof CurrentUnit }),
        );
    }

    convert(unit: keyof typeof CurrentUnit): Current {
        return Current.#converter(this, unit);
    }
}

export { CurrentUnit, Current };
