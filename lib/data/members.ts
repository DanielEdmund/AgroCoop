import type { Member } from "@/lib/types";
import { images, memberPortraits } from "@/lib/images";

const p = (i: number) => memberPortraits[i % memberPortraits.length];

export const members: Member[] = [
  // Niger Delta Cassava Farmers Coop
  { id: "m1", name: "Chief Emeka Obiora", role: "chairperson", status: "verified", cooperativeId: "niger-delta-cassava", location: "Patani, Delta", crop: "Cassava", image: p(0), joinedAt: "2011-04-12", bio: "Founding chairperson. Grows cassava on 14 hectares and chairs the price committee.", contributions: 96 },
  { id: "m2", name: "Mrs. Ngozi Adeyemi", role: "treasurer", status: "verified", cooperativeId: "niger-delta-cassava", location: "Patani, Delta", crop: "Cassava", image: p(1), joinedAt: "2012-02-03", contributions: 74 },
  { id: "m3", name: "Yakubu Suleiman", role: "founder", status: "verified", cooperativeId: "niger-delta-cassava", location: "Aboh, Delta", crop: "Vegetables", image: p(3), joinedAt: "2011-01-20", contributions: 112 },
  { id: "m4", name: "Ifeoma Nwachukwu", role: "secretary", status: "verified", cooperativeId: "niger-delta-cassava", location: "Patani, Delta", crop: "Cassava", image: p(5), joinedAt: "2013-06-18", contributions: 58 },
  { id: "m5", name: "Adama Bello", role: "member", status: "growing", cooperativeId: "niger-delta-cassava", location: "Ughelli, Delta", crop: "Cassava", image: p(6), joinedAt: "2021-09-01", contributions: 21 },

  // Kebbi Rice Growers Alliance
  { id: "m6", name: "Alhaji Musa Danjuma", role: "chairperson", status: "verified", cooperativeId: "kebbi-rice-alliance", location: "Bunza, Kebbi", crop: "Rice", image: p(7), joinedAt: "2009-03-15", contributions: 134 },
  { id: "m7", name: "Hauwa Abubakar", role: "organizer", status: "verified", cooperativeId: "kebbi-rice-alliance", location: "Bunza, Kebbi", crop: "Rice", image: p(9), joinedAt: "2014-11-08", contributions: 87 },
  { id: "m8", name: "Ibrahim Kaoje", role: "treasurer", status: "verified", cooperativeId: "kebbi-rice-alliance", location: "Kalgo, Kebbi", crop: "Maize", image: p(10), joinedAt: "2010-05-22", contributions: 66 },
  { id: "m9", name: "Zainab Usman", role: "member", status: "verified", cooperativeId: "kebbi-rice-alliance", location: "Bunza, Kebbi", crop: "Rice", image: p(11), joinedAt: "2016-07-14", contributions: 45 },
  { id: "m10", name: "Sadiq Aliyu", role: "member", status: "growing", cooperativeId: "kebbi-rice-alliance", location: "Dakingari, Kebbi", crop: "Rice", image: p(4), joinedAt: "2022-02-19", contributions: 17 },

  // Oyo State Maize Collective
  { id: "m11", name: "Adebayo Ogundele", role: "founder", status: "verified", cooperativeId: "oyo-maize-collective", location: "Ibadan, Oyo", crop: "Maize", image: p(0), joinedAt: "2015-08-04", contributions: 91 },
  { id: "m12", name: "Folasade Ojo", role: "chairperson", status: "verified", cooperativeId: "oyo-maize-collective", location: "Oyo, Oyo", crop: "Soybean", image: p(1), joinedAt: "2015-09-30", contributions: 78 },
  { id: "m13", name: "Tunde Balogun", role: "treasurer", status: "verified", cooperativeId: "oyo-maize-collective", location: "Ibadan, Oyo", crop: "Maize", image: p(6), joinedAt: "2017-01-11", contributions: 40 },
  { id: "m14", name: "Grace Alabi", role: "member", status: "growing", cooperativeId: "oyo-maize-collective", location: "Ekiti, Oyo", crop: "Maize", image: p(5), joinedAt: "2023-04-27", contributions: 12 },

  // Cross River Cocoa Unity Coop
  { id: "m15", name: "Pastor Eko Otu", role: "chairperson", status: "verified", cooperativeId: "cross-river-cocoa-unity", location: "Ikom, Cross River", crop: "Cocoa", image: p(7), joinedAt: "2012-06-09", contributions: 103 },
  { id: "m16", name: "Adaora Etim", role: "secretary", status: "verified", cooperativeId: "cross-river-cocoa-unity", location: "Ikom, Cross River", crop: "Cocoa", image: p(9), joinedAt: "2013-10-21", contributions: 61 },
  { id: "m17", name: "Bassey Offiong", role: "treasurer", status: "verified", cooperativeId: "cross-river-cocoa-unity", location: "Ogoja, Cross River", crop: "Cocoa", image: p(3), joinedAt: "2014-02-17", contributions: 52 },
  { id: "m18", name: "Emem Asuquo", role: "member", status: "growing", cooperativeId: "cross-river-cocoa-unity", location: "Ikom, Cross River", crop: "Cocoa", image: p(11), joinedAt: "2021-12-05", contributions: 23 },

  // Benue Vegetable Growers
  { id: "m19", name: "Terhemen Hima", role: "chairperson", status: "verified", cooperativeId: "benue-vegetable-growers", location: "Gboko, Benue", crop: "Vegetables", image: p(10), joinedAt: "2017-03-25", contributions: 74 },
  { id: "m20", name: "Doosuur Tyav", role: "organizer", status: "verified", cooperativeId: "benue-vegetable-growers", location: "Makurdi, Benue", crop: "Tomatoes", image: p(1), joinedAt: "2017-05-16", contributions: 69 },
  { id: "m21", name: "Kwaghker Aondo", role: "member", status: "verified", cooperativeId: "benue-vegetable-growers", location: "Gboko, Benue", crop: "Peppers", image: p(0), joinedAt: "2019-08-02", contributions: 34 },
  { id: "m22", name: "Saratu Iorbee", role: "member", status: "new", cooperativeId: "benue-vegetable-growers", location: "Vandeikya, Benue", crop: "Vegetables", image: p(5), joinedAt: "2025-05-30", contributions: 3 },

  // Kaduna Irrigated Farms Union
  { id: "m23", name: "Malam Shehu Lawal", role: "founder", status: "verified", cooperativeId: "kaduna-irrigated-union", location: "Zaria, Kaduna", crop: "Rice", image: p(4), joinedAt: "2010-01-14", contributions: 127 },
  { id: "m24", name: "Amina Balarabe", role: "chairperson", status: "verified", cooperativeId: "kaduna-irrigated-union", location: "Zaria, Kaduna", crop: "Vegetables", image: p(9), joinedAt: "2012-09-06", contributions: 88 },
  { id: "m25", name: "Nasiru Chikaji", role: "treasurer", status: "verified", cooperativeId: "kaduna-irrigated-union", location: "Sabon Gari, Kaduna", crop: "Cowpea", image: p(6), joinedAt: "2013-04-02", contributions: 57 },
  { id: "m26", name: "Rukayat Sani", role: "member", status: "growing", cooperativeId: "kaduna-irrigated-union", location: "Zaria, Kaduna", crop: "Vegetables", image: p(11), joinedAt: "2022-06-12", contributions: 19 },
  { id: "m27", name: "BashirƊanlami", role: "member", status: "verified", cooperativeId: "kaduna-irrigated-union", location: "Kudan, Kaduna", crop: "Rice", image: p(7), joinedAt: "2018-11-23", contributions: 36 },

  // Nsukka Yam Farmers
  { id: "m28", name: "Igwe Dr. Okwudili Eze", role: "chairperson", status: "verified", cooperativeId: "nsukka-yam-farmers", location: "Nsukka, Enugu", crop: "Yam", image: p(0), joinedAt: "2013-02-08", contributions: 95 },
  { id: "m29", name: "Uchenna Nwodo", role: "treasurer", status: "verified", cooperativeId: "nsukka-yam-farmers", location: "Nsukka, Enugu", crop: "Yam", image: p(3), joinedAt: "2013-07-19", contributions: 63 },
  { id: "m30", name: "Ngozi Okafor", role: "secretary", status: "verified", cooperativeId: "nsukka-yam-farmers", location: "Obukpa, Enugu", crop: "Cassava", image: p(1), joinedAt: "2015-03-28", contributions: 55 },
  { id: "m31", name: "Emeka Ani", role: "member", status: "growing", cooperativeId: "nsukka-yam-farmers", location: "Nsukka, Enugu", crop: "Yam", image: p(10), joinedAt: "2023-01-17", contributions: 14 },

  // Plateau Cowpea Producers
  { id: "m32", name: "Capt. Jimeel Dalyop", role: "founder", status: "verified", cooperativeId: "plateau-cowpea-producers", location: "Jos, Plateau", crop: "Cowpea", image: p(6), joinedAt: "2018-05-05", contributions: 72 },
  { id: "m33", name: "Rifkatu Dung", role: "chairperson", status: "verified", cooperativeId: "plateau-cowpea-producers", location: "Jos, Plateau", crop: "Cowpea", image: p(9), joinedAt: "2018-08-21", contributions: 66 },
  { id: "m34", name: "Gyang Pam", role: "member", status: "verified", cooperativeId: "plateau-cowpea-producers", location: "Barkin Ladi, Plateau", crop: "Sorghum", image: p(4), joinedAt: "2020-10-09", contributions: 31 },
  { id: "m35", name: "Larai Mwansat", role: "contributor", status: "growing", cooperativeId: "plateau-cowpea-producers", location: "Jos, Plateau", crop: "Cowpea", image: p(11), joinedAt: "2024-02-14", contributions: 11 },

  // Ogun Oil Palm Growers
  { id: "m36", name: "Alhaja Sikirat Adeniyi", role: "chairperson", status: "verified", cooperativeId: "ogun-oil-palm-growers", location: "Shagamu, Ogun", crop: "Oil Palm", image: p(1), joinedAt: "2014-01-30", contributions: 84 },
  { id: "m37", name: "Femi Ogunleye", role: "treasurer", status: "verified", cooperativeId: "ogun-oil-palm-growers", location: "Ikenne, Ogun", crop: "Oil Palm", image: p(7), joinedAt: "2014-06-11", contributions: 59 },
  { id: "m38", name: "Kehinde Oshun", role: "member", status: "verified", cooperativeId: "ogun-oil-palm-growers", location: "Shagamu, Ogun", crop: "Oil Palm", image: p(0), joinedAt: "2017-09-03", contributions: 38 },
  { id: "m39", name: "Tolu Adebanjo", role: "member", status: "new", cooperativeId: "ogun-oil-palm-growers", location: "Sagamu, Ogun", crop: "Oil Palm", image: p(3), joinedAt: "2025-07-08", contributions: 2 },

  // Sokoto Livestock Alliance
  { id: "m40", name: "Alhaji Bello Wurno", role: "chairperson", status: "verified", cooperativeId: "sokoto-livestock-alliance", location: "Silame, Sokoto", crop: "Livestock", image: p(4), joinedAt: "2008-04-18", contributions: 141 },
  { id: "m41", name: "Fatima Tambuwal", role: "treasurer", status: "verified", cooperativeId: "sokoto-livestock-alliance", location: "Sokoto, Sokoto", crop: "Fodder", image: p(9), joinedAt: "2011-11-27", contributions: 76 },
  { id: "m42", name: "Umar Gada", role: "organizer", status: "verified", cooperativeId: "sokoto-livestock-alliance", location: "Wurno, Sokoto", crop: "Livestock", image: p(6), joinedAt: "2013-03-08", contributions: 70 },
  { id: "m43", name: "Aisha Borikawa", role: "member", status: "growing", cooperativeId: "sokoto-livestock-alliance", location: "Silame, Sokoto", crop: "Livestock", image: p(11), joinedAt: "2022-08-15", contributions: 20 },

  // Lagos Urban Farmers Network
  { id: "m44", name: "Chidi Anyanwu", role: "founder", status: "verified", cooperativeId: "lagos-urban-farmers", location: "Ikorodu, Lagos", crop: "Vegetables", image: p(10), joinedAt: "2019-02-10", contributions: 81 },
  { id: "m45", name: "Bisi Adeoye", role: "chairperson", status: "verified", cooperativeId: "lagos-urban-farmers", location: "Ikorodu, Lagos", crop: "Poultry", image: p(5), joinedAt: "2019-05-24", contributions: 73 },
  { id: "m46", name: "Kelechi Obi", role: "member", status: "verified", cooperativeId: "lagos-urban-farmers", location: "Badagry, Lagos", crop: "Fisheries", image: p(7), joinedAt: "2021-01-31", contributions: 29 },
  { id: "m47", name: "Halima Sanni", role: "member", status: "new", cooperativeId: "lagos-urban-farmers", location: "Ikorodu, Lagos", crop: "Vegetables", image: p(1), joinedAt: "2025-06-19", contributions: 4 },

  // Adamawa Sorghum Growers
  { id: "m48", name: "Alhaji Modu Fintiri", role: "chairperson", status: "verified", cooperativeId: "adamawa-sorghum-growers", location: "Yola, Adamawa", crop: "Sorghum", image: p(0), joinedAt: "2016-03-16", contributions: 79 },
  { id: "m49", name: "Rekiya Bello", role: "secretary", status: "verified", cooperativeId: "adamawa-sorghum-growers", location: "Yola, Adamawa", crop: "Millet", image: p(9), joinedAt: "2016-07-04", contributions: 64 },
  { id: "m50", name: "John Vintim", role: "treasurer", status: "verified", cooperativeId: "adamawa-sorghum-growers", location: "Numan, Adamawa", crop: "Sorghum", image: p(3), joinedAt: "2018-12-13", contributions: 47 },
  { id: "m51", name: "Salamatu Yahaya", role: "member", status: "growing", cooperativeId: "adamawa-sorghum-growers", location: "Yola, Adamawa", crop: "Sorghum", image: p(11), joinedAt: "2023-09-22", contributions: 13 },

  // Edo Fruits & Spices
  { id: "m52", name: "Osagie Ehanire", role: "founder", status: "verified", cooperativeId: "edo-fruits-spices", location: "Benin City, Edo", crop: "Spices", image: p(6), joinedAt: "2020-01-09", contributions: 68 },
  { id: "m53", name: "Philomena Osagie", role: "chairperson", status: "verified", cooperativeId: "edo-fruits-spices", location: "Benin City, Edo", crop: "Fruits", image: p(1), joinedAt: "2020-04-28", contributions: 62 },
  { id: "m54", name: "Duun Igbinedion", role: "member", status: "growing", cooperativeId: "edo-fruits-spices", location: "Auchi, Edo", crop: "Spices", image: p(5), joinedAt: "2023-11-06", contributions: 16 },
];

/** The signed-in demo farmer. */
export const currentUser = {
  id: "m11",
  name: "Adebayo Ogundele",
  role: "founder" as const,
  status: "verified" as const,
  cooperativeId: "oyo-maize-collective",
  cooperativeName: "Oyo State Maize Collective",
  location: "Ibadan, Oyo State",
  crop: "Maize",
  image: images.farmerHat,
  joinedAt: "2015-08-04",
  farmSize: "8.5 hectares",
  seasons: 11,
};

export const membersOfCoop = (cooperativeId: string) =>
  members.filter((m) => m.cooperativeId === cooperativeId);

export const getMember = (id: string) => members.find((m) => m.id === id);
