document.getElementById("tax-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    console.log("Calculating tax...");

    let grossIncome = parseFloat(document.getElementById("gross-income").value);
    if (isNaN(grossIncome) || grossIncome <= 0) {
        alert("Please enter a valid income.");
        return;
    }

    const taxBreakdown = calculatePAYE(grossIncome);
    document.getElementById("payable-tax").textContent = `Payable Tax: GHS ${taxBreakdown.tax.toFixed(2)}`;
});

function calculatePAYE(income) {
    let tax = 0;

    // Tax Bands
    const taxBands = [
        { limit: 490, rate: 0 },         // First GHS 490 - No Tax
        { limit: 110, rate: 0.05 },     // Next GHS 110 - 5%
        { limit: 130, rate: 0.10 },     // Next GHS 130 - 10%
        { limit: 3166.67, rate: 0.175 }, // Next GHS 3166.67 - 17.5%
        { limit: 16000, rate: 0.25 },   // Next GHS 16,000 - 25%
        { limit: 30520, rate: 0.30 },   // Next GHS 30,520 - 30%
        { limit: Infinity, rate: 0.35 } // Exceeding GHS 50,000 - 35%
    ];

    for (let band of taxBands) {
        if (income > band.limit) {
            tax += band.limit * band.rate;
            income -= band.limit;
        } else {
            tax += income * band.rate;
            break;
        }
    }

    return { tax };
}
