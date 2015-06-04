-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2015 at 01:25 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `saloos`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
`id` int(10) unsigned NOT NULL,
  `post_id` bigint(20) unsigned DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  `comment_author` varchar(50) DEFAULT NULL,
  `comment_email` varchar(100) DEFAULT NULL,
  `comment_url` varchar(100) DEFAULT NULL,
  `comment_content` varchar(999) NOT NULL DEFAULT '',
  `comment_status` enum('approved','unapproved','spam','deleted') NOT NULL DEFAULT 'unapproved',
  `comment_parent` smallint(5) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `Visitor_id` bigint(20) unsigned NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `errorlogs`
--

CREATE TABLE IF NOT EXISTS `errorlogs` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `errorlog_id` smallint(5) unsigned NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE IF NOT EXISTS `errors` (
  `id` smallint(5) unsigned NOT NULL,
  `error_title` varchar(100) NOT NULL,
  `error_solution` varchar(999) DEFAULT NULL,
  `error_priority` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
`id` bigint(20) unsigned NOT NULL,
  `user_idsender` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `notification_title` varchar(50) NOT NULL,
  `notification_content` varchar(200) DEFAULT NULL,
  `notification_url` varchar(100) DEFAULT NULL,
  `notification_status` enum('read','unread','expire') NOT NULL DEFAULT 'unread',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE IF NOT EXISTS `options` (
`id` smallint(5) unsigned NOT NULL,
  `option_cat` varchar(50) NOT NULL,
  `option_key` varchar(50) NOT NULL,
  `option_value` varchar(200) DEFAULT NULL,
  `option_extra` varchar(400) DEFAULT NULL,
  `option_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `option_cat`, `option_key`, `option_value`, `option_extra`, `option_status`, `date_modified`) VALUES
(1, 'global', 'language', 'fa', NULL, '', '2014-05-01 08:18:41'),
(2, 'global', 'language', 'en', NULL, '', '2014-05-01 08:18:42'),
(3, 'global', 'title', 'Jibres', NULL, '', '2014-11-07 17:29:37'),
(4, 'global', 'desc', 'Jibres for all', NULL, '', '2014-11-07 17:29:46'),
(5, 'global', 'keyword', 'Jibres, store, online store', NULL, '', '2014-11-07 17:30:07'),
(6, 'global', 'url', 'http://jibres.ir', NULL, '', '2014-11-07 17:30:18'),
(7, 'global', 'email', 'info@jibres.ir', NULL, '', '2014-11-07 17:30:22'),
(8, 'global', 'auto_mail', 'no-reply@jibres.ir', NULL, '', '2014-11-07 17:30:27'),
(9, 'users', 'user_degree', 'under diploma', NULL, '', '0000-00-00 00:00:00'),
(10, 'users', 'user_degree', 'diploma', NULL, '', '0000-00-00 00:00:00'),
(11, 'users', 'user_degree', '2-year collage', NULL, '', '0000-00-00 00:00:00'),
(12, 'users', 'user_degree', 'bachelor', NULL, '', '0000-00-00 00:00:00'),
(13, 'users', 'user_degree', 'master', NULL, '', '0000-00-00 00:00:00'),
(14, 'users', 'user_degree', 'doctorate', NULL, '', '0000-00-00 00:00:00'),
(15, 'users', 'user_degree', 'religious', NULL, '', '0000-00-00 00:00:00'),
(16, 'users', 'user_activity', 'employee', NULL, '', '0000-00-00 00:00:00'),
(17, 'users', 'user_activity', 'housekeeper ', NULL, '', '0000-00-00 00:00:00'),
(18, 'users', 'user_activity', 'free lance', NULL, '', '0000-00-00 00:00:00'),
(19, 'users', 'user_activity', 'retired', NULL, '', '0000-00-00 00:00:00'),
(20, 'users', 'user_activity', 'student', NULL, '', '0000-00-00 00:00:00'),
(21, 'users', 'user_activity', 'unemployed', NULL, '', '0000-00-00 00:00:00'),
(22, 'users', 'user_activity', 'seminary student', NULL, '', '0000-00-00 00:00:00'),
(23, 'permissions', 'permission_name', 'admin', NULL, '', '2014-11-07 17:30:55'),
(24, 'permissions', 'permission_name', 'reseller', NULL, '', '2014-11-07 17:30:56'),
(26, 'ships', 'post', '1', NULL, '', '2014-11-07 17:30:56'),
(27, 'ships', 'tipax', '2', NULL, '', '2014-11-07 17:30:57'),
(28, 'units', 'money_unit', 'toman', NULL, '', '2014-11-07 17:31:08'),
(29, 'units', 'product_unit', 'adad', NULL, '', '2014-11-07 17:31:29'),
(30, 'permissions', 'permission_name', 'viewer', NULL, '', '2014-05-17 21:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `postmetas`
--

CREATE TABLE IF NOT EXISTS `postmetas` (
  `id` bigint(20) unsigned NOT NULL,
  `post_id` bigint(20) unsigned NOT NULL,
  `postmeta_cat` varchar(50) NOT NULL,
  `postmeta_key` varchar(100) NOT NULL,
  `postmeta_value` varchar(999) DEFAULT NULL,
  `postmeta_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
`id` bigint(20) unsigned NOT NULL,
  `post_language` char(2) DEFAULT NULL,
  `post_cat` varchar(50) DEFAULT NULL,
  `post_title` varchar(100) NOT NULL,
  `post_slug` varchar(100) NOT NULL,
  `post_content` text,
  `post_type` varchar(50) NOT NULL DEFAULT 'post',
  `post_url` text,
  `post_comment` enum('open','closed') DEFAULT NULL,
  `post_count` smallint(5) unsigned DEFAULT NULL,
  `post_status` enum('publish','draft','schedule','deleted','expire') NOT NULL DEFAULT 'draft',
  `post_parent` smallint(5) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `post_publishdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_language`, `post_cat`, `post_title`, `post_slug`, `post_content`, `post_type`, `post_url`, `post_comment`, `post_count`, `post_status`, `post_parent`, `user_id`, `post_publishdate`, `date_modified`) VALUES
(1, 'fa', NULL, 'test1', 'page1', 'salam. in test 1 ast', 'page', NULL, 'open', NULL, 'publish', NULL, 150, NULL, '2015-02-11 14:46:49'),
(2, 'en', 'test', 'post1', 'post1', 'salam. post1 ast', 'post', NULL, 'open', NULL, 'publish', NULL, 150, NULL, '2015-02-11 14:46:52');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE IF NOT EXISTS `terms` (
`id` int(10) unsigned NOT NULL,
  `term_language` char(2) DEFAULT NULL,
  `term_cat` varchar(50) NOT NULL,
  `term_title` varchar(50) NOT NULL,
  `term_slug` varchar(50) NOT NULL,
  `term_desc` text NOT NULL,
  `term_parent` int(10) unsigned DEFAULT NULL,
  `term_count` smallint(5) unsigned DEFAULT NULL,
  `term_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `term_language`, `term_cat`, `term_title`, `term_slug`, `term_desc`, `term_parent`, `term_count`, `term_status`, `date_modified`) VALUES
(1, NULL, '', 'news', 'news', '', NULL, NULL, 'enable', '0000-00-00 00:00:00'),
(5, NULL, '', 'test', 'test', 't', NULL, NULL, 'enable', '2015-01-18 13:33:13'),
(6, NULL, '', 'news2', 'news2', 'news 2', 1, NULL, 'enable', '2015-01-18 15:45:20'),
(7, NULL, '', 'tag1', 'tag1', '', NULL, NULL, 'enable', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `termusages`
--

CREATE TABLE IF NOT EXISTS `termusages` (
  `term_id` int(10) unsigned NOT NULL,
  `object_id` bigint(20) unsigned NOT NULL,
  `termusage_type` enum('posts','products','attachments','comments') DEFAULT NULL,
  `termusage_order` smallint(5) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--

CREATE TABLE IF NOT EXISTS `userlogs` (
`id` bigint(20) unsigned NOT NULL,
  `userlog_title` varchar(50) DEFAULT NULL,
  `userlog_desc` varchar(999) DEFAULT NULL,
  `userlog_priority` enum('high','medium','low') NOT NULL DEFAULT 'medium',
  `userlog_type` enum('forgetpassword') DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usermetas`
--

CREATE TABLE IF NOT EXISTS `usermetas` (
`id` bigint(20) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `usermeta_cat` varchar(50) NOT NULL,
  `usermeta_key` varchar(100) NOT NULL,
  `usermeta_value` varchar(500) DEFAULT NULL,
  `usermeta_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(10) unsigned NOT NULL,
  `user_mobile` varchar(15) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_pass` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_displayname` varchar(50) DEFAULT NULL,
  `user_status` enum('active','awaiting','deactive','removed','filter') DEFAULT 'awaiting',
  `permission_id` smallint(5) unsigned DEFAULT NULL,
  `user_createdate` datetime NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_mobile`, `user_email`, `user_pass`, `user_displayname`, `user_status`, `permission_id`, `user_createdate`, `date_modified`) VALUES
(15, '989356032043', NULL, '$2y$07$ZRUphEsEn9bK8inKBfYt.efVoZDgBaoNfZz0uVRqRGvH9.che.Bqq', 'Hasan', 'active', 1, '0000-00-00 00:00:00', NULL),
(150, '989199840989', NULL, '$2y$07$ZRUphEsEn9bK8inKBfYt.efVoZDgBaoNfZz0uVRqRGvH9.che.Bqq', 'Mahdi', 'active', 1, '0000-00-00 00:00:00', NULL),
(190, '989357269759', NULL, '$2y$07$9wj8/jDeQKyY0t0IcUf.xOEy98uf6BaSS7Tg28swrKUDxdKzUVfsy', 'javad', 'active', 1, '2015-01-25 04:52:07', '2015-02-25 01:19:43'),
(191, '989357269242', NULL, '$2y$07$csWDOaZJcBVPaTilCz/LbutO5HqBV72YW3HBAbxlvMm50SlzRtQ0W', NULL, 'awaiting', NULL, '2015-02-24 11:59:03', NULL),
(192, '989120001111', NULL, '$2y$07$QUTZcP7LhWtVfHGINrwSy.VjV2WQN518Z.v16cRb7xEX.kwKj0l06', NULL, 'awaiting', 1, '2015-02-25 02:08:40', '2015-02-25 21:24:06'),
(193, '989120002222', NULL, '$2y$07$QT5xKQWR8LxTSgDSmK2Wg.b7pK/6slmmFTTqTPq3GGKlj1OpY4gOC', NULL, 'awaiting', 2, '2015-02-25 02:13:26', '2015-02-25 21:24:09');

-- --------------------------------------------------------

--
-- Table structure for table `verifications`
--

CREATE TABLE IF NOT EXISTS `verifications` (
`id` smallint(5) unsigned NOT NULL,
  `verification_type` enum('emailsignup','emailchangepass','emailrecovery','mobilesignup','mobilechangepass','mobilerecovery') NOT NULL,
  `verification_value` varchar(50) NOT NULL,
  `verification_code` varchar(32) NOT NULL,
  `verification_url` varchar(100) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `verification_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `verification_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `verification_createdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Triggers `verifications`
--
DELIMITER //
CREATE TRIGGER `verification_AU_outline_update` AFTER UPDATE ON `verifications`
 FOR EACH ROW IF NEW.verification_verified <> OLD.verification_verified THEN
   if new.verification_verified = 'yes' then
       UPDATE users SET user_status = 'active' WHERE id = New.user_id;
   END IF;
END IF
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE IF NOT EXISTS `visitors` (
`id` bigint(20) unsigned NOT NULL,
  `visitor_ip` int(10) unsigned NOT NULL,
  `visitor_url` varchar(255) NOT NULL,
  `visitor_agent` varchar(255) NOT NULL,
  `visitor_referer` varchar(255) DEFAULT NULL,
  `visitor_robot` enum('yes','no') NOT NULL DEFAULT 'no',
  `user_id` int(10) unsigned DEFAULT NULL,
  `visitor_createdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`id`), ADD KEY `comments_posts_id` (`post_id`) USING BTREE, ADD KEY `comments_users_id` (`user_id`) USING BTREE, ADD KEY `comments_products_id` (`product_id`) USING BTREE, ADD KEY `comments_visitors_id` (`Visitor_id`);

--
-- Indexes for table `errorlogs`
--
ALTER TABLE `errorlogs`
 ADD PRIMARY KEY (`id`), ADD KEY `errorlogs_users_id` (`user_id`) USING BTREE, ADD KEY `errorlogs_errors_id` (`errorlog_id`) USING BTREE;

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
 ADD PRIMARY KEY (`id`), ADD KEY `priotity_index` (`error_priority`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
 ADD PRIMARY KEY (`id`), ADD KEY `status_index` (`notification_status`), ADD KEY `notifications_users_idsender` (`user_idsender`) USING BTREE, ADD KEY `notifications_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `options`
--
ALTER TABLE `options`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `cat+name+value` (`option_cat`,`option_key`,`option_value`);

--
-- Indexes for table `postmetas`
--
ALTER TABLE `postmetas`
 ADD PRIMARY KEY (`id`), ADD KEY `postmeta_posts_id` (`post_id`) USING BTREE;

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `slug+catslug_unique` (`post_cat`,`post_slug`), ADD KEY `posts_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `slug_unique` (`term_slug`) USING BTREE;

--
-- Indexes for table `termusages`
--
ALTER TABLE `termusages`
 ADD UNIQUE KEY `term+type+object_unique` (`term_id`,`object_id`,`termusage_type`) USING BTREE;

--
-- Indexes for table `userlogs`
--
ALTER TABLE `userlogs`
 ADD PRIMARY KEY (`id`), ADD KEY `priority_index` (`userlog_priority`), ADD KEY `type_index` (`userlog_type`), ADD KEY `userlogs_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `usermetas`
--
ALTER TABLE `usermetas`
 ADD PRIMARY KEY (`id`), ADD KEY `usermeta_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `mobile_unique` (`user_mobile`) USING BTREE, ADD UNIQUE KEY `email_unique` (`user_email`) USING BTREE, ADD KEY `users_permissions_id` (`permission_id`);

--
-- Indexes for table `verifications`
--
ALTER TABLE `verifications`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `code_unique` (`verification_url`,`verification_value`) USING BTREE, ADD KEY `verifications_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
 ADD PRIMARY KEY (`id`), ADD KEY `visitors_users_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `errorlogs`
--
ALTER TABLE `errorlogs`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `userlogs`
--
ALTER TABLE `userlogs`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usermetas`
--
ALTER TABLE `usermetas`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT for table `verifications`
--
ALTER TABLE `verifications`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `comments_posts_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `comments_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
ADD CONSTRAINT `comments_visitors_id` FOREIGN KEY (`Visitor_id`) REFERENCES `visitors` (`id`);

--
-- Constraints for table `errorlogs`
--
ALTER TABLE `errorlogs`
ADD CONSTRAINT `errorlogs_errors_id` FOREIGN KEY (`errorlog_id`) REFERENCES `errors` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `errorlogs_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
ADD CONSTRAINT `notifications_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postmetas`
--
ALTER TABLE `postmetas`
ADD CONSTRAINT `postmeta_posts_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
ADD CONSTRAINT `posts_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `termusages`
--
ALTER TABLE `termusages`
ADD CONSTRAINT `termusages_terms_id` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userlogs`
--
ALTER TABLE `userlogs`
ADD CONSTRAINT `userlogs_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION;

--
-- Constraints for table `usermetas`
--
ALTER TABLE `usermetas`
ADD CONSTRAINT `usermetas_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `verifications`
--
ALTER TABLE `verifications`
ADD CONSTRAINT `verifications_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `visitors`
--
ALTER TABLE `visitors`
ADD CONSTRAINT `visitors_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
