let price = 19.8; // Example price, can be dynamic
let cid = [
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

document.getElementById('purchase-btn').addEventListener('click', () => {
    const cash = parseFloat(document.getElementById('cash').value);
    const changeDue = cash - price;
    const totalCID = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        document.getElementById('change-due').textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (totalCID < changeDue) {
        document.getElementById('change-due').textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    const currencyUnits = {
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

    let changeToGive = [];
    let remainingChange = changeDue;

    for (let i = cid.length - 1; i >= 0; i--) {
        const currencyName = cid[i][0];
        const currencyTotal = cid[i][1];
        const currencyValue = currencyUnits[currencyName];
        let currencyAmount = (currencyTotal / currencyValue).toFixed(2);
        let currencyToReturn = 0;

        while (remainingChange >= currencyValue && currencyAmount > 0) {
            remainingChange -= currencyValue;
            remainingChange = remainingChange.toFixed(2);
            currencyAmount--;
            currencyToReturn++;
        }

        if (currencyToReturn > 0) {
            changeToGive.push([currencyName, currencyToReturn * currencyValue]);
        }
    }

    if (remainingChange > 0) {
        document.getElementById('change-due').textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    if (totalCID == changeDue) {
        document.getElementById('change-due').textContent = "Status: CLOSED " + changeToGive.map(unit => `${unit[0]}: $${unit[1]}`).join(" ");
    } else {
        document.getElementById('change-due').textContent = "Status: OPEN " + changeToGive.map(unit => `${unit[0]}: $${unit[1]}`).join(" ");
    }
});