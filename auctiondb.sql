-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: auctiondb
-- ------------------------------------------------------
-- Server version	8.0.18

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

DROP SCHEMA IF EXISTS `auction` ;
CREATE SCHEMA IF NOT EXISTS `auction` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `auction` ;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `AdminID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` char(45) NOT NULL,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'admin1','admin'),(2,'admin2','admin'),(3,'admin3','admin');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids` (
  `BidID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemID` int(11) DEFAULT NULL,
  `BidderID` int(11) DEFAULT NULL,
  `BidAmount` decimal(5,2) DEFAULT NULL,
  `BidTime` datetime DEFAULT NULL,
  `WinStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BidID`),
  KEY `fk_bids_item_idx` (`ItemID`),
  KEY `fk_bids_user_idx` (`BidderID`),
  CONSTRAINT `fk_bids_item` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `fk_bids_user` FOREIGN KEY (`BidderID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,1,1,200.01,'2015-10-24 19:10:58','Yes'),(2,2,2,100.81,'2018-06-04 15:06:01','No'),(3,3,3,715.14,'2019-03-30 19:44:27','Yes');
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CatID` int(11) NOT NULL AUTO_INCREMENT,
  `CatName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Smartphone'),(2,'Laptop'),(3,'SmarWatch');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `communication` (
  `CommID` int(11) NOT NULL AUTO_INCREMENT,
  `User1ID` int(11) DEFAULT NULL,
  `User2ID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Message` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`CommID`),
  KEY `fk_communication_user1` (`User1ID`),
  KEY `fk_communication_user2` (`User2ID`),
  CONSTRAINT `fk_communication_user1` FOREIGN KEY (`User1ID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_communication_user2` FOREIGN KEY (`User2ID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communication`
--

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;
INSERT INTO `communication` VALUES (1,1,2,'2017-05-05','mess 12'),(2,2,5,'2018-08-08','mess 25'),(3,4,5,'2019-09-03','mess 45');
/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedID` int(11) NOT NULL,
  `User1ID` int(11) DEFAULT NULL,
  `User2ID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Comment` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`FeedID`),
  KEY `fk_feedback_user1` (`User1ID`),
  KEY `fk_feedback_user2` (`User2ID`),
  CONSTRAINT `fk_feedback_user1` FOREIGN KEY (`User1ID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_feedback_user2` FOREIGN KEY (`User2ID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,2,'2017-05-05',4,'4 *'),(2,5,3,'2018-08-08',5,'5 *'),(3,4,3,'2019-09-03',3,'3 *');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(45) DEFAULT NULL,
  `TinyDes` varchar(250) DEFAULT NULL,
  `FullDes` varchar(1000) DEFAULT NULL,
  `Condition` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT 'No',
  `CatID` int(11) DEFAULT NULL,
  `MinPoint` int(11) DEFAULT NULL,
  `StartBidAmount` decimal(5,2) DEFAULT NULL,
  `CurrentBidAmount` decimal(5,2) DEFAULT NULL,
  `AuctionStart` datetime DEFAULT NULL,
  `AuctionEnd` datetime DEFAULT NULL,
  `SellerID` int(11) DEFAULT NULL,
  `ShipPrice` decimal(5,2) DEFAULT NULL,
  `BidderID` int(11) DEFAULT NULL,
  `AcountType` varchar(45) DEFAULT NULL,
  `AccountNo` char(45) DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `fk_item_category_idx` (`CatID`),
  KEY `fk_item_user_idx` (`SellerID`),
  KEY `fk_item_bidder_idx` (`BidderID`),
  CONSTRAINT `fk_item_bidder` FOREIGN KEY (`BidderID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_item_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`),
  CONSTRAINT `fk_item_seller` FOREIGN KEY (`SellerID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Xiaomi Mi 10','tiny des 1','full des 1','Excelent','No',1,50,300.00,350.00,'1963-11-06 16:15:08','1963-12-06 16:15:08',2,10.00,1,'Visa','0123456789'),(2,'Samsung s10','tiny des 2','full des 2','Good','No',1,65,400.00,450.00,'1994-12-04 12:17:32','1995-12-04 12:17:32',2,15.00,1,'Visa','7895643243'),(3,'Samsung Note 10','tiny des 3','full des 3','Fair','No ',1,70,500.00,550.00,'1969-01-18 04:21:46','1969-02-18 04:21:46',3,10.00,4,'Mastercard','8797895645'),(4,'MSI GP62','tiny des 4','full des 4','Poor','Yes',2,80,600.00,650.00,'1982-05-30 20:15:39','1982-06-30 20:15:39',6,15.00,5,'Mastercard','8798798961'),(5,'ASUS ROG','tiny des 5','full des 5','Excelent','Yes',2,90,700.00,750.00,'1972-06-16 14:22:14','1972-07-16 14:22:14',6,20.00,5,'Paypal','7987546464'),(6,'Galaxy Gear S3','tiny des 6','full des 6','Fair','No',3,100,750.00,850.00,'2012-09-05 23:59:27','2012-10-05 23:59:27',9,20.00,8,'Paypal','8654536546'),(7,'Apple Watch S5','tiny des 7','full des 7','Good','No',3,100,750.00,950.00,'2012-07-31 08:46:32','2012-08-31 08:46:32',10,15.00,7,'Visa','3164568766');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `PhotoID` varchar(45) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  `URL` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`PhotoID`),
  KEY `fk_photo_item` (`ItemID`),
  KEY `fk_photo_user` (`UserID`),
  CONSTRAINT `fk_photo_item` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `fk_photo_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES ('1',1,NULL,'url 1'),('2',2,NULL,'url 2'),('3',3,NULL,'url 3'),('4',NULL,4,'url 4'),('5',NULL,5,'url 5');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem`
--

DROP TABLE IF EXISTS `problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem` (
  `ProbID` int(11) NOT NULL AUTO_INCREMENT,
  `AdminID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ProbID`),
  KEY `fk_problem_admin_idx` (`AdminID`),
  KEY `fk_problem_user` (`UserID`),
  CONSTRAINT `fk_problem_admin` FOREIGN KEY (`AdminID`) REFERENCES `administrator` (`AdminID`),
  CONSTRAINT `fk_problem_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (1,2,4,'Des1','Unsolved'),(2,3,2,'Des2','Solved'),(3,1,5,'Des3','Solved');
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` char(45) NOT NULL,
  `Type` int(11) DEFAULT NULL,
  `Fname` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Street` varchar(250) DEFAULT NULL,
  `District` varchar(45) DEFAULT NULL,
  `City` varchar(250) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `PhoneNo` varchar(45) DEFAULT NULL,
  `Point` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `PhoneNo_UNIQUE` (`PhoneNo`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jason00','user',0,'Jason','Cabrera','1999-08-03','623 Nobel St.','Q1','BlackpMiddlesbroughool','jasoncabrera@jc.com','0166258218',100),(2,'sam00','user',1,'Sam','Tanner','2017-01-01','227 Oak Boulevard','Q2','Cambridge','samtanner@st.com','0798161362',150),(3,'demarco00','user',1,'Demarco','Blackwell','1977-08-04','97 Green Fabien Road','Q3','Norwich','demarcoblackwell@db.com','0716013597',200),(4,'osvaldo00','user',0,'Osvaldo','Pollard','1962-11-22','912 South Second Drive','Q4','Gloucester','osvaldopollard@op.com','0706195662',250),(5,'chris00','user',0,'Chris','Bruce','2012-05-07','89 South Green Old Avenue','Q5','Luton','chrisbruce@cb.com','0109014842',300),(6,'kelly00','user',1,'Kelly','Lewis','2012-05-07','383 Hague St.','Q6','Southend-on-Sea','kellylewis@kl.com','0889423344',350),(7,'janah00','user',0,'Jonah','Fernandez','1994-05-15','587 Cowley Freeway','Q7','St Helens','jonahfernandez@jf.com','0452463512',400),(8,'darwin00','user',0,'Darwin','Harvey','2002-06-13','74 East White Fabien Road','Q8','Plymouth','darwinharvey@dh.com','0050349916',450),(9,'lonny00','user',1,'Lonny','Travis','1958-07-03','83 White Old Boulevard','Q9','Sunderland','lonnytravis@lt.com','0260127070',500),(10,'heath00','user',1,'Heath','Wall','2014-02-23','336 First Drive','Q10','Birmingham','heathwall@hw.com','0727384010',550),(11,'torrance00','user',1,'Torrance','Underwood','2012-05-07','55 Second Street','Q1','Walsall','torranceunderwood@tu.com','0963559288',600),(12,'sidney00','user',0,'Sidney','Hudson','2002-06-13','252 New St.','Q2','Dudley','sidneyhudson@sh.com','0243950708',650),(13,'lamont00','user',0,'Lamont','Vang','1977-08-04','703 South Green New Road','Q3','Peterborough','lamontvang@lv.com','0423549278',700),(14,'mariano00','user',0,'Mariano','Mc Guire','2014-02-23','14 New Street','Q4','Poole','marianomcguire@mm.com','0477633995',750),(15,'glen00','user',0,'Glen','Duke','1977-08-04','179 White Oak Avenue','Q5','Stockport','glenduke@gd.com','0270094883',800),(16,'lemuel00','user',1,'Lemuel','Bond','1977-08-04','30 East White Second Boulevard','Q6','Bristol','lemuelbond@lb.com','0787667568',850),(17,'rhett00','user',1,'Rhett','Marshall','1994-05-15','69 North White Cowley Avenue','Q7','Gloucester','rhettmarshall@rm.com','0742427170',900),(18,'cortez00','user',0,'Cortez','Stokes','2014-02-23','53 Green New Road','Q8','Crawley','cortezstokes@cs.com','0061905543',950),(19,'joesph00','user',1,'Joesph','Wilcox','1977-08-04','384 Green First Street','Q9','Ipswich','joesphwilcox.@jw.com','0743866659',1000),(20,'xavier00','user',1,'Xavier','Lynn','1999-08-03','984 Hague Parkway','Q10','Luton','xavierlynn@xl.com','0071006425',1000);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'auctiondb'
--

--
-- Dumping routines for database 'auctiondb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-16 22:18:41
