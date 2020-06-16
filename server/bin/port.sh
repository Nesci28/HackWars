PID=$(netstat -ano | findstr "PID :3000" | tail -1 | sed 's/ //g' | sed 's/LISTENING/~/g' | cut -d "~" -f 2)
echo $PID

powershell.exe -Command "Start-Process cmd \"/k taskkill /pid $PID /f && exit\" -Verb RunAs"