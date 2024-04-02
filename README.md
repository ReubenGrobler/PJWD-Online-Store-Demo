# PJWD-Online-Store-Demo
This is a demo for a web application developed for the course `Project: Java and Web Application` for `IU University of Applied Sciences`. Developed by Reuben Grobler. Any and all names and other personal information are fictional, and any resemblance to the information of real people and/or addresses are coincidental.


## Installation Instructions
1. Make sure that you have both [Node.js](https://nodejs.org/en/download) and [MySQL](https://dev.mysql.com/downloads/installer/) installed. 
2. Download and unzip the code from this repository into your chosen directory.
3. Open MySQL Workbench or any other database management system. For this installation guide, MySQL Workbench will be used.
4. Establish a new connection.
5. When prompted, enter the following information into their respective fields:
  - Hostname: localhost
  - Username: root
  - Port: 3006
6. Open the connection and select the option to open an SQL script. Using MySQL Workbench, this option will be under `File> Open SQL Script`
7. Navigate to the directory `Phase 2` and select the file PortfolioDatabase.sql
8. Execute the query and refresh your schemas. Should the database `portfolio_phase_two` appear with the tables `accountinformation`, `purchasehistory`, and `stockinformation`, the database has been successfully installed. You can close MySQL Workbench or any other database management.
9. With a text editor of your choosing, open the `server.js` file and edit the following code:
```
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password_here",
    database: "portfolio_phase_two",
    port: 3306,
});
```
<sub>*Please note that the password referred to here is the password you used for the MySQL connection during creation. Additionally, the code can be found roughly at the top of the file.</sub>

10. Open Command Prompt (Windows)/Terminal (macOS/Linux) and navigate to the directory where you extracted the files. You should be in the `Phase 2` directory. On Windows, an example directory path is as follows:
`C:\Users\John\Documents\Phase 2>`
11. Run the command `node server.js`
12. Open your browser and type the following into your search bar: `localhost:3000/StorePage.html`
