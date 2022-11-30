// Implement the code for a supermarket checkout that calculates the total price of a number of items. Goods are priced individually, however there are weekly special offers for when multiple items are bought. For example “Apples are 50 each or 3 for 130”. 
// Weekly offers change frequently.
// SKU (Stock Keeping Unit)    Unit Price  Special Offer
// A99                         50          3 for 130
// B15                         30          2 for 45
// C40                         60
// T34                         99
// The checkout accepts the items in any order, so that if we scan a pack of Biscuits, an apple and another pack of biscuits, we'll recognise two packs of biscuits and apply the discount of 2 for 45.

var offers = {
    "A99": {required_qty: 3, discount: 20},
    "B15": {required_qty: 2, discount: 15}
}

var prices = { A99: 50, B15: 30, C40: 60, T34: 99 }

var billed_items = [{name: "A99", qty: 5}, {name: "C40", qty: 5}, {name: "A99", qty: 2}]

const processBilledItems = (billed_items) => {
    /**
     * Processes the billed objects into a JSON object.
     * @param {Object[]} billed_items - An array of JSON objects, which contain the name and qty of each product purchased.
     * @return {Object} - Returns a JSON object which has the product name as key and qty as value
     */
    let order = {};

    // loops through each element of the array and adds its qty to the order
    // creates a new items if the product is already in the order
    billed_items.forEach(item => {
        if (item.name in order) 
            order[item.name] += item.qty;
        else
            order[item.name] = item.qty;        
    });

    return {...order};
}

const calculateBill = (billed_items, prices, offers) => {
    /**
     * Calculate the total bill amount of the products purchased
     * @param {Object[]} billed_items - An array of JSON objects, which contain the name and qty of each product purchased.
     * @param {Object} prices - An object containing the prices for the different SKUs.
     * @param {Object} offers - An object containing the current offers for a product.
     * @return {number} - Returns the amount to be paid by a customer.
    */

    let total = 0;
    let order = processBilledItems(billed_items); // itemName: qty

    for (const item in order){
        // fetching the qty of the product purchased
        var purchasedQty = order[item];

        // checking if the offer exists on the product
        if (item in offers){
            
            // fetching the offer of the product
            var productOffer = offers[item];
            
            // calculating the discount based on the qty purchased
            var discount = (Math.floor(purchasedQty / productOffer.required_qty) * productOffer.discount);

            total += prices[item] * purchasedQty - discount; // calculating total for the products with an offer

        }else{
            total += prices[item] * purchasedQty; // calculating total for the products with no offers
        }
    }

    return total;
}

console.log(calculateBill(billed_items, prices, offers));