#!/bin/bash
set -e
IFS='|'

amplify push \
--allow-destructive-graphql-schema-updates