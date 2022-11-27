start:
	docker-compose up -d dev db
start-prod:
	docker-compose up -d prod db
down:
	docker-compose down
build:
	docker-compose --build dev db
psql_bash:
	docker exec -it crm_db_1 bash
delete_all_volumes:
	docker volume rm $(docker volume ls -q)
volumes:
	docker volume ls