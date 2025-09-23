#!/bin/bash

# Script to migrate UI component imports to shared-ui package
# Usage: ./migrate-imports.sh <frontend-dir>

FRONTEND_DIR=${1:-"../../frontend"}

echo "Migrating imports in $FRONTEND_DIR"

# List of components to migrate
COMPONENTS=(
  "button"
  "card"
  "badge"
  "input"
  "label"
  "progress"
  "tabs"
  "textarea"
  "dialog"
  "separator"
  "select"
)

# Find and replace component imports
for component in "${COMPONENTS[@]}"; do
  echo "Migrating $component imports..."
  
  # Find all TypeScript/React files
  find "$FRONTEND_DIR/src" -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "from.*components/ui/$component" {} \; | while read file; do
    echo "  Updating: $file"
    
    # Replace the import path
    sed -i.bak "s|from ['\"].*components/ui/$component['\"]|from '@infinityvault/shared-ui'|g" "$file"
    
    # Remove backup file
    rm "${file}.bak" 2>/dev/null || true
  done
done

# Special handling for composite imports that need path updates
echo "Migrating ChatMessage imports..."
find "$FRONTEND_DIR/src" -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "from.*components/chat/ChatMessage" {} \; | while read file; do
  echo "  Updating: $file"
  sed -i.bak "s|from ['\"].*components/chat/ChatMessage['\"]|from '@infinityvault/shared-ui'|g" "$file"
  rm "${file}.bak" 2>/dev/null || true
done

echo "Migration complete! Please review the changes and test your application."