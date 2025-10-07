#!/bin/bash

# Script per avviare server locale condivisibile

echo "🚀 Avvio Quiz Collaborativo Locale..."

# Installa servez se non presente
if ! command -v servez &> /dev/null; then
    echo "📦 Installazione servez..."
    npm install -g servez
fi

# Avvia server locale sulla rete
echo "🌐 Server avviato su:"
echo "   Locale: http://localhost:3000"
echo "   Rete:   http://$(ipconfig getifaddr en0):3000"
echo ""
echo "🎯 Condividi questo URL con gli studenti per il quiz collaborativo!"
echo ""

# Avvia il server
servez dist -p 3000 --host 0.0.0.0