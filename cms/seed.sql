create database cms character set utf8 collate utf8_unicode_ci;

create user 'cms'@'%' identified by 'cms';

grant all privileges on cms.* to 'cms'@'%';