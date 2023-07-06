include .env

db-init:
	docker compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f /workspace/db/init.sql
	docker compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "\COPY cereals FROM '/workspace/db/cereals.csv' DELIMITER ',' CSV HEADER;"
	docker compose exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "ALTER TABLE cereals ADD id serial PRIMARY KEY;"
