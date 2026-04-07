#!/bin/bash

echo "🔄 Resetando containers e volumes Docker..."

# Parar e remover containers
echo "📦 Parando containers..."
docker-compose down

# Remover volumes (isso apagará todos os dados do banco)
echo "🗑️  Removendo volumes..."
docker-compose down -v

# Remover imagens (opcional, para forçar rebuild)
echo "🖼️  Removendo imagens..."
docker-compose down --rmi all

# Limpar sistema Docker (opcional)
echo "🧹 Limpando sistema Docker..."
docker system prune -f

echo "✅ Reset completo! Agora execute: docker-compose up --build"
