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

module.exports = {
    processBilledItems,
    calculateBill
}