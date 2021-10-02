const versionFinder = require('../src/appUtil/versionFinder');

describe('versionFinder unit tests', () => {

    it('handles invalid input', () => {
        expect(versionFinder(1)).toEqual(0);
        expect(versionFinder({})).toEqual(0);
        expect(versionFinder({ devDependencies: { electron: 13 } })).toEqual(0);
    });

    it('parses the version string and returns the correct number', () => {
        expect(versionFinder({ devDependencies: { electron: "13.1.9" } })).toEqual(13.1);
        expect(versionFinder({ devDependencies: { electron: "^13.1.9" } })).toEqual(13.1);
        expect(versionFinder({ devDependencies: { electron: "^10.2.0" } })).toEqual(10.2);
    });
});