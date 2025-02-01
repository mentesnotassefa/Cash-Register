document.getElementById('purchase-btn').addEventListener('click', function() {
    const price = 19.5; // You can change the price as needed
    const cash = parseFloat(document.getElementById('cash').value);
    const changeDueElement = document.getElementById('change-due');
    const cid = [
        ["PENNY", 0.5],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
    ];

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
    } else {
        let change = cash - price;
        let changeOutput = "Status: ";
        let status = "OPEN";
        let changeArr = [];

        const currencyUnit = {
            "PENNY": 0.01,
            "NICKEL": 0.05,
            "DIME": 0.1,
            "QUARTER": 0.25,
            "ONE": 1,
            "FIVE": 5,
            "TEN": 10,
            "TWENTY": 20,
            "ONE HUNDRED": 100
        };

        cid.forEach(currency => {
            let unit = currency[0];
            let amount = currency[1];
            let unitValue = currencyUnit[unit];
            let changeAmount = 0;

            while (change >= unitValue && amount > 0) {
                changeAmount += unitValue;
                change -= unitValue;
                change = Math.round(change * 100) / 100;
                amount -= unitValue;
            }

            if (changeAmount > 0) {
                changeArr.push([unit, changeAmount]);
            }
        });

        if (change > 0) {
            status = "INSUFFICIENT_FUNDS";
        } else if (cid.every(currency => currency[1] === 0)) {
            status = "CLOSED";
        }

        changeOutput += status;
        changeArr.forEach(changeItem => {
            changeOutput += ` ${changeItem[0]}: $${changeItem[1].toFixed(2)}`;
        });

        changeDueElement.textContent = changeOutput;
    }
});
