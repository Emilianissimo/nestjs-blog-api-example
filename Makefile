start:
	docker-compose up -d dev db
start-logging:
	docker-compose up dev db
start-prod:
	docker-compose up -d prod db
down:
	docker-compose down
build:
	docker-compose up --build dev db
psql_bash:
	docker exec -it crm_db_1 bash
delete_all_volumes:
	docker volume rm $(docker volume ls -q)
volumes:
	docker volume ls