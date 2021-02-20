# PSU-Portable-CLI - A command line executable based application that interacts with the PSU API.

# Usage:
```powershell
  psu-cli -s ./Script.lua -k api_key
```

# Installation
- You can head up to the **releases** page to download a pre-built executable.
- Or.. you can compile it yourself using the **pkg** package

**Initalization**:
- Install ``pkg`` by using the npm install command
```powershell
npm install --global pkg
```
- Then clone the repository in your desired directory.
```powershell
git clone https://github.com/ParadoxDeveloper/psu-portable
```
- Install the **required** modules then run the start script
```powershell
npm install
npm run start
```
- It will create an executable for MacOS, Linux, Windows.

# Avaliable options
You can use our help command by:
```powershell
psu-cli --help
```