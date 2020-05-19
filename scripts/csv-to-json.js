const fs = require('fs-extra');
const path = require('path');

const parseContaminantsCsv = () => {
    const target = process.argv[2];
    const data = fs.readFileSync(path.resolve(__dirname, target), 'utf-8');
    const lines = data.split('\n');
    const dataset = [];
    for (const line of lines.slice(2)) {
        const vals = line.trim().split('\t');
        dataset.push({
            key: vals[0],
            name: vals[0],
            description: '',
            params: {
                fullName: vals[1],
                molecularWeight: {
                    value: +vals[3],
                    unit: 'mg/mmol'
                },
                molarVolume: {
                    value: +vals[4],
                    unit: 'mL/gmol'
                },
                boilingPt: {
                    value: +vals[5],
                    unit: 'degC'
                },
                liquidDensity: {
                    value: +vals[6],
                    unit: 'g/mL'
                },
                solubility: {
                    value: +vals[7],
                    unit: 'mg/L'
                },
                vaporPressure: {
                    value: +vals[8],
                    unit: 'Pa'
                },
                refractive: {
                    value: +vals[9],
                    unit: ''
                },
                cas: vals[2]
            }
        });
    }
    return dataset;
};

const printResult = data => {
    fs.writeFileSync(path.resolve(__dirname, './output/contaminants.json'),
        JSON.stringify(data),
        { encoding: 'utf-8' }
    );
};

printResult(parseContaminantsCsv());

