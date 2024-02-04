import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const EnergyUnit = {
    J: 'J',
    Wh: 'Wh',
} as const;

class Energy extends Scalar<typeof EnergyUnit> {
    static #converter: Conversion<typeof EnergyUnit, Energy>;
    constructor({ value, unit }: ScalarBuilder<typeof EnergyUnit>) {
        super({ value, unit });
    }

    static {
        Energy.#converter = makeConversions<typeof EnergyUnit, Energy>(
            {
                J: 1,
                Wh: 3600,
            },
            ({ value, unit }) =>
                new Energy({ value, unit: unit as keyof typeof EnergyUnit }),
        );
    }

    convert(unit: keyof typeof EnergyUnit): Energy {
        return Energy.#converter(this, unit);
    }
}

export { EnergyUnit, Energy };
