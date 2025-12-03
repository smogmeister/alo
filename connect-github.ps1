# GitHub Connection Script
# Run this script after creating your GitHub repository

Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Prompt for repository URL
$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: Repository URL is required!" -ForegroundColor Red
    exit 1
}

# Add remote
Write-Host "Adding remote origin..." -ForegroundColor Yellow
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Remote might already exist. Checking..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}

# Rename branch to main (if needed)
Write-Host "Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Success! Your code has been pushed to GitHub." -ForegroundColor Green
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Error: Failed to push to GitHub. Please check your credentials." -ForegroundColor Red
    Write-Host "You may need to authenticate. Try: gh auth login" -ForegroundColor Yellow
}

