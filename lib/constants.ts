export const COOP_COLORS = {
  blue: "#2E7D32",
  gold: "#78716C",
  green: "#059669",
  sand: "#F5F5F4",
  earth: "#44403C",
  coral: "#57534E",
  sky: "#E6F0E2",
} as const;

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const CROP_FOCUS = [
  "Cassava",
  "Rice",
  "Maize",
  "Yam",
  "Cocoa",
  "Oil Palm",
  "Cowpea (Beans)",
  "Sorghum",
  "Millet",
  "Vegetables",
  "Fruits",
  "Poultry",
  "Livestock",
  "Fisheries",
  "Groundnut",
  "Cotton",
  "Spices",
];

export const COOP_SIZES = [
  { value: "small", label: "Small (under 30 members)" },
  { value: "medium", label: "Medium (30–100 members)" },
  { value: "large", label: "Large (100+ members)" },
];

export const COOP_GOALS = [
  "Collective bargaining power",
  "Shared equipment access",
  "Better market prices",
  "Bulk input buying",
  "Storage & post-harvest",
  "Access to credit",
  "Knowledge sharing",
  "Value addition & processing",
];

export const ICO_PRINCIPLES = [
  {
    number: 1,
    title: "Voluntary & Open Membership",
    summary:
      "Cooperatives are open to all persons able to use their services and willing to accept the responsibilities of membership, without gender, social, racial, political or religious discrimination.",
  },
  {
    number: 2,
    title: "Democratic Member Control",
    summary:
      "Cooperatives are democratic organisations controlled by their members — who actively participate in setting policies and making decisions. Elected representatives are accountable to the membership.",
  },
  {
    number: 3,
    title: "Member Economic Participation",
    summary:
      "Members contribute equitably to, and democratically control, the capital of their cooperative. At least part of that capital is usually the common property of the cooperative.",
  },
  {
    number: 4,
    title: "Autonomy & Independence",
    summary:
      "Cooperatives are autonomous, self-help organisations controlled by their members. If they enter into agreements with other organisations, they do so on terms that ensure democratic control by their members.",
  },
  {
    number: 5,
    title: "Education, Training & Information",
    summary:
      "Cooperatives provide education and training for their members and for elected representatives so they can contribute effectively to the development of their cooperative.",
  },
  {
    number: 6,
    title: "Cooperation Among Cooperatives",
    summary:
      "Cooperatives serve their members most effectively and strengthen the cooperative movement by working together through local, national, regional and international structures.",
  },
  {
    number: 7,
    title: "Concern for Community",
    summary:
      "Cooperatives work for the sustainable development of their communities through policies approved by their members.",
  },
];

export const NAV_LINKS = {
  marketing: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/cooperatives", label: "Cooperatives" },
    { href: "/start-cooperative", label: "Start a Coop" },
  ],
  dashboard: [
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/voting", label: "Voting", icon: "Vote" },
    { href: "/resources", label: "Resources", icon: "Tractor" },
    { href: "/marketplace", label: "Marketplace", icon: "Store" },
    { href: "/learning", label: "Learning", icon: "GraduationCap" },
    { href: "/community", label: "Community", icon: "MessagesSquare" },
  ],
  mobile: [
    { href: "/dashboard", label: "Home", icon: "LayoutDashboard" },
    { href: "/cooperatives", label: "Coops", icon: "Users" },
    { href: "/resources", label: "Resources", icon: "Tractor" },
    { href: "/community", label: "Community", icon: "MessagesSquare" },
    { href: "/profile", label: "Profile", icon: "User" },
  ],
};
