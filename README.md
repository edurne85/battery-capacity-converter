# battery-capacity-converter

A convenient applet to convert between different capacity descriptions

## Synopsis

Energy storage capacity for most batteries in the consumer market is described in missleading terms, using non-standard units to make values difficult to compare and to understand. These are some of the most outrageous issues with the `mAh` notation found so commonly in these batteries:

-   It's not a unit of energy. `mAh` describes amount of current over a period of time. The amount of energy needed to sustain such throughput (ie, the real capacity of the battery) depends on the voltage at which that current is maintained. At higher voltages, the same `mAh` value represents larger amounts of energy (or larger capacities). As an exmaple, a "9V" 600 mAh battery (not real 9V, but that's a separate issue) holds over 3 times the amount of energy of a 1100 mAh AAA battery, despite the value shown for the smaller one is almost double (this example is taken from real batteries, from the same brand and range).
    -   Making this even worse, the voltage at which the capacity is given doesn't always match the voltage that is provided, making the value even more missleading. This is most often seen on USB power banks, which deliver 5V (some even 12V), but have their capacities described in terms of their internal 3.6V - 3.7V batteries.
-   Current drawn by a device or circuit is rarely constant, and depends on the circuitry rather than the battery. While it can be argued that amount of charge is a physical value of a battery, for the end user it is a useless value at best. It would make sense somewhere deep in a datasheet, but not as the primary advertised value of the product.
    -   Even if there is a genuine interest to describe actual electric charge, there exists a standard unit (the _Coulomb_, or `C`) for it, instead of combining the current unit (`A`) with arbitrary time units (why hours rather than the standard seconds? Perhaps because 1 `As` is actually, by definition, 1 `C`, and at that point it would be too obvious that the units being used are intentionally convoluted).
-   The abuse of the `m` preffix is outrageous. Seeing batteries or power banks with capacities listed as "5000 mAh" or "20000 mAh" is the first sign that the manufacturer or advertiser is blatantly attempting to misslead the user. This notation literally means "thousands of thousanths", which is bogus wording with the sole purpose of adding the "thousands" word to the number without blatantly lying.

While the maths needed to make sense of all this are not too complex (at least once a user has a grasp of what each unit means), they are inconvenient to apply by hand. The goal of this project is to provide a single, convenient source for all these conversions; in the hopes of making it more useful for end users to compare and/or understand the products they have access to.

## Project structure

The project will be initially split into two distinct parts: a module dealing with all the logic of parsing and converting values (in plain, platform-agnostic TypeScript), and a frontend based on Electron and React. Eventually, the module should be made available on its own, so other frontends can be developed on top of it.

The main features the module should have are as follow:

-   Parse capacity and power values in as many notations as reasonably feasible, aiming to support at least the common notations used by commercial Nimh and Li-ion batteries and some variations (ie: supporting `mah` as an equivalent of `mAh`, flexibility with whitespace, etc).
-   Convert values to both standard and commercially common units of both capacity and energy (including, but not limited to, `mAh`, `Ah` and `C` for capacities, `J`, `cal`, and `Wh` for energy).
-   Compute charge cost estimations for given charger efficiency values and average power pricings.

The target features for the frontend will be:

-   Describe a battery or similar product by introducing the values printed on it.
-   Display converted values for each described product.
-   Save common setups and easily retrieve them back.
-   Export saved data to portable files (probably JSON-based) and import them easily.

## Contribution

At the moment, this project is not directly open to external contributions. Given the open licensing, you can always fork the repository and do whatever you want in your fork. I plan to open things up once the core features are implemented.
