const { processBilledItems, calculateBill } = require("./main");

// Testing the process billed items function
test("processes the array of billed items into a object with the name and qty of SKUs purchased as key value pairs", () => {
  expect(
    processBilledItems([
      { name: "A99", qty: 5 },
      { name: "C40", qty: 5 },
      { name: "A99", qty: 2 },
    ])
  ).toEqual({
    A99: 7,
    C40: 5,
  });
});

// Testing the calculate bill function
test("calculate the total amount of the bill after applying available offers", () => {
  expect(
    calculateBill(
      [
        { name: "A99", qty: 5 },
        { name: "C40", qty: 5 },
        { name: "A99", qty: 2 },
      ],
      { A99: 50, B15: 30, C40: 60, T34: 99 },
      {
        A99: { required_qty: 3, discount: 20 },
        B15: { required_qty: 2, discount: 15 },
      }
    )
  ).toBe(610);
});
