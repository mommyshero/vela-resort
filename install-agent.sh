#!/bin/bash

# Vela Agent - Installation Script
# Install Vela Agent on Ollama with Qwen 7B

echo "🚀 Vela Agent Installation"
echo "=========================="
echo ""

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed."
    echo "📥 Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
fi

echo "✅ Ollama is installed"
echo ""

# Check if Qwen 7B model exists
echo "📦 Checking Qwen 7B model..."
if ollama list | grep -q "qwen:7b"; then
    echo "✅ Qwen 7B model found"
else
    echo "📥 Downloading Qwen 7B model (this may take a while)..."
    ollama pull qwen:7b
fi

echo ""

# Create Vela Agent
echo "🤖 Creating Vela Agent..."
cd "/Users/aporclay/Documents/Nodrama Company/vela-resort"

# Build the model
ollama create vela-agent -f Modelfile

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Vela Agent created successfully!"
    echo ""
    echo "📋 Usage:"
    echo "   ollama run vela-agent"
    echo ""
    echo "🎯 Available Commands:"
    echo "   /vela status    - Show system status"
    echo "   /vela tours     - List tour packages"
    echo "   /vela rooms     - List room types"
    echo "   /vela backup    - Create database backup"
    echo "   /vela update    - Update files"
    echo "   /vela learn     - Add new knowledge"
    echo ""
    echo "💾 Model Location: ~/.ollama/models/"
    echo "📁 Project Location: /Users/aporclay/Documents/Nodrama Company/vela-resort/"
    echo ""
    echo "🎉 Installation complete!"
else
    echo ""
    echo "❌ Failed to create Vela Agent"
    echo "Please check the Modelfile and try again."
    exit 1
fi
