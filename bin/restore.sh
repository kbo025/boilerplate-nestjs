#!/bin/env bash

SQL_FILE="$@"

if [[ ! -f $SQL_FILE ]]; then
 echo "You need to pass a valid path, e.g /tmp/dump.sql"
 exit 1
fi

FILENAME=$(basename ${SQL_FILE})

bin/bot cp "${SQL_FILE}" db:/tmp/
bin/bot psql -U root -d pgdb -c "drop schema public cascade;"
bin/bot psql -U root -d pgdb -c "create schema public; create role single_api; create role rdsadmin;"
bin/bot psql -U root -d pgdb -f "/tmp/${FILENAME}"