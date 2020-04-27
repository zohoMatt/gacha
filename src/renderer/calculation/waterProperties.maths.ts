export class Water {
    /**
     * @param temperature   [atm]
     * @param pressure      [℃]
     * @return              [g/cm³]
     */
    public static density(temperature: number, pressure: number): number {
        return 1.0;
    }

    /**
     * @param temperature   [atm]
     * @param pressure      [℃]
     * @return              [g/cm·s]
     */
    public static viscosity(temperature: number, pressure: number): number {
        return 1.0;
    }
}
