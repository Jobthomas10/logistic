// LorryMitra AI - Sample Logistics Documents for Kerala Transport

export const sampleDocuments = [
  {
    id: "ftl-2026-0456",
    isDemoPrimary: true,
    title: "Consignment Note: Electrical Equipment (Kochi ➔ Bengaluru)",
    documentType: "Consignment Note (LR)",
    documentNumber: "FTL/2026/10/0456",
    documentDate: "05-10-2026",
    vehicleNumber: "KL 07 AB 1234",
    vehicleModel: "Tata / Ashok Leyland Goods Carrier",
    
    // Route & Location
    pickupLocation: "Kochi, Kerala - 682024",
    pickupDetailedAddress: "ABC Manufacturers, Plot No. A-12, Industrial Area, Edayar, Kochi - 682024, Kerala",
    deliveryLocation: "Bengaluru, Karnataka - 560058",
    deliveryDetailedAddress: "XYZ Retail Pvt Ltd, #45, Peenya Industrial Area, Bengaluru - 560058, Karnataka",
    distanceKm: 545,
    approxDrivingTime: "11 hrs 30 mins",
    
    // Parties
    consignor: "ABC MANUFACTURERS",
    consignorGstin: "32AABCA1234A1Z5",
    consignorPhone: "+91 99610 74123",
    consignorContactPerson: "Anil Kumar (Consignor)",
    
    consignee: "XYZ RETAIL PVT LTD",
    consigneeGstin: "29BBCCX5678B1Z3",
    consigneePhone: "+91 98470 12345",
    consigneeContactPerson: "Receiving Incharge (Peenya Wholesale)",
    
    // Cargo Details
    cargoDescription: "Electrical Equipment (Distribution Panel, Control Switches, Cables & Accessories)",
    cargoCategory: "Electrical Equipment & Switchgear",
    hsnCode: "8537 / 8536 / 8544",
    quantity: "23 packages (305 PCS)",
    weight: "500 KG",
    invoiceValue: "₹1,50,000.00",
    taxAmount: "₹27,000 (18% IGST - Total: ₹1,77,000.00)",
    
    // Transport Details
    transporter: "KERALA FREIGHT CARRIERS (TC: KL01TC1234)",
    transporterId: "32AAACK7890C1Z1",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 99610 74123",
    driverLicense: "LR No: KFC/7890 (LR Date: 05-10-2026)",
    
    // Validity & Compliance
    validityPeriod: "05-10-2026 (Consignment Note KFC/7890)",
    validityStatus: "VALID",
    validityRemainingHours: 72,
    
    // Instructions & Warnings
    deliveryInstructions: "Material received in good condition. Handle with care.",
    fileUrl: "/fasttrack_consignment_note.jpg",
    warnings: [
      {
        id: "w-ftl-1",
        level: "VALID",
        titleMl: "കൺസൈൻമെന്റ് നോട്ട് സാധുതയുള്ളതാണ് (Valid)",
        titleEn: "Consignment Note is Valid",
        descMl: "വാഹന നമ്പർ KL 07 AB 1234, ഇൻവോയ്സ് നമ്പർ INV-2026-10-001 എന്നിവ രേഖകളിൽ കൃത്യമാണ്.",
        descEn: "Valid consignment note with registered vehicle KL 07 AB 1234 and invoice INV-2026-10-001."
      },
      {
        id: "w-ftl-2",
        level: "INFO",
        titleMl: "ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ (Handle with Care)",
        titleEn: "Electrical Equipment - Fragile",
        descMl: "ഡിസ്ട്രിബ്യൂഷൻ പാനലുകളും കൺട്രോൾ സ്വിച്ചുകളും ഉള്ളതിനാൽ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യുക.",
        descEn: "Distribution panels and sensitive control switches. Handle with care."
      }
    ],

    malayalamSummary: {
      headline: "ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ",
      cargoMl: "500 കിലോ ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ (ഡിസ്ട്രിബ്യൂഷൻ പാനൽ, കൺട്രോൾ സ്വിച്ചുകൾ, കേബിളുകൾ - 23 പാക്കറ്റുകൾ)",
      pickupMl: "കൊച്ചി (എടയാർ ഇൻഡസ്ട്രിയൽ ഏരിയ, ABC Manufacturers)",
      dropMl: "ബെംഗളൂരു (പീനിയ ഇൻഡസ്ട്രിയൽ ഏരിയ, XYZ Retail Pvt Ltd)",
      vehicleMl: "KL 07 AB 1234",
      validityMl: "05-10-2026 (കൺസൈൻമെന്റ് നോട്ട് KFC/7890)",
      attentionMl: "സാധനങ്ങൾ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യുക (Handle with care). ഡ്രൈവർ: രാജേഷ് കുമാർ (99610 74123).",
      audioSpeechText: "ഇത് കൊച്ചിയിൽ നിന്ന് ബെംഗളൂരുവിലേക്ക് കൊണ്ടുപോകുന്ന 500 കിലോ ഇലക്ട്രിക്കൽ ഉപകരണങ്ങളുടെ കൺസൈൻമെന്റ് നോട്ട് ആണ്. വാഹനം KL 07 AB 1234. ഡ്രൈവർ രാജേഷ് കുമാർ. സാധനങ്ങൾ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യുക."
    },

    verifiedFacts: {
      pickup: "കൊച്ചി, എടയാർ ഇൻഡസ്ട്രിയൽ ഏരിയ (ABC Manufacturers)",
      delivery: "ബെംഗളൂരു, പീനിയ ഇൻഡസ്ട്രിയൽ ഏരിയ (XYZ Retail Pvt Ltd)",
      cargo: "500 kg ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ (ഡിസ്ട്രിബ്യൂഷൻ പാനൽ, കൺട്രോൾ സ്വിച്ചുകൾ, കേബിളുകൾ - 305 PCS)",
      weight: "500 KG",
      quantity: "23 packages (305 PCS)",
      vehicle: "KL 07 AB 1234",
      value: "₹1,50,000.00 (Total with IGST: ₹1,77,000.00)",
      expiry: "05-10-2026 (Consignment Note KFC/7890)",
      consignee: "ബെംഗളൂരുവിലെ XYZ Retail Pvt Ltd (#45, Peenya Industrial Area)",
      consignor: "കൊച്ചിയിലെ ABC Manufacturers (Edayar Industrial Area)"
    }
  },
  {
    id: "ewb-2026-001",
    isDemoPrimary: false,
    title: "E-Way Bill: Tiles (Ernakulam ➔ Kozhikode)",
    documentType: "E-Way Bill (EWB-01)",
    documentNumber: "2410-9823-4512",
    documentDate: "07 October 2026",
    vehicleNumber: "KL-05-AB-1234",
    vehicleModel: "Ashok Leyland 1616 Heavy Truck",
    
    // Route & Location
    pickupLocation: "Ernakulam, Kerala",
    pickupDetailedAddress: "ABC Ceramics Pvt Ltd, Shed 4B, Kalamassery Industrial Estate, Kochi, Kerala - 682033",
    deliveryLocation: "Kozhikode, Kerala",
    deliveryDetailedAddress: "Malabar Traders Wholesale Godown, Mavoor Road, Near Cyberpark, Kozhikode, Kerala - 673004",
    distanceKm: 185,
    approxDrivingTime: "4 hrs 45 mins",
    
    // Parties
    consignor: "ABC Ceramics Pvt Ltd",
    consignorGstin: "32AABCA1234M1Z5",
    consignorPhone: "+91 94471 88990",
    consignorContactPerson: "Suresh Menon (Warehouse Head)",
    
    consignee: "Malabar Traders",
    consigneeGstin: "32MALAB9876K1Z2",
    consigneePhone: "+91 98470 54321",
    consigneeContactPerson: "Abdul Gafoor (Godown Incharge)",
    
    // Cargo Details
    cargoDescription: "Ceramic Floor Tiles (600x600mm Vitrified)",
    cargoCategory: "Building & Flooring Materials",
    hsnCode: "69072100",
    quantity: "50 boxes",
    weight: "500 kg",
    invoiceValue: "₹85,000",
    taxAmount: "₹15,300 (18% GST)",
    
    // Transport Details
    transporter: "Kairali Express Cargo Logistics",
    transporterId: "32TRANS9988",
    driverName: "Biju Kumar",
    driverPhone: "+91 94471 23456",
    driverLicense: "KL0520180004521",
    
    // Validity & Compliance
    validityPeriod: "8 October 2026, 11:59 PM",
    validityStatus: "VALID", // 'VALID' | 'EXPIRING' | 'EXPIRED'
    validityRemainingHours: 36,
    
    // Instructions & Warnings
    deliveryInstructions: "Handle with care. Unload at godown gate #2. Call receiver 30 mins before arrival. Take signed seal on LR copy.",
    warnings: [
      {
        id: "w-1",
        level: "VALID", // 'VALID' | 'WARNING' | 'DANGER'
        titleMl: "E-Way Bill സാധുതയുള്ളതാണ് (Valid)",
        titleEn: "E-Way Bill is Valid",
        descMl: "2026 ഒക്ടോബർ 8 രാത്രി 11:59 വരെ സാധുതയുണ്ട് (36 മണിക്കൂർ ബാക്കി). കേരള RTO ചെക്ക്പോസ്റ്റുകളിൽ തടസ്സമില്ലാതെ കടന്നുപോകാം.",
        descEn: "Valid until 8 October 2026, 11:59 PM (36 hours remaining). Smooth transit at all Kerala RTO checkposts."
      },
      {
        id: "w-2",
        level: "INFO",
        titleMl: "പൊട്ടാൻ സാധ്യതയുള്ള ചരക്ക് (Fragile)",
        titleEn: "Fragile Ceramic Cargo",
        descMl: "സിറാമിക് ടൈൽസ് ആയതിനാൽ സ്പീഡ് ബ്രേക്കറുകളിലും വളവുകളിലും വേഗത കുറച്ച് ശ്രദ്ധിച്ച് ഓടിക്കുക.",
        descEn: "Fragile vitrified tiles. Maintain steady speeds around hairpin bends and speed breakers."
      }
    ],

    // Simple Malayalam summary (Section 5 requirements)
    malayalamSummary: {
      headline: "ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ",
      cargoMl: "500 കിലോ സിറാമിക് ടൈൽസ് (50 ബോക്സുകൾ)",
      pickupMl: "എറണാകുളം (കളമശ്ശേരി ഇൻഡസ്ട്രിയൽ ഏരിയ)",
      dropMl: "കോഴിക്കോട് (മാവൂർ റോഡ്, മലബാർ ട്രേഡേഴ്സ് ഗോഡൗൺ)",
      vehicleMl: "KL-05-AB-1234",
      validityMl: "2026 ഒക്ടോബർ 8 വരെ സാധുതയുണ്ട്",
      attentionMl: "ബില്ലിന്റെ സാധുത അവസാനിക്കുന്നതിന് മുമ്പ് ചരക്ക് എത്തിക്കുക. ഗേറ്റ് നമ്പർ 2-ൽ അൺലോഡ് ചെയ്യുക.",
      audioSpeechText: "ഇത് എറണാകുളത്തുനിന്ന് കോഴിക്കോട്ടേക്ക് കൊണ്ടുപോകുന്ന അഞ്ഞൂറ് കിലോ ടൈൽസിന്റെ ഇ-വേ ബിൽ ആണ്. വാഹനം KL 05 AB 1234. ബില്ലിന്റെ സാധുത 2026 ഒക്ടോബർ 8 വരെ ഉണ്ട്. ഗേറ്റ് നമ്പർ രണ്ടിൽ അൺലോഡ് ചെയ്യുക."
    },

    // Verified facts lookup for Ask LorryMitra strict grounding
    verifiedFacts: {
      pickup: "എറണാകുളം, കളമശ്ശേരി (ABC Ceramics)",
      delivery: "കോഴിക്കോട്, മാവൂർ റോഡ് (Malabar Traders)",
      cargo: "500 കിലോ ceramic tiles (50 boxes)",
      weight: "500 kg (അഞ്ഞൂറ് കിലോഗ്രാം)",
      quantity: "50 ബോക്സുകൾ",
      vehicle: "KL-05-AB-1234",
      value: "₹85,000 (എൺപത്തയ്യായിരം രൂപ)",
      expiry: "ഈ E-Way Bill 2026 ഒക്ടോബർ 8 വരെ valid ആണ്.",
      consignee: "കോഴിക്കോട്ടെ Malabar Traders (അബ്ദുൾ ഗഫൂർ - +91 98470 54321)",
      consignor: "എറണാകുളത്തെ ABC Ceramics Pvt Ltd"
    }
  },

  {
    id: "lr-2026-002",
    isDemoPrimary: false,
    title: "Consignment Note (LR): Rubber & Pepper (Kottayam ➔ Wayanad)",
    documentType: "Consignment Note (Lorry Receipt / LR)",
    documentNumber: "LR-KTM-2026-881",
    documentDate: "07 October 2026",
    vehicleNumber: "KL-07-CD-5678",
    vehicleModel: "Tata 1109 LPT Goods Carrier",
    
    // Route & Location
    pickupLocation: "Kottayam, Kerala",
    pickupDetailedAddress: "Kottayam Spices & Co., Central Goods Yard, Kanjikuzhy, Kottayam - 686004",
    deliveryLocation: "Wayanad, Kerala",
    deliveryDetailedAddress: "Wayanad Valley Distributors, Main Bazar, Kalpetta, Wayanad - 673121",
    distanceKm: 290,
    approxDrivingTime: "7 hrs 30 mins",
    
    // Parties
    consignor: "Kottayam Spices & Rubber Co.",
    consignorGstin: "32KTYM3344J1Z8",
    consignorPhone: "+91 94473 33221",
    consignorContactPerson: "Thomas Mathew",
    
    consignee: "Wayanad Valley Distributors",
    consigneeGstin: "32WYND5566L1Z4",
    consigneePhone: "+91 98475 77889",
    consigneeContactPerson: "Vijayan Pillai",
    
    // Cargo Details
    cargoDescription: "Natural RSS4 Sheet Rubber (30 sacks) & Black Pepper (10 sacks)",
    cargoCategory: "Agriculture & Plantation Produce",
    hsnCode: "40012100 / 09041110",
    quantity: "40 sacks total",
    weight: "1,250 kg",
    invoiceValue: "₹1,42,000",
    taxAmount: "₹7,100 (5% GST)",
    
    // Transport Details
    transporter: "Highland Malabar Roadways",
    transporterId: "32HIGH7766",
    driverName: "Santhosh Varghese",
    driverPhone: "+91 94951 88776",
    driverLicense: "KL0720150009841",
    
    // Validity & Compliance
    validityPeriod: "07 October 2026, 5:00 PM",
    validityStatus: "EXPIRING",
    validityRemainingHours: 4,
    
    // Instructions & Warnings
    deliveryInstructions: "Thamarassery Churam ghat route. Heavy monsoon rain reported - ensure double tarpaulin water protection.",
    warnings: [
      {
        id: "w-201",
        level: "WARNING",
        titleMl: "E-Way Bill 4 മണിക്കൂറിനുള്ളിൽ expire ചെയ്യും!",
        titleEn: "E-Way Bill Expiring in 4 Hours!",
        descMl: "ഇന്ന് വൈകിട്ട് 5:00 മണിക്ക് സാധുത അവസാനിക്കും. വാളയാർ/താമരശ്ശേരി ചെക്ക്പോസ്റ്റുകൾ വഴി പോകുമ്പോൾ തടസ്സമുണ്ടാകാതിരിക്കാൻ ഉടൻ അപ്‌ഡേറ്റ് ചെയ്യുക.",
        descEn: "Validity ends today at 5:00 PM. High risk of checkpost delay if not extended or cleared in time."
      },
      {
        id: "w-202",
        level: "WARNING",
        titleMl: "മഴ മുന്നറിയിപ്പ് — ടാർപോളിൻ ഉപയോഗിക്കുക",
        titleEn: "Heavy Monsoon Rain Alert",
        descMl: "താമരശ്ശേരി ചുരത്തിൽ കനത്ത മഴയുള്ളതിനാൽ റബ്ബറും കുരുമുളകും നനയാതിരിക്കാൻ ടാർപോളിൻ ശരിയായി കെട്ടി ഉറപ്പിക്കുക.",
        descEn: "Plantation spices easily damage under moisture. Double tarpaulin required."
      }
    ],

    malayalamSummary: {
      headline: "ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ",
      cargoMl: "1,250 കിലോ റബ്ബർ ഷീറ്റും കുരുമുളകും (40 ചാക്കുകൾ)",
      pickupMl: "കോട്ടയം (കാഞ്ഞിക്കുഴി യാർഡ്)",
      dropMl: "വയനാട് (കൽപ്പറ്റ, മെയിൻ ബസാർ)",
      vehicleMl: "KL-07-CD-5678",
      validityMl: "ഇന്ന് വൈകിട്ട് 5:00 മണിക്ക് സാധുത തീരും",
      attentionMl: "ശ്രദ്ധിക്കുക: 4 മണിക്കൂറിനുള്ളിൽ ബിൽ expire ചെയ്യും. മഴയത്ത് നനയാതിരിക്കാൻ ടാർപോളിൻ ഉപയോഗിക്കുക.",
      audioSpeechText: "കോട്ടയത്തുനിന്ന് വയനാട്ടിലേക്ക് ആയിരത്തി ഇരുന്നൂറ്റമ്പത് കിലോ റബ്ബറും കുരുമുളകുമാണ് ചരക്ക്. വാഹനം KL 07 CD 5678. ഈ രേഖ നാല് മണിക്കൂറിനുള്ളിൽ expire ചെയ്യും, ശ്രദ്ധിക്കുക."
    },

    verifiedFacts: {
      pickup: "കോട്ടയം, കാഞ്ഞിക്കുഴി (Kottayam Spices & Co)",
      delivery: "വയനാട്, കൽപ്പറ്റ (Wayanad Valley Distributors)",
      cargo: "1,250 kg റബ്ബർ ഷീറ്റും കുരുമുളകും",
      weight: "1,250 kg",
      quantity: "40 ചാക്കുകൾ",
      vehicle: "KL-07-CD-5678",
      value: "₹1,42,000",
      expiry: "ഈ രേഖ ഇന്ന് വൈകിട്ട് 5:00 മണിക്ക് expire ചെയ്യും (4 മണിക്കൂർ മാത്രം ബാക്കി).",
      consignee: "വയനാട്ടിലെ Wayanad Valley Distributors (വിജയൻ പിള്ള - +91 98475 77889)",
      consignor: "കോട്ടയത്തെ Kottayam Spices & Co"
    }
  },

  {
    id: "dc-2026-003",
    isDemoPrimary: false,
    title: "Delivery Challan: TMT Steel Rods (Aluva ➔ Thrissur)",
    documentType: "Delivery Challan (Incomplete/Defective)",
    documentNumber: "DC-2026-0941",
    documentDate: "06 October 2026",
    vehicleNumber: "MISSING (രേഖപ്പെടുത്തിയിട്ടില്ല)",
    vehicleModel: "Unspecified Goods Vehicle",
    
    // Route & Location
    pickupLocation: "Aluva, Ernakulam",
    pickupDetailedAddress: "Kerala Steel & Hardware Yards, Near UC College, Aluva, Ernakulam - 683102",
    deliveryLocation: "Thrissur, Kerala",
    deliveryDetailedAddress: "Thrissur Mega Construction Site, Round North, Thrissur - 680001",
    distanceKm: 65,
    approxDrivingTime: "1 hr 45 mins",
    
    // Parties
    consignor: "Kerala Steel & Hardware Ltd",
    consignorGstin: "32ALUV8899P1Z3",
    consignorPhone: "+91 94474 11223",
    consignorContactPerson: "Narayanan",
    
    consignee: "Thrissur Builders Consortium",
    consigneeGstin: "32TSRR4455Q1Z7",
    consigneePhone: "+91 98472 99887",
    consigneeContactPerson: "Babu Varghese",
    
    // Cargo Details
    cargoDescription: "Fe 550D TMT Steel Rods (12mm)",
    cargoCategory: "Construction Materials",
    hsnCode: "72142090",
    quantity: "150 bundles",
    weight: "2,800 kg",
    invoiceValue: "₹1,95,000",
    taxAmount: "₹35,100 (18% GST)",
    
    // Transport Details
    transporter: "Self Transport / Private Contractor",
    transporterId: "NOT_SPECIFIED",
    driverName: "Not Recorded",
    driverPhone: "Not Recorded",
    driverLicense: "Not Recorded",
    
    // Validity & Compliance
    validityPeriod: "06 October 2026, 6:00 PM",
    validityStatus: "EXPIRED",
    validityRemainingHours: 0,
    
    // Instructions & Warnings
    deliveryInstructions: "Heavy trailer crane required for offloading steel bundles at site.",
    warnings: [
      {
        id: "w-301",
        level: "DANGER",
        titleMl: "ഈ രേഖ കാലഹരണപ്പെട്ടു (Expired)!",
        titleEn: "Document has Expired!",
        descMl: "ഇന്നലെ (ഒക്ടോബർ 6) വൈകിട്ട് 6:00 മണിക്ക് കാലാവധി കഴിഞ്ഞു. പരിശോധനയിൽ പിഴ വരാൻ സാധ്യതയുണ്ട്.",
        descEn: "Expired on 6 October 2026. High penalty risk under GST & MVD enforcement."
      },
      {
        id: "w-302",
        level: "DANGER",
        titleMl: "വാഹന നമ്പർ രേഖപ്പെടുത്തിയിട്ടില്ല (Missing Vehicle)",
        titleEn: "Missing Vehicle Registration Number",
        descMl: "ഡെലിവറി ചലാനിൽ ഏത് വണ്ടിയാണെന്ന് എഴുതിയിട്ടില്ല. പാർട്ട്-ബി ഇല്ലാതെ യാത്ര ചെയ്യരുത്.",
        descEn: "No vehicle number is recorded on the bill. Part-B is incomplete."
      }
    ],

    malayalamSummary: {
      headline: "ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ",
      cargoMl: "2,800 കിലോ TMT സ്റ്റീൽ കമ്പികൾ (150 ബണ്ടിൽ)",
      pickupMl: "ആലുവ (കേരള സ്റ്റീൽ യാർഡ്)",
      dropMl: "തൃശ്ശൂർ (റൗണ്ട് നോർത്ത് സൈറ്റ്)",
      vehicleMl: "വാഹന നമ്പർ രേഖപ്പെടുത്തിയിട്ടില്ല ⚠️",
      validityMl: "കാലഹരണപ്പെട്ടു (Expired yesterday)",
      attentionMl: "അതീവ ശ്രദ്ധ: വാഹന നമ്പറില്ല, ബില്ലിന്റെ കാലാവധിയും കഴിഞ്ഞു. വണ്ടിയെടുക്കുന്നതിന് മുമ്പ് പുതിയ രേഖ വാങ്ങുക.",
      audioSpeechText: "ശ്രദ്ധിക്കുക! ഈ രേഖയിൽ വാഹന നമ്പർ രേഖപ്പെടുത്തിയിട്ടില്ല, കൂടാതെ ഇതിന്റെ കാലാവധിയും ഇന്നലെ കഴിഞ്ഞതാണ്. വണ്ടിയെടുക്കുന്നതിന് മുമ്പ് ഓഫീസിൽ നിന്ന് പുതിയ രേഖ ആവശ്യപ്പെടുക."
    },

    verifiedFacts: {
      pickup: "ആലുവ (Kerala Steel & Hardware)",
      delivery: "തൃശ്ശൂർ (Thrissur Builders Site)",
      cargo: "2,800 kg TMT steel rods (150 bundles)",
      weight: "2,800 kg",
      quantity: "150 ബണ്ടിൽ",
      vehicle: "രേഖയിൽ വാഹന നമ്പർ ഇല്ല (Missing)",
      value: "₹1,95,000",
      expiry: "ഈ രേഖ കാലഹരണപ്പെട്ടു. ഇന്നലെ ഒക്ടോബർ 6-ന് കാലാവധി കഴിഞ്ഞു.",
      consignee: "തൃശ്ശൂരിലെ Thrissur Builders Consortium",
      consignor: "ആലുവയിലെ Kerala Steel & Hardware"
    }
  },
  {
    id: "ewb-2024-pune-chennai",
    isDemoPrimary: false,
    title: "E-Way Bill: Wall Tiles (Pune ➔ Chennai)",
    documentType: "E-Way Bill (EWB-01)",
    documentNumber: "2891 4736 9052",
    documentDate: "12-Nov-2024 02:15 PM",
    vehicleNumber: "MH-12-CD-9876",
    vehicleModel: "Heavy Commercial Road Vehicle",
    
    // Route & Location
    pickupLocation: "Pune, Maharashtra",
    pickupDetailedAddress: "Horizon Tiles & Ceramics Ltd, Survey No. 88, MIDC Industrial Area, Pune - 411019, Maharashtra",
    deliveryLocation: "Chennai, Tamil Nadu",
    deliveryDetailedAddress: "Southern Trading Co., 22/7, Anna Salai, Chennai - 600002, Tamil Nadu",
    distanceKm: 1180,
    approxDrivingTime: "22 hrs 30 mins",
    
    // Parties
    consignor: "Horizon Tiles & Ceramics Ltd",
    consignorGstin: "27LMNOP4567Q1R8",
    consignorPhone: null,
    consignorContactPerson: "Dispatch Officer (Pune MIDC)",
    
    consignee: "Southern Trading Co.",
    consigneeGstin: "33UVWXY9012A3B4",
    consigneePhone: null,
    consigneeContactPerson: "Receiving Manager (Chennai)",
    
    // Cargo Details
    cargoDescription: "Porcelain Wall Tiles (HSN: 6908)",
    cargoCategory: "Ceramic & Construction Materials",
    hsnCode: "6908",
    quantity: "120 Boxes",
    weight: "1,440 kg",
    invoiceValue: "₹1,45,500.00",
    taxAmount: "As per Tax Invoice INV-2024-8876",
    
    // Transport Details
    transporter: "Deccan Logistics Pvt Ltd",
    transporterId: "27TRANS3344K5L6",
    driverName: "Road Freight Driver",
    driverPhone: "+91 98450 11223",
    driverLicense: "MH1220190008892",
    
    // Validity & Compliance
    validityPeriod: "13-Nov-2024 11:59 PM",
    validityStatus: "EXPIRED",
    validityRemainingHours: 0,
    
    // Instructions & Warnings
    deliveryInstructions: "Handle fragile wall tiles with care. Keep upright and dry. Hand over invoice copy upon receipt signature.",
    warnings: [
      {
        id: "w-401",
        level: "DANGER",
        titleMl: "ഇ-വേ ബിൽ കാലാവധി കഴിഞ്ഞതാണ് (Expired)!",
        titleEn: "E-Way Bill has Expired!",
        descMl: "ഈ ഇ-വേ ബില്ലിന്റെ കാലാവധി 2024 നവംബർ 13-ന് രാത്രി 11:59-ന് കഴിഞ്ഞതാണ്. പുതിയ സാധുവായ ഇ-വേ ബിൽ ഇല്ലാതെ യാത്ര ചെയ്യരുത്.",
        descEn: "Expired on 13-Nov-2024. High risk of checkpost detention without bill extension."
      }
    ],

    malayalamSummary: {
      headline: "ഈ രേഖയിൽ പ്രധാനപ്പെട്ട കാര്യങ്ങൾ",
      cargoMl: "120 ബോക്സ് പോർസലൈൻ വാൾ ടൈൽസ് (Porcelain Wall Tiles)",
      pickupMl: "പൂനെ, മഹാരാഷ്ട്ര (Horizon Tiles & Ceramics Ltd)",
      dropMl: "ചെന്നൈ, തമിഴ്നാട് (Southern Trading Co.)",
      vehicleMl: "MH-12-CD-9876",
      validityMl: "കാലഹരണപ്പെട്ടു (13-Nov-2024 11:59 PM)",
      attentionMl: "അതീവ ശ്രദ്ധ: ഈ ഇ-വേ ബില്ലിന്റെ കാലാവധി 2024 നവംബർ 13-ന് കഴിഞ്ഞതാണ്. വാഹനം പുറപ്പെടുന്നതിന് മുൻപ് സാധുതയുള്ള പുതിയ രേഖ വാങ്ങുക.",
      audioSpeechText: "ശ്രദ്ധിക്കുക! ഈ ഇ-വേ ബില്ലിൽ പൂനെയിലെ ഹൊറൈസൺ ടൈൽസിൽ നിന്ന് ചെന്നൈയിലെ സതേൺ ട്രേഡിംഗ് കമ്പനിയിലേക്ക് കൊണ്ടുപോകാനുള്ള 120 ബോക്സ് വാൾ ടൈൽസാണുള്ളത്. വാഹന നമ്പർ MH-12-CD-9876 ആണ്. ശ്രദ്ധിക്കുക, ഈ ബില്ലിന്റെ കാലാവധി കഴിഞ്ഞതാണ്."
    },

    verifiedFacts: {
      pickup: "പൂനെ, മഹാരാഷ്ട്ര (Horizon Tiles & Ceramics Ltd)",
      delivery: "ചെന്നൈ, തമിഴ്നാട് (Southern Trading Co.)",
      cargo: "Porcelain Wall Tiles (120 Boxes)",
      weight: "1,440 kg",
      quantity: "120 Boxes",
      vehicle: "MH-12-CD-9876",
      value: "₹1,45,500.00",
      expiry: "13-Nov-2024 11:59 PM (Expired)",
      consignee: "Southern Trading Co., Chennai",
      consignor: "Horizon Tiles & Ceramics Ltd, Pune"
    }
  }
];
