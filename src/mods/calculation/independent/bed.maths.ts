import * as maths from 'mathjs';

export class BedMaths {
    public static crossSectionalArea(diameter: maths.Unit | string): maths.Unit {
        return maths.unit(maths.evaluate(`pi * (${diameter.toString()})^2 / 4`));
    }

    public static volume(length: maths.Unit | string, diameter: maths.Unit | string): maths.Unit {
        const area = BedMaths.crossSectionalArea(diameter).toString();
        return maths.unit(maths.evaluate(`(${area}) * ${length}`));
    }

    public static density(
        mass: maths.Unit | string,
        length: maths.Unit | string,
        diameter: maths.Unit | string
    ): maths.Unit {
        const volume = BedMaths.volume(length, diameter).toString();
        const m = mass.toString();
        return maths.unit(maths.evaluate(`(${m})/(${volume})`));
    }
}
