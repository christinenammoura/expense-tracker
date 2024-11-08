const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const register = document.getElementById("register");

// Register button click event listener
register.addEventListener("click", async () => {
    try {
        const response = await axios("http://localhost/expense-tracker/registerUser.php", {
            method: "POST", // Using POST method
            data: {
                username: username.value,
                password: password.value,
                email: email.value,
            },
        });

        console.log(response.data); // Log the response to the console
        if (response.data.message === "User registered successfully") {
            // Redirect the user to the main page if registration is successful
            window.location.href = "index.html";
        } else {
            // Show an error message if registration fails
            alert(response.data.message);
        }
    } catch (error) {
        // Log any errors that occur during the request
        console.error("Error registering user:", error);
        alert("Error registering user. Please try again.");
    }
});

const transactionForm = document.getElementById("transaction-form");
transactionForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const user_id = 1; // Example user ID, replace with dynamic ID

    try {
        const response = await axios.post("http://localhost/expense-tracker/addTransaction.php", {
            user_id: user_id,
            description: description,
            amount: amount,
            category: type,
            date: date
        });

        alert(response.data.message);
        if (response.data.message === "Transaction added successfully") {
            loadTransactions(); // Refresh transaction list
        }
    } catch (error) {
        console.error("Error adding transaction:", error);
        alert("Error adding transaction");
    }
});

// Load transactions for the user
async function loadTransactions() {
    const user_id = 1; // Example user ID, replace with dynamic ID
    try {
        const response = await axios.get(`http://localhost/expense-tracker/getTransactions.php?user_id=${user_id}`);
        renderTransactions(response.data);
    } catch (error) {
        console.error("Error loading transactions:", error);
    }
}

// Function to render transactions in the table
function renderTransactions(transactions) {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ""; // Clear the current list
    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("tr");
        transactionItem.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
            <td>
                <button class="delete" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>`;
        transactionList.appendChild(transactionItem);
    });
}


// Initial load of transactions
loadTransactions();
