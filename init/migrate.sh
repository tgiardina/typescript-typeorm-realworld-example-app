#!/bin/bash

# Check if MySQL is up.
RETRIES=20

until npx sequelize-cli db:migrate > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for mysql server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

