#!/bin/bash

# Import .env variables.
source ./config/.env
export $(cut -d= -f1 ./config/.env)

# Execute sql.
mysql <<EOF
CREATE USER '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';
CREATE DATABASE $DB_NAME;
GRANT INSERT, CREATE, ALTER, UPDATE, SELECT, REFERENCES ON $DB_NAME.*
TO '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD'
WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF
