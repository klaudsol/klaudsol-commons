LOCK TABLES `people` WRITE;
REPLACE INTO `people`(`id`,`first_name`,`last_name`,`login_enabled`,`email`,`encrypted_password`,`salt`,`role`) VALUES 
  (1,'John','Doe',1,'admin@klaudsol.com','1686254050d3f34b4efe72a4ce628e3e123d6699901283e2f3cdc1bdae83e508','5a3KTYp6Xg','');
UNLOCK TABLES;
