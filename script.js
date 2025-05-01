document.querySelectorAll('.add-ca').forEach(button => {
  button.addEventListener('click', () => {
    const block = button.closest('.subject-block');
    const list = block.querySelector('.ca-list');
    const result = block.querySelector('.result');
    const caCount = list.querySelectorAll('.ca-item').length;

    // Predefined max of 5 CA with specific percentages
    const maxCA = 5;
    const predefinedWeights = [20, 25, 15, 20, 20];

    if (caCount >= maxCA) {
      alert("Maximum of 5 CA entries per subject.");
      return;
    }

    const caItem = document.createElement('div');
    caItem.className = 'ca-item';

    const caNumber = caCount + 1;
    const weight = predefinedWeights[caCount];
    const label = document.createElement('span');
    label.textContent = `CA${caNumber} (${weight}%) / Score =`;

    const scoreInput = document.createElement('input');
    scoreInput.type = 'number';
    scoreInput.placeholder = 'Score';
    scoreInput.min = 0;
    scoreInput.max = 100;

    const percentInput = document.createElement('input');
    percentInput.type = 'hidden';
    percentInput.value = weight;

    scoreInput.addEventListener('input', () => calculateTotal(block));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.onclick = () => {
      caItem.remove();
      calculateTotal(block);
    };

    caItem.appendChild(label);
    caItem.appendChild(scoreInput);
    caItem.appendChild(percentInput);
    caItem.appendChild(deleteBtn);
    list.appendChild(caItem);

    calculateTotal(block);
  });
});

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
