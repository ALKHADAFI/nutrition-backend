module.exports = function evaluateHealth({ sugar = 0, calories = 0 }) {
const healthyFor = [];

// Batasan contoh (bisa dikustomisasi)
if (sugar <= 5 && calories <= 50) {
healthyFor.push('anak-anak');
}
if (sugar <= 15 && calories <= 150) {
healthyFor.push('dewasa');
}
if (sugar <= 8 && calories <= 100) {
healthyFor.push('lansia');
}

return healthyFor;
};