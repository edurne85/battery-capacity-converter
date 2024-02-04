import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const VoltageUnit = {
    V: 'V',
} as const;
Object.freeze(VoltageUnit);

class Voltage extends Scalar<typeof VoltageUnit> {
    static #converter: Conversion<typeof VoltageUnit, Voltage>;
    constructor({ value, unit }: ScalarBuilder<typeof VoltageUnit>) {
        super({ value, unit });
    }

    static {
        Voltage.#converter = makeConversions<typeof VoltageUnit, Voltage>(
            {
                V: 1,
            },
            ({ value, unit }) =>
                new Voltage({ value, unit: unit as keyof typeof VoltageUnit }),
        );
    }

    convert(unit: keyof typeof VoltageUnit): Voltage {
        return Voltage.#converter(this, unit);
    }
}

export { VoltageUnit, Voltage };
