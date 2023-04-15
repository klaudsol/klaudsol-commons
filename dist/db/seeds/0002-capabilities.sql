LOCK TABLES `capabilities` WRITE;
INSERT INTO `capabilities` VALUES 
(1,"read_contents","Read contents",1),
(2,"write_contents","Add, Update, or Delete contents",1),
(3,"read_content_types","Read Content types",1),
(4,"write_content_types","Add, Update, or Delete content types",1),
(5,"read_setttings","Get global setting values",1),
(6,"write_settings","Modify global setting values",1),
(7,"modify_logo","Change the logo on the front page, defaults to the KlaudSol logo",1),
(8,"read_users","Read users' capabilities",1),
(9,"write_users","Modify users' capabilities",1),
(10,"read_groups","Read groups' capabilities",1),
(11,"write_groups","Modify groups' capabilities",1);
UNLOCK TABLES;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
INSERT INTO `groups` VALUES 
(1,"Super Administrators","Super Administrators can setup the configuration of KlaudSol CMS.",1),
(2,"Administrators","The Administrators manage the day-to-day operations of KlaudSol CMS",1),
(3,"Editors","Editors are primarily responsible for curating for the content inside KlaudSol CMS.",1),
(4,"Guests","By default, a user is a guest unless the user explicitly belongs to another group.",1);
UNLOCK TABLES;



--
-- Dumping data for table `people_groups`
--

LOCK TABLES `people_groups` WRITE;
INSERT INTO `people_groups` VALUES (1,1),(1,2),(1,3),(1,4);
UNLOCK TABLES;

--
-- Dumping data for table `group_capabilities`
--

LOCK TABLES `group_capabilities` WRITE;
INSERT INTO `group_capabilities` VALUES 
(1,1,NULL,NULL,NULL),
(1,2,NULL,NULL,NULL),
(1,3,NULL,NULL,NULL),
(1,4,NULL,NULL,NULL),
(1,5,NULL,NULL,NULL),
(1,6,NULL,NULL,NULL),
(1,7,NULL,NULL,NULL),
(1,8,NULL,NULL,NULL),
(1,9,NULL,NULL,NULL),
(1,10,NULL,NULL,NULL),
(1,11,NULL,NULL,NULL),
(2,1,NULL,NULL,NULL),
(2,2,NULL,NULL,NULL),
(2,3,NULL,NULL,NULL),
(2,4,NULL,NULL,NULL),
(2,5,NULL,NULL,NULL),
(2,6,NULL,NULL,NULL),
(2,7,NULL,NULL,NULL),
(2,8,NULL,NULL,NULL),
(2,9,NULL,NULL,NULL),
(2,10,NULL,NULL,NULL),
(2,11,NULL,NULL,NULL),
(3,1,NULL,NULL,NULL),
(3,2,NULL,NULL,NULL),
(3,3,NULL,NULL,NULL),
(3,4,NULL,NULL,NULL),
(4,1,NULL,NULL,NULL),
(4,3,NULL,NULL,NULL);
UNLOCK TABLES;




