-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema kardili
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kardili
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kardili` DEFAULT CHARACTER SET utf8 ;
USE `kardili` ;
-- -----------------------------------------------------
-- Table `kardili`.`store_owner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kardili`.`store_owner` (
  `id_owner` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `role` ENUM('owner') NULL DEFAULT 'owner',
  PRIMARY KEY (`id_owner`),
  UNIQUE INDEX `id_UNIQUE` (`id_owner` ASC) VISIBLE)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `kardili`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kardili`.`clients` (
  `idclients` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `balance` INT NULL DEFAULT 0,
  `role` ENUM('client') NULL DEFAULT 'client',
  `store_owner_id_owner` INT NOT NULL,
  PRIMARY KEY (`idclients`, `store_owner_id_owner`),
  UNIQUE INDEX `idclients_UNIQUE` (`idclients` ASC) VISIBLE,
  INDEX `fk_clients_store_owner_idx` (`store_owner_id_owner` ASC) VISIBLE,
  CONSTRAINT `fk_clients_store_owner`
    FOREIGN KEY (`store_owner_id_owner`)
    REFERENCES `kardili`.`store_owner` (`id_owner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;