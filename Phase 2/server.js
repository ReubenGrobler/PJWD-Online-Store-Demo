//================================
//VARIABLES AND NECESSARY PACKAGES
//================================

//This variable keeps track of the currently signed-in user's first name.
var signedInFirstName = "";
//This variable keeps track of the currently signed-in user's last name.
var signedInLastName = "";
//This variable keeps track whether a user is currently signed-in or not.
var signedIn = false;
//This variable keeps track of a signed-in user's ID, which is used for multiple
//database information retrievals.
var signedInUserID = "";

//Here, it is stated that the Node packages MySql2 and Express
//are needed for the program to run.
const mysql = require("mysql2");
const express = require("express");

const app = express();


//============================
//CONNECTION TO MYSQL DATABASE
//============================

//This is for establishing a connection with the MySQL database.
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jom75877",
    database: "portfolio_phase_two",
    port: 3306,
});

connect.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    else {
        console.log("Connected to the database.");
    }
})


//==============================================
//SERVER BACKEND USED ACROSS THE WEB APPLICATION
//==============================================

//This is for hosting the server needed to run the application.
const port = 3000;
app.listen(port, () => {
    console.log("Server running on port 3000");
});


//This hosts all the files on the server.
app.use(express.static("../Phase 2"));
app.use(express.json());


//This code is responsible for fetching account information
//from the accountInformation table in the database. It receives
//values from the frontend and if those variables match up with the
//entries in the database, the variables signedIn, signedInFirstName,
//signedInLastName, and signedInUserID are set. A response
//is sent to the frontend in order to confirm whether this was
//successful.
app.post("/login", (req, res) => {

    //Retrieves the variables from the frontend.
    const { userEmail, userPassword } = req.body;

    //Query to see whether an inputted email address and password are in the database.
    const sql = "SELECT * FROM accountInformation WHERE Email = ? AND Password = ?";
    connect.query(sql, [userEmail, userPassword], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            return;
        }
        else {

            //Checks if the found entry matches with the information inputted. If yes,
            //the variables are set to match those in the database and sent to the frontend.
            if (results.length > 0) {
                signedIn = true;
                signedInFirstName = results[0].FirstName;
                signedInLastName = results[0].LastName;
                signedInUserID = results[0].UserID;

                res.status(200).json({ status: "Successful", message: "Login successful!", signedIn, signedInFirstName, signedInLastName });

            } else {
                res.status(401).json({ status: "Unsuccessful", message: "Your email or password is incorrect." });
            }
        }
    });
});


//This code is responsible for to check whether the user
//is logged in or not by sending the variables signedIn,
//signedInFirstName, signedInLastName, and signedInUserID
//to the frontend.
app.post("/checkifloggedin", (req, res) => {

    if (signedIn) {
        res.status(200).json({ status: "Successful", message: "The user is signed in.", signedIn, signedInFirstName, signedInLastName, signedInUserID });
    }
    else {
        res.status(401).json({ status: "Unsuccessful", message: "The user is not signed in." });
    }
});


//This code is responsible for retrieving user-provided
//variables from the SignUp.html page. These variables are
//then inserted to the accountInformation table in the database.
//A response is provided whether this was done successfully.
app.post("/signup", (req, res) => {

    //Retrieves the variables from the frontend.
    const { userFirstName, userLastName, userEmail, userPassword, userPhoneNumber, userStreetAddress, userLocality, userPostalCode } = req.body;

    //This query stores the new user's account information into the database.
    const sql = "INSERT INTO accountInformation (FirstName, LastName, Email, Password, PhoneNumber, StreetAddress, Locality, PostalCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connect.query(sql, [userFirstName, userLastName, userEmail, userPassword, userPhoneNumber, userStreetAddress, userLocality, userPostalCode], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            res.status(401).json({ status: "Unsuccessful", message: "There was an error during the sign-up process." });
            return;
        }
        else {
            res.status(200).json({ status: "Successful", message: "You have successfully created your account! You will now be redirected to the log in screen." });
        }
    });
});


//This code is responsible for retrieving information
//about the current signed-in user from the accountInformation
//table in the database. This information is then sent to the frontend
//and displayed on the AccountInformation.html page.
//It is noteworthy to mention that the
//variable signedInUserID is used to perform this, which was assigned in
//the /login section.
app.get("/displayaccountinformation", (req, res) => {

    //This query retrieves the information of a particular user (checked through UserID) in the database.
    const sql = "SELECT FirstName, LastName, Email, PhoneNumber, StreetAddress, Locality, PostalCode FROM accountInformation WHERE UserID = ?";
    connect.query(sql, [signedInUserID], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            res.status(401).json({ status: "Unsuccessful", message: "Your information could not be displayed." });
            return;
        }
        else {
            if (results.length > 0) {
                res.status(200).json({ status: "Successful", message: "Your information has successfully been retrieved and displayed.", data: results });
            } else {
                res.status(401).json({ status: "Not Found", message: "No user information found." });
            }
        }
    });
});


//This code is responsible for retrieving information
//regarding the currently signed-in user's purchase history, which
//is retrieved from the purchaseHistory table in the database.
//The variable signedInUserID is used to determine which user's information
//needs to be retrieved and sent to the frontend, alongside a response
//confirming whether this was successful or not.
app.get("/displaypurchasehistory", (req, res) => {

    //This query retrieves the information of a particular user (checked through UserID) in the database.
    const sql = "SELECT PurchaseID, DateOfPurchase, Products, TotalItemsBought, GrandTotal FROM purchaseHistory WHERE UserID = ?";
    connect.query(sql, [signedInUserID], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            res.status(401).json({ status: "Unsuccessful", message: "Your information could not be displayed." });
            return;
        }
        else {
            if (results.length > 0) {
                res.status(200).json({ status: "Successful", message: "Your information has successfully been retrieved and displayed.", data: results });
            } else {
                res.status(401).json({ status: "Not Found", message: "No information to be found." });
            }
        }
    });
});


//This code is responsible for retrieving a user-provided
//coupon code from the Cart.html form. This code is then compared with the
//stockInformation table in the database. If the provided coupon matches with
//any of the coupons stored, a message is provided to the frontend
//confirming the match.
app.post("/coupon", (req, res) => {

    //Retrieves the variables from the frontend.
    const { coupon } = req.body;

    //Query to see whether an inputted coupon code is in the database.
    const sql = "SELECT * FROM stockInformation WHERE DiscountCode = ?";
    connect.query(sql, [coupon], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            return;
        }
        else {

            //Checks if the found entry matches with the information inputted.
            if (results.length > 0) {
                res.status(200).json({ status: "Successful", message: "You have entered a valid coupon! Enjoy your discount!" });
            } else {
                console.log(sql);
                res.status(401).json({ status: "Unsuccessful", message: "You have not entered a valid coupon." });
            }
        }
    });
});


//This code is responsible for retrieving the current amount of stock
//of each item from the stockInformation table in the database. This information,
//should this retrieval be successful, is then sent to the frontend for
//further processing.
app.post("/stockinformation", (req, res) => {
    const { productName } = req.body;

    //This query retrieves the available stock of a particular product in the database.
    const sql = "SELECT * FROM stockInformation WHERE Product = ?";
    connect.query(sql, [productName], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            res.status(401).json({ status: "Unsuccessful", message: "The stock could not be displayed." });
            return;
        }
        else {
            if (results.length > 0) {
                res.status(200).json({ status: "Successful", message: "Here is the stock for your product.", data: results });
            } else {
                res.status(401).json({ status: "Not Found", message: "No stock information found." });
            }
        }
    });
});


//This code retrieves several values fron the frontend regarding
//the current date, the products to be stored, the total amount of items that had
//been purchased, and the grand total cost of the purchase. The current user is also retrieved
//from the frontend, as extra formatting is needed before output. All this information
//is stored in the purchaseHistory table of the database. A response is sent to confirm whether
//this was successful.
app.post("/addpurchasehistory", (req, res) => {
    const { userID, dateOfPurchase, products, totalItemsBought, grandTotal } = req.body;

    //This query is responsible for inserting a user's history-related information into the database.
    const sql = "INSERT INTO purchaseHistory (UserID, DateOfPurchase, Products, TotalItemsBought, GrandTotal) VALUES (?, ?, ?, ?, ?)";
    connect.query(sql, [userID, dateOfPurchase, products, totalItemsBought, grandTotal], (error, results) => {

        if (error) {
            console.error("Error adding purchase history:", error);
            res.status(500).json({ status: "Error", message: "Failed to add purchase history." });
        }
        else {
            console.log("Purchase history added successfully.");
            res.status(200).json({ status: "Success", message: "Purchase history added successfully." });
        }
    });
});


//This code retrieves values regarding a specific item
//and the amount of stock remaining for that item from the frontend.
//This information is then updated where the entries match in the
//stockInformation table of the database. A response is sent
//regarding the success of this operation.
app.post("/stockinformationupdate", (req, res) => {

    const { purchasedStock, productName } = req.body;

    //This query retrieves the available stock of a particular product in the database.
    const sql = "UPDATE stockInformation SET AmountInStock = ? WHERE Product = ?";
    connect.query(sql, [purchasedStock, productName], (error, results) => {

        if (error) {
            console.error("Error executing query: ", error);
            res.status(401).json({ status: "Unsuccessful", message: "Error with executing the query." });
            return;
        }
        else {
            res.status(200).json({ status: "Successful", message: "Your stock has been updated.", data: results });
        }
    });
});
