#!/bin/bash

echo Cleanig up 🚿
rm -rf package
mkdir package

echo Copying files 💥
cp -r api package/api
cp -r client package/client
cp .env.example package/.env
cp app.js package/app.js
cp package.json package/package.json
cp package-lock.json package/package-lock.json

echo Finishing 🍻
rm -rf package/client/.cache
rm -rf package/client/dist

echo Package is ready for serve 🍻
