@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         🚀 IWJI - Liara Deploy Cleanup Script                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/4] ⏳ حذف فایل‌های بزرگ از git history...
echo.

echo      • Removing: public/registration
git rm -r --cached public/registration 2>nul

echo      • Removing: public/uploads
git rm -r --cached public/uploads 2>nul

echo      • Removing: public/poster
git rm -r --cached public/poster 2>nul

echo      • Removing: public/tickets
git rm -r --cached public/tickets 2>nul

echo      • Removing: .next
git rm -r --cached .next 2>nul

echo      • Removing: node_modules
git rm -r --cached node_modules 2>nul

echo      • Removing: .sixth
git rm -r --cached .sixth 2>nul

echo      • Removing: models (if large)
git rm -r --cached models 2>nul

echo.
echo [2/4] 📝 آپدیت .gitignore...

REM Create comprehensive .gitignore
(
echo # =========================
echo # Next.js
echo # =========================
echo .next
echo out
echo .sixth
echo.
echo # =========================
echo # Dependencies
echo # =========================
echo node_modules
echo.
echo # =========================
echo # Logs
echo # =========================
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo pnpm-debug.log*
echo.
echo # =========================
echo # Environment
echo # =========================
echo .env
echo .env.local
echo .env.development.local
echo .env.production.local
echo .env.*.local
echo.
echo # =========================
echo # Git
echo # =========================
echo .git
echo .gitignore~
echo.
echo # =========================
echo # Editor / OS
echo # =========================
echo .vscode
echo .idea
echo .DS_Store
echo Thumbs.db
echo *.swp
echo *.swo
echo *~
echo.
echo # =========================
echo # Media (heavy files)
echo # =========================
echo *.mp4
echo *.mov
echo *.avi
echo *.mkv
echo *.webm
echo *.gif
echo *.tar.gz
echo *.zip
echo *.rar
echo *.7z
echo.
echo # =========================
echo # Uploads and User Data
echo # =========================
echo public/registration
echo public/uploads
echo public/poster
echo public/tickets
echo public/temp
echo public/cache
echo.
echo # =========================
echo # Models and Large Data
echo # =========================
echo models
echo.
echo # =========================
echo # Build cache and temp
echo # =========================
echo temp
echo tmp
echo cache
echo .cache
echo *.tmp
echo.
echo # =========================
echo # IDE specific
echo # =========================
echo .vscode/*
echo !.vscode/settings.json
echo .idea/*
echo *.sublime-project
echo *.sublime-workspace
echo.
echo # =========================
echo # System files
echo # =========================
echo .DS_Store
echo .AppleDouble
echo .LSOverride
echo.
echo # =========================
echo # Build outputs
echo # =========================
echo dist
echo build
echo.
echo # =========================
echo # Test coverage
echo # =========================
echo coverage
echo .nyc_output
echo.
echo # =========================
echo # Package lock files
echo # =========================
echo package-lock.json
echo yarn.lock
echo pnpm-lock.yaml
) > .gitignore

echo      ✅ .gitignore updated

echo.
echo [3/4] 📦 Committing changes to git...
git add .gitignore
git commit -m "chore: optimize .gitignore to reduce source size for Liara deployment

- Remove large uploaded files (registration, uploads, tickets, poster)
- Remove build artifacts (.next, dist, build)
- Remove node_modules and dependencies
- Remove models folder
- Add comprehensive ignore patterns

This reduces the project size below 256MB limit for Liara Standard plan."

echo.
echo [4/4] 🚀 Ready to deploy...
echo.
echo      To deploy, run: liara deploy
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║              ✅ Cleanup Complete!                              ║
echo ║     شما می‌توانید الآن: liara deploy اجرا کنید               ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

pause
