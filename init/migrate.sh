#!/bin/bash

# Check if MySQL is up.
RETRIES=10

until npx sequelize-cli db:migrate || [ $RETRIES -eq 0 ]; do
  echo "Waiting for mysql server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

