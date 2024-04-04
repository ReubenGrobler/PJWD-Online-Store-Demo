//Here are some global variables that are used across multiple functions

//This array is used to store the items that a user wishes to add
//to their shopping cart.
var shoppingCartList = [];

//This array is used to store the amount of each item that a user
//adds to their shopping cart.
var shoppingCartAmount = [];

//This variable is used in order to calculate the total price
//of each item. This is defined as a global variable due to it
//being used in order to calculate the grand total cost that a user
//needs to pay, i.e., whether they used a coupon or not.
var subTotal = 0;


//This function returns the user back to the main page.
function goBackToMainPage() {
    window.location.href = "../StorePage.html";
};


//This function causes the sticky header at the top of the screen
//to be modified, thereby providing the user with more options
//after having successfully logged in.
function changeStickyHeader(signedIn) {
    if (signedIn) {
        var linkToLogInPage = document.querySelector(".UserOptionsDiv #UserOptions li:first-child a");
        linkToLogInPage.textContent = "Account";

        //Since the file "AccountInformation.html" is in the "html" directory
        //while "StorePage.html" is not,
        //this code checks whether the user is currently on the
        //"StorePage.html" page and redirects the user
        //accordingly.
        var url = window.location.href;

        if (url == "http://localhost:3000/StorePage.html") {
            linkToLogInPage.href = "/html/AccountInformation.html";
        } else {
            linkToLogInPage.href = "AccountInformation.html";
        }
    }
};


//This function causes a popup to show by removing the
//hidden attribute containing all the text and CSS styling
//of the popup. It receives the parameter of the
//ID needed to display the correct popup information.
function showPopUpMessage(elementID) {
    var popUp = document.getElementById(elementID);
    popUp.classList.add("openedPopUpMessage");
};


//This function closes the popup by adding the hidden
//attribute back to the popup's ID that is received through
//the function parameter.
function closePopUpMessage(elementID) {
    var popUp = document.getElementById(elementID);
    popUp.classList.remove("openedPopUpMessage");
};


//This function adds the selected item and the corresponding
//amount into the arrays shoppingCartList and shoppingCartAmount.
//Additionally, this function lets the user know that their order has been
//successful. It then calls the closePopUpMessage function to close the popup.
function addToCart(addedItem, amountToBuy, availableStock, elementID) {
    if (amountToBuy > availableStock) {
        alert("There isn't enough stock available. Please enter an amount smaller than " + availableStock + ".");
        return;
    }

    shoppingCartList.push(addedItem);
    shoppingCartAmount.push(amountToBuy);
    alert("Your item has been added to your shopping cart!");

    storesArrays();

    closePopUpMessage(elementID);
};


//This function converts the arrays shoppingCartList and
//shoppingCartAmount into JSON strings
//in order to use them on other HTML pages.
function storesArrays() {
    sessionStorage.setItem("shoppingCartListString", JSON.stringify(shoppingCartList));
    sessionStorage.setItem("shoppingCartAmountString", JSON.stringify(shoppingCartAmount));
};


//This function is responsible for validating user inputs
//to make sure that the format of some fields are correct,
//as well as to make sure that fields are not left blank.
//It is important to note that no information is sent to
//the backend.
function signUpFormatting() {
    var temp = document.getElementById("FirstNameInputForm");
    if (temp.value == "") {
        alert("Please input a first name.")
        return -1;
    };

    temp = document.getElementById("LastNameInputForm");
    if (temp.value == "") {
        alert("Please input a last name.")
        return -1;
    };

    temp = document.getElementById("EmailInputForm2");
    if (temp.value == "") {
        alert("Please input an email address.")
        return -1;
    };

    //Checks if an inputted email address is in a correct format
    var emailAddressFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(emailAddressFormat.test(temp.value))) {
        alert("Invalid email address.");
        return -1;
    }

    temp = document.getElementById("PasswordInputForm2");
    if (temp.value == "") {
        alert("Please input a password.")
        return -1;
    };

    //Checks if a password is between 6 and 50 characters long
    if ((temp.value).length > 50 || (temp.value).length < 6) {
        alert("Your password must be between 6 and 50 characters long.");
        return -1;
    }

    temp = document.getElementById("PhoneNumberInputForm");
    if (temp.value == "") {
        alert("Please input a phone number.")
        return -1;
    };

    //Validates an inputted phone number
    var phoneNumberFormat = /^\+\d{1,3}\d{4,}$/;
    if (!(phoneNumberFormat.test(temp.value))) {
        alert("Invalid phone number. Please format your phone number as above.");
        return -1;
    }

    temp = document.getElementById("StreetAddressInputForm");
    if (temp.value == "") {
        alert("Please input a street address.")
        return -1;
    };

    temp = document.getElementById("LocalityInputForm");
    if (temp.value == "") {
        alert("Please input a locality.")
        return -1;
    };

    temp = document.getElementById("PostalCodeInputForm");
    if (temp.value == "") {
        alert("Please input a postal code.")
        return -1;
    };
};


//This function retrieves the items the user wishes to buy
//from the shoppingCartList array, as well as how many of each
//item from the shoppingCartAmount array. Afterwards, the function
//displays it in a table on the Cart.html webpage.
function displayOnCart() {
    shoppingCartAmount = JSON.parse(sessionStorage.getItem("shoppingCartAmountString"));
    shoppingCartList = JSON.parse(sessionStorage.getItem("shoppingCartListString"));

    var i = 0;
    var checkoutOutput = document.getElementById("CheckoutOutput");
    var miniTableCheckout = document.getElementById("MiniTableCheckout");

    const miniRowSubtotal = document.createElement("tr");
    const miniRowDiscount = document.createElement("tr");
    const miniRowGrandTotal = document.createElement("tr");

    const cartSubtotalCaption = document.createElement("td");
    const discountsCaption = document.createElement("td");
    const grandTotalCaption = document.createElement("td");

    const cartSubtotal = document.createElement("td");
    cartSubtotal.setAttribute("id", "CartSubtotalInSmallTable");
    const discounts = document.createElement("td");
    discounts.setAttribute("id", "DiscountsInSmallTable");
    const grandTotal = document.createElement("td");
    grandTotal.setAttribute("id", "GrandTotalInSmallTable");

    for (i; i < shoppingCartList.length; i++) {
        const row = document.createElement("tr");

        const itemName = document.createElement("td");
        const itemPrice = document.createElement("td");
        const itemAmount = document.createElement("td");
        const itemSubtotal = document.createElement("td");
        const itemImage = document.createElement("td");
        const createImage = document.createElement("img");
        const itemButton = document.createElement("td");
        const removeButton = document.createElement("button");

        if (shoppingCartList[i] == "Large Chocolate Cookie") {

            itemName.textContent = "Large Chocolate Cookie";
            itemPrice.textContent = "€0.50";
            subTotal += shoppingCartAmount[i] * 0.5;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.5).toFixed(2);
            createImage.src = "../images/products/LargeChocolateCookie.jpg";

        } else if (shoppingCartList[i] == "Apple Pie Slice") {

            itemName.textContent = "Apple Pie Slice";
            itemPrice.textContent = "€1.00";
            subTotal += shoppingCartAmount[i] * 1;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 1).toFixed(2);
            createImage.src = "../images/products/ApplePieSlice.jpg";

        } else if (shoppingCartList[i] == "Strawberry Cake (Whole)") {

            itemName.textContent = "Strawberry Cake (Whole)";
            itemPrice.textContent = "€4.50";
            subTotal += shoppingCartAmount[i] * 4.5;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 4.5).toFixed(2);
            createImage.src = "../images/products/StrawberryCakeWhole.jpg";

        } else if (shoppingCartList[i] == "Strawberry Cake (Slice)") {

            itemName.textContent = "Strawberry Cake (Slice)";
            itemPrice.textContent = "€1.00";
            subTotal += shoppingCartAmount[i] * 1;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 1).toFixed(2);
            createImage.src = "../images/products/StrawberryCakeSlice.jpg";

        } else if (shoppingCartList[i] == "Biscotti") {

            itemName.textContent = "Biscotti";
            itemPrice.textContent = "€0.50";
            subTotal += shoppingCartAmount[i] * 0.5;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.5).toFixed(2);
            createImage.src = "../images/products/Biscotti.jpg";

        } else if (shoppingCartList[i] == "Fudge") {

            itemName.textContent = "Fudge";
            itemPrice.textContent = "€0.75";
            subTotal += shoppingCartAmount[i] * 0.75;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.75).toFixed(2);
            createImage.src = "../images/products/Fudge.jpg";

        } else if (shoppingCartList[i] == "Mini Quiche") {

            itemName.textContent = "Mini Quiche";
            itemPrice.textContent = "€0.90";
            subTotal += shoppingCartAmount[i] * 0.9;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.9).toFixed(2);
            createImage.src = "../images/products/MiniQuiche.jpg";

        } else if (shoppingCartList[i] == "Doughnut") {

            itemName.textContent = "Doughnut";
            itemPrice.textContent = "€0.50";
            subTotal += shoppingCartAmount[i] * 0.5;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.5).toFixed(2);
            createImage.src = "../images/products/Doughnut.jpg";

        } else if (shoppingCartList[i] == "Croissant") {

            itemName.textContent = "Croissant";
            itemPrice.textContent = "€1.00";
            subTotal += shoppingCartAmount[i] * 1;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 1).toFixed(2);
            createImage.src = "../images/products/Croissant.jpg";

        } else if (shoppingCartList[i] == "Scone") {

            itemName.textContent = "Scone";
            itemPrice.textContent = "€0.65";
            subTotal += shoppingCartAmount[i] * 0.65;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 0.65).toFixed(2);
            createImage.src = "../images/products/Scone.jpg";

        } else if (shoppingCartList[i] == "Blueberry Muffin") {

            itemName.textContent = "Blueberry Muffin";
            itemPrice.textContent = "€1.00";
            subTotal += shoppingCartAmount[i] * 1;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 1).toFixed(2);
            createImage.src = "../images/products/BlueberryMuffin.jpg";

        } else if (shoppingCartList[i] == "Salted Bagel") {

            itemName.textContent = "Salted Bagel";
            itemPrice.textContent = "€2.00";
            subTotal += shoppingCartAmount[i] * 2;
            itemSubtotal.textContent = "€" + (shoppingCartAmount[i] * 2).toFixed(2);
            createImage.src = "../images/products/SaltedBagel.jpg";

        } else {
            console.log("No item in array found.")
            continue;
        }

        //This function enables the buttons to remove an item
        //from the table and wipe out that respective entry
        //in the arrays.
        removeButton.addEventListener("click", function removeItem() {
            row.remove();
            var indexToRemove = shoppingCartList.indexOf(itemName.textContent);
            var removedItem = shoppingCartList[indexToRemove];

            if (removedItem == "Large Chocolate Cookie") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.5;
            }
            else if (removedItem == "Apple Pie Slice") {
                subTotal -= shoppingCartAmount[indexToRemove] * 1;
            }
            else if (removedItem == "Strawberry Cake (Whole)") {
                subTotal -= shoppingCartAmount[indexToRemove] * 4.5;
            }
            else if (removedItem == "Strawberry Cake (Slice)") {
                subTotal -= shoppingCartAmount[indexToRemove] * 1;
            }
            else if (removedItem == "Biscotti") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.5;
            }
            else if (removedItem == "Fudge") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.75;
            }
            else if (removedItem == "Mini Quiche") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.9;
            }
            else if (removedItem == "Doughnut") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.5;
            }
            else if (removedItem == "Croissant") {
                subTotal -= shoppingCartAmount[indexToRemove] * 1;
            }
            else if (removedItem == "Scone") {
                subTotal -= shoppingCartAmount[indexToRemove] * 0.65;
            }
            else if (removedItem == "Blueberry Muffin") {
                subTotal -= shoppingCartAmount[indexToRemove] * 1;
            }
            else if (removedItem == "Salted Bagel") {
                subTotal -= shoppingCartAmount[indexToRemove] * 2;
            }
            else {
                console.log("Error trying to subtract the price.");
            }

            //This is to remove the Euro signs before updating the arrays.
            shoppingCartList.splice(indexToRemove, 1);
            shoppingCartAmount.splice(indexToRemove, 1);

            storesArrays();

            cartSubtotal.textContent = "€" + subTotal.toFixed(2);
            grandTotal.textContent = "€" + subTotal.toFixed(2);
        });


        itemAmount.textContent = shoppingCartAmount[i];

        removeButton.textContent = "Remove";
        removeButton.className = "RemoveFromCartButton";

        itemImage.appendChild(createImage);
        itemButton.appendChild(removeButton);

        row.appendChild(itemName);
        row.appendChild(itemPrice);
        row.appendChild(itemAmount);
        row.appendChild(itemSubtotal);
        row.appendChild(itemImage);
        row.appendChild(itemButton);

        checkoutOutput.appendChild(row);
    }

    //Here, a smaller table is generated to give the user
    //a summary of the shopping cart.
    cartSubtotalCaption.textContent = "Cart Subtotal:";
    discountsCaption.textContent = "Discount:";
    grandTotalCaption.textContent = "Grand Total:"

    cartSubtotal.textContent = "€" + subTotal.toFixed(2);
    discounts.textContent = "€0.00";
    grandTotal.textContent = "€" + subTotal.toFixed(2);

    miniRowGrandTotal.style.fontWeight = "bold";
    miniRowGrandTotal.style.fontSize = "16px";

    miniRowSubtotal.appendChild(cartSubtotalCaption);
    miniRowSubtotal.appendChild(cartSubtotal);
    miniRowDiscount.appendChild(discountsCaption);
    miniRowDiscount.appendChild(discounts);
    miniRowGrandTotal.appendChild(grandTotalCaption);
    miniRowGrandTotal.appendChild(grandTotal);

    miniTableCheckout.appendChild(miniRowSubtotal);
    miniTableCheckout.appendChild(miniRowDiscount);
    miniTableCheckout.appendChild(miniRowGrandTotal);
};


//This function calls a simple popup to let the user know
//that their order has been placed.
//Should the user not be logged in, they will be redirected to the login page instead.
//Finally, the information in the arrays will be formatted and sent to the database
//through the frontend. The decrease in stock will be reflected on the main
//store page as well as having the stock decreased in the database.
function proceedToCheckout() {

    //The URL responsible for backend communication to check whether a user
    //is logged in or not.
    const urlForCheckLoggedIn = "http://localhost:3000/checkifloggedin";

    //This communicates with the backend in order to check
    //whether the user is signed into their account.
    fetch(urlForCheckLoggedIn, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        const data = await res.json();

        //If the user is signed into their account
        if (data.signedIn) {
            var i = 0;

            //some formatting to display the info in the database neatly
            var userID = data.signedInUserID.toString().padStart(6, '0');
            const date = new Date().toISOString().split('T')[0];
            var products = JSON.stringify(shoppingCartList);
            products = products.replace(/\\|"|\[|\]/g, "").replace(/,/g, ", ");
            products = products.replace(/^"|"$/g, "");

            var integerShoppingCartAmount = shoppingCartAmount.map(Number);
            var totalItemsBought = 0;

            if (integerShoppingCartAmount.length == 0){
                alert("You cannot checkout with an empty cart.");
                return;
            }

            for (i; i < integerShoppingCartAmount.length; i++) {
                totalItemsBought += integerShoppingCartAmount[i];
            }

            //Code to communicate with the backend necessary to store information
            //in the purchaseHistory table of the database.
            const urlForPurchaseHistory = "http://localhost:3000/addpurchasehistory";

            const res = await fetch(urlForPurchaseHistory, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: userID,
                    dateOfPurchase: date,
                    products: products,
                    totalItemsBought: totalItemsBought,
                    grandTotal: parseFloat(document.getElementById("GrandTotalInSmallTable").textContent.replace("€", ""))
                })
            });

            const data2 = await res.json();

            if (data2.message == "The information has successfully been added to your history.") {
                window.location.href = "../StorePage.html"
            }

            reduceStockAvailable();
            sessionStorage.clear();

            var popUp = document.getElementById("PopUpCheckout");
            popUp.classList.add("openedPopUpMessage");

        } else {
            alert("You are not signed into your account. You will therefore be redirected to the login page.");
            window.location.href = "LogIn.html";
        }

    }).catch((error) => {
        console.error("Error fetching logged in status:", error);
    });
};


//This function closes the popup and goes back to the main store page.
//Additionally, all arrays are cleared in order to have an empty shopping
//cart. Used in Cart.html
function closePopUpMessageCheckout() {
    var popUp = document.getElementById("PopUpCheckout");
    popUp.classList.remove("openedPopUpMessage");

    shoppingCartAmount = [];
    shoppingCartList = [];

    goBackToMainPage();
};


//The function passes several parameters in order to retrieve a specific product.
//With this information, the function communicates with the backend in order to retrieve
//the amount of stock available for that specific product. Should the stock be zero,
//the function displays an "OUF OF STOCK" heading on the product listing and the button in order to
//add that item to the cart is removed. Finally, the amount of stock available is also added
//as an upper limit to the amount a user can add to their cart in the popup message.
//Should a user go over this limit, they are informed that they cannot exceed the stock available.
function displayStockForProduct(productListing, stockHeader, addToCartButton, upperLimitInPopup) {

    var productItem = document.getElementById(productListing).textContent;
    var stockHeader = document.getElementById(stockHeader);
    var buttonToBeRemoved = document.getElementById(addToCartButton);
    var maxLimit = document.getElementById(upperLimitInPopup);

    //The function getInfo is called when the page is loaded.
    window.addEventListener("load", getInfo);

    //The URL responsible for backend communication in regards to retrieving
    //current stock information.
    const urlForStockInformation = "http://localhost:3000/stockinformation";

    //This function is responsible for communicating with the backend
    //in order to retrieve the current stock available from the database.
    async function getInfo() {

        const res = await fetch(urlForStockInformation, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName: productItem
            })
        });

        const data = await res.json();

        //If the information has been successfully retrieved from the database in the backend,
        //the following code will output the stock in each product listing.
        if (data.message == "Here is the stock for your product.") {
            const stock = data.data[0];
            var stockDiv = document.createElement("div");

           if (stock.AmountInStock == 0) {
                stockDiv.innerHTML = `<h6>In stock: ${stock.AmountInStock}</h6><h3>OUT OF STOCK</h3>`;
                buttonToBeRemoved.parentNode.removeChild(buttonToBeRemoved);
            } else if (stock.AmountInStock < 0){
                stockDiv.innerHTML = `<h6>In stock: ${stock.AmountInStock}</h6><h3>OUT OF STOCK</h3><h5>There is currently a backlog for this product. It will take a while before stock is available again.`;
                buttonToBeRemoved.parentNode.removeChild(buttonToBeRemoved);
            } else {
                stockDiv.innerHTML = `<h6>In stock: ${stock.AmountInStock}</h6>`;
            }
            stockHeader.appendChild(stockDiv);

            maxLimit.setAttribute("max", stock.AmountInStock);

        } else {
            alert(data.message);
            console.log("The information could not be retrieved.");
        }
    }
};


//This function subtracts the amount of stock available
//for a given product within the database. This function is used
//in the proceedToCheckout() function.
async function reduceStockAvailable() {
    var i = 0;

    //The URLs responsible for backend communication; one to retrieve stock information
    //and one to update said information within the database.
    const urlForStockInformation = "http://localhost:3000/stockinformation";
    const urlForStockUpdate = "http://localhost:3000/stockinformationupdate";


    for (i; i < shoppingCartList.length; i++) {

        //This code fetches the stock available for a specific product.
        const res1 = await fetch(urlForStockInformation, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName: shoppingCartList[i]
            })
        });

        const data1 = await res1.json();

        //If the information has been successfully retrieved from the database in the backend,
        //the following code will have the stock amount and execute the code needed to
        //update the backend.
        if (data1.message == "Here is the stock for your product.") {
            const stock = data1.data[0].AmountInStock;

            //This code directly updates the entries in the database.
            const res2 = await fetch(urlForStockUpdate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    purchasedStock: stock - shoppingCartAmount[i],
                    productName: shoppingCartList[i]
                })
            });

            //This waits for a response from the backend
            const data2 = await res2.json();

            if (data2.message == "Your stock has been updated.") {
                console.log("The stock in the database had been successfully updated.");

            } else {
                alert(data2.message);
                console.log("Couldn't update the stock.");
            }

        } else {
            alert(data1.message);
            console.log("The information could not be retrieved.");
        }
    }
};


//This function communicates with the backend in order to retrieve
//a user's account information, which is stored in the database.
//Additionally, once the information has been retrieved, it outputs the information
//onto the page for a user to view.
async function displayUserAccountInfo() {
    var accountInformationDiv = document.getElementById("DisplayUserInformation");

    //The URL responsible for backend communication in order to retrieve a user's
    //account information.
    const urlForAccountInformation = "http://localhost:3000/displayaccountinformation";

    const res = await fetch(urlForAccountInformation);

    const data = await res.json();

    //If the information has been successfully retrieved, the information will be
    //outputted on the page.
    if (data.message == "Your information has successfully been retrieved and displayed.") {
        const user = data.data[0];

        var userDiv = document.createElement("div");

        userDiv.innerHTML = `<p><strong>First name:</strong> ${user.FirstName}</p><p><strong>Last name:</strong> ${user.LastName}</p><p><strong>Email:</strong> ${user.Email}</p><p><strong>Phone Number:</strong> ${user.PhoneNumber}</p><p><strong>Street Address:</strong> ${user.StreetAddress}</p><p><strong>Locality:</strong> ${user.Locality}</p><p><strong>Postal Code:</strong> ${user.PostalCode}</p>`;
        accountInformationDiv.appendChild(userDiv);
    } else {
        alert(data.message);
        console.log("The information could not be retrieved.");
    }
};


//This function is called on nearly every page to verify
//whether a user has logged into their account. If
//they have, it calls the changeStickyHeader function,
//which changes the header at the top of the screen.
async function checkIfLoggedIn() {

    //The URL responsible for backend communication in order to
    //check if a user is logged into their account.
    const urlForCheckLoggedIn = "http://localhost:3000/checkifloggedin";

    //This communicates with the backend in order to check
    //whether the user is signed into their account.
    fetch(urlForCheckLoggedIn, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        const data = await res.json();

        if (data.signedIn) {
            //If the user is signed in, then the page is changed to accomodate the fact
            //that a signed-in user does not need to log into their account again.
            //Additionally, another page is made available where a user
            //can view their account information.
            changeStickyHeader(data.signedIn);
        }

    }).catch((error) => {
        console.error("Error fetching logged in status:", error);
    });
};;


//This function is called in LogIn.html and, as the name suggests,
//it retrieves the values inputted by the user. If the input fields are empty,
//the user is prompted with a message informing them that they need to input an email or
//password. Afterwards, when the LogIn button is clicked, the function communicates with the backend to verify
//whether the inputted values are correct. If they are, the user is redirected to the main page
//after the changeStickyHeader function has been called.
//If the information is incorrect, the user is informed of such.
async function loggingIn() {

    //Retrieves variables from the input boxes
    var logInButton = document.getElementById("LogInButton");
    var userEmail = document.getElementById("EmailInputForm");
    var userPassword = document.getElementById("PasswordInputForm");

    //The URL responsible for backend communication in order
    //to check whether the user-provided information is valid.
    const urlForLogin = "http://localhost:3000/login";

    //This is a simple check to see whether the email and password
    //fields are empty.
    if ((userEmail.value === "") || (userPassword.value === "")) {
        alert("Please enter both your email address and your password.")
        return;
    }

    const res = await fetch(urlForLogin, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userEmail.value,
            userPassword: userPassword.value
        })
    });

    const data = await res.json();

    alert(data.message);

    //If the Login was successful, the user is redirected to the home page
    //after having the sticky header changed (see function definition in StorePageFunctionality.js)
    if (data.message == "Login successful!") {
        logInButton.addEventListener("click", changeStickyHeader(data.signedIn));
        window.location.href = "../StorePage.html"
    }
};


//This function communicates with the backend to retrieve
//all items that a user has purchased in the past by checking the user ID
//that is declared in the backend. After all entries with that specific
//user ID had been retrieved from the database, the function dynamically creates a table
//to display that information. In addition, the "Date" and "GrandTotal"
//values from the database are formatted for a more user-friendly display.
async function getPurchaseHistory() {

    //The URL responsible for backend communication in regards to receiving
    //a user's purchase history.
    const urlForPurchaseHistory = "http://localhost:3000/displaypurchasehistory";

    const res = await fetch(urlForPurchaseHistory);
    const data = await res.json();

    //If the information has been successfully retrieved from the database in the backend,
    //the following code will output it the form.
    if (data.message == "Your information has successfully been retrieved and displayed.") {
        const purchaseHistoryTable = data.data;
        var tableBody = document.getElementById("TableOutput");

        //Checks if a database entry is null. If it isn't, then
        //the information gets displayed on the table.
        purchaseHistoryTable.forEach(purchase => {
            const row = document.createElement("tr");

            for (const columnName in purchase) {
                if (purchase[columnName] !== null) {
                    const outputInformation = document.createElement("td");

                    // This block of code formats the output to be more user friendly.
                    if (columnName === "DateOfPurchase") {
                        const betterDateFormat = new Date(purchase[columnName]);
                        outputInformation.textContent = betterDateFormat.toLocaleDateString();
                    } else if (columnName === "Products") {
                        
                        //This section of code formats the list of products
                        //in the database into separate items that are then
                        //displayed in separate rows within the table.
                        var eachProduct = purchase[columnName].split(", ");

                        eachProduct.forEach(product => {
                            const newProductLine = document.createElement("span");
                            newProductLine.textContent = product;
                            newProductLine.style.display = "block";
                            outputInformation.appendChild(newProductLine);
                        });

                    } else if (columnName === "GrandTotal") {
                        outputInformation.textContent = "€" + purchase[columnName].toFixed(2);
                    } else {
                        outputInformation.textContent = purchase[columnName];
                    }

                    row.appendChild(outputInformation);
                }
            }
            tableBody.appendChild(row);
        });

    } else {
        console.log("The information could not be retrieved.");
    }
};


//This function calls the signUpFormatting function in order to check
//whether there are any empty fields while also formatting some text.
//Should there be an empty field, the function stops operating.
//Furthermore, it retrieves the values of several input forms
//to gather user information and sends them to the backend in order
//to save it to the database. Should this be successful, the user is redirected
//to the LogIn page in order to login to their new account.
async function signingUpForNewAccount() {

    var signUpButton = document.getElementById("SignUpButton");

    //Checks if the function returns a -1, meaning that there had been an
    //empty input field. If a -1 is returned, the entire function
    //stops executing.
    var noInputFound = signUpFormatting();
    if (noInputFound == -1) {
        return;
    }

    signUpButton.addEventListener("click", signUpFormatting);

    //Retrieves variables from the input boxes
    var userFirstName = document.getElementById("FirstNameInputForm");
    var userLastName = document.getElementById("LastNameInputForm");
    var userEmailAddress = document.getElementById("EmailInputForm2");
    var userPassword = document.getElementById("PasswordInputForm2");
    var userPhoneNumber = document.getElementById("PhoneNumberInputForm");
    var userStreetAddress = document.getElementById("StreetAddressInputForm");
    var userLocality = document.getElementById("LocalityInputForm");
    var userPostalCode = document.getElementById("PostalCodeInputForm");

    //The URL responsible for backend communication in regards to
    //adding a new account's information to the database.
    const urlForSignup = "http://localhost:3000/signup";

    //Code that is responsible for sending the variables to the backend
    //in order to be stored in the accountInformation table.
    const res = await fetch(urlForSignup, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userFirstName: userFirstName.value,
            userLastName: userLastName.value,
            userEmail: userEmailAddress.value,
            userPassword: userPassword.value,
            userPhoneNumber: userPhoneNumber.value,
            userStreetAddress: userStreetAddress.value,
            userLocality: userLocality.value,
            userPostalCode: userPostalCode.value
        })
    });

    const data = await res.json();

    alert(data.message);

    //If the sign-up was successful, the user is redirected to the login page.
    if (data.message == "You have successfully created your account! You will now be redirected to the log in screen.") {
        window.location.href = "LogIn.html"
    }
};


//This function is used in regards to checking whether the user
//has inputted a valid coupon code in the Cart.html page.
//Should the coupon be valid, the user is informed that their
//coupon works and receives a price discount. This price discount
//is dynamically calculated and added to the Cart Summary table.
//After the Coupon button has been clicked and the coupon has been
//successfully verified, the button is hidden in order
//to avoid users from entering more than one coupon.
async function checkCoupon() {

    //Retrieves variables from the input boxes
    var coupon = document.getElementById("CouponForm");

    //The URL responsible for backend communication in regards to
    //verifying a user-provided coupon.
    const urlForCoupon = "http://localhost:3000/coupon";

    //This is a simple check to see whether the coupon field is empty.
    if ((coupon.value === "")) {
        alert("Please enter a coupon.")
        return;
    }

    const res = await fetch(urlForCoupon, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            coupon: coupon.value
        })
    });

    const data = await res.json();

    alert(data.message);

    //If the coupon code is valid, the table containing the summary of a user's cart
    //is updated in order to reflect the amount that had been subtracted from the subtotal price
    //as well as the updated grand total price.
    if (data.message == "You have entered a valid coupon! Enjoy your discount!") {
        var discountsCell = document.getElementById("DiscountsInSmallTable");
        var grandTotalCell = document.getElementById("GrandTotalInSmallTable");
        var checkoutButton = document.getElementById("CouponButton");

        var cartSubtotalCellValue = parseFloat(document.getElementById("CartSubtotalInSmallTable").textContent.replace("€", ""));
        var discountsCellValue = parseFloat(document.getElementById("DiscountsInSmallTable").textContent.replace("€", ""));
        var grandTotalCellValue = parseFloat(document.getElementById("GrandTotalInSmallTable").textContent.replace("€", ""));

        discountsCellValue = cartSubtotalCellValue * 0.05;
        grandTotalCellValue = cartSubtotalCellValue - discountsCellValue;

        discountsCell.textContent = "€" + discountsCellValue.toFixed(2);
        grandTotalCell.textContent = "€" + grandTotalCellValue.toFixed(2);

        checkoutButton.style.display = "none";
    }
};
