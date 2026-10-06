import type { Listing, Buyer } from "@/lib/types";
import { images } from "@/lib/images";

export const listings: Listing[] = [
  { id: "l1", title: "Yellow Maize (Harvest 2026)", crop: "Maize", cooperativeId: "oyo-maize-collective", location: "Ibadan, Oyo", quantity: "180", unit: "tonnes", pricePerUnit: 412_000, minOrder: "10 tonnes", grade: "Grade A", seller: "Oyo State Maize Collective", image: images.marketBaskets, collective: true, verified: true, harvestDate: "2026-03-14" },
  { id: "l2", title: "Premium Cassava Chips (Starch Grade)", crop: "Cassava", cooperativeId: "niger-delta-cassava", location: "Patani, Delta", quantity: "240", unit: "tonnes", pricePerUnit: 385_000, minOrder: "5 tonnes", grade: "Grade A", seller: "Niger Delta Cassava Farmers Coop", image: images.coopCassava, collective: true, verified: true, harvestDate: "2026-02-28" },
  { id: "l3", title: "Parboiled Rice — MB 65", crop: "Rice", cooperativeId: "kebbi-rice-alliance", location: "Bunza, Kebbi", quantity: "520", unit: "tonnes", pricePerUnit: 640_000, minOrder: "25 tonnes", grade: "Export", seller: "Kebbi Rice Growers Alliance", image: images.coopRice, collective: true, verified: true, harvestDate: "2026-01-22" },
  { id: "l4", title: "Fermented Cocoa Beans", crop: "Cocoa", cooperativeId: "cross-river-cocoa-unity", location: "Ikom, Cross River", quantity: "96", unit: "tonnes", pricePerUnit: 4_850_000, minOrder: "6 tonnes", grade: "Export", seller: "Cross River Cocoa Unity Coop", image: images.coopCocoa, collective: true, verified: true, harvestDate: "2025-12-10" },
  { id: "l5", title: "Fresh Tomato (Basket)", crop: "Tomatoes", cooperativeId: "benue-vegetable-growers", location: "Makurdi, Benue", quantity: "42", unit: "tonnes", pricePerUnit: 395_000, minOrder: "1 tonne", grade: "Grade A", seller: "Benue Vegetable Growers Coop", image: images.marketTomatoes, collective: false, verified: true, harvestDate: "2026-09-18" },
  { id: "l6", title: "Marrow Yam (Protocol)", crop: "Yam", cooperativeId: "nsukka-yam-farmers", location: "Nsukka, Enugu", quantity: "310", unit: "tonnes", pricePerUnit: 520_000, minOrder: "2 tonnes", grade: "Grade A", seller: "Nsukka Yam Farmers Association", image: images.coopOxen, collective: true, verified: true, harvestDate: "2026-04-02" },
  { id: "l7", title: "Red Sorghum (Brewing Grade)", crop: "Sorghum", cooperativeId: "adamawa-sorghum-growers", location: "Yola, Adamawa", quantity: "150", unit: "tonnes", pricePerUnit: 340_000, minOrder: "15 tonnes", grade: "Grade B", seller: "Adamawa Sorghum Growers Coop", image: images.coopCowherd, collective: true, verified: true, harvestDate: "2026-02-05" },
  { id: "l8", title: "Dried Ginger (Sliced)", crop: "Spices", cooperativeId: "edo-fruits-spices", location: "Benin City, Edo", quantity: "28", unit: "tonnes", pricePerUnit: 2_750_000, minOrder: "500kg", grade: "Export", seller: "Edo Fruits & Spices Collective", image: images.marketSpices, collective: true, verified: true, harvestDate: "2026-05-19" },
  { id: "l9", title: "Palm Oil (Bottled & Bulk)", crop: "Oil Palm", cooperativeId: "ogun-oil-palm-growers", location: "Shagamu, Ogun", quantity: "75", unit: "tonnes", pricePerUnit: 1_180_000, minOrder: "500kg", grade: "Grade A", seller: "Ogun Oil Palm Growers Coop", image: images.marketFruit, collective: true, verified: true, harvestDate: "2026-08-30" },
  { id: "l10", title: "Cowpea — Oloyin (Honey Bean)", crop: "Cowpea", cooperativeId: "plateau-cowpea-producers", location: "Jos, Plateau", quantity: "88", unit: "tonnes", pricePerUnit: 985_000, minOrder: "3 tonnes", grade: "Grade A", seller: "Plateau Cowpea Producers Coop", image: images.coopSpices, collective: false, verified: false, harvestDate: "2026-06-11" },
  { id: "l11", title: "Fresh Pineapple (Batch)", crop: "Fruits", cooperativeId: "edo-fruits-spices", location: "Benin City, Edo", quantity: "18", unit: "tonnes", pricePerUnit: 480_000, minOrder: "1 tonne", grade: "Grade A", seller: "Edo Fruits & Spices Collective", image: images.marketFruit, collective: false, verified: true, harvestDate: "2026-09-08" },
  { id: "l12", title: "Farm Eggs (Crate)", crop: "Poultry", cooperativeId: "lagos-urban-farmers", location: "Ikorodu, Lagos", quantity: "6400", unit: "crates", pricePerUnit: 3_600, minOrder: "50 crates", grade: "Grade A", seller: "Lagos Urban Farmers Network", image: images.marketStand, collective: false, verified: true, harvestDate: "2026-09-22" },
  { id: "l13", title: "Bitter Leaf & Ugu (Wholesale)", crop: "Vegetables", cooperativeId: "benue-vegetable-growers", location: "Gboko, Benue", quantity: "12", unit: "tonnes", pricePerUnit: 265_000, minOrder: "200kg", grade: "Grade A", seller: "Benue Vegetable Growers Coop", image: images.marketGreens, collective: false, verified: true, harvestDate: "2026-09-21" },
  { id: "l14", title: "Live Goats (Fat-tailed)", crop: "Livestock", cooperativeId: "sokoto-livestock-alliance", location: "Silame, Sokoto", quantity: "450", unit: "heads", pricePerUnit: 165_000, minOrder: "10 heads", grade: "Grade A", seller: "Sokoto Livestock Keepers Alliance", image: images.coopGoats, collective: true, verified: true, harvestDate: "2026-10-04" },
];

export const buyers: Buyer[] = [
  { id: "b1", company: "Bodija Feed Mills Ltd", type: "Feed Miller", location: "Ibadan, Oyo", lookingFor: "Yellow Maize", volume: "600 tonnes / quarter", price: "₦412,000 / tonne", verified: true },
  { id: "b2", company: "Dangote Agro Resources", type: "Processor", location: "Agbara, Ogun", lookingFor: "Cassava (starch grade)", volume: "1,200 tonnes / year", price: "₦390,000 / tonne", verified: true },
  { id: "b3", company: "Tinork West Cocoa Export", type: "Exporter", location: "Lagos", lookingFor: "Fermented Cocoa Beans", volume: "150 tonnes / season", price: "₦4,950,000 / tonne", verified: true },
  { id: "b4", company: "Point Blank Cold Chain", type: "Distributor", location: "Abuja", lookingFor: "Tomatoes & Leafy Greens", volume: "60 tonnes / week", price: "Market rate + 8%", verified: true },
  { id: "b5", company: "Nigerian Breweries Plc", type: "Brewer", location: "Enugu", lookingFor: "Red Sorghum", volume: "400 tonnes / year", price: "₦348,000 / tonne", verified: true },
  { id: "b6", company: "Ondo Agro Export Co.", type: "Exporter", location: "Lagos Apapa", lookingFor: "Dried Ginger & Chilli", volume: "40 tonnes / year", price: "₦2,880,000 / tonne", verified: false },
];

export const collectiveSales = [
  { id: "cs1", title: "Maize cluster — 3 coops, 540 tonnes", closing: "Closes in 6 days", premium: "+11% vs farm-gate", members: 3 },
  { id: "cs2", title: "Yam protocol pool — Q2 Lagos run", closing: "Closes in 12 days", premium: "+18% vs farm-gate", members: 2 },
  { id: "cs3", title: "Vegetable cold-chain convoy", closing: "Closes in 3 days", premium: "+9% vs farm-gate", members: 4 },
];

export const getListing = (id: string) => listings.find((l) => l.id === id);
