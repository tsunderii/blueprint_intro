# About Me

A personal portfolio built with React and Vite, with GitHub project cards managed in Supabase.

```sh
cd my-about-page
npm install
npm run dev
```

For a new Supabase project, run [the setup SQL](my-about-page/supabase/portfolio-projects.sql) once and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to `my-about-page/.env.local`. Set the same variables on your host before building for deployment. Without Supabase settings, the site uses its built-in project cards.
