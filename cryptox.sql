\echo 'Delete and recreate cryptox db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cryptox;
CREATE DATABASE cryptox;
\connect cryptox

\i cryptox-schema.sql
\i cryptox-seed.sql

\echo 'Delete and recreate cryptox_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE cryptox_test;
CREATE DATABASE cryptox_test;
\connect cryptox_test

\i cryptox-schema.sql
