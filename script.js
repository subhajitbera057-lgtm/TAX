const qty = document.getElementById("qty");
const amountEl = document.getElementById("amount");
const totalEl = document.getElementById("total");
const cgstEl = document.getElementById("cgst");
const sgstEl = document.getElementById("sgst");
const grandEl = document.getElementById("grand");
const wordsEl = document.getElementById("words");

const RATE = 0.30;
const TAX = 0.14;

qty.addEventListener("input", () => {
    const q = Number(qty.value);

    if (q <= 0) {
        reset();
        return;
    }

    const amount = q * RATE;
    const cgst = amount * TAX;
    const sgst = amount * TAX;
    const grand = amount + cgst + sgst;

    amountEl.innerText = amount.toFixed(2);
    totalEl.innerText = amount.toFixed(2);
    cgstEl.innerText = cgst.toFixed(2);
    sgstEl.innerText = sgst.toFixed(2);
    grandEl.innerText = grand.toFixed(2);

    wordsEl.innerText = numberToWords(Math.floor(grand)) + " RUPEES";
});

function reset(){
    amountEl.innerText =
    totalEl.innerText =
    cgstEl.innerText =
    sgstEl.innerText =
    grandEl.innerText = "0.00";

    wordsEl.innerText = "ZERO RUPEES";
}

// CUSTOMER → ADDRESS
const customerSelect = document.getElementById("customerSelect");
const addressSelect = document.getElementById("addressSelect");

const map = {
    "TAPAN PAN STORES":"RAMRAJATALA HOWRAH",
    "REGULAR STORES":"SHIBPUR HOWRAH",
    "MANAS STORES":"SANTRAGACHI HOWRAH",
    "KAMAL PAN STORES":"BAKSARA BAZAR",
    "T CORNER":"RAMRAJATALA HOWRAH"
};

customerSelect.addEventListener("change", ()=>{
    addressSelect.innerHTML = `<option>${map[customerSelect.value] || ""}</option>`;
});

// NUMBER TO WORDS
function numberToWords(num){
    const a=["","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN",
    "ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN"];
    const b=["","","TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY"];

    if(num<20) return a[num];
    if(num<100) return b[Math.floor(num/10)]+" "+a[num%10];
    if(num<1000) return a[Math.floor(num/100)]+" HUNDRED "+numberToWords(num%100);
    if(num<100000) return numberToWords(Math.floor(num/1000))+" THOUSAND "+numberToWords(num%1000);
    if(num<10000000) return numberToWords(Math.floor(num/100000))+" LAKH "+numberToWords(num%100000);
    return numberToWords(Math.floor(num/10000000))+" CRORE";
}

// SAVE IMAGE
function saveAsImage(){
    html2canvas(document.getElementById("invoice"),{scale:2}).then(canvas=>{
        const link=document.createElement("a");
        link.download="invoice.jpg";
        link.href=canvas.toDataURL("image/jpeg",0.95);
        link.click();
    });
}

// PDF
function downloadPDF(){
    html2pdf().from(document.getElementById("invoice")).save("invoice.pdf");
}
const dateInput = document.getElementById("date");

dateInput.addEventListener("input", () => {
    let v = dateInput.value.replace(/\D/g, "").slice(0, 8);

    if (v.length >= 5)
        dateInput.value = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    else if (v.length >= 3)
        dateInput.value = `${v.slice(0,2)}/${v.slice(2)}`;
    else
        dateInput.value = v;
});
function saveAsImage(){
    const actions = document.querySelector(".actions");
    actions.style.display = "none";   // hide buttons

    html2canvas(document.getElementById("invoice"), { scale: 2 })
    .then(canvas => {
        const link = document.createElement("a");
        link.download = "invoice.jpg";
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.click();

        actions.style.display = "block"; // show buttons back
    });
}
