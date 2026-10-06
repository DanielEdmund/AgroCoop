/**
 * Curated Unsplash imagery (real photo IDs, verified against Unsplash search)
 * for AgroCoop — Nigerian / West African farming scenes.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const p = (id: string, w = 1600) =>
  `https://plus.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Hero + marketing
  heroFarmer: u("photo-1741874299706-2b8e16839aaa", 2000),
  heroPlanting: u("photo-1509099381441-ea3c0cf98b94", 1800),
  aerialFields: u("photo-1509110646989-7ca4308edb3e", 2000),
  seedingTogether: u("photo-1562009058-f159df1d2608", 1800),
  greenField: u("photo-1520302630591-fd1c66edc19d", 1600),

  // About / mission
  aboutCommunity: u("photo-1473605768212-7e1f2c756179", 1600),
  aboutMarket: u("photo-1660227698144-68c175ff8443", 1600),
  aboutGrain: u("photo-1710149484964-d966b771c204", 1600),

  // Cooperative covers
  coopCassava: u("photo-1615137705646-cd4c2a4c0ca0", 1400),
  coopRice: u("photo-1626488033090-79f63fd81a75", 1400),
  coopCattle: u("photo-1697466587072-048298ed0ab8", 1400),
  coopCocoa: p("premium_photo-1786752306925-b4d14c1bb762", 1400),
  coopVegetables: u("photo-1746014929708-fcb859fd3185", 1400),
  coopIrrigation: u("photo-1567497063796-7952e455a2a6", 1400),
  coopMaize: u("photo-1647463047632-f06655631086", 1400),
  coopGoats: u("photo-1614005157364-67894d3dc531", 1400),
  coopPalm: u("photo-1588812068981-c46370419a5c", 1400),
  coopOxen: u("photo-1620901433789-1d2f85a93653", 1400),
  coopSpices: u("photo-1565958923272-e96dbb1e8414", 1400),
  coopFruit: p("premium_photo-1678344181521-4735a1b7c4a4", 1400),
  coopBaskets: u("photo-1559999442-1daeab04bf8a", 1400),
  coopCowherd: u("photo-1697466587321-25064c828e69", 1400),
  coopCornField: u("photo-1646987116480-682aacd6ff32", 1400),

  // People / portraits
  farmerHat: u("photo-1596788068873-9ffd5cacd4c4", 800),
  farmerBundle: u("photo-1741940365425-1b9a575d373e", 800),
  farmerWoman: u("photo-1509100194014-d49809396daa", 800),
  farmerCorn: u("photo-1647463047632-f06655631086", 800),
  farmerBucket: u("photo-1607240204413-e51a4afa6f12", 800),
  farmerField: u("photo-1614157606535-2f3990b919a6", 800),
  farmerBook: u("photo-1655313893399-e9d607e1d84c", 800),
  farmerStraw: p("premium_photo-1718737640908-b6107649c9f0", 800),
  farmerHeadscarf: u("photo-1741940365182-bc0ffdc1262d", 800),
  farmerRadio: u("photo-1737784605874-5e69f9efd4e8", 800),
  farmerWomanGrain: u("photo-1710149484964-d966b771c204", 800),
  farmerPlaid: u("photo-1628164918084-ab8bc823b17d", 800),

  // Resources / equipment
  resourceTractor: p("premium_photo-1661944447290-c36119d0028f", 1200),
  resourceIrrigation: u("photo-1567497063796-7952e455a2a6", 1200),
  resourceStorage: u("photo-1595246140625-573b715d11dc", 1200),
  resourceBaskets: u("photo-1559999442-1daeab04bf8a", 1200),
  resourceField: u("photo-1618265317491-8b7b2324320e", 1200),
  resourceHarvester: u("photo-1500937386664-56d1dfef3854", 1200),

  // Marketplace
  marketTomatoes: u("photo-1572851569977-e18b9ea6edbe", 1000),
  marketSpices: u("photo-1565958923272-e96dbb1e8414", 1000),
  marketBaskets: u("photo-1559999442-1daeab04bf8a", 1000),
  marketStand: u("photo-1660227698144-68c175ff8443", 1000),
  marketFruit: p("premium_photo-1678344174735-94e4fd36b114", 1000),
  marketGreens: u("photo-1746014929708-fcb859fd3185", 1000),
  marketBananas: u("photo-1662533533588-ca61a03ece82", 1000),
  marketMelon: u("photo-1761313279221-c3f08f9bbca8", 1000),

  // Learning
  learningBook: u("photo-1655313893399-e9d607e1d84c", 1200),
  learningField: u("photo-1615137705646-cd4c2a4c0ca0", 1200),
  learningMeeting: u("photo-1560118386-f35cf6a0791d", 1200),
  learningGrain: u("photo-1710149484964-d966b771c204", 1200),

  // Community / forum
  communityGroup: u("photo-1473605768212-7e1f2c756179", 1200),
  communityWomen: p("premium_photo-1739997054474-b8154a9eaf62", 1200),
  communityCattle: u("photo-1697466587072-048298ed0ab8", 1200),

  // CTA / patterns
  ctaFields: u("photo-1509110646989-7ca4308edb3e", 2000),
  bannerInfo: u("photo-1560118386-f35cf6a0791d", 1600),
};

export const avatar = (seed: number) => `https://i.pravatar.cc/160?img=${seed}`;

export const memberPortraits = [
  images.farmerHat,
  images.farmerWoman,
  images.farmerBucket,
  images.farmerField,
  images.farmerCorn,
  images.farmerHeadscarf,
  images.farmerRadio,
  images.farmerPlaid,
  images.farmerStraw,
  images.farmerBundle,
  images.farmerBook,
  images.farmerWomanGrain,
];
