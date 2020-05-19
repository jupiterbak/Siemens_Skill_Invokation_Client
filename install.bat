@echo off
SET sm_original=%CD%
IF EXIST node_modules (
    echo node_modules already installed. 
) ELSE (
    for /F %%I IN ('dir /b *.zip *.rar') DO (
        "C:\Program Files\7-Zip\7z.exe" x -o"%%~dpI" "%%I"
    )
)


cd %sm_original%/backend/application/services/WebServerService/public
IF EXIST bower_components (
    echo bower_components already installed. 
) ELSE (
    for /F %%I IN ('dir /b *.zip *.rar') DO (
        "C:\Program Files\7-Zip\7z.exe" x -o"%%~dpI" "%%I"
    )
)
cd %sm_original%