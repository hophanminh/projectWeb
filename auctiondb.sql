CREATE DATABASE  IF NOT EXISTS `auctiondb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `auctiondb`;
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

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `AdminID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Password` char(100) NOT NULL,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'admin1','$2a$10$9eBshy2J5uG99i4veXfcSOfk3BtS3lgO6XNFPo3IGXdamrlxOAldW'),(2,'admin2','$2a$10$EXchhU./ZFVSpUMip8mQ1ey/yCLIA9lh7O2C1t9yxz0uTUtS4izUe'),(3,'admin3','$2a$10$EXchhU./ZFVSpUMip8mQ1ey/yCLIA9lh7O2C1t9yxz0uTUtS4izUe');
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
  `BidAmount` decimal(9,2) DEFAULT NULL,
  `BidTime` datetime DEFAULT NULL,
  `WinStatus` varchar(45) DEFAULT 'No',
  PRIMARY KEY (`BidID`),
  KEY `fk_bids_item_idx` (`ItemID`),
  KEY `fk_bids_user_idx` (`BidderID`),
  CONSTRAINT `fk_bids_item` FOREIGN KEY (`ItemID`) REFERENCES `item` (`ItemID`),
  CONSTRAINT `fk_bids_user` FOREIGN KEY (`BidderID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,1,1,99999.00,'2020-01-06 16:15:08','No'),(2,3,1,4999.00,'2020-01-06 16:15:08','No'),(3,1,5,4512.00,'2020-01-06 16:15:08','No'),(4,5,3,321.00,'2020-01-06 16:15:08','No'),(5,8,5,142.00,'2020-01-06 16:15:08','No'),(6,1,3,1421.00,'2020-01-06 16:15:08','No'),(7,3,5,4512.00,'2020-01-06 16:15:08','No'),(8,8,3,4421.00,'2020-01-06 16:15:08','No'),(9,5,3,2141.00,'2020-01-06 16:15:08','No'),(10,1,5,1251.00,'2020-01-06 16:15:08','No'),(11,10,5,450.00,'2020-01-06 16:15:08','No'),(12,11,1,123.00,'2020-01-06 16:15:08','No'),(13,11,5,142.00,'2020-01-06 16:15:08','No'),(14,13,3,142.00,'2020-01-06 16:15:08','No'),(15,1,1,1422.00,'2020-01-06 16:15:08','No'),(16,14,1,1475.00,'2020-01-06 16:15:08','No'),(17,10,3,1234.00,'2020-01-06 16:15:08','No'),(18,13,1,142.00,'2020-01-06 16:15:08','No'),(19,11,5,1253.00,'2020-01-06 16:15:08','No'),(20,14,3,1452.00,'2020-01-06 16:15:08','No'),(21,8,80,1.00,'2020-01-06 23:57:22','No'),(22,8,NULL,1500.00,'2020-01-06 23:57:37','No'),(23,8,80,1501.00,'2020-01-06 23:57:47','No'),(24,8,80,1601.00,'2020-01-07 00:15:39','No'),(25,100,80,1.00,'2020-01-07 08:51:03','No'),(26,100,80,1236.00,'2020-01-07 08:51:15','No'),(27,100,NULL,1301.00,'2020-01-07 09:00:59','No'),(28,100,80,1346.00,'2020-01-07 09:11:33','No'),(29,16,81,1.00,'2020-01-07 10:43:53','No'),(30,100,NULL,1801.00,'2020-01-07 11:00:01','No');
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
  `CatName` varchar(50) NOT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Smartphone'),(2,'Smartwacth'),(3,'Laptop'),(4,'Tablet'),(5,'Camera'),(6,'Earphone'),(7,'Fashion'),(8,'Sport'),(9,'Book'),(10,'Toys'),(11,'test');
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
  `Message` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`CommID`),
  KEY `fk_communication_user1` (`User1ID`),
  KEY `fk_communication_user2` (`User2ID`),
  CONSTRAINT `fk_communication_user1` FOREIGN KEY (`User1ID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_communication_user2` FOREIGN KEY (`User2ID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communication`
--

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;
/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedID` int(11) NOT NULL AUTO_INCREMENT,
  `User1ID` int(11) DEFAULT NULL,
  `User2ID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Comment` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`FeedID`),
  KEY `fk_feedback_user1` (`User1ID`),
  KEY `fk_feedback_user2` (`User2ID`),
  CONSTRAINT `fk_feedback_user1` FOREIGN KEY (`User1ID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_feedback_user2` FOREIGN KEY (`User2ID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,80,2,'2020-01-07',1,'Good bidder'),(2,1,80,'2020-01-07',4,'Good bidder'),(3,80,2,'2020-01-07',4,'good seller');
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
  `Title` varchar(150) DEFAULT NULL,
  `TinyDes` varchar(2000) DEFAULT NULL,
  `FullDes` varchar(4000) DEFAULT NULL,
  `Condition` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT 'No',
  `CatID` int(11) DEFAULT NULL,
  `MinPoint` int(11) DEFAULT NULL,
  `StartBidAmount` decimal(9,2) DEFAULT NULL,
  `CurrentBidAmount` decimal(9,2) DEFAULT NULL,
  `AuctionStart` datetime DEFAULT NULL,
  `AuctionEnd` datetime DEFAULT NULL,
  `SellerID` int(11) DEFAULT NULL,
  `ShipPrice` decimal(5,2) DEFAULT NULL,
  `BidderID` int(11) DEFAULT NULL,
  `AccountType` varchar(45) DEFAULT NULL,
  `AccountNo` char(45) DEFAULT NULL,
  `maxPrice` decimal(9,2) DEFAULT NULL,
  `itemcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `fk_item_category_idx` (`CatID`),
  KEY `fk_item_user_idx` (`SellerID`),
  KEY `fk_item_bidder_idx` (`BidderID`),
  FULLTEXT KEY `Title` (`Title`),
  FULLTEXT KEY `Title_2` (`Title`),
  FULLTEXT KEY `FullDes` (`FullDes`),
  FULLTEXT KEY `TinyDes` (`TinyDes`),
  FULLTEXT KEY `Title_3` (`Title`,`FullDes`,`TinyDes`),
  FULLTEXT KEY `Title_4` (`Title`,`FullDes`,`TinyDes`,`Condition`),
  FULLTEXT KEY `Title_5` (`Title`,`FullDes`,`TinyDes`),
  FULLTEXT KEY `Title_6` (`Title`,`FullDes`,`TinyDes`,`Condition`),
  FULLTEXT KEY `Title_7` (`Title`,`FullDes`,`TinyDes`),
  FULLTEXT KEY `Title_8` (`Title`,`TinyDes`,`FullDes`),
  CONSTRAINT `fk_item_bidder` FOREIGN KEY (`BidderID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `fk_item_category` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`),
  CONSTRAINT `fk_item_seller` FOREIGN KEY (`SellerID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Redmi K20 Pro Prime','camera pop-up, tràn viền','Redmi K20 Pro Prime là chiếc phiên bản nâng cấp của K20 pro được trang bị chip xử lý Snapdragon 855+, cảm biến vân tay trong màn hình, camera 48Mp và không có tai thỏ. Thiết kế điện thoại Redmi K20 Pro Prime không có gì khác với K20 Pro. Redmi K20 Pro Prime vẫn sử dụng chất liệu shapphire để bảo vệ cho ống kính phía trước và có khả năng chống mài mòn và trầy trước. Cùng với viên pin 4.000mAh, có hỗ trợ NFC và được tối ưu AI trở nên thông minh hơn nhằm đảm bảo thời lượng pin được lâu hơn. Xiaomi cũng duy trì cổng tai nghe 3,5mm cho người dùng và kèm theo đó là có hỗ trợ âm thanh Hi-Fi. Đi kèm với máy là củ sạc tiêu chuẩn 27W theo Xiaọmi công bố thì chỉ mất khỏag 72 phút là có thể sạc đầy máy và 30 phút sẽ được 58% dung lượng pin. Redmi K20 Pro Prime sử dụng vi xử lý Qualcomm Snapdragon 855+, so với thế hệ trước, tần số tối đa của CPU được nâng lên 2,96 GHz, tần số GPU lên tới 675 MHz và khả năng xử lý hình ảnh tăng 15%. Hiệu ứng và hình ảnh giờ đây đề đã được điều chỉnh tốt nhất và hoạt động ổn định và mượt mà hơn. Xiaomi cho biết, Redmi K20 Pro Prime vẫ sở hữu cảm biến vân tay quang trong màn hình thế hệ thứ 7 giống mẫu K20 Pro có tốc độ nhanh hơn và hiệu quả hơn khi mở khóa điện thoại.','Excellent','Yes',1,100,99999.00,99999.00,'2019-11-06 16:15:08','2019-12-06 16:15:08',6,NULL,3,NULL,NULL,NULL,NULL),(2,'Redmi K30 5G','camera đục lỗ, tràn viền','Điểm độc đáo nhất của Redmi K30 5G là thiết kế màn hình đục lỗ, trong đó phần ‘nốt ruồi’ được đặt ở góc phía trên cùng bên trái để chứa cụm camera selfie kép, camera dạng Pop-up độc đáo đã không còn nữa thay vào đó là cụm 4 Camera độc đáo ở mặt lưng. Redmi K30 được trang bị màn hình đục lỗ 6.67 inch, sử dụng tấm nền IPS LCD với độ phân giải Full HD+ (1080 x 2400 pixel), tỷ lệ khung hình 20:9. Redmi K30 sẽ có màn hình tần số quét lên đến 120Hz. Redmi K30 được trang bị màn hình đục lỗ 6.67 inch, sử dụng tấm nền IPS LCD với độ phân giải Full HD+ (1080 x 2400 pixel), tỷ lệ khung hình 20:9. Redmi K30 sẽ có màn hình tần số quét lên đến 120Hz. Redmi K30 được trang bị màn hình đục lỗ 6.67 inch, sử dụng tấm nền IPS LCD với độ phân giải Full HD+ (1080 x 2400 pixel), tỷ lệ khung hình 20:9. Redmi K30 sẽ có màn hình tần số quét lên đến 120Hz.Màn hình của trước và sau của điện thoại đều được bảo vệ bằng kính cường lực Gorilla Glass 5, không phải tiêu chuẩn mới nhất của Corning nhưng vẫn cực kì chắc chắn có khả năng bảo vệ khá tốt.Camera selfie của  Redmi K30 5G là một nét độc đáo riêng của dòng K này. Cụm Camera Selfie 20MP +2MP được thiết kế khác so mới thế hệ trước, không còn dạng Pop-up mà thay vào đó là ẩn dưới màn hình góc bên phải. Với cụm camera này người dùng hoàn toàn có thể yên tâm về chất lượng chụp ảnh xóa phông khi selfie trên thiết bị.Camera sau của Xiaomi Redmi K30 được bố trí khá độc đáo. Sản phẩm gồm 4 Camera: 64 MP, f/1.8, 26mm (góc rộng) + 8 MP (Zoom) + 5 MP (siêu rộng) + 2 MP (Xóa phông) được đặt thẳng hàng trong vòng tròn đồng tâm phía sau tạo sự cân đối cũng như tạo điểm nhấn cho Camera.Khác với phiên bản Redmi K30 4G thì phiên bản Redmi K30 5G sử dụng vi xử lý Qualcomm Snapdragon 765G cho thiết bị mới này của họ. Đối với Snapdragon 765, con chip này được sản xuất trên tiến trình công nghệ 7nm. Vi xử lý Snapdragon 765G là sản phẩm đầu tiên tầm trung được tích hợp sẵn 5G nên cho tốc độ tải xuống và giảm tiêu thụ pin hơn 35% phần trăm.CPU Snapdragon 765 là một con chip mới cực mạnh thời điểm hiện tại với CPU của S855 và GPU của S865. Hứa hẹn một hiệu năng vượt trội so với các vi sử lý tầm trung hiện tại.CPU Snapdragon 765 là một con chip mới cực mạnh thời điểm hiện tại với CPU của S855 và GPU của S865. Hứa hẹn một hiệu năng vượt trội so với các vi sử lý tầm trung hiện tại.CPU Snapdragon 765 là một con chip mới cực mạnh thời điểm hiện tại với CPU của S855 và GPU của S865. Hứa hẹn một hiệu năng vượt trội so với các vi sử lý tầm trung hiện tại.CPU Snapdragon 765 là một con chip mới cực mạnh thời điểm hiện tại với CPU của S855 và GPU của S865. Hứa hẹn một hiệu năng vượt trội so với các vi sử lý tầm trung hiện tại.CPU Snapdragon 765 là một con chip mới cực mạnh thời điểm hiện tại với CPU của S855 và GPU của S865. Hứa hẹn một hiệu năng vượt trội so với các vi sử lý tầm trung hiện tại. ','Excellent','No',1,200,799.00,19999.00,'2020-01-06 15:12:05','2020-01-31 16:15:08',2,NULL,2,NULL,NULL,NULL,NULL),(3,'Mi CC9 Pro','màn hình giọt nước','Sau một thời gian chờ đợi, cuối cùng Xiaomi cũng đã chính thức ra mắt chiếc smartphone Xiaomi Mi CC9 Pro với 5 camera ở mặt sau, trong đó camera chính sử dụng cảm biến độ phân giải tới 108 MP','Good','Yes',1,150,899.00,4999.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',4,NULL,1,NULL,NULL,NULL,NULL),(4,'Xiaomi MI 9 Pro 5G','màn hình giọt nước, flashship','Tính năng nổi bật nhất của Xiaomi MI 9 Pro 5G  là việc hỗ trợ mạng di động 5G và đây chính là một trong những chiếc smartphone flagship hỗ trợ 5G có giá bán rẻ nhất thế giới hiện nay. Xiaomi cho biết với mạng 5G, tốc độ tải dữ liệu trên chiếc smartphone này có thể đạt 1,8Gb/s.','Excellent','Yes',1,100,899.00,4214.00,'2019-11-06 16:15:08','2019-12-06 16:15:08',8,NULL,8,NULL,NULL,NULL,NULL),(5,'Redmi Note 8','màn hình giọt nước, hiệu năng ổn','Redmi Note 8 được trang bị chip xử lý Snapdragon 665, với 8 lõi Kryo 260 (4 lõi 2,2Ghz và 4 lõi 1,8Ghz). Màn hình giọt nước LCD 6,3 inch với độ phân giải FullHD+.','Fair','Yes',1,60,1019.00,2145.00,'2020-01-06 15:12:05','2020-01-31 16:15:08',8,NULL,3,NULL,NULL,NULL,NULL),(6,'OnePlus 7 Pro','camera pop-up, tràn viền','Với viên pin 4.000 mAh, OnePlus 7 Pro cho phép bạn sử dụng cả ngày mà không phải lo pin \"cạn\". Tuy nhiên, máy lại thiếu đi tính năng hiện đang có trên một số chiếc flagship: Tính năng sạc không dây. OnePlus tin rằng công nghệ này chưa đủ nhanh so với những gì người tiêu dùng mong đợi. Nhưng bù lại, OnePlus 7 Pro có công nghệ sạc nhanh Warp Charge 30 W, giúp bạn sạc từ 0-50% trong 20 phú','Fair','No',1,10,799.00,4214.00,'2020-01-06 21:12:05','2020-01-20 16:15:08',2,NULL,2,NULL,NULL,NULL,NULL),(7,'OnePlus 7T Pro','camera pop-up, tràn viền','OnePlus 7T Pro ở phần mặt sau sở hữu 3 camera sau, đèn LED và nhãn hiệu OnePlus quen thuộc. Cạnh trên của OnePlus 7T Pro chứa lỗ cắm tai nghe 3.5 mm và camera selfie pop-up( thò thụt). Theo một số thí nghiệm gần đây cho thấy, camera selfie này có khả năng chống chịu cực tốt khi va chạm và có thể nâng được cả cục bê tông 22 kg. Cạnh dưới OnePlus 7T Pro có cổng sạc, khe cắm SIM và loa có tích hợp tính năng chống nước. Tuy nhiên nó lại không có Chuẩn IP. Theo một số thông tin cho biết, nếu một chiếc smartphone nhận được chứng nhận chính thức này thì sẽ tốn khá nhiều tiền. Do đó, OnePlus chỉ thử nghiệm nội bộ và không khuyến cáo người dùng thử ngâm điện thoại dưới nước.','Fair','Yes',1,0,799.00,2141.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',6,NULL,6,NULL,NULL,NULL,NULL),(8,'Samsung Galaxy Note 10','camera đục lỗ, tràn viền','Pin trên Samsung Galaxy Note 10+ cũng rất tốt. Nó được trang bị thỏi pin dung lượng lớn 4.300 mAh giúp bạn sử một ngày vô cùng dễ dàng, thậm chí có thể là hai với nhu cầu cơ bản. Nhưng anh em nào dùng hardcore hơn, điện thoại đi kèm với bộ sạc nhanh 25W trong hộp. Nó cũng hỗ trợ sạc lên tới 45W thông qua USB 3.0 được bán riêng. Theo kinh nghiệm cục sạc 25W sạc cho Galaxy Note 10+ nhanh hơn Warp Charge 30 sạc cho OnePlus 7 Pro. Sản phẩm năm nay vẫn được hỗ trợ sạc nhanh không dây, anh em có thể mua đế sạc riêng bên ngoài.','Excellent','Yes',1,100,899.00,1601.00,'2020-01-06 15:10:05','2020-01-10 16:15:08',4,NULL,80,NULL,NULL,1700.00,NULL),(9,'Samsung Galaxy Note 10 Plus','camera đục lỗ, tràn viền','Tại sự kiện ra mắt, Galaxy S10 Plus có vi xử lý Snapragon 855, còn ở thị trường khác lại là Exynos 9820. RAM tùy chọn giữa 8GB và 12GB, riêng S10+ có phiên bản bộ nhớ lên đến 1TB. Phiên bản tiêu chuẩn của Samsung Galaxy S10 Plus cũ có bộ nhớ 128GB, hỗ trợ thẻ nhớ microSD. Bạn hoàn toàn có thể nâng cấp thêm bộ nhớ nhờ thẻ SD kèm thêm.','Excellent','No',1,240,1019.00,1254.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',8,NULL,8,NULL,NULL,NULL,NULL),(10,'Samsung Galaxy S10 Plus','camera đục lỗ, tràn viền','Đặc điểm nổi bật của Samsung Galaxy S10+: ROM lên đến 512GB','Poor','Yes',1,260,1019.00,1421.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',8,NULL,5,NULL,NULL,NULL,NULL),(11,'Xiaomi Huami Amazfit Stratos 3+','Chất liệu : Thép Titanium cao cấp , Kính Sapphire','Mới đây Xiaomi Huami đã cho ra mắt bộ 3 sản phẩm là : Huami Amazfit GTS , Huami Amazfit X Smartband đặc biệt là Huami Amazfit Stratos 3 . Sản phẩm được mong đợi nhất tiếp nối thành công từ Amazfit Stratos thế hệ 2 năm ngoái. Với thiết kế đẹp , chống nước 5ATM và đủ các tính năng như Garmin cao cấp mà giá chỉ 3.290.000đ thì Xiaomi Amazfit Stratos 2 , Huami Amazfit Stratos 3 cải tiến với thiết kế mới , nâng cấp phần cứng , màn hình fullmoon , chất liệu titanium cao cấp sang trọng ….','Poor','Yes',2,200,899.00,2142.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',6,NULL,5,NULL,NULL,NULL,NULL),(12,'Xiaomi Huami Amazfit GTS','Phiên bản quốc tế chính hãng Digiworld','Huami Amazfit GTS có thiết kế ngay lập tức thấy quen thuộc gợi nhớ phần lớn đến Apple Watch Series 4. Amazfit GTS có màn hình AMOLED hình chữ nhật với kích thước 1,65 inch và độ phân giải 348 x 438 mật độ điểm ảnh 341 ppi cực kì sắc nét và gam màu 100% NTSC màu sắc cực kì trung thực . Mô-đun khung đồng hồ Amazfit GTS  chính được làm từ hợp kim nhôm loại hàng không aluminium alloy , có độ dày 9,4mm cực kì mỏng và trọng lượng siêu nhẹ chỉ 24,8g.','Good','No',2,100,1019.00,5471.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(13,'Samsung Galaxy Watch','Samsung Galaxy Watch 46mm – thế hệ smartwatch mới nhất của samsung','Chiếc đồng hồ Galaxy mang đến cuộc sống với độ bền cấp quân sự, khả năng chống nước sẵn sàng cho bơi lội tiêu chuẩn 5ATM và Corning Gorilla Glass DX + ngăn màn hình không bị trầy xước. Có hai kích cỡ và ba màu, Galaxy Watch cung cấp các mặt đồng hồ phong cách rất thực tế, chúng hầu như nhìn như đồng hồ truyền thống . Ngoài ra, hãy chọn từ bộ sưu tập mặt đồng hồ phong phú hơn trước rất nhiều.','Good','Yes',2,100,799.00,2142.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,3,NULL,NULL,NULL,NULL),(14,'Samsung Gear S3 Frontier','SAMSUNG GEAR S3 FRONTIER PHIÊN BẢN LTE THỂ THAO','Đạt tiêu chuẩn chống nước IP68 nên Gear S3 frontier có thể chống nước rất tốt khi bạn rửa tay hay dính nước mưa.','Poor','Yes',2,100,1019.00,1212.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',6,NULL,1,NULL,NULL,NULL,NULL),(15,'Huawei Watch GT 2 Sport','ĐỒNG HỒ THÔNG MINH SMARTWATCH HUAWEI WATCH GT 2 SPORT – SMARTWATCH MỚI RA MẮT CỦA HUAWEI VỚI NHIỀU ƯU ĐIỂM VƯỢT TRỘI SO VỚI CÁC THIẾT BỊ KHÁC','Với phiên bản Huawei Watch GT 2 mới , Trên thế hệ mới Huawei nâng cấp với chip tự phát triển HUAWEI Kirin A1 đảm bảo hiệu suất cao và tiêu thụ điện năng cực kỳ thấp thiết kế chip kép và công nghệ tiết kiệm năng lượng thông minh, thời lượng sử dụng pin phục vụ bạn cả ngày lẫn đêm trong tối đa 2 tuần liên tục.','Excellent','Yes',2,100,899.00,900.00,'2020-01-06 15:12:01','2020-01-20 16:15:08',2,NULL,5,NULL,NULL,NULL,NULL),(16,'MSI GP73 8RD-229VN Leopard','i7-8750H | 8GB DDR4 | 128GB SSD + 1TB HDD | GeForce GTX 1050Ti 4GB | 17.3 FHD | Win10','Model	MSI GP73 8RD-229VN Leopard. Intel® Core™ i7-8750H (2.20GHz upto 4.10GHz, 6Cores, 12Threads, 9MB cache, FSB 8GT/s) 128GB SSD M.2 PCIe3x4 NMVe (Super Raid) + 1TB HDD 7200rpm','Poor','No',3,100,55599.00,1.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',8,NULL,81,NULL,NULL,80000.00,NULL),(17,'MSI GS65 8RE-242VN Stealth Thin','i7-8750H | 16GB DDR4 | 256GB SSD | Geforce GTX 1060 6GB | 15.6 FHD 144Hz | Win10','Intel® Core™ i7-8750H (2.20GHz upto 4.10GHz, 6Cores, 12Threads, 9MB cache, FSB 8GT/s)','Excellent','Yes',3,100,899.00,1242.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',8,NULL,5,NULL,NULL,NULL,NULL),(18,'MSI GS63 8RD-006VN Stealth','i7-8750H | 8GB DDR4 | 128GB SSD + 1TB HDD | GeForce GTX 1050Ti 4GB | 15.6 FHD 120Hz | Win10','Intel® Core™ i7-8750H (2.20GHz upto 4.10GHz, 6Cores, 12Threads, 9MB cache, FSB 8GT/s)','Excellent','Yes',3,100,15269.00,57421.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',2,NULL,1,NULL,NULL,NULL,NULL),(19,'MSI GE63 8RE-266VN Raider RGB Edition','i7-8750H | 16GB DDR4 | 128GB SSD + 1TB HDD | GeForce GTX 1060 6GB | 15.6 FHD 120Hz |','Intel® Core™ i7-8750H (2.20GHz upto 4.10GHz, 6Cores, 12Threads, 9MB cache, FSB 8GT/s)','Poor','No',3,100,899.00,12454.00,'2020-01-06 15:11:05','2020-01-20 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(20,'MSI GE63 8RE-410VN Raider RGB Edition','i7-8750H | 16GB DDR4 | 128GB SSD + 1TB HDD | GeForce GTX 1060 6GB | 15.6 FHD 120Hz | Win10','Intel® Core™ i7-8750H (2.20GHz upto 4.10GHz, 6Cores, 12Threads, 9MB cache, FSB 8GT/s)','Poor','Yes',3,100,1239.00,2145.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,3,NULL,NULL,NULL,NULL),(21,'Mi Pad 4 Plus','Xiaomi Mi Pad 4/MiPad 4 Plus là chiếc máy tính bảng Android trang bị màn hình 8 inch/10.1 inch, vi xử lý Snapdragon 660 với 2 phiên bản Wifi only và LTE 4G, Pin lên tới 8.620 mah','Hình: Full HD, 8 “/10.1”, 1200 x 1920 pixel. Hệ điều hành:Android 8.1 (Oreo); MIUI 9. Camera sau:13 MP, 1080p @ 30fps. Camera trước: 5 MP. CPU: Qualcomm SDM660 Snapdragon 660, 8 nhân, Octa-core (4×2,2 GHz Kryo 260 & 4×1,8 GHz Kryo 260)','Poor','Yes',4,100,799.00,2351.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',6,NULL,6,NULL,NULL,NULL,NULL),(22,'Samsung Galaxy Tab A 10.1 T515 (2019)','Samsung Galaxy Tab A 10.1 T515 (2019) là chiếc máy tính bảng có màn hình lớn cùng cấu hình vừa phải đáp ứng tốt cho bạn trong hầu hết các nhu cầu giải trí hằng ngày.','Với màn hình kích thước lớn lên tới 10.1 inch thì chiếc máy tính bảng Samsung giúp bạn có một không gian lớn hơn để có thể làm việc hay giải trí.Máy còn sở hữu riêng chế độ ngoài trời giúp bạn có thể theo dõi nội dung hiển thị một cách rõ ràng nhất mà không sợ hiện tượng lóa hay in bóng. Một điểm cộng khác rất đáng giá trên thiết kế của máy là với phiên bản 2019 thì Samsung đã mang lên máy thân hình kim loại cứng cáp và chắc chắn hơn thay vì nhựa như những phiên bản trước đó.','Poor','Yes',4,100,799.00,1254.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,5,NULL,NULL,NULL,NULL),(23,'Samsung Galaxy Tab A8 8\" T295 (2019)','Samsung Galaxy Tab A8 8 inch T295 (2019) là một chiếc máy tính bảng gọn nhẹ, với màn hình vừa đủ có thể giúp bạn giải trí hay hỗ trợ trẻ nhỏ trong việc học tập.','Màn hình của chiếc máy tính bảng Samsung được thiết kế theo tỷ lệ 16:10 – rất lý tưởng cho việc đọc sách, tạp chí, đọc báo hoặc lướt web.Màn hình của máy có độ phân giải 1280 x 800 pixels cho hình ảnh hiển thị chi tiết, giúp bạn thoải mái lướt web hay xem phim phụ đề mà không mỏi mắt.Chiếc máy tính bảng này được thiết kế với vỏ kim loại nhám nhẹ cùng các góc bo tròn cho cảm giác chắc chắn, không bám vân tay khi cầm.','Excellent','No',4,100,4529.00,12547.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(24,'iPad Mini 7.9 inch Wifi 64GB (2019)','Nhiều người đồn đoán rằng Apple đã khai tử dòng iPad Mini của mình khi đã 4 năm kể từ thế hệ mới nhất không có thêm bất cứ nâng cấp nào. Tuy nhiên iPad Mini 7.9 inch Wifi 2019 ra mắt và đánh dấu sự trở lại của một chiếc máy tính bảng nhỏ gọn như ngày nào','IPad mini 4 và iPad Mini 7.9 inch Wifi 2019 là bước nhảy vọt về hiệu năng từ bộ xử lý A8 sang A12 Bionic mới nhất mang lại \"hiệu năng gấp 3 lần và đồ họa nhanh hơn 9 lần\".Đồng thời, dung lượng RAM đã có sự nâng cấp nhẹ so với thế hệ thứ 4, tăng từ 2 GB lên RAM 3 GB giúp bạn chạy đa nhiệm nhiều ứng dụng tốt hơn.Chip A12 Bionic được trang bị trên iPad Mini 7.9 inch Wifi 2019 là một trong những bộ xử lý di động tốt nhất trong việc chơi game hiện nay, đồng thời giúp xử lí các tác vụ khác một cách mượt mà.','Poor','No',4,100,899.00,2121.00,'2020-01-06 15:12:11','2020-05-31 16:15:08',8,NULL,8,NULL,NULL,NULL,NULL),(25,'iPad 10.2 inch Wifi 128GB (2019)','Muốn mua một chiếc máy tính bảng với hiệu năng ổn định, có thể dùng trong khoảng 2-3 năm tới với mức giá phải chăng thì không đi đâu xa, chiếc iPad 10.2 inch Wifi 128GB (2019) chính là sự lựa chọn dành cho bạn.','Khi mà Android thì máy tính bảng sẽ sử dụng một phiên bản lớn hơn của smartphone thì những ứng dụng trên iPad được tối ưu hóa dành riêng cho thiết bị này nên người dùng sẽ có một trải nghiệm hoàn toàn khác biệt.Đặc biệt hơn năm nay Apple còn giới thiệu hệ điều hành mới dành riêng cho iPad mang tên iPad OS càng củng cố thêm lòng tin cho người dùng về sự ổn định của chiếc máy này.Về cầu hình thì chiếc iPad này sẽ sở hữu con chip Apple A10 Fusion kết hợp với 3 GB RAM và 128 GB bộ nhớ trong.Bạn có thể thoải mái sử dụng hầu hết các ứng dụng hiện nay một cách mượt mà hay thậm chí chơi một số tựa game nặng như PUBG Mobile trên chiếc máy này.','Poor','Yes',4,100,4259.00,32412.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,5,NULL,NULL,NULL,NULL),(26,'EOS M6 MARK II (EF-M18-150MM F/3.5-6.3 IS STM)','Chiếc máy ảnh này rất nhỏ gọn và nhẹ đến nỗi bạn có thể quên rằng nó nằm trong túi của bạn. EOS M6 Mark II có thể nổ tới 30 khung hình / giây với chế độ chụp RAW của nó trong khi theo dõi vũ công đó trên sân khấu mà không làm gián đoạn người khác bằng màn trập điện tử im lặng lên tới 1 / 16.000 giây (đóng băng bất kỳ chuyển động nào của vũ công)','Với chế độ chụp RAW của EOS M6 Mark II, bạn sẽ chụp được tới 30 bức ảnh trong một giây (30 khung hình / giây) – cho phép bạn chọn bức ảnh hoàn hảo khoảnh khắc đầu tiên mà người ấy thổi chiếc bánh sinh nhật của mình. Chức năng chụp trước thậm chí cho phép ghi lại tới 0,5 giây trước khi bạn nhấn nút chụp, do đó bạn cũng có thể ghi lại những khoảnh khắc thẳng thắn đó. Chế độ này không chỉ khả dụng trong One-Shot AF mà còn ở Servo AF, đảm bảo mọi hình ảnh của con bạn chập chững những bước đi đầu tiên','Fair','No',5,100,4149.00,25415.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',6,NULL,6,NULL,NULL,NULL,NULL),(27,'EOS M200 (EF-M15-45MM F/3.5-6.3 IS STM & EF-M22MM F/2 STM)','Để trở thành người ảnh hưởng xã hội, bạn cần cung cấp nội dung tốt hơn. Máy ảnh EOS M200 có các tính năng tiện dụng của nó giúp bạn đạt được hình ảnh chất lượng cao lên tới 24,1megapixel và video có độ phân giải lên tới 4K.','Quay video dọc đảm bảo rằng bạn có thể phục vụ cho nền tảng di động. Kết hợp với tính năng Smooth Skin, bộ lọc Hỗ trợ sáng tạo và bộ lọc Sáng tạo, bạn sẽ mang đến những điều tốt nhất cho bạn mọi lúc mọi nơi. Khả năng nhận diện mắt AF của EOS M200 đảm bảo ảnh selfie sắc nét ngay cả khi bạn di chuyển. Khả năng gửi hình ảnh đến các thiết bị thông minh của bạn khi bạn chụp, cung cấp cho bạn sự tiện lợi khi tải nội dung của bạn lên phương tiện truyền thông xã hội.','Poor','Yes',5,100,899.00,12123.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',8,NULL,5,NULL,NULL,NULL,NULL),(28,'EOS 3000D KIT (EF S18-55 III)','Máy ảnh kỹ thuật số phản xạ ống kính đơn lấy nét tự động / bằng tay với đèn flash tích hợp','Tự động (Ưu tiên môi trường xung quanh), Tự động (Ưu tiên màu trắng), Cài đặt sẵn (Ban ngày, Râm mát, Mây mù, Đèn Vonfram, Đèn trắng huỳnh quang, Flash), Tùy chỉnh','Poor','No',5,100,799.00,21421.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(29,'EOS 1500D KIT (EF S18-55 IS II)','Máy ảnh kỹ thuật số phản xạ ống kính đơn lấy nét tự động / bằng tay với đèn flash tích hợp','Tự động (Ưu tiên môi trường xung quanh), Tự động (Ưu tiên màu trắng), Cài đặt sẵn (Ban ngày, Râm mát, Mây mù, Đèn Vonfram, Đèn trắng huỳnh quang, Flash), Tùy chỉnh','Poor','Yes',5,100,1019.00,1245.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,5,NULL,NULL,NULL,NULL),(30,'EOS M5 KIT (EF-M15-45 IS STM)','	Máy ảnh kỹ thuật số không phản xạ ống kính đơn, lấy nét tự động (AF)/phơi sáng tự động (AE)','Đứng đầu dòng sản phẩm máy ảnh không gương lật, EOS M5 mang đến những bức hình tuyệt đẹp với kích cỡ APS-C lớn, cảm biến 24.2MP, độ phân giải cao với Ống ngắm điện tử (EVF) có 2.36 triệu điểm ảnh và tay kẹp tiện dụng và mạnh mẽ, nằm trong thân máy nhỏ gọn và nhẹ. Hệ thống lấy nét tự động sử dụng công nghệ lấy nét tự động cảm biến CMOS điểm ảnh kép, có khả năng lấy nét nhanh chóng và chính xác. Tính năng Chạm & Kéo để lấy nét cho phép thao tác lấy nét của màn hình cảm ứng chính xác hơn thậm chí trong khi chụp bằng ống ngắm. Quy trình xử lý ảnh RAW trên máy ảnh được hỗ trợ như việc sử dụng công nghệ Bluetooth năng lượng thấp cho phép sử dụng trong một khoảng thời gian dài hơn so với các thiết bị khác – Điều tuyệt vời dành cho chế độ chụp từ xa đơn giản và ngay lập tức.','Excellent','No',5,100,899.00,1212.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,2,NULL,NULL,NULL,NULL),(31,'Tai nghe i27 Pro Max','định vị, đổi tên','Tết Nguyên Đán 2020 đang cận kề, Chơi Hay tiếp tục mang đến cho các bạn 1 món hời công nghệ đó là \"CHÙM CUỐI\" chiếc Tai nghe Bluetooth I27 PRO MAX TWS phiên bản cao cấp nhất so với i27 và i27 Pro','Fair','Yes',6,100,1019.00,3654.00,'2019-12-06 16:15:08','2020-01-29 17:44:42',2,NULL,1,NULL,NULL,NULL,NULL),(32,'Tai nghe Sabbat X12 Ultra TWS','	Bluetooth 5.0','Chính hãng mới nguyên Seal 100%. Sản phẩm bao gồm hộp, dock sạc, tai nghe, cable type C, sách hướng dẫn sử dụng, túi đựng. Bảo hành 1 đổi 1 trong 30 ngày nếu có bất kỳ lỗi gì của nhà sản xuất. Bảo hành mặc định 3 tháng.','Fair','Yes',6,100,1019.00,2541.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',4,NULL,3,NULL,NULL,NULL,NULL),(33,'Tai nghe Sabbat E12 Ultra TWS','	Bluetooth 5.0','Chính hãng mới nguyên Seal 100%. Sản phẩm bao gồm hộp, dock sạc, tai nghe, cable type C, sách hướng dẫn sử dụng, túi đựng. Bảo hành 1 đổi 1 trong 30 ngày nếu có bất kỳ lỗi gì của nhà sản xuất. Bảo hành mặc định 3 tháng.','Excellent','No',6,100,1019.00,8542.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(34,'Tai nghe Apple Zin Lightning','chính hãng','Bảo hành chính hãng - 1 đổi 1 trong 12 tháng nếu có lỗi của nhà sản xuất.','Excellent','Yes',6,100,899.00,1234.00,'2019-12-06 16:15:08','2019-12-31 16:15:08',6,NULL,5,NULL,NULL,NULL,NULL),(35,'Tai nghe Samsung AKG cổng Type C','Mới chính hãng 100%','Bảo hành chính hãng - 1 đổi 1 trong 12 tháng nếu có lỗi của nhà sản xuất.','Good','Yes',6,100,1019.00,3665.00,'2020-01-06 15:12:05','2020-01-31 16:15:08',2,NULL,5,NULL,NULL,NULL,NULL),(36,'Áo khoác công năng a.k.a Functional Jacket','Một chiếc áo khoác KHÔNG chống thấm. Vậy bức hình đầu tiên bên dưới ý nghĩa gì? Mẫu Jacket này chỉ có tính năng CHỐNG BÁM NƯỚC (water-repellent) chứ không chống thấm (water-proof)','Toàn bộ khoá kéo đến từ tổng công ty YKK, được Grimm DC đặt sản xuất riêng (tất cả hàng YKK bán sẵn trên thị trường đều là hàng giả, vì YKK không có mảng bán lẻ, chỉ sản xuất theo đơn đặt hàng). Đặc biệt là dây kéo chính sử dụng 2 đầu khoá - điều chỉ xuất hiện ở các phiên bản áo khoác cao cấp.','Good','Yes',7,100,799.00,1245.00,'2019-12-06 16:15:08','2019-12-31 16:15:08',2,NULL,3,NULL,NULL,NULL,NULL),(37,'Quần Iron Flame','Mẫu quần đầu tiên của Grimm DC. Được làm ra với mục đích ban đầu là...đi rừng. Vì thế sẽ có rất nhiều chi tiết phục vụ cho việc này','Khoá gài ống quần sử dụng chất liệu velcro đặc biệt với thiết kế đúc nhựa nguyên khối ở từng chân cài. Theo những thí nghiệm mà đối tác cung cấp mã velcro này cho chúng tôi đã thực hiện, khoá gài có thể chịu được 10.000 lần đóng mở và vẫn giữ được độ bám dính tuyệt đối như lần đầu sử dụng. Đảm bảo khả năng quấn chặt và bảo vệ phần ống quyển tốt nhất.','Poor','No',7,120,799.00,2541.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',4,NULL,4,NULL,NULL,NULL,NULL),(38,'LINE WINDBREAKER JACKET','NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made in Vietnam','Đai thun lưng quần được gia cố bằng dây buộc 100% cotton (chứ không phải dây poly thường dùng ở các mẫu quần thời trang), kèm theo đầu dây lẫn đầu lỗ xỏ dây được đóng mắt cáo và bọc kim loại. Đảm bảo độ bền tốt nhất','Excellent','Yes',7,200,799.00,3652.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',6,NULL,5,NULL,NULL,NULL,NULL),(39,'NOWSAIGON WINDBREAKER JACKET TRẮNG','NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made in Vietnam','Pattern Iron Flame - Đại Định Sơn Hà do Grimm DC phát triển suốt 3 tháng qua, được đặt ở nắp túi hộp đùi trái sử dụng decal phản quang đặc biệt Reflective Silver của đối tác Siser - Italia, giúp dễ tìm kiếm nhau khi lạc giữa đêm. Mẫu decal này sẽ đạt độ kích ứng và phản quang rất mạnh với ánh đèn pin đi rừng chuyên dụng','Poor','Yes',7,200,799.00,12312.00,'2019-12-06 16:15:08','2019-12-31 16:15:08',2,NULL,1,NULL,NULL,NULL,NULL),(40,'ICE LOGO TEE','NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made in Vietnam','Bố trí tổng cộng 8 túi, trong đó có 2 túi đặc biệt: một túi giắt dao ở ổng quyển bên phải và một túi bí mật sử dụng khoá YKK vislon ở hông phải. Đảm bảo tính tiện dụng tốt nhất.','Poor','No',7,200,1019.00,8562.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,4,NULL,NULL,NULL,NULL),(41,'Vợt cầu lông Yonex Astrox 99 LCW','Vợt cầu lông Yonex Astrox 99 LCW là sản phẩm giới hạn được Yonex cho ra mắt nhằm tri ân Lee Chong Wei-Huyền thoại cầu lông đơn nam số 1 thế giới người Malaysia khi anh quyết định giải nghệ vì lí do sức khỏe','Vợt cầu lông Yonex Astrox 99 LCW là sản phẩm giới hạn được Yonex cho ra mắt nhằm tri ân Lee Chong Wei-Huyền thoại cầu lông đơn nam số 1 thế giới người Malaysia khi anh quyết định giải nghệ vì lí do sức khỏe. Tích hợp cho mình những công nghệ tối ưu và tân tiến nhất từ Yonex, Yonex Astrox 99 LCW hiện đang là cây vợt được nhiều người mong muốn sở hữu nó.','Poor','Yes',8,200,1019.00,2145.00,'2019-12-06 16:15:08','2019-12-31 16:15:08',8,NULL,5,NULL,NULL,NULL,NULL),(42,'Vợt cầu lông Yonex NanoFlare 800','Vợt cầu lông Yonex NanoFlare 800 là một trong những dòng vợt nhẹ, thân vợt cứng giúp người chơi thực hiện những động tác chính xác, hỗ trợ và cải thiện khả năng điều cầu. ','Vợt cầu lông Yonex NanoFlare 800 là một trong những dòng vợt nhẹ, thân vợt cứng giúp người chơi thực hiện những động tác chính xác. Vợt hơi nhẹ đầu, thích hợp đánh công thủ toàn diện. Đây sẽ là dòng vợt ra mắt dành cho những đối tượng yêu thích dòng vợt tốc độ, cần thân vợt cứng hơn, đầm tay hơn.','Good','No',8,300,799.00,2152.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',6,NULL,2,NULL,NULL,NULL,NULL),(43,'Vợt cầu lông Yonex LD Force 2019','VOLTRIC LD-FORCE sử dụng vật liệu than chì đặc biệt NANOMETRIC DR *, nổi bật với độ bền và khả năng phục hồi được tăng cường trên toàn bộ phần khung.','VOLTRIC LD-FORCE sử dụng vật liệu than chì đặc biệt NANOMETRIC DR *, nổi bật với độ bền và khả năng phục hồi được tăng cường trên toàn bộ phần khung.','Poor','Yes',8,120,899.00,4521.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',4,NULL,1,NULL,NULL,NULL,NULL),(44,' Giày Thể Thao Nam Biti\'s Hunter X 2k19 - Jet Black DSMH02200DEN (Đen)','Kế thừa những ưu điểm vượt trội về mặt công nghệ và thiết kế từ các phiên bản tiền nhiệm','Giày Thể Thao Nam Biti\'s Hunter X 2k19 - Jet Black DSMH02200DEN sở hữu nhiều cải tiến về công nghệ lẫn thiết kế, hứa hẹn sẽ gặt hái nhiều thành công. Bên cạnh đó, dòng cao cấp Biti\'s Hunter X tiếp xúc kế thừa những ưu điểm vượt trội về mặt công nghệ và thiết kế từ các phiên bản tiền nhiệm. Phần quai: Được thiết kế với kiểu dáng tối giản, bằng lớp lưới thông thoáng. Phần đế: Cấu trúc đế Eva phun tăng độ bám dính, nhẹ, đàn hồi, thoải mái trong từng vận động','Excellent','No',8,100,1019.00,3652.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',6,NULL,4,NULL,NULL,NULL,NULL),(45,'Giày Thể Thao Nam Biti’s Hunter X – 2K18 – DSUH00500DEN - Midnight Black II','Công nghệ LiteFlex độc quyền','Giày Thể Thao Nam Biti’s Hunter X – 2K18 – DSUH00500DEN - Midnight Black II với công nghệ đế LiteFlex độc quyền từ Biti\'s Hunter ứng dụng công nghê sản xuất IP trên nền chất liệu Phylon không chỉ giúp đôi chân cảm giác \"Nhẹ nHư bay\" mà còn tăng vượt bậc độ đàn hồi, tạo độ linh hoạt và tự tin hơn khi chiều cao đế đạt tới 5cm.','Fair','Yes',8,110,799.00,2142.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',8,NULL,1,NULL,NULL,NULL,NULL),(46,'Cây Chuối Non Đi Giày Xanh','Sách Tiêu Biểu Của Nguyễn Nhật Ánh - Tặng Kèm Postcard Happy Life','Một trong những cuốn sách nổi tiếng của Nguyễn Nhật Ánh. Với câu từ giản dị, nhẹ nhàng mà thấm đượm chất dân dã thôn quê, toát lên nét bình dị, mộc mạc, gần gũi thông qua lăng kính của những nhân vật thơ bé. Kỷ niệm bao giờ cũng đẹp và đặc biệt là không biết phản bội. Câu chuyện này kể về kỷ niệm. Có nỗi sợ trẻ con ai cũng từng qua, có rung động mơ hồ đủ khiến hồi hộp đỏ mặt. Mối ghen tuông len lỏi, nỗi buồn thắt tim, và những giấc mơ trong veo êm đềm mang đến niềm vui, niềm hy vọng Truyện dài mới nhất của nhà văn Nguyễn Nhật Ánh lần này chỉ có một bài hát lãng mạn có lẽ ai cũng mê, còn lại là những con chữ mang đến hạnh phúc. Để dành tặng cho các bạn trẻ, và những ai từng qua tuổi ấu thơ.','Poor','No',9,101,899.00,899.00,'2020-01-06 15:12:05','2020-01-31 16:15:08',4,NULL,1,NULL,NULL,NULL,NULL),(47,'LÀM BẠN VỚI BẦU TRỜI - Nguyễn Nhật Ánh','Sách Tiêu Biểu Của Nguyễn Nhật Ánh - Tặng Kèm Postcard Happy Life','Viết về điều tốt đã không dễ, viết sao cho người đọc có thể đón nhận đầy cảm xúc tích cực, và muốn  được hưởng, được làm những điều tốt dù nhỏ bé mới thật là khó. Làm bạn với bầu trời của Nguyễn Nhật Ánh đã làm được điều này, anh đã “mô tả cái tốt thật đẹp để người ta yêu thích nó”, như  anh  từng phát biểu “ điểm mạnh của văn chương nằm ở khả năng thẩm thấu. Bằng hình thức đặc thù của mình, văn chương góp phần mài sắc các ý niệm đạo đức nơi người đọc một cách vô hình. Bồi đắp tâm hồn và nhân cách một cách âm thầm và bền bỉ, đó là chức năng gốc rễ của văn chương, đặc biệt là văn chương viết cho thanh thiếu niên.”','Excellent','Yes',9,100,799.00,2142.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',6,NULL,3,NULL,NULL,NULL,NULL),(48,'Truyện Nguyễn Nhật Ánh: Ngày Xưa Có Một Chuyện Tình','Sách Tiêu Biểu Của Nguyễn Nhật Ánh - Tặng Kèm Postcard Happy Life','Khi mở sách ra, độc giả sẽ được chứng kiến làn gió tình yêu chảy qua như rải nắng trên khuôn mặt mùa đông của cô gái; nụ hôn đầu tiên ngọt mật, cái ôm đầu tiên, những giọt nước mắt và cái ôm xiết cuối cùng của tấm tình người yêu người… Và người đọc sẽ tìm thấy câu trả lời, cho riêng mình.','Good','Yes',9,100,1019.00,2313.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',8,NULL,3,NULL,NULL,NULL,NULL),(49,'Ngồi Khóc Trên Cây: Truyện Dài - Nguyễn Nhật Ánh','Sách Tiêu Biểu Của Nguyễn Nhật Ánh - Tặng Kèm Postcard Happy Life','Mở đầu là kỳ nghỉ hè tại một ngôi làng thơ mộng ven sông với nhân vật là những đứa trẻ mới lớn có vô vàn trò chơi đơn sơ hấp dẫn ghi dấu mãi trong lòng.   Mối tình đầu trong veo của cô bé Rùa và chàng sinh viên quê học ở thành phố có giống tình đầu của bạn thời đi học? Và cái cách họ thương nhau giấu giếm, không dám làm nhau buồn, khát khao hạnh phúc đến nghẹt thở có phải là câu chuyện chính?','Fair','Yes',9,100,1019.00,2585.00,'2020-01-06 15:12:05','2020-01-20 16:15:08',2,NULL,1,NULL,NULL,NULL,NULL),(50,'Tôi Thấy Hoa Vàng Trên Cỏ Xanh','Sách Tiêu Biểu Của Nguyễn Nhật Ánh - Tặng Kèm Postcard Happy Life','Cuốn sách viết về tuổi thơ nghèo khó ở một làng quê, bên cạnh đề tài tình yêu quen thuộc, lần đầu tiên Nguyễn Nhật Ánh đưa vào tác phẩm của mình những nhân vật phản diện và đặt ra vấn đề đạo đức như sự vô tâm, cái ác. 81 chương ngắn là 81 câu chuyện nhỏ của những đứa trẻ xảy ra ở một ngôi làng: chuyện về con cóc Cậu trời, chuyện ma, chuyện công chúa và hoàng tử, bên cạnh chuyện đói ăn, cháy nhà, lụt lội, “Tôi thấy hoa vàng trên cỏ xanh” hứa hẹn đem đến những điều thú vị với cả bạn đọc nhỏ tuổi và người lớn bằng giọng văn trong sáng, hồn nhiên, giản dị của trẻ con cùng nhiều tình tiết thú vị, bất ngờ và cảm động trong suốt hơn 300 trang sách. Cuốn sách, vì thế có sức ám ảnh, thu hút, hấp dẫn không thể bỏ qua.','Excellent','No',9,100,799.00,1475.00,'2020-01-06 15:12:06','2020-01-31 16:15:08',6,NULL,1,NULL,NULL,NULL,NULL),(51,'NINJAGO_Lego ninja GARMADON Bạo Chúa(375 Mảnh)+ LLOYD Ninja Xanh Lá + NYA Ninja Nước','LG là một loại hình đồ chơi lắp ghép , kích thích trí thông minh SÁNG TẠO cho trẻ hàng đầu hiện nay','Gồm: Các gói mảnh ghép được chia làm nhiều túi để tiện cho con lắp theo đồ vật hoặc theo từng khu nhỏ. Giấy hướng dẫn thứ tự các bước ','Fair','Yes',10,100,899.00,32142.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',8,NULL,1,NULL,NULL,NULL,NULL),(52,'Đồ chơi lắp ráp Lego NinjaGo Đền airjitzu - LEDUO 76013','LG là một loại hình đồ chơi lắp ghép , kích thích trí thông minh SÁNG TẠO cho trẻ hàng đầu hiện nay','Đồ chơi lắp ráp Lego NinjaGo Đền airjitzu - LEDUO 76013 là sản phẩm được rất nhiều bé yêu thích, sản phẩm bao gồm 810 miếng ghép và được làm từ chất liệu nhựa thân thiện môi trường, an toàn không gây hại cho bé khi sử dụng, sản phẩm đồng bộ với các dòng sản phẩn khác của lego 70751, lepin , enlighten...,Sẩn phẩm lắp ráp Leduo phù hợp với bé từ 6 đến 14 tuổi. Sản phẩm được đóng gói trong hộp kín đi kèm có sách hướng dẫn lắp ráp từng chi tiết giúp bé hoàn thiện bộ Đồ chơi lắp ráp Lego NinjaGo Đền airjitzu - LEDUO 76013 thật nhanh chóng.','Fair','Yes',10,200,899.00,12541.00,'2020-01-06 15:12:05','2020-05-31 16:15:08',4,NULL,1,NULL,NULL,NULL,NULL),(53,'2019 New LEGO Ninjago Jay\'s Storm Fighter 70668 zimo 44002 Máy Bay Chiến Đấu Bão Của Jay','LG là một loại hình đồ chơi lắp ghép , kích thích trí thông minh SÁNG TẠO cho trẻ hàng đầu hiện nay','Sẩn phẩm lắp ráp Leduo phù hợp với bé từ 6 đến 14 tuổi. Sản phẩm được đóng gói trong hộp kín đi kèm có sách hướng dẫn lắp ráp từng chi tiết giúp bé hoàn thiện bộ Đồ chơi lắp ráp Lego NinjaGo Đền airjitzu - LEDUO 76013 thật nhanh chóng.','Excellent','Yes',10,300,799.00,3321.00,'2020-01-06 15:12:04','2020-01-31 16:15:08',2,NULL,1,NULL,NULL,NULL,NULL),(54,'Đồ chơi lắp ráp lego minifigures xếp hình ninjago season 2 ninja zane Lăng mộ xà tộc Bela 9753.','LG là một loại hình đồ chơi lắp ghép , kích thích trí thông minh SÁNG TẠO cho trẻ hàng đầu hiện nay','Chất liệu: Bộ sản phẩm được làm từ chất liệu nhựa ABS nguyên sinh cao cấp giống như chất liệu Lego dùng để sản xuất ra các sản phẩm của họ nên tuyệt đối an toàn cho người chơi. Từng mảnh ghép đều sở hữu màu sắc và kiểu dáng bắt mắt, mang lại trải nghiệm tuyệt vời','Fair','Yes',10,200,799.00,2541.00,'2020-01-06 15:20:05','2020-05-31 16:15:08',6,NULL,1,NULL,NULL,NULL,NULL),(55,'Lego ninjago BELA 10530 Hỗn chiến hang võ sĩ ninjago 1307 khối (Lego 79348 - Lepin 06039)','LG là một loại hình đồ chơi lắp ghép , kích thích trí thông minh SÁNG TẠO cho trẻ hàng đầu hiện nay','Chất liệu: Bộ sản phẩm được làm từ chất liệu nhựa ABS nguyên sinh cao cấp giống như chất liệu Lego dùng để sản xuất ra các sản phẩm của họ nên tuyệt đối an toàn cho người chơi. Từng mảnh ghép đều sở hữu màu sắc và kiểu dáng bắt mắt, mang lại trải nghiệm tuyệt vời','Good','Yes',10,100,1019.00,21452.00,'2019-11-06 16:15:08','2019-12-31 16:15:08',4,NULL,7,NULL,NULL,NULL,NULL),(100,'Test','<p>Auctions have a long history, having been recorded as early as 500 B.C. and trading, bartering and swapping goods and services are way older than that. However, it is only in the last 3 centuries that auctions have become a well-established mechanism for selling and acquiring goods and services. Traditionally used for selling property, and more recently popularised for the sale of art, antiques, collectables and electronics, millions of global auctions are now held daily allowing all of us to bid for or sell almost anything, across every market and geography imaginable</p>','<p>Auctions have a long history, having been recorded as early as 500 B.C. and trading, bartering and swapping goods and services are way older than that. However, it is only in the last 3 centuries that auctions have become a well-established mechanism for selling and acquiring goods and services. Traditionally used for selling property, and more recently popularised for the sale of art, antiques, collectables and electronics, millions of global auctions are now held daily allowing all of us to bid for or sell almost anything, across every market and geography imaginable.</p>\r\n<p>The Internet is the medium that has allowed auctions, bartering and swapping to come to almost every home owning a telephone line and a computer. The rise in popularity of global market place sites such as ebay, Alibaba, and Mercado Libre has meant that bidding for goods and services around the world is nearly as natural as buying a newspaper. But Internet users don&rsquo;t have to rely on globally recognised websites to buy, sell and swap goods; there is a massive growth in local bartering, auction and garage sale websites sites servicing neighbourhoods, schools, hobbyists and other small communities.</p>\r\n<p>The new .BID generic Top Level Domain (TLD) provides an identity for buyers and sellers to trade goods and services online. Buyers know that, when they click on a .BID link they will be visiting a website that is designed to facilitate buying and selling. The one thing that a .BID website owner can be sure of is that visitors to it are ready to exchange goods and services.</p>','Excellent','No',1,123,1234.00,1801.00,'2020-01-07 00:29:54','2020-01-10 12:29:54',80,10.00,80,'Mastercard','JEMO',2000.00,NULL),(101,'dangsanphammoi','<p>123</p>','<p>123</p>','Poor','Yes',1,123,123.00,123.00,'2020-01-07 10:53:05','2020-01-07 10:53:05',3,10.00,3,'Mastercard','JEMO',NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
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
  `Password` char(100) NOT NULL,
  `Type` int(11) DEFAULT '0',
  `Fname` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Street` varchar(250) DEFAULT NULL,
  `District` varchar(45) DEFAULT NULL,
  `City` varchar(250) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `PhoneNo` varchar(45) DEFAULT NULL,
  `Point` int(11) DEFAULT '200',
  `request` int(11) DEFAULT '0' COMMENT '0: not requrest\n1: request to seller',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `PhoneNo_UNIQUE` (`PhoneNo`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user121','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Melvin','Reilly','1969-01-01','80 White Clarendon Road','Q1','Exeter','rmelvin@gmai.com','0123456789',110,0),(2,'user122','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Harvey','Rowe','1970-01-01','241 Oak Blvd.','Q2','Leicester','rharvey@gmai.com','0123456780',120,0),(3,'user123','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Malcom','Vaugh','1971-01-01','38 Green Clarendon Parkway','Q3','Bradford','vmalcom@gmai.com','0123456781',130,0),(4,'user124','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Ellen','Holder','1972-01-01','18 North Old Way','Q4','Exeter','hellen@gmai.com','0123456782',140,0),(5,'user125','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Janna','Benson','1973-01-01','64 Oak Road','Q5','Bradford','bjanna@gmai.com','0123456783',150,0),(6,'user126','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Lori','Madden','1974-01-01','33 White Old Road','Q6','Exeter','mlori@gmai.com','0123456784',160,0),(7,'user127','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Adam','Aguirre','1975-01-01','89 New Avenue','Q7','Ipswich','aadam@gmai.com','0123456785',170,0),(8,'user128','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Julio','Ferguson','1976-01-01','193 White Milton Boulevard','Q8','Exeter','fjulio@gmai.com','0123456786',180,0),(9,'user129','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',0,'Crustal','Mann','1977-01-01','725 East Clarendon Avenue','Q9','Leicester','mcrustal@gmai.com','0123456787',190,0),(10,'user130','$2a$10$FZX4aHbiHDNbMXh9bf.fr.uJDyDv9W1ZOK58pCeNiDQfzLGtOZqbq',1,'Richard','Liu','1978-01-01','285 North Old Drive','Q10','Ipswich','lrechard@gmai.com','0123456788',200,0),(80,'khtn2712','$2a$10$9eBshy2J5uG99i4veXfcSOfk3BtS3lgO6XNFPo3IGXdamrlxOAldW',1,'khtn1','khtn1','1999-12-12','123','123','123','khtn1@gmail.com','123456',1000,0),(81,'testbidder','$2a$10$BwzA/RBBqhmAI2ODG04LeOhJmxyqq/mtuxGIp4chYH5o6vu0.tJna',0,'testbidder','testbidder','2020-01-07','123','123','123','testbidder1234@gmail.com','614523',0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `idwatchlist` int(11) NOT NULL AUTO_INCREMENT,
  `ItemID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`idwatchlist`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (44,6,80),(46,6,80),(47,26,80),(48,16,81),(49,16,81);
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-09 21:52:32
