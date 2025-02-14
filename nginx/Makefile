.PHONY: reload test restart exec up

reload:
	docker-compose -f /root/repo/study/nginx/docker-compose.yml up -d
	docker exec -it nginx nginx -s reload

test:
	docker exec -it nginx nginx -t

restart:
	docker restart nginx	

exec:
	docker exec -it nginx bash

up:
	-service docker start
	-docker stop web lab edu traefik
	make reload