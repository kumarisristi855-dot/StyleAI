param(
  [switch]$NoDocker
)

$RootDir    = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = "$RootDir\backend"
$FrontendDir = "$RootDir\frontend"
$ComposeFile = "$RootDir\infrastructure\docker-compose.yml"
$PythonExe  = "$BackendDir\venv\Scripts\python.exe"
$UvicornOut = "$RootDir\uvicorn_out.log"
$UvicornErr = "$RootDir\uvicorn_err.log"

Write-Host ("=" * 45) -ForegroundColor Cyan
Write-Host "  StyleAI - Local Dev" -ForegroundColor Cyan
Write-Host ("=" * 45) -ForegroundColor Cyan

# ─── 1. Docker ───
if (-not $NoDocker) {
  Write-Host "`n[1/3] Starting PostgreSQL and Redis..." -ForegroundColor Yellow

  $dockerOk = $false
  try { $null = docker ps; $dockerOk = $true } catch {}

  if (-not $dockerOk) {
    Write-Host "  Starting Docker Desktop..." -ForegroundColor DarkYellow
    $dp = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dp) { Start-Process $dp -WindowStyle Hidden }
    for ($i = 0; $i -lt 30; $i++) {
      Start-Sleep 2
      try { $null = docker ps; break } catch {}
      Write-Host "." -NoNewline
    }
    Write-Host ""
  }

  docker compose -f $ComposeFile up -d postgres redis 2>$null
  Write-Host "  OK Containers started" -ForegroundColor Green
}

# ─── 2. Backend ───
Write-Host "`n[2/3] Starting Backend (port 8000)..." -ForegroundColor Yellow

$proc = $null
try {
  $proc = Start-Process -NoNewWindow -FilePath $PythonExe -ArgumentList "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000" -WorkingDirectory $BackendDir -RedirectStandardOutput $UvicornOut -RedirectStandardError $UvicornErr -PassThru
  Start-Sleep 3
  Write-Host "  OK Backend started (PID $($proc.Id))" -ForegroundColor Green
} catch {
  Write-Host "  Could not start backend. Check logs in $RootDir" -ForegroundColor DarkYellow
}

# ─── 3. Frontend (foreground) ───
Write-Host "`n[3/3] Starting Frontend (port 3000)..." -ForegroundColor Yellow
Write-Host ""

Set-Location $FrontendDir
try {
  npx next dev
} finally {
  Write-Host "`nShutting down..."
  if ($proc -and $proc.Id) { Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue }
  Write-Host "Done."
}
