
CREATE TABLE IF NOT EXISTS `capabilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_system_supplied` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `groups`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_system_supplied` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `people_groups` (
  `people_id` varchar(255) NOT NULL,
  `group_id` varchar(255) NOT NULL,
  PRIMARY KEY (`people_id`,`group_id`),
  KEY `idx_people_id` (`people_id`),
  KEY `idx_group_id` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `group_capabilities` (
  `group_id` varchar(255) NOT NULL,
  `capabilities_id` varchar(255) NOT NULL,
  `params1` varchar(255) DEFAULT NULL,
  `params2` varchar(255) DEFAULT NULL,
  `params3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`group_id`, `capabilities_id`),
  KEY `idx_group_id` (`group_id`),
  KEY `idx_capabilities_id` (`capabilities_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;




