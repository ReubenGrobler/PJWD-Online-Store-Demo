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

### Disclaimer
While the directory in this repository that contains all the files needed to run the web application is called `Phase 2`, the directory contains several changes and updates compared to the original Phase 2 submission. It is therefore important to note that the current version available is the final submission for Phase 3 while still maintaining the `Phase 2` directory name. The name could not be changed due to difficulties reorganising all files in a new directory and pushing that change to GitHub.

## Credits for images

`MainCover.jpg` -- https://unsplash.com/photos/baked-pastry-on-bowl-n49BjsFf5dI -- Kristen Drew

`LargeChocolateCookie.jpg` -- https://unsplash.com/photos/brown-cookies-on-blue-and-white-ceramic-plate-DoK5qEy2L60 -- American Heritage Cookie

`ApplePieSlice.jpg` -- https://unsplash.com/photos/brown-sliced-cake-on-round-white-ceramic-saucer-D7X-GMeTV7U -- Diliara Garifullina

`StrawberryCakeWhole.jpg` -- https://unsplash.com/photos/strawberry-cake-on-white-ceramic-plate-hXqbSgOPjSI -- Alexandra Khudyntseva

`StrawberryCakeSlice.jpg` -- https://unsplash.com/photos/strawberry-cake-on-white-ceramic-plate-u95_MqFUaQg -- Alexandra Khudyntseva

`Biscotti.jpg` -- https://unsplash.com/photos/a-pile-of-crackers-sitting-on-top-of-a-wooden-cutting-board-ZhGdZLCpvcI -- Geertje Caliguire

`Fudge.jpg` -- https://unsplash.com/photos/brown-cheese-on-white-surface-qk9BPaw_6ys -- Sincerely Media

`MiniQuiche.jpg` -- https://unsplash.com/photos/baked-pie-97mtSRBuu0U -- Brett Jordan

`Doughtnut.jpg` -- https://unsplash.com/photos/brown-and-white-doughnuts-on-white-ceramic-plate-EACvtuV2k2E -- Annie Spratt

`Croissant.jpg` -- https://unsplash.com/photos/a-couple-of-bagels-sitting-on-top-of-a-wooden-tray-qPm8aJtS1Rs -- Anna Bratiychuk

`Scone.jpg` -- https://unsplash.com/photos/a-close-up-of-some-pastries-on-a-table-TZZHPuL2Z2s -- Craig Bradford

`BlueberryMuffin.jpg` -- https://unsplash.com/photos/brown-cookies-on-blue-tray-9Z2XkFOarSM -- Nothing aholic

`SaltedBagel.jpg` -- https://unsplash.com/photos/a-couple-of-bagels-sitting-on-top-of-a-wooden-tray-qPm8aJtS1Rs -- Donghun Shin
