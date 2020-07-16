lint:
	deno lint --unstable

run:
	deno run --allow-read --allow-net --unstable --allow-write  --allow-plugin ./app.ts

docker:
	docker build -t pusukbuhit .

docker-run:
	docker run -it --init -p 9999:9999 pusukbuhit
