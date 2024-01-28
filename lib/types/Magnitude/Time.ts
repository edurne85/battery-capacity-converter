import { Conversion, makeConversions } from './Conversion';
import { Scalar, ScalarBuilder } from './Scalar';

const TimeUnit = {
    s: 's',
    min: 'min', // ⚠️ may conflict with 'm' (mili-) prefix
    h: 'h', // ⚠️ may conflict with 'h' prefix. ⚠️ May be confused with 'H' (Henry, inductance) unit
    d: 'd', // ⚠️ may conflict with 'd' prefix
} as const;
Object.freeze(TimeUnit);

class Time extends Scalar<typeof TimeUnit> {
    static #converter: Conversion<typeof TimeUnit, Time>;
    constructor({ value, unit }: ScalarBuilder<typeof TimeUnit>) {
        super({ value, unit });
    }

    static {
        Time.#converter = makeConversions<typeof TimeUnit, Time>(
            {
                s: 1,
                min: 60,
                h: 3600,
                d: 86400,
            },
            ({ value, unit }) =>
                new Time({ value, unit: unit as keyof typeof TimeUnit }),
        );
    }

    convert(unit: keyof typeof TimeUnit): Time {
        return Time.#converter(this, unit);
    }
}

export { TimeUnit, Time };
