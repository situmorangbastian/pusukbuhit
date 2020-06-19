lint:
	deno lint --unstable

run:
	deno run --allow-read --allow-net --unstable --allow-write  --allow-plugin ./app.ts