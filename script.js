// Auto date
document.getElementById("invoiceDate").value =
    new Date().toISOString().split("T")[0];

// INVOICE CALCULATION
const qty = document.getElementById("qty");
const amountEl = document.getElementById("amount");
const totalEl = document.getElementById("total");
const cgstEl = document.getElementById("cgst");
const sgstEl = document.getElementById("sgst");
const grandEl = document.getElementById("grand");
const wordsEl = document.getElementById("words");

const RATE = 0.30;
const TAX = 0.14;

qty.addEventListener("input", calculate);

function calculate(){
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
}

function reset(){
    amountEl.innerText =
    totalEl.innerText =
    cgstEl.innerText =
    sgstEl.innerText =
    grandEl.innerText = "0";

    wordsEl.innerText = "ZERO RUPEES";
}

// CUSTOMER → AUTO ADDRESS
const customerSelect = document.getElementById("customerSelect");
const addressSelect = document.getElementById("addressSelect");

const customerAddressMap = {
    "TAPAN PAN STORES": "RAMRAJATALA HOWRAH",
    "REGULAR STORES": "SHIBPUR HOWRAH",
    "MANAS STORES": "SANTRAGACHI HOWRAH",
    "KAMAL PAN STORES": "BAKSARA BAZAR",
    "T CORNER": "RAMRAJATALA HOWRAH"
};

customerSelect.addEventListener("change", ()=>{
    addressSelect.value = customerAddressMap[customerSelect.value] || "";
});

// NUMBER TO WORDS
function numberToWords(num){
    const ones=["","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE",
    "TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN","NINETEEN"];
    const tens=["","","TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY"];

    if(num===0) return "ZERO";
    if(num<20) return ones[num];
    if(num<100) return tens[Math.floor(num/10)] + (num%10?" "+ones[num%10]:"");
    if(num<1000) return ones[Math.floor(num/100)]+" HUNDRED"+(num%100?" "+numberToWords(num%100):"");
    if(num<100000) return numberToWords(Math.floor(num/1000))+" THOUSAND"+(num%1000?" "+numberToWords(num%1000):"");
    if(num<10000000) return numberToWords(Math.floor(num/100000))+" LAKH"+(num%100000?" "+numberToWords(num%100000):"");
    return numberToWords(Math.floor(num/10000000))+" CRORE";
}
/* DOWNLOAD PDF */
function downloadPDF() {
    const invoice = document.querySelector(".invoice");

    html2pdf().from(invoice).set({
        margin: 0,
        filename: 'Tax_Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
}
function saveAsImage() {
    const invoice = document.querySelector(".invoice");
    const buttons = document.querySelectorAll(".action-btn");

    // hide buttons
    buttons.forEach(btn => btn.style.display = "none");

    html2canvas(invoice, { scale: 2 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "Tax_Invoice.jpg";
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.click();

        // show buttons again
        buttons.forEach(btn => btn.style.display = "inline-block");
    });
}

