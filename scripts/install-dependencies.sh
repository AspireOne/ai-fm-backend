#!/bin/bash
# Script to install yt-dlp and ffmpeg dependencies

# Function to detect the Linux distribution
detect_distro() {
  if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
  elif type lsb_release >/dev/null 2>&1; then
    DISTRO=$(lsb_release -si | tr '[:upper:]' '[:lower:]')
  elif [ -f /etc/lsb-release ]; then
    . /etc/lsb-release
    DISTRO=$DISTRIB_ID
  elif [ -f /etc/debian_version ]; then
    DISTRO="debian"
  else
    DISTRO=$(uname -s)
  fi

  echo $DISTRO
}

# Main installation function
install_dependencies() {
  DISTRO=$(detect_distro)
  echo "Detected distribution: $DISTRO"

  # Install FFmpeg and Python based on the Linux distribution
  case $DISTRO in
    ubuntu|debian|pop|mint|elementary)
      echo "Installing dependencies for Debian-based system..."
      sudo apt update
      sudo apt install -y python3 python3-pip ffmpeg
      ;;
    fedora|centos|rhel|rocky|alma)
      echo "Installing dependencies for Red Hat-based system..."
      sudo dnf install -y python3 python3-pip ffmpeg
      ;;
    arch|manjaro|endeavouros)
      echo "Installing dependencies for Arch-based system..."
      sudo pacman -Sy python python-pip ffmpeg
      ;;
    opensuse*|suse)
      echo "Installing dependencies for openSUSE-based system..."
      sudo zypper install -y python3 python3-pip ffmpeg
      ;;
    *)
      echo "Unsupported distribution: $DISTRO"
      echo "Please install Python 3, pip and FFmpeg manually."
      exit 1
      ;;
  esac

  # Install latest yt-dlp using pip (works across all distributions)
  sudo pip3 install --upgrade yt-dlp
  
  # Verify installations
  echo "Checking installations..."
  ffmpeg -version
  yt-dlp --version
  
  echo "Installation complete!"
}

# Run the installation
install_dependencies
