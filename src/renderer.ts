import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from '@components/App';

import { Time, TimeUnit } from '@model/Magnitude/Time';
import { Current, CurrentUnit } from '@model/Magnitude/Current';
import { multiplyChargeVoltage } from '@model/Magnitude/Operations/Energy';
import { unitParser } from '@model/Magnitude/helpers';
import { Charge, ChargeUnit } from '@model/Magnitude/Charge';
import { Voltage, VoltageUnit } from '@model/Magnitude/Voltage';
import { UnitPrefixes } from '@model/Magnitude/UnitPrefix';

try {
    const ratings = {
        voltage: '3.7V',
        charge: '20000mAh',
        description: 'Li-ion power bank',
    };
    console.log(
        '10000 micro seconds: ',
        Time.parse('10000µs', unitParser(TimeUnit)).toPrefixedString(1),
    );
    console.log(
        '10000 miliAmperes: ',
        Current.parse('10000mA', unitParser(CurrentUnit)).toPrefixedString(1),
    );
    const parsed = {
        voltage: new Voltage(Voltage.parse(ratings.voltage, unitParser(VoltageUnit))),
        charge: new Charge(Charge.parse(ratings.charge, unitParser(ChargeUnit))),
    };
    console.log('Intermediate values:', parsed);
    const energyJ = multiplyChargeVoltage(parsed.charge, parsed.voltage);
    const energyJString = energyJ.toPrefixedString(1);
    const energykWh = energyJ.convert('Wh').toPrefixedString(3, UnitPrefixes.k);
    console.log(
        `${ratings.description} rated at ${ratings.voltage} ${ratings.charge}: ${energyJString} (${energykWh})`,
    );
} catch (e) {
    console.error(e);
}

const root = document.createElement('div');
document.title = 'Hello World!';
document.body.appendChild(root);
createRoot(root).render(App({}));
