
document.addEventListener('DOMContentLoaded', function() {
    const purchaseBtn = document.getElementById('purchase-btn');
    const cashInput = document.getElementById('cash-input');
    const totalDisplay = document.getElementById('total-amount');
    const statusSpan = document.getElementById('status');
     const twentiesSpan = document.getElementById('twenty-amount');
      const tensSpan = document.getElementById('ten-amount');
       const fivesSpan = document.getElementById('five-amount');
        const onesSpan = document.getElementById('one-amount');
         const quartersSpan = document.getElementById('quarter-amount');
          const dimesSpan = document.getElementById('dime-amount');
           const penniesSpan = document.getElementById('penny-amount');
         const changePennies = document.getElementById('change-pennies');
        const changeNickels = document.getElementById('change-nickels');
        const changeDimes = document.getElementById('change-dimes');
        const changeQuarters = document.getElementById('change-quarters');
        const changeOnes = document.getElementById('change-ones');
          const changeFives = document.getElementById('change-fives');
          const changeTens = document.getElementById('change-tens');
           const changeTwenties = document.getElementById('change-twenties');
           const changeHundreds = document.getElementById('change-hundreds');
    let total = parseFloat(totalDisplay.innerText);

    let cashInDrawer = {
        'twenty':parseFloat(twentiesSpan.innerText),
        'ten':parseFloat(tensSpan.innerText),
        'five':parseFloat(fivesSpan.innerText),
        'one':parseFloat(onesSpan.innerText),
         'quarter':parseFloat(quartersSpan.innerText),
         'dime':parseFloat(dimesSpan.innerText),
        'penny':parseFloat(penniesSpan.innerText)

    };

       let changeInDrawer = {
            'pennies':parseFloat(changePennies.innerText),
            'nickels':parseFloat(changeNickels.innerText),
            'dimes':parseFloat(changeDimes.innerText),
           'quarters':parseFloat(changeQuarters.innerText),
            'ones':parseFloat(changeOnes.innerText),
            'fives':parseFloat(changeFives.innerText),
             'tens':parseFloat(changeTens.innerText),
           'twenties':parseFloat(changeTwenties.innerText),
            'hundreds':parseFloat(changeHundreds.innerText)
    };
    purchaseBtn.addEventListener('click', function() {
        const cashGiven = parseFloat(cashInput.value);
        if(isNaN(cashGiven)){
             alert("Please enter a valid amount");
            return;
        }
        if (cashGiven < total) {
            alert("Not enough cash given.");
            return;
        }
         if (cashGiven === total)
         {
             alert("Exact amount given. No change returned");
            return;
         }
        const change = cashGiven - total;

        let changeToGive = {};
         const denominations = {
                100: 'hundreds',
                20: 'twenties',
                10: 'tens',
                 5: 'fives',
                1: 'ones',
               0.25:'quarters',
               0.10:'dimes',
               0.05: 'nickels',
                0.01: 'pennies'
         }
          let remainingChange = change;

          for(const [value, key] of Object.entries(denominations))
          {
                if (remainingChange >= value && changeInDrawer[key] > 0)
              {
                    let number = Math.min(Math.floor(remainingChange / value), Math.floor(changeInDrawer[key]/value));
                   changeToGive[key]= (number * value);
                   remainingChange = (remainingChange- (number * value)).toFixed(2);

              }
          }

          if(parseFloat(remainingChange) > 0)
          {
              alert("Cannot give exact change, insufficient funds in cash drawer");
              return;
          }
           for (const key in changeToGive) {
            if (changeToGive.hasOwnProperty(key)) {
                changeInDrawer[key] -= parseFloat(changeToGive[key]);

            }
        }
      for(const [key, value] of Object.entries(cashInDrawer)){
            if (cashGiven >= parseFloat(value)){
                let number = Math.floor(cashGiven/value);
                cashInDrawer[key] =  cashInDrawer[key] + (number *value);
                cashGiven -= (number*value);
            }
        }
        statusSpan.innerText="CLOSED";
        twentiesSpan.innerText= cashInDrawer.twenty.toFixed(2);
         tensSpan.innerText =  cashInDrawer.ten.toFixed(2);
          fivesSpan.innerText =  cashInDrawer.five.toFixed(2);
           onesSpan.innerText =  cashInDrawer.one.toFixed(2);
            quartersSpan.innerText = cashInDrawer.quarter.toFixed(2);
           dimesSpan.innerText = cashInDrawer.dime.toFixed(2);
          penniesSpan.innerText =  cashInDrawer.penny.toFixed(2);
           changePennies.innerText = changeInDrawer.pennies.toFixed(2);
        changeNickels.innerText = changeInDrawer.nickels.toFixed(2);
        changeDimes.innerText = changeInDrawer.dimes.toFixed(2);
        changeQuarters.innerText = changeInDrawer.quarters.toFixed(2);
        changeOnes.innerText = changeInDrawer.ones.toFixed(2);
          changeFives.innerText = changeInDrawer.fives.toFixed(2);
          changeTens.innerText = changeInDrawer.tens.toFixed(2);
        changeTwenties.innerText = changeInDrawer.twenties.toFixed(2);
         changeHundreds.innerText = changeInDrawer.hundreds.toFixed(2);
          alert("Purchase Complete. Change is: $" + change);
           cashInput.value = "";
    });
});
