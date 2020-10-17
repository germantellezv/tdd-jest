describe("First test", () => {
  describe("Suma", () => {
    it("Suma 2 números", () => {
      const suma = (a,b) => a+b;
      expect(suma(2,3)).toEqual(5)
    })
  })
})