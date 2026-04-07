#!/bin/bash

# Script para importar arquivos SQL grandes diretamente no container MariaDB
# Uso: ./import-sql.sh arquivo.sql

if [ $# -eq 0 ]; then
    echo "❌ Uso: ./import-sql.sh arquivo.sql"
    echo "📁 Exemplo: ./import-sql.sh backup.sql"
    exit 1
fi

SQL_FILE=$1

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Arquivo não encontrado: $SQL_FILE"
    exit 1
fi

echo "🔄 Importando arquivo SQL: $SQL_FILE"
echo "📊 Tamanho do arquivo: $(du -h "$SQL_FILE" | cut -f1)"

# Copiar arquivo para o container
echo "📦 Copiando arquivo para o container..."
docker cp "$SQL_FILE" response_builder_mariadb:/tmp/import.sql

# Executar importação (usando variáveis de ambiente)
echo "🚀 Executando importação..."
DB_USER="${DB_APP_USER:-app_user}"
DB_PASSWORD="${DB_APP_PASSWORD:-app_password}"
DB_NAME="${DB_NAME:-sdev_app}"
docker exec -i response_builder_mariadb mariadb -h 127.0.0.1 -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$SQL_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Importação concluída com sucesso!"
else
    echo "❌ Erro durante a importação"
    exit 1
fi

# Limpar arquivo temporário
docker exec response_builder_mariadb rm -f /tmp/import.sql

echo "🎉 Processo finalizado!"
