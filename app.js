const BASE_URL = "https://api.exchangerate-api.com/v4/latest/"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// inserting countryList into options
for(var drops of dropdowns)
    {
        for(let code in countryList)
            {
                let opt = document.createElement("option");
                opt.innerText = code;
                opt.value = code;

                // set default country
                if(code==="USD" && drops.name==="from")
                    {
                        opt.selected = "selected";
                    }
                    
                if(code==="INR" && drops.name==="to")
                    {
                        opt.selected = "selected";
                    }
                        
                drops.append(opt);
            }
        
        // updating flag on select new country
        drops.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        });
    }


// updating flag
function updateFlag(element){
    let countryCode = countryList[element.value];
    let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flag;
    element.setAttribute("id",)
}


btn.addEventListener("click",async (evt)=>{

    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval==="" || amtval<=0)
        {
            amount.value = "1";
            amtval = 1;
        }
    const apiLink = `${BASE_URL}${from.value}`;
    let response = await fetch(apiLink);
    let data = await response.json();
    
    let toCurr = data.rates[to.value];

    let exchangAmount = amtval*toCurr;
    msg.innerText = `${amtval} ${from.value} = ${exchangAmount} ${to.value}`;
});

