document.querySelectorAll('.add-ca').forEach(button => {
    button.addEventListener('click', () => {
      const block = button.closest('.subject-block');
      const list = block.querySelector('.ca-list');
      const result = block.querySelector('.result');
      const caCount = list.querySelectorAll('.ca-item').length;
  
      if (caCount >= 5) {
        alert("Maximum of 5 CA entries per subject.");
        return;
      }
  
      const caItem = document.createElement('div');
      caItem.className = 'ca-item';
  
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'CA Name';
      nameInput.className = 'name-input';
  
      const scoreInput = document.createElement('input');
      scoreInput.type = 'number';
      scoreInput.placeholder = 'Score';
      scoreInput.min = 0;
      scoreInput.max = 100;
  
      const percentInput = document.createElement('input');
      percentInput.type = 'number';
      percentInput.placeholder = '%';
      percentInput.min = 0;
      percentInput.max = 100;
  
      [nameInput, scoreInput, percentInput].forEach(input =>
        input.addEventListener('input', () => calculateTotal(block))
      );
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.onclick = () => {
        caItem.remove();
        calculateTotal(block);
      };
  
      caItem.appendChild(nameInput);
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
      const score = parseFloat(item.children[1].value);
      const weight = parseFloat(item.children[2].value);
  
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
      result.textContent = `Total: ${total.toFixed(2)}%`;
      result.style.color = "green";
    }
  }
  