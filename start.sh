#!/usr/bin/bash

cd ~/languageAppAngular
code .
ng serve &

gnome-terminal --tab --working-directory "/home/sandra/languageAppExpress" -- node index.js
