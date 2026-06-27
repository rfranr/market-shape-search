#!/usr/bin/env bash
set -euo pipefail

# Install dependencies and start the local development environment.
# Based on README.md startup instructions.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

PYTHON_BIN="${PYTHON_BIN:-python3}"
VENV_DIR="apps/backend-dtw/.venv"
VENV_ABS="$ROOT_DIR/$VENV_DIR"
REQUIREMENTS_FILE="apps/backend-dtw/requirements.txt"

command -v npm >/dev/null 2>&1 || { echo "Error: npm is required but was not found." >&2; exit 1; }
command -v "$PYTHON_BIN" >/dev/null 2>&1 || { echo "Error: $PYTHON_BIN is required but was not found." >&2; exit 1; }

echo "Installing Node.js dependencies..."
npm install

if [ -d "$VENV_DIR" ]; then
  if [ ! -x "$VENV_DIR/bin/python" ] || ! "$VENV_DIR/bin/python" -c 'import sys' >/dev/null 2>&1; then
    echo "Existing Python virtual environment is broken; recreating $VENV_DIR..."
    rm -rf "$VENV_DIR"
  elif [ -f "$VENV_DIR/pyvenv.cfg" ] && grep -q '^command = ' "$VENV_DIR/pyvenv.cfg" && ! grep -Fq "$VENV_ABS" "$VENV_DIR/pyvenv.cfg"; then
    echo "Existing Python virtual environment was created at a different path; recreating $VENV_DIR..."
    rm -rf "$VENV_DIR"
  else
    echo "Python virtual environment already exists at $VENV_DIR."
  fi
fi

if [ ! -d "$VENV_DIR" ]; then
  echo "Creating Python virtual environment at $VENV_DIR..."
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

echo "Upgrading pip..."
"$VENV_DIR/bin/python" -m pip install --upgrade pip

echo "Installing Python dependencies..."
"$VENV_DIR/bin/python" -m pip install -r "$REQUIREMENTS_FILE"

echo "Starting development services..."
echo "Frontend:    http://localhost:3000"
echo "BFF:         http://localhost:3001"
echo "Backend DTW: http://localhost:8000"
exec npm run dev
