#!/bin/bash

# Check if MySQL is up.
RETRIES=20

until npm run typeorm -- migration:run > /dev/null 2>&1 || [ $RETRIES -eq 0 ];
do
  echo "Waiting for mysql server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

