let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function renderTransactions(transactionsToRender = transactions) {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactionsToRender.forEach((transaction, index) => {
        const transactionItem = document.createElement('tr');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td>${transaction.date}</td>
            <td>
                <button class="edit" onclick="editTransaction(${index})">Edit</button>
                <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
            </td>
        `;
        transactionList.appendChild(transactionItem);
    });
    updateTotalBudget();
}

function updateTotalBudget() {
    const totalBudget = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + parseFloat(transaction.amount) : acc - parseFloat(transaction.amount);
    }, 0);
    document.getElementById('total-budget').innerText = totalBudget;
}

function addTransaction(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    

    updateLocalStorage();
    renderTransactions();
    document.getElementById('transaction-form').reset(); 
}






renderTransactions();