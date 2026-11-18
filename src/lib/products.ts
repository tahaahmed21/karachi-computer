import desktop from "@/assets/p-desktop.jpg";
import heroPc from "@/assets/hero-pc.jpg";
import laptop from "@/assets/p-laptop.jpg";
import gamingLaptop from "@/assets/p-gaming-laptop.jpg";
import gpu from "@/assets/p-gpu.jpg";
import cpu from "@/assets/p-cpu.jpg";
import monitor from "@/assets/p-monitor.jpg";
import keyboard from "@/assets/p-keyboard.jpg";
import storage from "@/assets/p-storage.jpg";
import accessories from "@/assets/p-accessories.jpg";

/*
 * DEMO CATALOGUE — every name, brand, spec and price below is editable
 * placeholder data, not verified market information.
 */

export type CategoryId = string;

export type Category = { id: CategoryId; name: string; label: string; image: string };

export const categories: Category[] = [
  {
    id: "desktop-computers",
    name: "Desktop Computers",
    label: "Workstations for office and home",
    image: desktop,
  },
  { id: "gaming-pcs", name: "Gaming PCs", label: "High-performance builds", image: heroPc },
  { id: "laptops", name: "Laptops", label: "Portable power, refined", image: laptop },
  {
    id: "components",
    name: "Computer Components",
    label: "Graphics cards, processors & more",
    image: gpu,
  },
  { id: "monitors", name: "Monitors", label: "Clarity for every desk", image: monitor },
  {
    id: "keyboards-mice",
    name: "Keyboards & Mice",
    label: "Precise everyday input",
    image: keyboard,
  },
  {
    id: "storage-memory",
    name: "Storage & Memory",
    label: "SSDs and RAM upgrades",
    image: storage,
  },
  {
    id: "accessories",
    name: "Accessories",
    label: "Headsets, webcams & cables",
    image: accessories,
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number; // PKR, demo
  spec: string;
  description: string;
  specs: [string, string][];
  images: string[];
  featured?: boolean;
  deal?: boolean;
};

export const brands = ["Aurum", "Vantage", "Nexa", "Corelite", "Strata"];

export const products: Product[] = [
  {
    id: "aurum-tower-x1",
    name: "Aurum Tower X1",
    brand: "Aurum",
    category: "gaming-pcs",
    price: 485000,
    spec: "8-core CPU · 16GB GPU · 32GB RAM",
    featured: true,
    deal: true,
    description:
      "A glass-panelled performance tower built for demanding games, streaming and creative work.",
    specs: [
      ["Processor", "8-core desktop CPU"],
      ["Graphics", "16GB dedicated GPU"],
      ["Memory", "32GB DDR5"],
      ["Storage", "1TB NVMe SSD"],
      ["Cooling", "360mm liquid cooler"],
    ],
    images: [heroPc, gpu, cpu],
  },
  {
    id: "vantage-office-pro",
    name: "Vantage Office Pro",
    brand: "Vantage",
    category: "desktop-computers",
    price: 165000,
    spec: "6-core CPU · 16GB RAM · 512GB SSD",
    featured: true,
    description: "A quiet, minimalist desktop for productive office days and reliable home use.",
    specs: [
      ["Processor", "6-core desktop CPU"],
      ["Memory", "16GB DDR4"],
      ["Storage", "512GB NVMe SSD"],
      ["Graphics", "Integrated"],
      ["Form factor", "Mid tower"],
    ],
    images: [desktop, storage],
  },
  {
    id: "nexa-studio-14",
    name: "Nexa Studio 14",
    brand: "Nexa",
    category: "laptops",
    price: 289000,
    spec: '14" display · 16GB RAM · 1TB SSD',
    featured: true,
    deal: true,
    description: "A slim aluminium laptop balancing all-day portability with a premium build.",
    specs: [
      ["Display", "14-inch high-resolution"],
      ["Memory", "16GB"],
      ["Storage", "1TB SSD"],
      ["Weight", "Lightweight chassis"],
      ["Ports", "USB-C, USB-A"],
    ],
    images: [laptop],
  },
  {
    id: "corelite-blade-16",
    name: "Corelite Blade 16",
    brand: "Corelite",
    category: "laptops",
    price: 399000,
    spec: '16" display · 8GB GPU · 32GB RAM',
    featured: true,
    description:
      "A gaming laptop with a backlit keyboard and a dedicated GPU for play on the move.",
    specs: [
      ["Display", "16-inch high refresh"],
      ["Graphics", "8GB dedicated GPU"],
      ["Memory", "32GB"],
      ["Storage", "1TB SSD"],
      ["Keyboard", "Backlit"],
    ],
    images: [gamingLaptop],
  },
  {
    id: "aurum-gx-16",
    name: "Aurum GX 16GB Graphics Card",
    brand: "Aurum",
    category: "components",
    price: 245000,
    spec: "16GB VRAM · Triple fan",
    featured: true,
    description:
      "A triple-fan graphics card with a black and gold shroud for high-resolution gaming.",
    specs: [
      ["Memory", "16GB"],
      ["Cooling", "Triple fan"],
      ["Interface", "PCIe"],
      ["Outputs", "HDMI, DisplayPort"],
    ],
    images: [gpu],
  },
  {
    id: "strata-c8-processor",
    name: "Strata C8 Processor",
    brand: "Strata",
    category: "components",
    price: 98000,
    spec: "8 cores · 16 threads",
    featured: true,
    deal: true,
    description:
      "An 8-core desktop processor for smooth multitasking, gaming and content creation.",
    specs: [
      ["Cores", "8"],
      ["Threads", "16"],
      ["Socket", "Desktop"],
      ["Cooler", "Not included"],
    ],
    images: [cpu],
  },
  {
    id: "vantage-27-qhd",
    name: 'Vantage 27" QHD Monitor',
    brand: "Vantage",
    category: "monitors",
    price: 89000,
    spec: '27" QHD · Height-adjustable',
    featured: true,
    description: "A thin-bezel 27-inch display with an adjustable stand for focused work and play.",
    specs: [
      ["Size", "27-inch"],
      ["Resolution", "QHD"],
      ["Stand", "Height-adjustable"],
      ["Inputs", "HDMI, DisplayPort"],
    ],
    images: [monitor],
  },
  {
    id: "nexa-mech-combo",
    name: "Nexa Mechanical Combo",
    brand: "Nexa",
    category: "keyboards-mice",
    price: 24500,
    spec: "Full-size keyboard · Wireless mouse",
    featured: true,
    description: "A full-size mechanical keyboard paired with a comfortable wireless mouse.",
    specs: [
      ["Keyboard", "Full-size mechanical"],
      ["Mouse", "Wireless"],
      ["Connection", "USB receiver"],
    ],
    images: [keyboard],
  },
  {
    id: "corelite-ram-ssd-kit",
    name: "Corelite Memory & SSD Kit",
    brand: "Corelite",
    category: "storage-memory",
    price: 52000,
    spec: "32GB RAM (2×16GB) · 1TB NVMe",
    deal: true,
    description: "An upgrade kit with dual memory sticks and a fast NVMe drive.",
    specs: [
      ["Memory", "2 × 16GB"],
      ["Storage", "1TB NVMe M.2"],
      ["Heat spreader", "Aluminium"],
    ],
    images: [storage],
  },
  {
    id: "strata-1tb-nvme",
    name: "Strata 1TB NVMe SSD",
    brand: "Strata",
    category: "storage-memory",
    price: 21000,
    spec: "1TB · M.2 NVMe",
    description: "A compact M.2 drive for faster boot times and quicker loading.",
    specs: [
      ["Capacity", "1TB"],
      ["Form factor", "M.2 2280"],
      ["Interface", "NVMe"],
    ],
    images: [storage],
  },
  {
    id: "aurum-creator-kit",
    name: "Aurum Creator Kit",
    brand: "Aurum",
    category: "accessories",
    price: 38000,
    spec: "Headset · HD webcam · USB-C cable",
    featured: true,
    description: "Headset, webcam and cable bundled for calls, streaming and remote work.",
    specs: [
      ["Headset", "Over-ear with mic"],
      ["Webcam", "HD"],
      ["Cable", "USB-C to USB-A"],
    ],
    images: [accessories],
  },
  {
    id: "vantage-workstation-w2",
    name: "Vantage Workstation W2",
    brand: "Vantage",
    category: "desktop-computers",
    price: 315000,
    spec: "12-core CPU · 64GB RAM · 2TB SSD",
    description: "A capable workstation for heavy multitasking, design and data work.",
    specs: [
      ["Processor", "12-core CPU"],
      ["Memory", "64GB"],
      ["Storage", "2TB NVMe SSD"],
      ["Graphics", "8GB dedicated GPU"],
    ],
    images: [desktop, heroPc],
  },
  {
    id: "nexa-arena-pc",
    name: "Nexa Arena Gaming PC",
    brand: "Nexa",
    category: "gaming-pcs",
    price: 335000,
    spec: "6-core CPU · 12GB GPU · 16GB RAM",
    deal: true,
    description: "A balanced gaming build for smooth high-settings play.",
    specs: [
      ["Processor", "6-core CPU"],
      ["Graphics", "12GB GPU"],
      ["Memory", "16GB DDR5"],
      ["Storage", "1TB SSD"],
    ],
    images: [heroPc],
  },
  {
    id: "strata-wireless-mouse",
    name: "Strata Wireless Mouse",
    brand: "Strata",
    category: "keyboards-mice",
    price: 7500,
    spec: "Wireless · Ergonomic",
    description: "A lightweight ergonomic mouse for everyday comfort.",
    specs: [
      ["Connection", "Wireless"],
      ["Shape", "Ergonomic"],
    ],
    images: [keyboard],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const formatPKR = (n: number) => "Rs " + n.toLocaleString("en-PK");

/** Editable business details — left blank until confirmed by the shop owner. */
export const business = {
  phone: "",
  email: "",
  address: "",
  hours: "",
  socials: [] as { label: string; href: string }[],
};
