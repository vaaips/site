#!/bin/bash

username=$1
ipAddress=$2

if [ ! $username ]
then
  echo Must be pass username as first argument 🚫 
else
  if [ ! $ipAddress ]
  then
    echo Must be pass domain name as second argument 🚫 
  else
    echo Deploying... ⌛
    scp -r ./package/. $username@$ipAddress:~/package
    echo -e Deployed to ${username}@${ipAddress}:~/package
    echo Deployment completed 🎉
  fi
fi