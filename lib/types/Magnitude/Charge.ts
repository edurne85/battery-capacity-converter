import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const ChargeUnit = {
    C: 'C',
    As: 'As',
    Ah: 'Ah',
} as const;
Object.freeze(ChargeUnit);

class Charge extends Scalar<typeof ChargeUnit> {
    static #converter: Conversion<typeof ChargeUnit, Charge>;
    constructor({ value, unit }: ScalarBuilder<typeof ChargeUnit>) {
        super({ value, unit });
    }

    static {
        Charge.#converter = makeConversions<typeof ChargeUnit, Charge>(
            {
                C: 1,
                As: 1,
                Ah: 3600,
            },
            ({ value, unit }) =>
                new Charge({ value, unit: unit as keyof typeof ChargeUnit }),
        );
    }

    convert(unit: keyof typeof ChargeUnit): Charge {
        return Charge.#converter(this, unit);
    }
}

export { ChargeUnit, Charge };
