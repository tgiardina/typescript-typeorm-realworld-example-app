#!/bin/bash

# Import .env variables.
source ./config/.env
export $(cut -d= -f1 ./config/.env)

# Execute sql.
mysql <<EOF
DROP DATABASE $DB_NAME;
DROP USER '$DB_USER'@'%';
EOF
