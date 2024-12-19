.PHONY: reload restart up exec

reload:
	docker-compose -f /root/repo/study/nginx/docker-compose.yml up -d
	docker exec -it nginx nginx -s reload

restart:
	docker restart nginx	

exec:
	docker exec -it nginx bash
