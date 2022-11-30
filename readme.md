# Technical Assessment


## Super market checkout
To apprach the problem I have taken the following steps:

```
// Use json objects to store the SKU and unit price as key value pairs
var prices = { A99: 50, B15: 30, C40: 60, T34: 99 }
```

```
// Use json objects to store the SKU and offer as key value pairs
purchased
// discount is the price subtracted when a SKU of a given qty is purchased
var offers = {
    "A99": {required_qty: 3, discount: 20}, 
    "B15": {required_qty: 2, discount: 15}
}
```

I am using two functions to calculate the bill amount, `processBilledItems` and `calculateBill`

## processBilledItems
This function takes in a array objects, like:
```
var billed_items = [{name: "A99", qty: 5}, {name: "C40", qty: 5}, {name: "A99", qty: 2}]
```

It return an object order which contains the name and qty of SKUs purchased as:
```
{
    "A99": 7,
    "C40": 5
}
```

This solves the problem:
>The checkout accepts the items in any order, so that if we scan a pack of Biscuits, an apple and another pack of biscuits, we’ll recognise two packs of biscuits and apply the discount of 2 for 45.

## calculateBill
This function takes in the billedItems, the prices and the offers on SKUs.<br><br>
It first converts the billedItems into a order object.<br><br>
The function then checks if SKU has an offer:<br><br>
If the SKU has an offer it calculates the total amount and subtracts the discount<br><br>
If not, then it add the price to the total by multiplying the qty by price.
