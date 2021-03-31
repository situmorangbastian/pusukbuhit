lint:
	deno lint --unstable

run-with-reload:
	deno run --reload --allow-read --allow-net --allow-write  --allow-plugin ./app.ts

run:
	deno run --allow-read --allow-net --allow-write  --allow-plugin ./app.ts

docker:
	docker build -t pusukbuhit .

docker-run:
	docker run -it --init -p 9999:9999 pusukbuhit
