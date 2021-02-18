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
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (67,148,NULL,'Comment 3',158),(68,148,158,'Comment 4',159),(69,152,NULL,'Comment 3',160),(70,152,160,'Comment 3',161),(73,152,160,'Texto para cambiar',165),(74,152,160,'Comment 3',166),(75,152,160,'Comment 3',167),(76,152,160,'Comment 3',168),(77,152,160,'Comment 3',169),(78,152,160,'Comment 3',170),(79,152,160,'Comment 3',171),(80,152,160,'Comment 3',172),(81,152,160,'Comment 3',173),(82,152,160,'Comment 3',174),(83,148,NULL,'Hola',180),(84,148,NULL,'Mandando comentarios',181),(85,148,NULL,'Hola que ase',182),(86,148,NULL,'hey',183),(88,148,NULL,'hey',185),(89,148,NULL,'un nuevo comentario',186),(90,148,NULL,'Mucho comentario',187),(91,148,NULL,'hola buenas',188),(92,148,NULL,'Haciendo un comentario',190),(93,148,NULL,'nuevo comentario',191),(94,148,NULL,'Mas nuevos comentarios',192),(95,148,NULL,'holas',193),(96,148,NULL,'que pasa',194),(97,148,NULL,'comento',195),(98,148,NULL,'fasd',196),(99,148,NULL,'estamos de nueo',197),(100,148,NULL,'afsd',198),(101,148,NULL,'asfd',199),(102,148,NULL,'asdf',200),(103,148,NULL,'Hola buenas',201),(104,148,NULL,'Hola buenas',202),(105,148,NULL,'hola',203),(106,148,NULL,'asd',204),(107,148,NULL,'asdf',205),(108,148,NULL,'afsd',206),(109,148,NULL,'asdfsdf',207),(110,148,NULL,'Hola',208),(111,148,NULL,'Comment 3',209),(112,148,NULL,'Comment 3',210),(113,148,NULL,'Comment 3',211),(114,148,NULL,'Comment 3',212),(115,148,NULL,'este es el ultimo?',213),(116,148,NULL,'pues no era el ultimo',214),(117,148,NULL,'Este si que es',215),(118,148,NULL,'pues tampoco',216),(119,175,NULL,'Hola que tal',217),(120,148,NULL,'Creamos mas comentarios?',218),(121,148,NULL,'Hola',219),(122,148,NULL,'dsfgh',220),(123,175,NULL,'Hola que ase',221),(124,175,NULL,'Holiwis',222),(125,175,NULL,'prueba',223),(126,153,NULL,'Hola',224),(127,176,NULL,'Hola buenas',225),(128,176,NULL,'Hola wenas',226),(129,176,NULL,'hola wenas',227),(130,176,NULL,'hola wenas',228),(131,176,NULL,'jjls',229),(132,148,NULL,'hey ma boy',230),(133,175,NULL,'hola wenas',231),(134,179,NULL,'Hola amigos',232),(135,177,NULL,'Hola senores',233),(136,179,NULL,'Hola',234),(137,175,NULL,'Hola',235),(138,175,NULL,'Hola',236),(139,151,NULL,'Hola',237),(140,154,NULL,'Hola',238),(141,156,NULL,'Hola',239),(142,156,NULL,'Hola ',240),(143,156,NULL,'Hola que ase',241),(144,156,NULL,'coemntarios',242),(145,156,NULL,'holiwis',243),(146,177,NULL,'Holas',244),(147,177,NULL,'vaia vaia',245),(148,177,NULL,'ou mama',246),(149,177,NULL,'funcionará',247),(150,179,NULL,'Hola',248),(151,179,NULL,'increible',249),(152,179,NULL,'Hola',250),(153,189,NULL,'Hola',251),(154,189,NULL,'Esto funciona?',252),(155,189,NULL,'Hola',253),(156,189,NULL,'Hoal',254),(157,189,NULL,'holas',255),(158,189,NULL,'Ey',256),(159,148,NULL,'Hola mi amigo ',257),(160,148,NULL,'hola buenas que tal',258),(161,175,NULL,'Hola buenas',259),(162,175,NULL,'hola',260),(163,151,NULL,'Hola que tal',261),(164,153,NULL,'hola que tal',262),(165,189,NULL,'Hola que tal',263),(166,189,NULL,'Hola buenas',264),(167,176,NULL,'otro comentario',265),(168,176,NULL,'Comentario extra',266),(169,176,NULL,'Ey amigo',267),(170,189,NULL,'hola',268),(171,154,NULL,'Hola señor',269),(172,148,NULL,'hola',270),(173,154,NULL,'funcionará 2.0',271),(174,157,NULL,'a ver si va',272),(175,149,NULL,'hola buenas',273),(176,155,NULL,'hola por 23040293478 vez',274),(177,148,NULL,'324583409 comentario',275),(178,162,NULL,'hola buenas',276),(179,153,NULL,'Hola',277),(180,149,NULL,'comentario poco creativo',278),(181,157,NULL,'hola buenas',279),(182,157,NULL,'mas comentarios',280),(183,157,NULL,'jfasldf',281),(184,157,NULL,'pruebas',282),(185,157,NULL,'hola buenas',283),(186,157,NULL,'probando mas cosas',284),(187,157,NULL,'hola muy buenas',285),(188,157,NULL,'hola gente',286),(189,157,NULL,'probamos mas cosas',287),(190,149,NULL,'hola que tal',288),(191,149,NULL,'sigo comentando',289),(192,149,NULL,'sadf',290),(193,149,NULL,'Hola que tal',291),(194,148,NULL,'Hola',292),(195,155,NULL,'gdfsg',293),(196,155,NULL,'mensaje de mierda',294),(197,155,NULL,'haz algo',295),(198,155,NULL,'sdfafsadf',296),(199,155,NULL,'hola buenas',297),(200,155,NULL,'hey',298),(201,177,NULL,'Hola buenas',299),(202,177,NULL,'Hola ',300),(203,177,NULL,'ey muy buenas a todos',301),(204,177,NULL,'Hola buenas',302),(205,177,NULL,'mas comentarios',303),(206,177,NULL,'hey boys',304),(207,177,NULL,'hola amigos',305),(208,150,NULL,'El gran comentario',306),(209,150,NULL,'otro gran comentario',307),(210,150,NULL,'el ultimo gran comentario',308),(211,179,NULL,'Increible mensaje',309),(218,148,185,'Hola',316),(222,148,183,'madsa',320),(223,148,181,'dfsga',321),(226,148,190,'Comment 3',324),(228,162,NULL,'Comment 3',326),(230,176,226,'Que pasa loko',328),(231,176,228,'Que pasa jefe',329),(232,151,NULL,'Hola',330),(233,151,330,'que tal',331),(234,177,NULL,'Hola amego',333),(235,189,NULL,'hola amigo',334),(236,189,NULL,'hola amego',335),(237,189,NULL,'probando',336),(238,332,NULL,'comentario',337),(239,332,NULL,'hola',338),(240,332,NULL,'hola',339),(241,332,NULL,'hola',340),(242,175,NULL,'Hola',341),(243,148,NULL,'Hola',342),(244,148,NULL,'Hola',343),(245,154,NULL,'pruebas',344),(246,154,NULL,'mas pruebas',345),(247,154,NULL,'Hola',346),(248,175,NULL,'hola buenas',347),(249,349,NULL,'Hola',350),(251,363,NULL,'hola este es un comentario nuevo',365),(252,379,NULL,'ey\n',380),(253,379,NULL,'he\n',381),(254,379,NULL,'he\n',382),(255,348,NULL,'ey\n',383),(256,348,NULL,'hola amego\n',384),(257,348,384,'ey amego',385),(258,348,384,'Hola\n',386),(259,348,383,'texto',387),(261,348,NULL,'fsdaf',389),(263,157,272,'hey\n',392),(265,157,272,'Hola wey',394),(273,373,NULL,'hola amego',402),(276,405,NULL,'csduisdf',406),(279,422,NULL,'gjdlfkasdjf\n',423),(280,413,NULL,'Hola!!',426),(281,377,NULL,'hola buenas',431),(282,377,NULL,'fsadfasd',432),(283,377,432,'uau',433);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (4,'SQL','Bio',4,1,'avatar-img',1),(17,'DontStarve','Bio',20,0,'avatar-img',79),(19,'Terraria','Aquí hablamos de cosas de terraria',20,0,'avatar-img',79),(20,'Minecraft','Aquí hablamos de cosas de minecraft',20,0,'avatar-img',79),(23,'LeagueOfLegends','Aquí hablamos de cosas de LoL',20,0,'avatar-img',79),(24,'Cyberpunk','Aquí hablamos de cosas de Cyberpunk',20,0,'avatar-img',79),(25,'MarioBros','Aquí hablamos de cosas de MarioBros',20,0,'avatar-img',79),(26,'Borderlands','Aquí hablamos de cosas de Borderlands',20,0,'avatar-img',79),(28,'StardewValley','Aquí hablamos de cosas de StardewValley',20,0,'avatar-img',79),(29,'Valorant','Aquí hablamos de cosas de Valorant',20,0,'avatar-img',79),(32,'TomClancy','Aquí hablamos de cosas de TomClancy',20,0,'avatar-img',79),(35,'jfsdlas','Aquí hablamos de cosas de LoL',10,0,'avatar-img',79),(42,'Netflix','Manta, Netflix and Chill',7,8,'/communities/b93af729-6fcd-460d-beb3-054115d241fa.jpeg',154),(43,'Hbo','Hbo',7,8,'/communities/55620e70-af65-4c59-911e-95738ee062e3.png',154);
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (66,148,17,'Texto  modificado','Contenido del post','text'),(67,149,4,'Texto  modificado','Contenido del post','text'),(68,150,4,'Título del post','Contenido del post','text'),(69,151,25,'Título del post','Contenido del post','text'),(70,152,25,'Título del post','Contenido del post','text'),(71,153,25,'Título del post','Contenido del post','text'),(72,154,26,'Título del post','Contenido del post','text'),(73,155,26,'Título del post','Contenido del post','text'),(74,156,26,'Título del post','Contenido del post','text'),(75,157,4,'Título del post','Contenido del post','text'),(76,162,4,'Título del post','Contenido del post','text'),(84,348,17,'Hola','Hdbs','text'),(101,368,28,'fasdfsadf','sdafasdf','text'),(103,370,32,'fasdfasdfas','fasdfsadf','text'),(104,371,32,'fasdfasdfas','fasdfsadf','text'),(106,373,32,'fasdfasdfas','holas','text'),(107,374,32,'fasdfasdfas','fasdfsadf','text'),(108,375,32,'fasdfasdfas','fasdfsadf','text'),(109,376,32,'fasdfasdfas','fasdfsadf','text'),(110,377,17,'sdfaasd','Hola que ase','text'),(111,378,26,'Un post tope de largo v2','Este es un texto largo para ver como se comporta el textarea Este es un texto largo para ver como se comporta el textarea Este es un texto largo para ver como se comporta el textarea Este es un texto largo para ver como se comporta el textarea','text'),(112,379,28,'sadfsadf','fsdafasdf','text'),(117,410,26,'jfdsfjlaskdf','fsaf','text'),(118,411,26,'QUE ESTA PASANDO','sdafsdf','text'),(119,412,26,'AlksadjflkasdjA','fsdafsdaf','text'),(120,413,29,'UUUAAAUUU','sdfasdf','text'),(121,414,29,'UaeaeeaeaU','fsdsadfsdfsa','text'),(122,415,28,'UaaU','afsd','text'),(124,418,26,'Hola','sdalfjsadf','text'),(125,419,24,'Titulo','hola que tal','text'),(126,420,32,'Vaia','Enviar','text'),(128,422,24,'sdafasdf','/posts/ced34f84-0721-4a74-8497-e2106f366ad9.jpeg','image'),(129,424,26,'Hola','Enviar','text'),(130,425,26,'dsfasd','/posts/21152ad5-d573-4141-b212-c4edeccec2b3.jpeg','image'),(132,428,25,'fdasf','fadsfasd','text'),(133,429,25,'sdfsadf','sdafsdf','text'),(134,430,43,'el nuevo titulo','Bienvenidos a la comunidad','text');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (147,'2021-01-15 11:35:08.00',87),(148,'2021-01-15 11:36:26.00',87),(149,'2021-01-15 11:36:32.00',87),(150,'2021-01-15 11:36:33.00',87),(151,'2021-01-15 11:36:33.00',87),(152,'2021-01-15 11:36:55.00',79),(153,'2021-01-15 11:36:57.00',79),(154,'2021-01-15 11:36:57.00',79),(155,'2021-01-15 11:36:58.00',79),(156,'2021-01-15 11:36:58.00',79),(157,'2021-01-15 11:36:59.00',79),(158,'2021-01-15 11:37:44.00',79),(159,'2021-01-15 11:38:19.00',79),(160,'2021-01-15 12:15:50.00',79),(161,'2021-01-15 12:16:09.00',79),(162,'2021-01-25 11:23:18.00',79),(163,'2021-01-25 11:25:05.00',79),(164,'2021-01-25 11:25:13.00',79),(165,'2021-01-25 11:26:50.00',79),(166,'2021-01-25 11:29:32.00',79),(167,'2021-01-25 11:35:07.00',79),(168,'2021-01-25 11:35:30.00',79),(169,'2021-01-25 11:35:47.00',79),(170,'2021-01-25 11:38:04.00',79),(171,'2021-01-25 11:38:47.00',79),(172,'2021-01-25 11:39:49.00',79),(173,'2021-01-25 11:41:48.00',79),(174,'2021-01-25 11:43:35.00',79),(180,'2021-02-10 18:30:44.00',154),(181,'2021-02-10 18:31:21.00',154),(182,'2021-02-10 18:31:37.00',154),(183,'2021-02-10 18:32:15.00',154),(185,'2021-02-10 18:32:48.00',154),(186,'2021-02-10 18:33:11.00',154),(187,'2021-02-10 18:34:23.00',154),(188,'2021-02-10 18:35:14.00',154),(190,'2021-02-10 18:39:07.00',154),(191,'2021-02-10 18:40:19.00',154),(192,'2021-02-10 18:40:59.00',154),(193,'2021-02-10 18:41:21.00',154),(194,'2021-02-10 18:41:34.00',154),(195,'2021-02-10 18:42:02.00',154),(196,'2021-02-10 18:42:14.00',154),(197,'2021-02-10 18:44:03.00',154),(198,'2021-02-10 18:44:27.00',154),(199,'2021-02-10 18:44:49.00',154),(200,'2021-02-10 18:46:33.00',154),(201,'2021-02-10 18:47:26.00',154),(202,'2021-02-10 18:49:40.00',154),(203,'2021-02-10 18:53:46.00',154),(204,'2021-02-10 18:54:29.00',154),(205,'2021-02-10 18:55:12.00',154),(206,'2021-02-10 18:55:38.00',154),(207,'2021-02-10 18:55:50.00',154),(208,'2021-02-10 18:56:16.00',154),(209,'2021-02-10 18:57:25.00',154),(210,'2021-02-10 18:57:42.00',154),(211,'2021-02-10 18:59:46.00',154),(212,'2021-02-10 19:00:01.00',154),(213,'2021-02-10 19:00:36.00',154),(214,'2021-02-10 19:01:19.00',154),(215,'2021-02-10 19:03:34.00',154),(216,'2021-02-10 19:03:52.00',154),(217,'2021-02-10 19:13:29.00',154),(218,'2021-02-10 19:14:01.00',154),(219,'2021-02-10 19:33:23.00',154),(220,'2021-02-10 19:34:05.00',154),(221,'2021-02-10 20:00:24.00',154),(222,'2021-02-10 20:00:51.00',154),(223,'2021-02-10 20:01:02.00',154),(224,'2021-02-10 20:03:22.00',154),(225,'2021-02-10 20:04:52.00',154),(226,'2021-02-10 20:07:06.00',154),(227,'2021-02-10 20:08:05.00',154),(228,'2021-02-10 20:08:40.00',154),(229,'2021-02-10 20:10:05.00',154),(230,'2021-02-10 20:12:19.00',154),(231,'2021-02-10 20:13:54.00',154),(232,'2021-02-10 20:14:43.00',154),(233,'2021-02-10 20:15:10.00',154),(234,'2021-02-10 20:21:23.00',154),(235,'2021-02-10 20:24:30.00',154),(236,'2021-02-10 20:26:59.00',154),(237,'2021-02-10 20:28:53.00',154),(238,'2021-02-10 20:29:36.00',154),(239,'2021-02-10 20:31:22.00',154),(240,'2021-02-10 20:35:24.00',154),(241,'2021-02-10 20:39:04.00',154),(242,'2021-02-10 20:39:19.00',154),(243,'2021-02-10 20:39:51.00',154),(244,'2021-02-10 20:40:45.00',154),(245,'2021-02-10 20:43:26.00',154),(246,'2021-02-10 20:43:40.00',154),(247,'2021-02-10 20:45:07.00',154),(248,'2021-02-10 20:56:12.00',154),(249,'2021-02-10 20:57:17.00',154),(250,'2021-02-10 20:58:08.00',154),(251,'2021-02-10 20:59:07.00',154),(252,'2021-02-10 20:59:34.00',154),(253,'2021-02-10 21:02:19.00',154),(254,'2021-02-10 21:03:47.00',154),(255,'2021-02-10 21:04:18.00',154),(256,'2021-02-10 21:05:01.00',154),(257,'2021-02-10 21:12:04.00',154),(258,'2021-02-10 21:12:57.00',154),(259,'2021-02-10 21:13:44.00',154),(260,'2021-02-10 21:19:35.00',154),(261,'2021-02-10 21:20:02.00',154),(262,'2021-02-10 21:20:11.00',154),(263,'2021-02-10 21:23:59.00',154),(264,'2021-02-10 21:28:01.00',154),(265,'2021-02-10 21:28:31.00',154),(266,'2021-02-10 21:28:51.00',154),(267,'2021-02-10 21:29:49.00',154),(268,'2021-02-10 21:30:20.00',154),(269,'2021-02-10 21:32:37.00',154),(270,'2021-02-10 21:33:33.00',154),(271,'2021-02-10 21:34:21.00',154),(272,'2021-02-10 21:35:03.00',154),(273,'2021-02-10 21:36:09.00',154),(274,'2021-02-10 21:36:44.00',154),(275,'2021-02-10 21:37:34.00',154),(276,'2021-02-10 21:37:50.00',154),(277,'2021-02-10 21:39:04.00',154),(278,'2021-02-10 21:39:17.00',154),(279,'2021-02-10 21:39:50.00',154),(280,'2021-02-10 21:39:56.00',154),(281,'2021-02-10 21:41:01.00',154),(282,'2021-02-10 21:41:26.00',154),(283,'2021-02-10 21:48:00.00',154),(284,'2021-02-10 21:48:55.00',154),(285,'2021-02-10 21:49:55.00',154),(286,'2021-02-10 21:51:12.00',154),(287,'2021-02-10 21:52:38.00',154),(288,'2021-02-10 21:57:20.00',154),(289,'2021-02-10 21:59:47.00',154),(290,'2021-02-10 22:00:47.00',154),(291,'2021-02-10 22:43:02.00',154),(292,'2021-02-10 22:52:09.00',154),(293,'2021-02-10 22:53:42.00',154),(294,'2021-02-10 22:57:46.00',154),(295,'2021-02-10 22:58:03.00',154),(296,'2021-02-10 22:58:24.00',154),(297,'2021-02-10 22:58:51.00',154),(298,'2021-02-10 22:59:50.00',154),(299,'2021-02-10 23:45:19.00',154),(300,'2021-02-10 23:46:15.00',154),(301,'2021-02-10 23:46:34.00',154),(302,'2021-02-10 23:47:04.00',154),(303,'2021-02-10 23:48:48.00',154),(304,'2021-02-10 23:49:41.00',154),(305,'2021-02-10 23:50:30.00',154),(306,'2021-02-10 23:53:26.00',154),(307,'2021-02-10 23:53:52.00',154),(308,'2021-02-10 23:54:15.00',154),(309,'2021-02-11 00:06:02.00',154),(316,'2021-02-11 01:15:44.00',154),(320,'2021-02-11 01:19:45.00',154),(321,'2021-02-11 01:20:04.00',154),(324,'2021-02-11 01:24:58.00',154),(326,'2021-02-11 01:26:47.00',154),(328,'2021-02-11 01:31:47.00',154),(329,'2021-02-11 01:32:13.00',154),(330,'2021-02-11 11:27:56.00',154),(331,'2021-02-11 11:28:00.00',154),(333,'2021-02-13 17:48:17.00',154),(334,'2021-02-13 17:50:40.00',154),(335,'2021-02-13 17:54:52.00',154),(336,'2021-02-13 17:55:56.00',154),(337,'2021-02-13 17:56:45.00',154),(338,'2021-02-13 17:59:12.00',154),(339,'2021-02-13 17:59:38.00',154),(340,'2021-02-13 18:04:59.00',154),(341,'2021-02-13 18:05:33.00',154),(342,'2021-02-13 18:08:38.00',154),(343,'2021-02-13 18:10:29.00',154),(344,'2021-02-13 18:10:53.00',154),(345,'2021-02-13 18:11:15.00',154),(346,'2021-02-13 18:11:46.00',154),(347,'2021-02-13 18:11:53.00',154),(348,'2021-02-13 21:49:03.00',163),(350,'2021-02-14 17:50:53.00',154),(365,'2021-02-14 19:51:00.00',154),(368,'2021-02-14 20:37:46.00',154),(370,'2021-02-14 20:38:12.00',154),(371,'2021-02-14 20:38:16.00',154),(373,'2021-02-14 20:38:57.00',154),(374,'2015-02-14 20:39:12.00',154),(375,'2020-01-14 20:39:42.00',154),(376,'2020-10-14 20:40:26.00',154),(377,'2020-11-14 20:58:28.00',154),(378,'2020-12-14 21:00:36.00',154),(379,'2021-01-14 21:04:01.00',154),(380,'2021-02-14 22:32:31.00',154),(381,'2021-02-14 22:32:55.00',154),(382,'2021-02-14 22:33:03.00',154),(383,'2021-02-14 22:33:49.00',154),(384,'2021-02-14 22:34:16.00',154),(385,'2021-02-14 22:34:23.00',154),(386,'2021-02-14 22:36:13.00',154),(387,'2021-02-14 22:36:18.00',154),(389,'2021-02-14 22:36:43.00',154),(392,'2021-02-14 23:58:12.00',154),(394,'2021-02-14 23:59:26.00',154),(402,'2021-02-15 00:25:19.00',154),(406,'2021-02-15 13:07:45.00',166),(410,'2021-02-15 18:56:42.00',166),(411,'2021-02-15 18:56:58.00',166),(412,'2021-02-15 18:57:10.00',166),(413,'2021-02-15 18:57:19.00',166),(414,'2021-02-15 18:57:45.00',166),(415,'2021-02-15 19:00:55.00',166),(418,'2021-02-16 01:50:29.00',154),(419,'2021-02-16 02:37:25.00',154),(420,'2021-02-16 13:03:11.00',154),(422,'2021-02-16 15:54:55.00',154),(423,'2021-02-16 16:07:53.00',154),(424,'2021-02-16 20:00:54.00',154),(425,'2021-02-16 20:01:03.00',154),(426,'2021-02-16 21:09:55.00',165),(428,'2021-02-17 20:30:30.00',154),(429,'2021-02-17 20:30:52.00',154),(430,'2021-02-17 20:31:07.00',154),(431,'2021-02-17 21:23:24.00',154),(432,'2021-02-17 21:36:05.00',154),(433,'2021-02-17 21:36:11.00',154);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `thread_update`
--

LOCK TABLES `thread_update` WRITE;
/*!40000 ALTER TABLE `thread_update` DISABLE KEYS */;
INSERT INTO `thread_update` VALUES (148,'2021-01-25 11:54:54'),(149,'2021-02-14 12:42:53'),(165,'2021-01-25 11:51:00'),(373,'2021-02-15 00:47:44'),(377,'2021-02-17 21:43:15'),(406,'2021-02-15 13:08:16'),(420,'2021-02-17 18:57:08'),(424,'2021-02-17 18:56:57'),(430,'2021-02-17 21:47:41'),(432,'2021-02-17 21:42:28');
/*!40000 ALTER TABLE `thread_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (0,NULL),(10,'Biology'),(16,'Books'),(14,'Comics'),(7,'Films'),(4,'Programming'),(11,'Science'),(3,'Space'),(1,'Technology'),(8,'TV'),(20,'videoGame'),(9,'Weather');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `topic_defaul_avatars`
--

LOCK TABLES `topic_defaul_avatars` WRITE;
/*!40000 ALTER TABLE `topic_defaul_avatars` DISABLE KEYS */;
INSERT INTO `topic_defaul_avatars` VALUES (1,'/default/tech-1.jpg'),(1,'/default/tech-2.jpg'),(1,'/default/tech-3.jpg'),(3,'/default/space-1.jpg'),(3,'/default/space-2.jpg'),(3,'/default/space-3.jpg'),(4,'/default/code-1.jpg'),(4,'/default/code-2.jpg'),(4,'/default/code-3.jpg'),(8,'/default/tv-1.jpg'),(8,'/default/tv-2.jpg'),(8,'/default/tv-3.jpg'),(9,'/default/weather-1.jpg'),(9,'/default/weather-2.jpg'),(9,'/default/weather-3.jpg'),(10,'/default/biology-1.jpg'),(10,'/default/biology-2.jpg'),(10,'/default/biology-3.jpg'),(11,'/default/science-1.jpg'),(14,'/default/comics-1.jpg'),(14,'/default/comics-2.jpg'),(14,'/default/gaming-1.jpg'),(16,'/default/books-1.jpg'),(16,'/default/books-2.jpg'),(16,'/default/books-3.jpg'),(20,'/default/gaming-1.jpg'),(20,'/default/gaming-2.jpg'),(20,'/default/gaming-3.jpg');
/*!40000 ALTER TABLE `topic_defaul_avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@email.com','$2a$10$cXQphghsArCHW.PjA3SMluQ4JDdofGqUrO2YjN1QEce27kI3ZcYyS','avatar-img','bio','admin','green'),(79,'Cesar','cesar@email.com','$2a$10$cXQphghsArCHW.PjA3SMluQ4JDdofGqUrO2YjN1QEce27kI3ZcYyS','avatar-img','bio','user','green'),(85,'juan','juan@email.com','$2a$10$nd4CCoSV1NQEG3wO4CQSDuQP5llOqOtXs7w8JfaJBm8nJN95TvdPS','avatar-img','bio','user','green'),(86,'manu','manu@email.com','$2a$10$oLP3lqJNKLUzZ9lbhSFG5eS3dGw3tWl3ABmZoLI2s7jGqrGSoOy6.','avatar-img','bio','user','green'),(87,'paco','paco@email.com','$2a$10$nQInuQDUu9nRMb0f2e0k4eITNosXczTTWtFsgDvhpxiPtcHppYGg.','avatar-img','bio','user','green'),(88,'pacolo','pacolo@email.com','$2a$10$dUbrX6fJfUTafdtQjYTn3uevO5M0LR.U5QuPSjJS2oZW0viS2r6l6','avatar-img','bio','user','green'),(89,'pacolin','pacolin@email.com','$2a$10$.EQt3FYmNwSel0QeKWwKBOevCAg0gXRubHmpVNQx1gSMFoexy1p.i','avatar-img','bio','user','green'),(136,'pepe','pepe@email.com','$2a$10$ypaCgzKeFWg6.qZCv3i.P.YwFsfq4nDUYc6XQSnYuFaeV8Zn/GrCu','avatar-img','bio','user','green'),(137,'pepee','pepe@gmail.com','$2a$10$q6R3NZEiFL0WKByqdsaXletsPVUXM1p3f3Y02pOQEI0noioQtvmdK','avatar-img','bio','user','green'),(154,'Rasek','rasek@email.com','$2a$10$kJ1jgUxISq2DwwUAX3dg0e/lQ5UzsDw6IC0lMS4ut7eMyMC6PSq3e','/users/bb1dbca6-061e-48bf-9089-47d391aa29e1.jpeg','hola wenas','user','orange'),(155,'RasekDark','rasekdark@email.com','$2a$10$GuPtAHYizFyGP0zlOxRzUe1DkoijdE34PwkgY8AEtWv1vxVNEWGxu','avatar-img','bio','user','green'),(156,'RasekTimes','rasektimes@email.com','$2a$10$wse6U8/DZI4Vu2iWCTR.4OpBEoT9a2qWSvckoc.NIVhytqXCz6D3G','avatar-img','bio','user','green'),(157,'paquito','paquito@email.com','$2a$10$.fgj9DmY0gezjE7fObblV.6yluHYglx9Tog/Kssf0X82ZX43YDXOm','avatar-img','bio','user','green'),(158,'paquitos','paquitos@email.com','$2a$10$XGEoSVDIQrWi749eRGCvOuePolECFrjnGTmQj1bBmJop91x/PDtC6','avatar-img','bio','user','green'),(159,'manolito','manolito@email.com','$2a$10$zUrMdqB4RIRDm4WlUU.dmu.LzAKDlYujn02jkRnOSQ1yivpa8TNDe','avatar-img','bio','user','green'),(160,'cesar12','cesar@eamil.com','$2a$10$Q7paR0pMnrNCxYaj7VXurufflhRzznM7iStIzpyikx//Fu5knEO2y','avatar-img','bio','user','green'),(161,'cesar2','cesar2@email.com','$2a$10$2hMo4HlvthMrQvfVB0Vejeli75njdqH2Smfpo4C8v1vwwnLlP9ch.','avatar-img','bio','user','green'),(162,'cesar3','cesar3@email.com','$2a$10$ppNEm0j/TL4yNt3IU3qHoehMnh6P7/rhG8/PnQGbAmec8E9ZTSHI6','avatar-img','bio','user','green'),(163,'rasekD','rasekD@email.com','$2a$10$Gejwm2NzUyAoyQEVHBCjn.A4jOCtoF42x6jMEVFyGj1H3inEfAE8C','/users/41697a32-22a2-49dc-a39e-22433a67966c.png','bio','user','green'),(164,'rasek3','rasek3@email.com','$2a$10$ePVRYgzKsrtsZdkOPQD0LOdl9cQAch0jOVk4E36dxL2KOlWdUUbXi','avatar-img','bio','user','green'),(165,'Maria','naria@gmail.com','$2a$10$olqzkAHcLBQ6Vo1DQlf7Qe3bEy.fSTrexhP5/fHEzP8T6RUak1EZe','/users/46904cbd-e70c-41b8-8466-d1e7923f95ab.png','bio','user','green'),(166,'prueba','prueba@email.com','$2a$10$phWG8VR6f.mudJPYQZqbvu8JacIl9dGDgOV42gHuUFLs/3PC4lQT2','default/biology-3.jpg','bio','user','green');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_community_follow`
--

LOCK TABLES `user_community_follow` WRITE;
/*!40000 ALTER TABLE `user_community_follow` DISABLE KEYS */;
INSERT INTO `user_community_follow` VALUES (1,4),(79,4),(166,4),(1,17),(79,17),(137,17),(154,17),(163,17),(1,19),(137,19),(154,19),(163,19),(166,19),(154,24),(154,25),(163,25),(164,25),(165,25),(154,26),(163,26),(164,26),(166,26),(154,28),(164,28),(166,28),(1,29),(166,29),(1,32),(154,32),(165,32),(154,42),(154,43);
/*!40000 ALTER TABLE `user_community_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_thread_vote`
--

LOCK TABLES `user_thread_vote` WRITE;
/*!40000 ALTER TABLE `user_thread_vote` DISABLE KEYS */;
INSERT INTO `user_thread_vote` VALUES (148,1,'1','2021-01-27 13:03:48'),(148,79,'1','2021-01-27 13:03:48'),(148,154,'1','2021-02-10 17:28:31'),(149,1,'1','2021-01-27 13:03:48'),(149,79,'1','2021-01-27 13:03:48'),(150,1,'1','2021-01-27 13:03:48'),(150,79,'1','2021-01-27 13:03:48'),(151,1,'1','2021-01-27 13:03:48'),(151,79,'1','2021-01-27 13:03:48'),(151,154,'-1','2021-02-10 19:56:12'),(152,1,'1','2021-01-27 13:03:48'),(152,79,'1','2021-01-27 13:03:48'),(153,1,'1','2021-01-27 13:03:48'),(153,79,'1','2021-01-27 13:03:48'),(154,1,'1','2021-01-27 13:03:48'),(154,79,'1','2021-01-27 13:03:48'),(154,154,'1','2021-02-10 21:21:34'),(155,1,'1','2021-01-27 13:03:48'),(155,79,'1','2021-01-27 13:03:48'),(156,1,'1','2021-01-27 13:03:48'),(156,79,'1','2021-01-27 13:03:48'),(157,1,'1','2021-01-27 13:03:48'),(157,79,'1','2021-01-27 13:03:48'),(157,85,'1','2021-01-27 13:03:48'),(158,79,'1','2021-02-08 16:05:20'),(158,154,'1','2021-02-10 16:37:17'),(162,79,'1','2021-01-27 13:03:48'),(166,165,'1','2021-02-09 16:19:56'),(172,165,'1','2021-02-09 16:20:05'),(174,165,'1','2021-02-09 16:20:07'),(180,154,'1','2021-02-10 19:56:39'),(186,154,'1','2021-02-10 19:56:43'),(422,154,'1','2021-02-16 16:07:56');
/*!40000 ALTER TABLE `user_thread_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_topic_follow`
--

LOCK TABLES `user_topic_follow` WRITE;
/*!40000 ALTER TABLE `user_topic_follow` DISABLE KEYS */;
INSERT INTO `user_topic_follow` VALUES (3,79),(4,79),(7,79),(8,79),(9,79),(11,79),(14,79),(20,79),(1,85),(1,86),(1,87),(3,87),(4,87),(1,88),(1,89),(10,137),(16,137),(7,154),(8,154),(9,154),(11,154),(16,154),(20,154),(1,163),(4,163),(7,163),(10,163),(16,163),(20,163),(11,164),(16,164),(7,165),(9,165),(11,165),(16,165),(4,166),(10,166),(16,166),(20,166);
/*!40000 ALTER TABLE `user_topic_follow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-18 16:27:56
