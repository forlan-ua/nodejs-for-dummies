describe("Foo is equal to 1", () => {
    var foo = 1;

    it("in the first test case", () => {
        expect(foo).toEqual(1);
        foo++;
    });

    it("in the second test case", () => {
        expect(foo).toEqual(2);
        foo++;
    });

    it("and fail on other result", () => {
        expect(foo).toEqual(3);
    });
});

describe("Foo is equal to 1", () => {
    var foo = 1;

    beforeEach(function() {
        foo = 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("in the first test case", () => {
        expect(foo).toEqual(1);
        foo++;
    });

    it("in the second test case", () => {
        expect(foo).toEqual(1);
        foo++;
    });

    it("and fail on other result", () => {
        expect(foo).toBeGreaterThan(1);
    });
});