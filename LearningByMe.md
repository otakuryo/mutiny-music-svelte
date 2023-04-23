# Cosas que voy a prendiendo en este proyecto.
- tailwinds requiere unas bibliotecas extra `tailwindcss postcss autoprefixer` y requieren ser instaladas en las dependencias de desarrollo con `--save-dev` o `-D`.
- el equivalente a `npx` en pnpm es `pnpm dlx`
- Si da un error de postcss, iniciar el tailwinds con el commando `pnpm dlx tailwindcss init -p`
- Si da un error con el `pnpm` ejecutar `ln -s ~/.pnpm-store .` y `pnpm config set store-dir ~/pnpm`