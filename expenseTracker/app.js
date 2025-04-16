let setExpensenObject = () => {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;

  let expenseObj = {
    expenseID: Date.now(),
    amount: amount,
    category: category,
    description: description,
  };

  let storedExpenseObjs = JSON.parse(localStorage.getItem("expenseObject"));

  let expenseArr = storedExpenseObjs || [];

  expenseArr.push(expenseObj);

  localStorage.setItem("expenseObject", JSON.stringify(expenseArr));

  amount.value = "";
  category.value = "";
  description.value = "";
};

let getAllExpenses = () => {
  let container = document.getElementById("tbody");

  let storedExpenseObjs = JSON.parse(localStorage.getItem("expenseObject"));
  let expenseArr = storedExpenseObjs || [];

  if (expenseArr.length > 0) {
    expenseArr.map((expense, index) => {
      container.innerHTML += `
                    <tr>
                        <td scope="row">${index + 1}</td>
                        <td><input value="${
                          expense.category
                        }" readonly style="border: none; outline: none; background: transparent;"/></td>
                        <td><input value="${
                          expense.description
                        }" readonly style="border: none; outline: none; background: transparent;"/></td>
                        <td><input value="${
                          expense.amount
                        }" readonly style="border: none; outline: none; background: transparent;"/></td>
                        <td><button class="btn btn-danger" onclick="deleteExpense(${
                          expense.expenseID
                        })">Delete</button></td>
                    </tr>`;
    });
  } else {
    container.innerHTML = `
        <td colspan="4">
            <h2 class="text-center">There is no expense for calculate</h2>
        </td>
    `;
  }
};

let deleteExpense = (expenseID) => {
  let previousArr = JSON.parse(localStorage.getItem("expenseObject")) || [];
  let reducedArr = previousArr.filter((item) => item.expenseID != expenseID);
  localStorage.clear();
  localStorage.setItem("expenseObject", JSON.stringify(reducedArr));
  location.reload();
};

// let updateExpense = (expenseID) => {};

let calculateTotalExpense = () => {
    let expenseArr = JSON.parse(localStorage.getItem("expenseObject")) || []
    let totalExpense = 0;
    if(expenseArr.length > 0){
        expenseArr.forEach((element) => {
            totalExpense = totalExpense + Number(element.amount);
        });
        alert(`Your Total Expense is ${totalExpense}`)
    }else{
        totalExpense = 0;
        alert(`Your Total Expense is ${totalExpense}`)
    }


}
getAllExpenses();
