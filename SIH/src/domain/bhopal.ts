import type { Place, EmergencyContact } from './types'

export const BHOPAL_CENTER = { lat: 23.2599, lng: 77.4126 }

const PLACE_IMAGES = {
  architecture: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
  lake: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
  nature: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
  food: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  hospital: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80',
  police: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
  atm: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
  airport: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  mall: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'
} as const

export const ATTRACTIONS: Place[] = [
  {
    id: 'taj-ul-masajid',
    name: 'Taj-ul-Masajid',
    nameHi: 'ताज-उल-मसाजिद',
    category: 'attraction',
    description: 'One of the largest mosques in Asia, featuring stunning Mughal architecture with pink facade and towering minarets.',
    descriptionHi: 'एशिया की सबसे बड़ी मस्जिदों में से एक, गुलाबी फैकाड और ऊंचे मीनारों वाली शानदार मुगल वास्तुकला।',
    location: { lat: 23.2625, lng: 77.3928 },
    address: 'Taj-ul-Masajid Road, Kohefiza, Bhopal',
    addressHi: 'ताज-उल-मसाजिद रोड, कोहफिजा, भोपाल',
    images: [PLACE_IMAGES.architecture],
    rating: 4.7,
    priceRange: 'free',
    openingHours: '5:00 AM - 9:00 PM',
    tags: ['mosque', 'architecture', 'heritage', 'photography'],
    tagsHi: ['मस्जिद', 'वास्तुकला', 'धरोहर', 'फोटोग्राफी']
  },
  {
    id: 'bhel',
    name: 'Bhimbetka Rock Shelters',
    nameHi: 'भीमबेटका शैल आश्रय',
    category: 'attraction',
    description: 'UNESCO World Heritage Site with prehistoric cave paintings dating back 30,000 years.',
    descriptionHi: 'यूनेस्को विश्व धरोहर स्थल जिसमें 30,000 वर्ष पुरानी प्रागैतिहासिक गुफा चित्रकला है।',
    location: { lat: 22.9394, lng: 77.6106 },
    address: 'Bhimbetka, Raisen District, MP',
    addressHi: 'भीमबेटका, रायसेन जिला, मध्य प्रदेश',
    images: [PLACE_IMAGES.nature],
    rating: 4.6,
    priceRange: 'low',
    openingHours: '6:00 AM - 6:00 PM',
    tags: ['unesco', 'caves', 'history', 'prehistoric'],
    tagsHi: ['यूनेस्को', 'गुफाएं', 'इतिहास', 'प्रागैतिहासिक']
  },
  {
    id: 'upper-lake',
    name: 'Upper Lake (Bada Talab)',
    nameHi: 'ऊपरी झील (बड़ा तालाब)',
    category: 'attraction',
    description: 'Ancient man-made lake perfect for boating, sunset views, and evening strolls along the VIP Road.',
    descriptionHi: 'प्राचीन मानव निर्मित झील, नौका विहार, सूर्यास्त दृश्य और VIP रोड के साथ शाम की सैर के लिए उपयुक्त।',
    location: { lat: 23.2308, lng: 77.3426 },
    address: 'VIP Road, Bhopal',
    addressHi: 'VIP रोड, भोपाल',
    images: [PLACE_IMAGES.lake],
    rating: 4.5,
    priceRange: 'free',
    openingHours: 'Open 24 hours',
    tags: ['lake', 'boating', 'sunset', 'nature'],
    tagsHi: ['झील', 'नौका विहार', 'सूर्यास्त', 'प्रकृति']
  },
  {
    id: 'sanchi-stupa',
    name: 'Sanchi Stupa',
    nameHi: 'साँची स्तूप',
    category: 'attraction',
    description: 'UNESCO World Heritage Site featuring ancient Buddhist monuments and the Great Stupa from 3rd century BCE.',
    descriptionHi: 'यूनेस्को विश्व धरोहर स्थल जिसमें प्राचीन बौद्ध स्मारक और तीसरी शताब्दी ईसा पूर्व का महान स्तूप है।',
    location: { lat: 23.4795, lng: 77.7398 },
    address: 'Sanchi, Raisen District, MP',
    addressHi: 'साँची, रायसेन जिला, मध्य प्रदेश',
    images: [PLACE_IMAGES.architecture],
    rating: 4.8,
    priceRange: 'low',
    openingHours: '6:00 AM - 6:00 PM',
    tags: ['unesco', 'buddhist', 'heritage', 'ancient'],
    tagsHi: ['यूनेस्को', 'बौद्ध', 'धरोहर', 'प्राचीन']
  },
  {
    id: 'van-vihar',
    name: 'Van Vihar National Park',
    nameHi: 'वन विहार राष्ट्रीय उद्यान',
    category: 'attraction',
    description: 'Wildlife sanctuary near Upper Lake home to tigers, lions, bears, and various deer species in natural habitat.',
    descriptionHi: 'ऊपरी झील के पास वन्यजीव अभयारण्य जहाँ बाघ, शेर, भालू और विभिन्न हिरण प्रजातियाँ प्राकृतिक आवास में हैं।',
    location: { lat: 23.2218, lng: 77.3472 },
    address: 'Shyamla Hills, Bhopal',
    addressHi: 'श्यामला हिल्स, भोपाल',
    images: [PLACE_IMAGES.nature],
    rating: 4.4,
    priceRange: 'low',
    openingHours: '7:00 AM - 6:00 PM',
    tags: ['wildlife', 'safari', 'nature', 'family'],
    tagsHi: ['वन्यजीव', 'सफारी', 'प्रकृति', 'परिवार']
  },
  {
    id: 'birla-mandir',
    name: 'Birla Mandir (Lakshmi Narayan Temple)',
    nameHi: 'बिड़ला मंदिर (लक्ष्मी नारायण मंदिर)',
    category: 'attraction',
    description: 'Beautiful sandstone temple dedicated to Lord Vishnu with panoramic views of the city from its hilltop location.',
    descriptionHi: 'भगवान विष्णु को समर्पित सुंदर बलुआ पत्थर का मंदिर जो पहाड़ी की चोटी से शहर के मनोरम दृश्य प्रदान करता है।',
    location: { lat: 23.2305, lng: 77.3923 },
    address: 'Arera Hills, Bhopal',
    addressHi: 'अरेरा हिल्स, भोपाल',
    images: [PLACE_IMAGES.architecture],
    rating: 4.6,
    priceRange: 'free',
    openingHours: '6:00 AM - 9:00 PM',
    tags: ['temple', 'architecture', 'views', 'spiritual'],
    tagsHi: ['मंदिर', 'वास्तुकला', 'दृश्य', 'आध्यात्मिक']
  }
]

export const RESTAURANTS: Place[] = [
  {
    id: 'jehan-numa',
    name: 'Jehan Numa Palace Hotel - Shahnama',
    nameHi: 'जहाँ नुमा पैलेस होटल - शाहनामा',
    category: 'restaurant',
    description: 'Fine dining restaurant serving authentic Mughlai and Nawabi cuisine in a heritage palace setting.',
    descriptionHi: 'धरोहर महल के माहौल में प्रामाणिक मुगलई और नवाबी व्यंजन परोसने वाला फाइन डाइनिंग रेस्तरां।',
    location: { lat: 23.2314, lng: 77.4071 },
    address: 'Shyamla Hills, Bhopal',
    addressHi: 'श्यामला हिल्स, भोपाल',
    images: [PLACE_IMAGES.food],
    rating: 4.5,
    priceRange: 'high',
    openingHours: '12:00 PM - 11:00 PM',
    phone: '+91 755 274 1100',
    tags: ['fine-dining', 'mughlai', 'heritage', 'nawabi'],
    tagsHi: ['फाइन डाइनिंग', 'मुगलई', 'धरोहर', 'नवाबी']
  },
  {
    id: 'manohar-dairy',
    name: 'Manohar Dairy & Restaurant',
    nameHi: 'मनोहर डेयरी एंड रेस्तरां',
    category: 'restaurant',
    description: 'Popular local eatery famous for sweets, snacks, and vegetarian North Indian cuisine.',
    descriptionHi: 'मिठाई, स्नैक्स और शाकाहारी उत्तर भारतीय व्यंजनों के लिए प्रसिद्ध लोकप्रिय स्थानीय भोजनालय।',
    location: { lat: 23.2598, lng: 77.4132 },
    address: 'New Market, TT Nagar, Bhopal',
    addressHi: 'न्यू मार्केट, टीटी नगर, भोपाल',
    images: [PLACE_IMAGES.food],
    rating: 4.3,
    priceRange: 'low',
    openingHours: '8:00 AM - 10:00 PM',
    phone: '+91 755 274 1234',
    tags: ['vegetarian', 'sweets', 'snacks', 'casual'],
    tagsHi: ['शाकाहारी', 'मिठाई', 'स्नैक्स', 'कैजुअल']
  },
  {
    id: 'underground-cafe',
    name: 'The Underground Cafe',
    nameHi: 'द अंडरग्राउंड कैफे',
    category: 'restaurant',
    description: 'Trendy cafe with international cuisine, coffee, and a vibrant atmosphere in DB City Mall.',
    descriptionHi: 'DB सिटी मॉल में अंतरराष्ट्रीय व्यंजन, कॉफी और जीवंत वातावरण वाला ट्रेंडी कैफे।',
    location: { lat: 23.2156, lng: 77.4352 },
    address: 'DB City Mall, Arera Colony, Bhopal',
    addressHi: 'DB सिटी मॉल, अरेरा कॉलोनी, भोपाल',
    images: [PLACE_IMAGES.food],
    rating: 4.2,
    priceRange: 'medium',
    openingHours: '11:00 AM - 11:00 PM',
    tags: ['cafe', 'international', 'coffee', 'casual'],
    tagsHi: ['कैफे', 'अंतरराष्ट्रीय', 'कॉफी', 'कैजुअल']
  }
]

export const HOTELS: Place[] = [
  {
    id: 'jehan-numa-hotel',
    name: 'Jehan Numa Palace Hotel',
    nameHi: 'जहाँ नुमा पैलेस होटल',
    category: 'hotel',
    description: 'Heritage palace hotel with colonial architecture, lush gardens, and world-class amenities.',
    descriptionHi: 'औपनिवेशिक वास्तुकला, हरे-भरे बगीचों और विश्व स्तरीय सुविधाओं वाला धरोहर महल होटल।',
    location: { lat: 23.2314, lng: 77.4071 },
    address: 'Shyamla Hills, Bhopal',
    addressHi: 'श्यामला हिल्स, भोपाल',
    images: [PLACE_IMAGES.hotel],
    rating: 4.6,
    priceRange: 'high',
    phone: '+91 755 274 1100',
    tags: ['heritage', 'luxury', 'palace', 'pool'],
    tagsHi: ['धरोहर', 'लक्जरी', 'महल', 'स्विमिंग पूल']
  },
  {
    id: 'courtyard-bhopal',
    name: 'Courtyard by Marriott Bhopal',
    nameHi: 'कोर्टयार्ड बाय मैरियट भोपाल',
    category: 'hotel',
    description: 'Modern business hotel with contemporary rooms, multiple dining options, and fitness center.',
    descriptionHi: 'आधुनिक कमरे, कई भोजन विकल्प और फिटनेस सेंटर वाला आधुनिक बिजनेस होटल।',
    location: { lat: 23.2123, lng: 77.4289 },
    address: 'DB City Mall, Arera Colony, Bhopal',
    addressHi: 'DB सिटी मॉल, अरेरा कॉलोनी, भोपाल',
    images: [PLACE_IMAGES.hotel],
    rating: 4.4,
    priceRange: 'high',
    phone: '+91 755 404 5000',
    tags: ['modern', 'business', 'luxury', 'mall'],
    tagsHi: ['आधुनिक', 'बिजनेस', 'लक्जरी', 'मॉल']
  }
]

export const HOSPITALS: Place[] = [
  {
    id: 'hamidia-hospital',
    name: 'Hamidia Hospital',
    nameHi: 'हमीदिया अस्पताल',
    category: 'hospital',
    description: 'Government teaching hospital with 24/7 emergency services and multi-specialty care.',
    descriptionHi: '24/7 आपातकालीन सेवाओं और बहु-विशेषज्ञ देखभाल वाला सरकारी शिक्षण अस्पताल।',
    location: { lat: 23.2567, lng: 77.3987 },
    address: 'Royal Market Area, Bhopal',
    addressHi: 'रॉयल मार्केट एरिया, भोपाल',
    images: [PLACE_IMAGES.hospital],
    rating: 3.8,
    openingHours: '24/7',
    phone: '+91 755 274 2311',
    tags: ['emergency', 'government', 'teaching', '24-7'],
    tagsHi: ['आपातकालीन', 'सरकारी', 'शिक्षण', '24/7']
  },
  {
    id: 'apollo-bhopal',
    name: 'Apollo Hospitals Bhopal',
    nameHi: 'अपोलो हॉस्पिटल्स भोपाल',
    category: 'hospital',
    description: 'Private multi-specialty hospital with modern facilities and emergency care.',
    descriptionHi: 'आधुनिक सुविधाओं और आपातकालीन देखभाल वाला निजी बहु-विशेषज्ञ अस्पताल।',
    location: { lat: 23.2345, lng: 77.4156 },
    address: 'E-8 Extension, Arera Colony, Bhopal',
    addressHi: 'E-8 एक्सटेंशन, अरेरा कॉलोनी, भोपाल',
    images: [PLACE_IMAGES.hospital],
    rating: 4.3,
    openingHours: '24/7',
    phone: '+91 755 425 6000',
    tags: ['emergency', 'private', 'multi-specialty', '24-7'],
    tagsHi: ['आपातकालीन', 'निजी', 'बहु-विशेषज्ञ', '24/7']
  }
]

export const POLICE_STATIONS: Place[] = [
  {
    id: 'mp-nagar-thana',
    name: 'MP Nagar Police Station',
    nameHi: 'एमपी नगर थाना',
    category: 'police',
    description: 'Main police station serving MP Nagar and surrounding areas.',
    descriptionHi: 'एमपी नगर और आसपास के क्षेत्रों की सेवा करने वाला मुख्य पुलिस थाना।',
    location: { lat: 23.2312, lng: 77.4234 },
    address: 'MP Nagar, Bhopal',
    addressHi: 'एमपी नगर, भोपाल',
    images: [PLACE_IMAGES.police],
    openingHours: '24/7',
    phone: '+91 755 276 0444',
    tags: ['police', 'emergency', '24-7'],
    tagsHi: ['पुलिस', 'आपातकालीन', '24/7']
  },
  {
    id: 'habibganj-thana',
    name: 'Habibganj Police Station',
    nameHi: 'हबीबगंज थाना',
    category: 'police',
    description: 'Police station near Habibganj railway station.',
    descriptionHi: 'हबीबगंज रेलवे स्टेशन के पास पुलिस थाना।',
    location: { lat: 23.2456, lng: 77.4478 },
    address: 'Habibganj, Bhopal',
    addressHi: 'हबीबगंज, भोपाल',
    images: [PLACE_IMAGES.police],
    openingHours: '24/7',
    phone: '+91 755 276 0666',
    tags: ['police', 'emergency', '24-7', 'railway'],
    tagsHi: ['पुलिस', 'आपातकालीन', '24/7', 'रेलवे']
  }
]

export const ATMS: Place[] = [
  {
    id: 'sbi-mp-nagar',
    name: 'SBI ATM - MP Nagar',
    nameHi: 'एसबीआई एटीएम - एमपी नगर',
    category: 'atm',
    description: 'State Bank of India ATM with 24/7 access.',
    descriptionHi: '24/7 पहुंच के साथ भारतीय स्टेट बैंक एटीएम।',
    location: { lat: 23.2315, lng: 77.4245 },
    address: 'MP Nagar Main Road, Bhopal',
    addressHi: 'एमपी नगर मेन रोड, भोपाल',
    images: [PLACE_IMAGES.atm],
    openingHours: '24/7',
    tags: ['atm', 'sbi', '24-7'],
    tagsHi: ['एटीएम', 'एसबीआई', '24/7']
  }
]

export const TRANSPORT: Place[] = [
  {
    id: 'bhopal-jn',
    name: 'Bhopal Junction Railway Station',
    nameHi: 'भोपाल जंक्शन रेलवे स्टेशन',
    category: 'transport',
    description: 'Main railway station connecting Bhopal to major cities across India.',
    descriptionHi: 'भोपाल को भारत के प्रमुख शहरों से जोड़ने वाला मुख्य रेलवे स्टेशन।',
    location: { lat: 23.2678, lng: 77.4145 },
    address: 'Station Road, Bhopal',
    addressHi: 'स्टेशन रोड, भोपाल',
    images: [PLACE_IMAGES.train],
    openingHours: '24/7',
    phone: '+91 755 400 1616',
    tags: ['railway', 'transport', '24-7'],
    tagsHi: ['रेलवे', 'परिवहन', '24/7']
  },
  {
    id: 'habibganj-stn',
    name: 'Rani Kamlapati (Habibganj) Station',
    nameHi: 'रानी कमलापति (हबीबगंज) स्टेशन',
    category: 'transport',
    description: 'India\'s first private railway station with modern amenities.',
    descriptionHi: 'आधुनिक सुविधाओं वाला भारत का पहला निजी रेलवे स्टेशन।',
    location: { lat: 23.2456, lng: 77.4478 },
    address: 'Habibganj, Bhopal',
    addressHi: 'हबीबगंज, भोपाल',
    images: [PLACE_IMAGES.train],
    openingHours: '24/7',
    tags: ['railway', 'transport', 'modern', '24-7'],
    tagsHi: ['रेलवे', 'परिवहन', 'आधुनिक', '24/7']
  },
  {
    id: 'bhopal-airport',
    name: 'Raja Bhoj Airport',
    nameHi: 'राजा भोज हवाई अड्डा',
    category: 'transport',
    description: 'Domestic airport connecting Bhopal to major Indian cities.',
    descriptionHi: 'भोपाल को प्रमुख भारतीय शहरों से जोड़ने वाला घरेलू हवाई अड्डा।',
    location: { lat: 23.2875, lng: 77.3367 },
    address: 'Airport Road, Bhopal',
    addressHi: 'एयरपोर्ट रोड, भोपाल',
    images: [PLACE_IMAGES.airport],
    phone: '+91 755 267 0827',
    tags: ['airport', 'transport'],
    tagsHi: ['हवाई अड्डा', 'परिवहन']
  }
]

export const SAFE_POINTS: Place[] = [
  {
    id: 'safe-point-mp-nagar',
    name: 'Safe Meeting Point - DB Mall',
    nameHi: 'सुरक्षित मिलन स्थल - DB मॉल',
    category: 'safe-point',
    description: 'Well-lit, crowded public location with security personnel and CCTV coverage.',
    descriptionHi: 'सुरक्षा कर्मियों और CCTV कवरेज के साथ अच्छी तरह से रोशनी वाला, भीड़भाड़ वाला सार्वजनिक स्थान।',
    location: { lat: 23.2156, lng: 77.4352 },
    address: 'DB City Mall, Arera Colony, Bhopal',
    addressHi: 'DB सिटी मॉल, अरेरा कॉलोनी, भोपाल',
    images: [PLACE_IMAGES.mall],
    openingHours: '10:00 AM - 10:00 PM',
    tags: ['safe', 'mall', 'crowded', 'security'],
    tagsHi: ['सुरक्षित', 'मॉल', 'भीड़भाड़', 'सुरक्षा']
  },
  {
    id: 'safe-point-railway',
    name: 'Safe Meeting Point - Railway Station',
    nameHi: 'सुरक्षित मिलन स्थल - रेलवे स्टेशन',
    category: 'safe-point',
    description: 'Railway station with 24/7 security and police presence.',
    descriptionHi: '24/7 सुरक्षा और पुलिस उपस्थिति वाला रेलवे स्टेशन।',
    location: { lat: 23.2678, lng: 77.4145 },
    address: 'Bhopal Junction, Station Road',
    addressHi: 'भोपाल जंक्शन, स्टेशन रोड',
    images: [PLACE_IMAGES.train],
    openingHours: '24/7',
    tags: ['safe', 'railway', 'police', '24-7'],
    tagsHi: ['सुरक्षित', 'रेलवे', 'पुलिस', '24/7']
  }
]

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'police', name: 'Police', nameHi: 'पुलिस', number: '100', description: 'Emergency police assistance', descriptionHi: 'आपातकालीन पुलिस सहायता', icon: 'shield' },
  { id: 'ambulance', name: 'Ambulance', nameHi: 'एम्बुलेंस', number: '108', description: 'Medical emergency ambulance service', descriptionHi: 'चिकित्सा आपातकालीन एम्बुलेंस सेवा', icon: 'heart-pulse' },
  { id: 'fire', name: 'Fire Brigade', nameHi: 'फायर ब्रिगेड', number: '101', description: 'Fire emergency services', descriptionHi: 'अग्निशमन आपातकालीन सेवाएं', icon: 'flame' },
  { id: 'women', name: 'Women Helpline', nameHi: 'महिला हेल्पलाइन', number: '181', description: '24/7 helpline for women in distress', descriptionHi: 'पीड़ित महिलाओं के लिए 24/7 हेल्पलाइन', icon: 'phone' },
  { id: 'tourist', name: 'Tourist Helpline', nameHi: 'पर्यटक हेल्पलाइन', number: '1363', description: 'Tourist assistance and information', descriptionHi: 'पर्यटक सहायता और जानकारी', icon: 'headphones' },
  { id: 'child', name: 'Child Helpline', nameHi: 'बाल हेल्पलाइन', number: '1098', description: 'Child welfare and protection', descriptionHi: 'बाल कल्याण और सुरक्षा', icon: 'baby' }
]

export function getAllPlaces(): Place[] {
  return [...ATTRACTIONS, ...RESTAURANTS, ...HOTELS, ...HOSPITALS, ...POLICE_STATIONS, ...ATMS, ...TRANSPORT, ...SAFE_POINTS]
}

export function getPlacesByCategory(category: Place['category']): Place[] {
  return getAllPlaces().filter(p => p.category === category)
}

export function getPlaceById(id: string): Place | undefined {
  return getAllPlaces().find(p => p.id === id)
}
