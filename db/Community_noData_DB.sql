-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: myReddit
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
  `commentContent` mediumtext NOT NULL,
  `threadId` int DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `threadId_idx` (`threadId`),
  KEY `threadPost` (`threadPost`),
  KEY `threadComment` (`threadComment`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_5` FOREIGN KEY (`threadComment`) REFERENCES `comment` (`threadId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `comId` int NOT NULL AUTO_INCREMENT,
  `comName` varchar(45) NOT NULL,
  `comBio` varchar(255) DEFAULT 'Bio',
  `comTopic` int NOT NULL,
  `comSecTopic` int DEFAULT NULL,
  `comAvatar` varchar(255) NOT NULL DEFAULT 'avatar-img',
  `comCreator` int DEFAULT NULL,
  PRIMARY KEY (`comId`),
  UNIQUE KEY `comId_UNIQUE` (`comId`),
  UNIQUE KEY `comName_UNIQUE` (`comName`),
  KEY `comCreator_idx` (`comCreator`),
  KEY `fk_community_1_idx` (`comTopic`),
  KEY `fk_community_2_idx` (`comSecTopic`),
  CONSTRAINT `comCreator` FOREIGN KEY (`comCreator`) REFERENCES `user` (`userId`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_community_1` FOREIGN KEY (`comTopic`) REFERENCES `topic` (`topicId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_community_2` FOREIGN KEY (`comSecTopic`) REFERENCES `topic` (`topicId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `postContent` mediumtext NOT NULL,
  `postType` varchar(45) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`postId`),
  UNIQUE KEY `postId_UNIQUE` (`postId`),
  UNIQUE KEY `threadId_UNIQUE` (`threadId`),
  KEY `comId_idx` (`comId`),
  CONSTRAINT `comId` FOREIGN KEY (`comId`) REFERENCES `community` (`comId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `threadId` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=434 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `thread_update`
--

DROP TABLE IF EXISTS `thread_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_update` (
  `threadId` int NOT NULL,
  `updateDate` varchar(45) NOT NULL,
  PRIMARY KEY (`threadId`),
  CONSTRAINT `fk_thread_update_1` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `topicId` int NOT NULL AUTO_INCREMENT,
  `topicName` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`topicId`),
  UNIQUE KEY `topicId_UNIQUE` (`topicId`),
  UNIQUE KEY `topicName_UNIQUE` (`topicName`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic_defaul_avatars`
--

DROP TABLE IF EXISTS `topic_defaul_avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_defaul_avatars` (
  `topicId` int NOT NULL,
  `url` varchar(45) NOT NULL,
  PRIMARY KEY (`topicId`,`url`),
  CONSTRAINT `fk_topic_defaul_avatars_1` FOREIGN KEY (`topicId`) REFERENCES `topic` (`topicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `userPassword` varchar(255) NOT NULL,
  `userAvatar` varchar(255) DEFAULT 'avatar-img',
  `userBio` varchar(45) DEFAULT 'bio',
  `userRole` varchar(45) DEFAULT 'user',
  `userColor` varchar(10) DEFAULT 'green',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `user_community_follow_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_community_follow_ibfk_2` FOREIGN KEY (`comId`) REFERENCES `community` (`comId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `voteDate` varchar(45) NOT NULL,
  PRIMARY KEY (`threadId`,`userId`),
  KEY `voteUserId_idx` (`userId`),
  CONSTRAINT `voteThreadId` FOREIGN KEY (`threadId`) REFERENCES `thread` (`threadId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `voteUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_topic_follow`
--

DROP TABLE IF EXISTS `user_topic_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_topic_follow` (
  `topicId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`topicId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_topic_follow_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `topic` (`topicId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_topic_follow_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-18 16:27:07
