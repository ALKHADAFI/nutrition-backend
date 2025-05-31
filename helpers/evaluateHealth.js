module.exports = function evaluateHealth({ sugar = 0, calories = 0, saturatedFat = 0, sodium = 0 }) {
const healthyFor = [];

const isLowSugar = sugar <= 5;
const isLowCalories = calories <= 100;
const isLowFat = saturatedFat <= 1.5;
const isLowSodium = sodium <= 200;

if (isLowSugar && isLowCalories && isLowFat && isLowSodium) {
  healthyFor.push("anak-anak");
}
  if (sugar <= 15 && calories <= 200 && saturatedFat <= 5 && sodium <= 400) {
    healthyFor.push("dewasa");
  }
  if (sugar <= 10 && calories <= 150 && saturatedFat <= 2 && sodium <= 300) {
    healthyFor.push("lansia");
  }
  return healthyFor;
};
