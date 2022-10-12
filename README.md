# Small Puzzle

It's a little tile-sliding puzzle I made using `p5.js` library and `TailwindCSS`.

A new image is picked from [https://picsum.photos/] and used as an puzzle board.

Puzzle is initially a 4 x 4 grid and 400px x 400px. For mobile screens, puzzle is 250px x 250px.

```cmd
npm init
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

If you're using Visual Studio Code, start your server using Live Server extension.

Also you need to generate `/dist/output.css` to get compiled tailwind styles.
