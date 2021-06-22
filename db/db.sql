CREATE TABLE `to_do_db`.`to_do` (
  `idto_do` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL,
  `isDone` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idto_do`));

INSERT INTO `to_do_db`.`to_do` (`description`) VALUES ('water plants');
INSERT INTO `to_do_db`.`to_do` (`description`) VALUES ('buy groceries');
INSERT INTO `to_do_db`.`to_do` (`description`) VALUES ('fix sink');
