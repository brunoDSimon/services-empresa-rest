CREATE DATABASE IF NOT EXISTS empresa;
CREATE USER IF NOT EXISTS 'dbproducao'@'%' IDENTIFIED BY 'testing@123';
GRANT ALL PRIVILEGES ON empresa.* TO 'dbproducao'@'%';
ALTER USER 'dbproducao'@'%' IDENTIFIED WITH mysql_native_password BY 'testing@123';
FLUSH PRIVILEGES;
