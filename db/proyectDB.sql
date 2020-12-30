CREATE DATABASE  IF NOT EXISTS `myReddit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myReddit`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: myReddit
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `threadPost` int NOT NULL,
  `threadComment` int DEFAULT NULL,
  `commentContent` varchar(255) NOT NULL,
  `threadId` int DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `threadId_idx` (`threadId`),
  KEY `threadPost` (`threadPost`),
  KEY `threadComment` (`threadComment`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`threadPost`) REFERENCES `post` (`threadId`),
  CONSTRAINT `comment_ibfk_5` FOREIGN KEY (`threadComment`) REFERENCES `comment` (`threadId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,2,NULL,'a comment',6),(2,2,NULL,'another comment',7),(3,2,6,'a subcomment',8),(4,2,7,'another subcomment',9),(5,2,8,'a sub subcomment',10);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `comId` int NOT NULL AUTO_INCREMENT,
  `comName` varchar(45) NOT NULL,
  `comBio` varchar(255) NOT NULL DEFAULT 'Bio',
  `comTopic` varchar(45) NOT NULL DEFAULT 'mainTopic',
  `comSecTopic` varchar(45) DEFAULT 'secTopic',
  `comAvatar` varchar(45) NOT NULL DEFAULT 'avatarImg',
  `comCreator` int NOT NULL,
  PRIMARY KEY (`comId`),
  UNIQUE KEY `comId_UNIQUE` (`comId`),
  UNIQUE KEY `comName_UNIQUE` (`comName`),
  KEY `comCreator_idx` (`comCreator`),
  CONSTRAINT `comCreator` FOREIGN KEY (`comCreator`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (1,'nasa','bio','space','tech','avatarImg',1),(2,'covid','bio','health','news','avatarImg',4),(3,'gaming','bio','videogames','tech','avatarImg',10),(4,'RPGFans','bio','videogames','','avatarImg',15),(5,'techFreaks','bio','tech','news','avatarImg',20);
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `threadId` int NOT NULL,
  `comId` int NOT NULL,
  `postTitle` varchar(45) NOT NULL,
  `postContent` varchar(45) NOT NULL,
  `postType` varchar(45) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`postId`),
  UNIQUE KEY `postId_UNIQUE` (`postId`),
  UNIQUE KEY `threadId_UNIQUE` (`threadId`),
  KEY `comId_idx` (`comId`),
  CONSTRAINT `comId` FOREIGN KEY (`comId`) REFERENCES `community` (`comId`),
  CONSTRAINT `threadId` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,3,'A title','A content','text'),(2,2,5,'Another Title','Other Content','text'),(3,3,1,'more Titles','more content','text'),(4,5,4,'more tittle','more content','text'),(5,4,2,'more title','more content','text');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `threadId` int NOT NULL AUTO_INCREMENT,
  `threadDate` datetime(2) DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`threadId`),
  UNIQUE KEY `threadId_UNIQUE` (`threadId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,'2020-08-11 22:00:00.00',1),(2,'2020-12-20 15:10:00.00',3),(3,'2020-06-19 13:05:20.00',2),(4,'2020-12-28 13:46:00.00',10),(5,'2020-10-30 03:59:50.00',15),(6,'2020-08-11 22:10:00.00',5),(7,'2020-08-11 22:15:00.00',7),(8,'2020-08-11 22:18:10.00',3),(9,'2020-08-11 22:18:12.00',12),(10,'2020-08-11 22:18:12.00',8);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `userEmail` varchar(45) NOT NULL,
  `userPassword` varchar(45) NOT NULL,
  `userAvatar` varchar(45) DEFAULT 'avatar-img',
  `userBio` varchar(45) DEFAULT 'bio',
  `userRole` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'cesar','cesar@email.com','1234','avatar-img','bio','admin'),(2,'manu','manu@email.com','1234','avatar-img','bio','user'),(3,'edu','edu@email.com','1234','avatar-img','bio','user'),(4,'kevin','kevin@email.com','1234','avatar-img','bio','user'),(5,'luis','luis@email.com','1234','avatar-img','bio','user'),(6,'maria','maria@email.com','1234','avatar-img','bio','user'),(7,'laura','laura@email.com','1234','avatar-img','bio','user'),(8,'juan','juan@email.com','1234','avatar-img','bio','user'),(9,'pepe','pepe@email.com','1234','avatar-img','bio','user'),(10,'jose','jose@email.com','1234','avatar-img','bio','user'),(11,'paco','paco@email.com','1234','avatar-img','bio','user'),(12,'manolo','manolo@email.com','1234','avatar-img','bio','user'),(13,'javi','javi@email.com','1234','avatar-img','bio','user'),(14,'sergio','sergio@email.com','1234','avatar-img','bio','user'),(15,'adri','adri@email.com','1234','avatar-img','bio','user'),(16,'dani','dani@email.com','1234','avatar-img','bio','user'),(17,'david','david@email.com','1234','avatar-img','bio','user'),(18,'sara','sara@email.com','1234','avatar-img','bio','user'),(19,'marta','marta@emai.com','1234','avatar-img','bio','user'),(20,'miguel','miguel@email.com','1234','avatar-img','bio','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_community_follow`
--

DROP TABLE IF EXISTS `user_community_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_community_follow` (
  `userId` int NOT NULL,
  `comId` int NOT NULL,
  PRIMARY KEY (`userId`,`comId`),
  KEY `comId` (`comId`),
  CONSTRAINT `user_community_follow_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `user_community_follow_ibfk_2` FOREIGN KEY (`comId`) REFERENCES `community` (`comId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_community_follow`
--

LOCK TABLES `user_community_follow` WRITE;
/*!40000 ALTER TABLE `user_community_follow` DISABLE KEYS */;
INSERT INTO `user_community_follow` VALUES (1,1),(2,1),(1,2),(3,2),(1,3),(2,3),(4,3),(1,4),(2,4),(3,4),(4,5),(5,5);
/*!40000 ALTER TABLE `user_community_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_thread_vote`
--

DROP TABLE IF EXISTS `user_thread_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_thread_vote` (
  `threadId` int NOT NULL,
  `userId` int NOT NULL,
  `voteType` varchar(45) NOT NULL,
  PRIMARY KEY (`threadId`,`userId`),
  KEY `voteUserId_idx` (`userId`),
  CONSTRAINT `voteThreadId` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`),
  CONSTRAINT `voteUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_thread_vote`
--

LOCK TABLES `user_thread_vote` WRITE;
/*!40000 ALTER TABLE `user_thread_vote` DISABLE KEYS */;
INSERT INTO `user_thread_vote` VALUES (2,1,'1'),(2,2,'1'),(2,3,'1'),(2,4,'1'),(2,5,'-1');
/*!40000 ALTER TABLE `user_thread_vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-30 12:08:14
