@REM Script to initialize project

@REM Chnage to current working directory
cd %cd%

@REM Start MySQL service
net start MySQL80

@REM Run server
cd server
start npm run start
@REM npm install

@REM Run client
cd ../client
start npm run start
@REM npm install

@REM Run Botpress bot
cd ../botpress-bot
start ./bp

pause
