import { Charge, ChargeUnit } from '../Charge';
import { Energy, EnergyUnit } from '../Energy';
import { Power, PowerUnit } from '../Power';
import { Time, TimeUnit } from '../Time';
import { Voltage, VoltageUnit } from '../Voltage';

import { Multiplier } from './base.multiply';

const multiplyPowerTime: Multiplier<
    typeof PowerUnit,
    typeof TimeUnit,
    typeof EnergyUnit,
    Energy
> = (power: Power, time: Time): Energy => {
    const watts = power.convert(PowerUnit.W).value;
    const seconds = time.convert(TimeUnit.s).value;
    return new Energy({ value: watts * seconds, unit: EnergyUnit.J });
};

const multiplyTimePower: Multiplier<
    typeof TimeUnit,
    typeof PowerUnit,
    typeof EnergyUnit,
    Energy
> = (time: Time, power: Power): Energy => {
    return multiplyPowerTime(power, time);
};

const multiplyVoltageCharge: Multiplier<
    typeof VoltageUnit,
    typeof ChargeUnit,
    typeof EnergyUnit,
    Energy
> = (voltage: Voltage, charge: Charge): Energy => {
    const volts = voltage.convert(VoltageUnit.V).value;
    const coulombs = charge.convert(ChargeUnit.C).value;
    return new Energy({ value: volts * coulombs, unit: EnergyUnit.J });
};

const multiplyChargeVoltage: Multiplier<
    typeof ChargeUnit,
    typeof VoltageUnit,
    typeof EnergyUnit,
    Energy
> = (charge: Charge, voltage: Voltage): Energy => {
    return multiplyVoltageCharge(voltage, charge);
};

export {
    multiplyChargeVoltage,
    multiplyPowerTime,
    multiplyTimePower,
    multiplyVoltageCharge,
};
