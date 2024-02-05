import { Charge, ChargeUnit } from '../Charge';
import { Current, CurrentUnit } from '../Current';
import { Time, TimeUnit } from '../Time';

import { Multiplier } from './base.multiply';

const multiplyCurrentTime: Multiplier<
    typeof CurrentUnit,
    typeof TimeUnit,
    typeof ChargeUnit,
    Charge
> = (current: Current, time: Time): Charge => {
    const amperes = current.convert(CurrentUnit.A).value;
    const seconds = time.convert(TimeUnit.s).value;
    return new Charge({ value: amperes * seconds, unit: ChargeUnit.C });
};

const multiplyTimeCurrent: Multiplier<
    typeof TimeUnit,
    typeof CurrentUnit,
    typeof ChargeUnit,
    Charge
> = (time: Time, current: Current): Charge => {
    return multiplyCurrentTime(current, time);
};

export { multiplyCurrentTime, multiplyTimeCurrent };
