#!/bin/bash

# Import .env variables.
source .env
export $(cut -d= -f1 .env)

# Execute sql.
mysql <<EOF
DROP DATABASE $DB_NAME;
DROP USER '$DB_USER'@'%';
EOF
