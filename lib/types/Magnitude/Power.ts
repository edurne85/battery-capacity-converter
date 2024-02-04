import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const PowerUnit = {
    W: 'W',
} as const;

class Power extends Scalar<typeof PowerUnit> {
    static #converter: Conversion<typeof PowerUnit, Power>;
    constructor({ value, unit }: ScalarBuilder<typeof PowerUnit>) {
        super({ value, unit });
    }

    static {
        Power.#converter = makeConversions<typeof PowerUnit, Power>(
            {
                W: 1,
            },
            ({ value, unit }) =>
                new Power({ value, unit: unit as keyof typeof PowerUnit }),
        );
    }

    convert(unit: keyof typeof PowerUnit): Power {
        return Power.#converter(this, unit);
    }
}

export { PowerUnit, Power };
