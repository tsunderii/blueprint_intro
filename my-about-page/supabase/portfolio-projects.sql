begin;

create table public.portfolio_projects (
  url text primary key check (url like 'https://github.com/%'),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  sort_order integer not null default 0
);

alter table public.portfolio_projects enable row level security;

revoke all on public.portfolio_projects from public, anon, authenticated;
grant select on public.portfolio_projects to anon, authenticated;

create policy "Anyone can read portfolio projects"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (true);

insert into public.portfolio_projects (title, url, description, tags, sort_order)
values
  (
    'Mediator',
    'https://github.com/tsunderii/mediator-jc',
    'An AI Slack teammate that surfaces disagreements and helps teams align on deadlines and responsibilities.',
    array['AI', 'FastAPI', 'Slack'],
    1
  ),
  (
    'TakeMeter',
    'https://github.com/tsunderii/takemeter',
    'An NLP project exploring how AI can classify different types of online discussions.',
    array['Python', 'Machine Learning', 'NLP'],
    2
  ),
  (
    'Census Income Classification',
    'https://github.com/tsunderii/census-income-classification',
    'A machine learning capstone comparing a traditional classifier with a neural network to predict income brackets from U.S. Census data.',
    array['Python', 'scikit-learn', 'Keras'],
    3
  );

commit;
