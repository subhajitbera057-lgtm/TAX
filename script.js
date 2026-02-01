// ================= DOM ELEMENTS =================
const qty = document.getElementById("qty");
const amountEl = document.getElementById("amount");
const totalEl = document.getElementById("total");
const cgstEl = document.getElementById("cgst");
const sgstEl = document.getElementById("sgst");
const grandEl = document.getElementById("grand");
const wordsEl = document.getElementById("words");
const dateInput = document.getElementById("date");

// ================= CONSTANTS =================
const RATE = 0.30;      // price per unit
const CGST_RATE = 0.09; // 9%
const SGST_RATE = 0.09; // 9%

// ================= MAIN CALCULATION =================
qty.addEventListener("input", () => {
    const q = Number(qty.value);

    if (q <= 0 || isNaN(q)) {
        reset();
        return;
    }

    const amount = q * RATE;
    const cgst = amount * CGST_RATE;
    const sgst = amount * SGST_RATE;
    const grand = amount + cgst + sgst;

    amountEl.innerText = amount.toFixed(2);
    totalEl.innerText = amount.toFixed(2);
    cgstEl.innerText = cgst.toFixed(2);
    sgstEl.innerText = sgst.toFixed(2);
    grandEl.innerText = grand.toFixed(2);

    wordsEl.innerText =
        numberToWords(Math.floor(grand)) + " RUPEES";
});

// ================= RESET =================
function reset() {
    amountEl.innerText =
    totalEl.innerText =
    cgstEl.innerText =
    sgstEl.innerText =
    grandEl.innerText = "0.00";

    wordsEl.innerText = "ZERO RUPEES";
}

// ================= NUMBER TO WORDS =================
function numberToWords(num) {
    const a = [
        "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX",
        "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE",
        "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN",
        "SEVENTEEN", "EIGHTEEN", "NINETEEN"
    ];
    const b = [
        "", "", "TWENTY", "THIRTY", "FORTY",
        "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"
    ];

    if (num < 20) return a[num];
    if (num < 100)
        return b[Math.floor(num / 10)] + " " + a[num % 10];
    if (num < 1000)
        return a[Math.floor(num / 100)] + " HUNDRED " + numberToWords(num % 100);
    if (num < 100000)
        return numberToWords(Math.floor(num / 1000)) + " THOUSAND " + numberToWords(num % 1000);
    if (num < 10000000)
        return numberToWords(Math.floor(num / 100000)) + " LAKH " + numberToWords(num % 100000);

    return numberToWords(Math.floor(num / 10000000)) + " CRORE";
}

// ================= SAVE AS IMAGE =================
function saveAsImage() {
    const actions = document.querySelector(".actions");
    actions.style.display = "none";

    html2canvas(document.getElementById("invoice"), { scale: 2 })
        .then(canvas => {
            const link = document.createElement("a");
            link.download = "invoice.jpg";
            link.href = canvas.toDataURL("image/jpeg", 0.95);
            link.click();
            actions.style.display = "block";
        });
}

// ================= DOWNLOAD PDF =================
function downloadPDF() {
    html2pdf()
        .from(document.getElementById("invoice"))
        .save("invoice.pdf");
}

// ================= DATE FORMAT =================
dateInput.addEventListener("input", () => {
    let v = dateInput.value.replace(/\D/g, "").slice(0, 8);

    if (v.length >= 5)
        dateInput.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    else if (v.length >= 3)
        dateInput.value = `${v.slice(0, 2)}/${v.slice(2)}`;
    else
        dateInput.value = v;
});
