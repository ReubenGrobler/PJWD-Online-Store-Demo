CREATE DATABASE  IF NOT EXISTS `portfolio_phase_two` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `portfolio_phase_two`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio_phase_two
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accountinformation`
--

DROP TABLE IF EXISTS accountinformation;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE accountinformation (
  UserID int NOT NULL AUTO_INCREMENT,
  FirstName varchar(30) DEFAULT NULL,
  LastName varchar(30) DEFAULT NULL,
  Email varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  PhoneNumber varchar(15) DEFAULT NULL,
  StreetAddress varchar(100) DEFAULT NULL,
  Locality varchar(85) DEFAULT NULL,
  PostalCode varchar(16) DEFAULT NULL,
  PRIMARY KEY (UserID)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountinformation`
--

LOCK TABLES accountinformation WRITE;
/*!40000 ALTER TABLE accountinformation DISABLE KEYS */;
INSERT INTO accountinformation VALUES (1,'Greg','Curtley','gcurtley@gmail.com','sldKKsnOss@w','+497512345678','Himmelstrasse 44','Hamburg','20097'),(2,'Max','Muman','mumanmax@gmail.com','Marie573','+493293721032','Musikweltstrasse 2','Hamburg','20097'),(3,'Lara','Collins','lcollings@gmail.com','fdslke322','+491865429768','Augenstrasse 157','Berlin','10115'),(4,'Anna','Doe','annadoe@gmail.com','SpiderGuy22','+496322083130','Beethovenstrasse 22','Cologne','51149'),(5,'John','Smith','jsmith@gmail.com','dfse#dfs!','+499834008489','Goethestrasse 18','Hamburg','20097'),(6,'Erika','Curtley','ecurtley@gmail.com','qwerty','+494403549463','Himmelstrasse 44','Hamburg','20097'),(7,'Emma','Meyer','emmameyer@gmail.com','SunnySideUp','+492755253786','Kirchentrasse 103','Hamburg','20097'),(8,'Alberg','Fischer','albergfischer@gmail.com','21082002','+493436163547','Hauptstrasse 97','Rostock','18055'),(9,'Stefan','Benson','bensonstefan@gmail.com','Czx8#33','+491134772902','Kantstrasse 44','Hamburg','20097');
/*!40000 ALTER TABLE accountinformation ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchasehistory`
--

DROP TABLE IF EXISTS purchasehistory;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE purchasehistory (
  PurchaseID bigint NOT NULL AUTO_INCREMENT,
  UserID varchar(50) DEFAULT NULL,
  DateOfPurchase date DEFAULT NULL,
  Products varchar(300) DEFAULT NULL,
  TotalItemsBought int DEFAULT NULL,
  GrandTotal float DEFAULT NULL,
  PRIMARY KEY (PurchaseID)
) ENGINE=InnoDB AUTO_INCREMENT=943215648231573 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchasehistory`
--

LOCK TABLES purchasehistory WRITE;
/*!40000 ALTER TABLE purchasehistory DISABLE KEYS */;
INSERT INTO purchasehistory VALUES (315067561586123,'000003','2024-03-12','Scone, Biscotti, Fudge',10,5.95),(654651324564876,'000006','2024-01-29','Salted Bagel, Doughnut',6,9),(943215648231546,'000006','2023-12-21','Large chocolate cookie',10,5);
/*!40000 ALTER TABLE purchasehistory ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockinformation`
--

DROP TABLE IF EXISTS stockinformation;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE stockinformation (
  Product varchar(50) NOT NULL,
  AmountInStock smallint DEFAULT NULL,
  Price float DEFAULT NULL,
  DiscountCode varchar(10) DEFAULT NULL,
  PRIMARY KEY (Product)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockinformation`
--

LOCK TABLES stockinformation WRITE;
/*!40000 ALTER TABLE stockinformation DISABLE KEYS */;
INSERT INTO stockinformation VALUES ('Apple pie slice',15,1,'JSVHW9DH20'),('Biscotti',30,0.5,'28ASZWQSJ9'),('Blueberry muffin',32,1,'KWI2SMMAB8'),('Croissant',3,1,'ZPXC8SAWLF'),('Doughnut',20,0.5,'AJHRSR329D'),('Fudge',22,0.75,'DFIAUGIYUP'),('Large chocolate cookie',50,0.5,'KDPA8DB91X'),('Mini quiche',6,0.9,'PXPCZSR392'),('Salted bagel',15,2,'XNVNMEYRE6'),('Scone',0,0.65,'HDS3967DLN'),('Strawberry cake (slice)',0,1,'JLKHER432R'),('Strawberry cake (whole)',5,4.5,'DSODHFJSDF');
/*!40000 ALTER TABLE stockinformation ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 10:41:34
