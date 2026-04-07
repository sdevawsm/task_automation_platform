-- Script de inicialização do banco de dados
-- Este arquivo será executado automaticamente quando o container MariaDB for criado

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS response_builder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados
USE response_builder;

-- Configurar usuário root para aceitar conexões de qualquer host
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'rootpassword';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Garantir que o usuário root local também funcione
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

-- Aplicar as mudanças
FLUSH PRIVILEGES;

-- Criar usuário específico para a aplicação (opcional)
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';
GRANT ALL PRIVILEGES ON response_builder.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

-- Aqui você pode adicionar suas tabelas iniciais
-- Exemplo:
-- CREATE TABLE IF NOT EXISTS users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
