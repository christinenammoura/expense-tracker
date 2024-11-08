//let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

//function updateLocalStorage() {
  //  localStorage.setItem('transactions', JSON.stringify(transactions));
//}

let editingIndex = null; 
let transactions = [];
// Fetch all transactions when the page loads
window.onload = () => {
    fetchTransactions();
  };


  function fetchTransactions() {
    fetch('http://localhost/expense-tracker/getTransactions.php')
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                transactions = data;
                renderTransactions();
            }
        })
        .catch(error => console.error("Error fetching transactions:", error));
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
            <td>${transaction.category}</td>
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
        return transaction.category === 'income' ? acc + parseFloat(transaction.amount) : acc - parseFloat(transaction.amount);
    }, 0);
    document.getElementById('total-budget').innerText = totalBudget;
}

function addTransaction(e) {
    e.preventDefault();
    const user_id = document.getElementById('user-id').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const transactions = {
        user_id,
        description,
        amount,
        category,
        date
    };

    
    if (editingIndex !== null) {
       
        transactions[editingIndex] = { description, amount, category, date };
        editingIndex = null; 
    } else {
       
        transactions.push({ description, amount, category, date });
    }

    //updateLocalStorage();
    renderTransactions();
    document.getElementById('transaction-form').reset(); 
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
   // updateLocalStorage();
    renderTransactions();
}

function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById('description').value = transaction.description;
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('category').value = transaction.category;
    document.getElementById('date').value = transaction.date;

    
    editingIndex = index;
}


function filterTransactions() {
    const minAmount = parseFloat(document.getElementById('min-amount').value) || 0;
    const maxAmount = parseFloat(document.getElementById('max-amount').value) || Infinity;
    const filterNotes = document.getElementById('filter-notes').value.toLowerCase();

    const filteredTransactions = transactions.filter((transaction) => {
        const amount = parseFloat(transaction.amount);
        const isWithinMinAmount = amount >= minAmount;
        const isWithinMaxAmount = amount <= maxAmount;
        const matchesDescription = transaction.description.toLowerCase().includes(filterNotes);
        return isWithinMinAmount && isWithinMaxAmount && matchesDescription;
    });

    renderTransactions(filteredTransactions);
}


document.getElementById('transaction-form').addEventListener('submit', addTransaction);
document.getElementById('filter-btn').addEventListener('click', filterTransactions);


renderTransactions();