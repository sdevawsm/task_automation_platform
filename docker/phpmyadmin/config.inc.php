<?php
/**
 * Configurações do phpMyAdmin para uploads grandes
 */

// Configurações de servidor
$cfg['Servers'][1]['host'] = 'mariadb';
$cfg['Servers'][1]['port'] = '3306';
$cfg['Servers'][1]['socket'] = '';
$cfg['Servers'][1]['connect_type'] = 'tcp';
$cfg['Servers'][1]['auth_type'] = 'config';
$cfg['Servers'][1]['user'] = getenv('PMA_USER') ?: 'root';
$cfg['Servers'][1]['password'] = getenv('PMA_PASSWORD') ?: '';

// Configurações de upload
$cfg['MaxSizeForInputField'] = 50 * 1024 * 1024; // 50MB
$cfg['ExecTimeLimit'] = 300; // 5 minutos

// Configurações de memória
$cfg['MemoryLimit'] = '256M';

// Configurações de sessão
$cfg['LoginCookieValidity'] = 1440; // 24 horas

// Configurações de timeout
$cfg['LoginCookieRecall'] = true;
$cfg['LoginCookieDeleteAll'] = true;

// Configurações de segurança
$cfg['blowfish_secret'] = getenv('PMA_BLOWFISH_SECRET') ?: 'change-this-random-phrase-in-production';

// Configurações de upload de arquivos
$cfg['UploadDir'] = '/tmp/';
$cfg['SaveDir'] = '/tmp/';

// Configurações de compressão
$cfg['ZipDump'] = true;
$cfg['GZipDump'] = true;
$cfg['BZipDump'] = true;

// Configurações de timeout para operações longas
$cfg['ExecTimeLimit'] = 300;
$cfg['MemoryLimit'] = '256M';

// Configurações de charset
$cfg['DefaultCharset'] = 'utf8mb4';
$cfg['DefaultConnectionCollation'] = 'utf8mb4_unicode_ci';

// Configurações de conexão
$cfg['Servers'][1]['compress'] = false;
$cfg['Servers'][1]['AllowNoPassword'] = false;
$cfg['Servers'][1]['AllowRoot'] = true;
?>
