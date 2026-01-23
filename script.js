

// CALCULATION
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
    if(!q){ reset(); return; }

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
    grandEl.innerText = "0";
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
    addressSelect.value = map[customerSelect.value] || "";
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

// SAVE AS IMAGE
function saveAsImage(){
    html2canvas(document.getElementById("invoice"), {scale:2}).then(canvas=>{
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
const date = document.querySelector("#date");
const out = document.querySelector("#out");

