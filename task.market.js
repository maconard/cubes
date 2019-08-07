let taskMarket = module.exports;
taskMarket.run = function(spawns) {
    let spawn1 = spawns[0];
    let terminal = spawn1.room.terminal;
    
    //act on existing buy orders in the market, with our surplus
    if(terminal && Game.time % 20 == 0) {
        let amtToSell = 500;
        let maxEnergyCost = 2000;
        let reserveAmt = 20500;
        let minimumPrice = 0.9;
        for(let rss in terminal.store) {
            if(rss == RESOURCE_ENERGY) continue;
            if(terminal.store[RESOURCE_ENERGY] > maxEnergyCost && terminal.store[rss] > reserveAmt) {
                // console.log("Room: " + spawn1.room.name + ": checking market for " + rss);
                let orders = Game.market.getAllOrders(
                    (order) => (order.resourceType == rss &&
                                order.type == ORDER_BUY &&
                                Game.market.calcTransactionCost(amtToSell, spawn1.room.name, order.roomName) < maxEnergyCost))
                        .sort(function(a,b) { return b.price - a.price; }
                );
                if(orders.length > 0 && orders[0].price > minimumPrice) {
                    if(Game.market.deal(orders[0].id, amtToSell, spawn1.room.name) == OK) {
                        // Game.notify("Room: " + spawn1.room.name + ": Order to sell " + amtToSell + " of " + rss + " completed for " + orders[0].price * amtToSell + " credits (" + orders[0].price + "/ea).");
                        break;
                    }
                }
            }
        }
    }

    //equalize resources between rooms
    if(terminal && Game.time % 100 == 0) {
        
    }
};
taskMarket.name = "market";