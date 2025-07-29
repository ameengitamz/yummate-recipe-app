#!/bin/bash

# YumMate Storybook Starter Script
# This script ensures Node 20 is used and starts Storybook correctly

echo "🚀 Starting YumMate Storybook..."

# Switch to Node 20 if nvm is available
if command -v nvm &> /dev/null; then
    echo "📦 Switching to Node.js 20..."
    nvm use 20
fi

# Start Storybook with the correct binary path
echo "📚 Launching Storybook on http://localhost:6006..."
./node_modules/.bin/storybook dev -p 6006
