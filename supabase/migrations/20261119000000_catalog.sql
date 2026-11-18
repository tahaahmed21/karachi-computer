create table if not exists public.categories (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  label text not null default '',
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  brand text not null,
  category_id text not null references public.categories (id) on update cascade on delete restrict,
  price numeric(12, 2) not null check (price >= 0),
  spec text not null default '',
  description text not null default '',
  specs jsonb not null default '[]'::jsonb check (jsonb_typeof(specs) = 'array'),
  image_urls text[] not null default '{}',
  featured boolean not null default false,
  deal boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.update_catalog_product_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.update_catalog_product_timestamp();

create index if not exists products_category_sort_idx
  on public.products (category_id, sort_order, name)
  where is_active;

create index if not exists products_featured_sort_idx
  on public.products (sort_order, name)
  where is_active and featured;

alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products for select
  to anon, authenticated
  using (is_active);

grant select on public.categories, public.products to anon, authenticated;

insert into public.categories (id, name, label, sort_order)
values
  ('desktop-computers', 'Desktop Computers', 'Workstations for office and home', 10),
  ('gaming-pcs', 'Gaming PCs', 'High-performance builds', 20),
  ('laptops', 'Laptops', 'Portable power, refined', 30),
  ('components', 'Computer Components', 'Graphics cards, processors & more', 40),
  ('monitors', 'Monitors', 'Clarity for every desk', 50),
  ('keyboards-mice', 'Keyboards & Mice', 'Precise everyday input', 60),
  ('storage-memory', 'Storage & Memory', 'SSDs and RAM upgrades', 70),
  ('accessories', 'Accessories', 'Headsets, webcams & cables', 80)
on conflict (id) do nothing;

insert into public.products (
  id, name, brand, category_id, price, spec, description, specs, featured, deal, sort_order
)
values
  (
    'aurum-tower-x1', 'Aurum Tower X1', 'Aurum', 'gaming-pcs', 485000,
    '8-core CPU · 16GB GPU · 32GB RAM',
    'A glass-panelled performance tower built for demanding games, streaming and creative work.',
    '[["Processor","8-core desktop CPU"],["Graphics","16GB dedicated GPU"],["Memory","32GB DDR5"],["Storage","1TB NVMe SSD"],["Cooling","360mm liquid cooler"]]'::jsonb,
    true, true, 10
  ),
  (
    'vantage-office-pro', 'Vantage Office Pro', 'Vantage', 'desktop-computers', 165000,
    '6-core CPU · 16GB RAM · 512GB SSD',
    'A quiet, minimalist desktop for productive office days and reliable home use.',
    '[["Processor","6-core desktop CPU"],["Memory","16GB DDR4"],["Storage","512GB NVMe SSD"],["Graphics","Integrated"],["Form factor","Mid tower"]]'::jsonb,
    true, false, 20
  ),
  (
    'nexa-studio-14', 'Nexa Studio 14', 'Nexa', 'laptops', 289000,
    '14" display · 16GB RAM · 1TB SSD',
    'A slim aluminium laptop balancing all-day portability with a premium build.',
    '[["Display","14-inch high-resolution"],["Memory","16GB"],["Storage","1TB SSD"],["Weight","Lightweight chassis"],["Ports","USB-C, USB-A"]]'::jsonb,
    true, true, 30
  ),
  (
    'corelite-blade-16', 'Corelite Blade 16', 'Corelite', 'laptops', 399000,
    '16" display · 8GB GPU · 32GB RAM',
    'A gaming laptop with a backlit keyboard and a dedicated GPU for play on the move.',
    '[["Display","16-inch high refresh"],["Graphics","8GB dedicated GPU"],["Memory","32GB"],["Storage","1TB SSD"],["Keyboard","Backlit"]]'::jsonb,
    true, false, 40
  ),
  (
    'aurum-gx-16', 'Aurum GX 16GB Graphics Card', 'Aurum', 'components', 245000,
    '16GB VRAM · Triple fan',
    'A triple-fan graphics card with a black and gold shroud for high-resolution gaming.',
    '[["Memory","16GB"],["Cooling","Triple fan"],["Interface","PCIe"],["Outputs","HDMI, DisplayPort"]]'::jsonb,
    true, false, 50
  ),
  (
    'strata-c8-processor', 'Strata C8 Processor', 'Strata', 'components', 98000,
    '8 cores · 16 threads',
    'An 8-core desktop processor for smooth multitasking, gaming and content creation.',
    '[["Cores","8"],["Threads","16"],["Socket","Desktop"],["Cooler","Not included"]]'::jsonb,
    true, true, 60
  ),
  (
    'vantage-27-qhd', 'Vantage 27" QHD Monitor', 'Vantage', 'monitors', 89000,
    '27" QHD · Height-adjustable',
    'A thin-bezel 27-inch display with an adjustable stand for focused work and play.',
    '[["Size","27-inch"],["Resolution","QHD"],["Stand","Height-adjustable"],["Inputs","HDMI, DisplayPort"]]'::jsonb,
    true, false, 70
  ),
  (
    'nexa-mech-combo', 'Nexa Mechanical Combo', 'Nexa', 'keyboards-mice', 24500,
    'Full-size keyboard · Wireless mouse',
    'A full-size mechanical keyboard paired with a comfortable wireless mouse.',
    '[["Keyboard","Full-size mechanical"],["Mouse","Wireless"],["Connection","USB receiver"]]'::jsonb,
    true, false, 80
  ),
  (
    'corelite-ram-ssd-kit', 'Corelite Memory & SSD Kit', 'Corelite', 'storage-memory', 52000,
    '32GB RAM (2×16GB) · 1TB NVMe',
    'An upgrade kit with dual memory sticks and a fast NVMe drive.',
    '[["Memory","2 × 16GB"],["Storage","1TB NVMe M.2"],["Heat spreader","Aluminium"]]'::jsonb,
    false, true, 90
  ),
  (
    'strata-1tb-nvme', 'Strata 1TB NVMe SSD', 'Strata', 'storage-memory', 21000,
    '1TB · M.2 NVMe',
    'A compact M.2 drive for faster boot times and quicker loading.',
    '[["Capacity","1TB"],["Form factor","M.2 2280"],["Interface","NVMe"]]'::jsonb,
    false, false, 100
  ),
  (
    'aurum-creator-kit', 'Aurum Creator Kit', 'Aurum', 'accessories', 38000,
    'Headset · HD webcam · USB-C cable',
    'Headset, webcam and cable bundled for calls, streaming and remote work.',
    '[["Headset","Over-ear with mic"],["Webcam","HD"],["Cable","USB-C to USB-A"]]'::jsonb,
    true, false, 110
  ),
  (
    'vantage-workstation-w2', 'Vantage Workstation W2', 'Vantage', 'desktop-computers', 315000,
    '12-core CPU · 64GB RAM · 2TB SSD',
    'A capable workstation for heavy multitasking, design and data work.',
    '[["Processor","12-core CPU"],["Memory","64GB"],["Storage","2TB NVMe SSD"],["Graphics","8GB dedicated GPU"]]'::jsonb,
    false, false, 120
  ),
  (
    'nexa-arena-pc', 'Nexa Arena Gaming PC', 'Nexa', 'gaming-pcs', 335000,
    '6-core CPU · 12GB GPU · 16GB RAM',
    'A balanced gaming build for smooth high-settings play.',
    '[["Processor","6-core CPU"],["Graphics","12GB GPU"],["Memory","16GB DDR5"],["Storage","1TB SSD"]]'::jsonb,
    false, true, 130
  ),
  (
    'strata-wireless-mouse', 'Strata Wireless Mouse', 'Strata', 'keyboards-mice', 7500,
    'Wireless · Ergonomic',
    'A lightweight ergonomic mouse for everyday comfort.',
    '[["Connection","Wireless"],["Shape","Ergonomic"]]'::jsonb,
    false, false, 140
  )
on conflict (id) do nothing;
