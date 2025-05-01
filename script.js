function calculateTotal(block) {
  const items = block.querySelectorAll('.ca-item');
  const result = block.querySelector('.result');

  let total = 0;
  let totalWeight = 0;

  items.forEach(item => {
    const scoreInput = item.querySelector('input[type="number"]');
    const percentInput = item.querySelector('input[type="hidden"]');

    const score = parseFloat(scoreInput.value);
    const weight = parseFloat(percentInput.value);

    if (!isNaN(score) && !isNaN(weight) && weight >= 0 && score >= 0 && score <= 100) {
      total += score * (weight / 100);
      totalWeight += weight;
    }
  });

  if (totalWeight > 100) {
    result.textContent = "⚠️ Total weight exceeds 100%";
    result.style.color = "red";
  } else if (totalWeight === 0) {
    result.textContent = "Total: --";
    result.style.color = "black";
  } else {
    result.textContent = `Total score: ${total.toFixed(2)}`;
    result.style.color = "green";
  }
}

// Attach listeners to static inputs (like in Research Skills)
document.querySelectorAll('.subject-block').forEach(block => {
  block.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', () => calculateTotal(block));
  });
  calculateTotal(block); // initial calculation
});
