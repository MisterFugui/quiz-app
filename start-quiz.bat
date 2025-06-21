@echo off
cd /d H:\Projects\quiz-app\dist
start http://localhost:8080
http-server -p 8080
pause
