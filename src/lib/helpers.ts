/**
 *
 * @param num A sting or number value that want to convert.
 * @returns A converted number as bangla language.
 */
export function engNumberToBanglaNumber(num: string | number): string {
  const engToBnMap: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return num
    .toString()
    .split("")
    .map((char) => engToBnMap[char] ?? char)
    .join("");
}

/**
 *
 * @param category string
 * @returns string
 */
export function engCategoryToBanglaFuzzy(category: string): string {
  const engToBnMap: { [key: string]: string } = {
    // Income
    Salary: "বেতন",
    Freelancing: "ফ্রিল্যান্স",
    Interest: "সুদি",
    Dividends: "লাভাংশ",
    Gifts: "উপহার",

    // Expenses
    "Food and Dinning": "খাদ্য ও ভোজন",
    Transportation: "পরিবহন",
    "Rent/Mortgage": "ভাড়া/ঋণ",
    Groceries: "মুদিখানা",
    "Health and Medical": "স্বাস্থ্য ও চিকিৎসা",
    Entertainment: "বিনোদন",
    Education: "শিক্ষা",
    Travel: "ভ্রমণ",
    Insurance: "বীমা",
    Shopping: "শপিং",
    Subscriptions: "সাবস্ক্রিপশন",
    "Electric Bills": "বিদ্যুৎ বিল",
    "Mobile Recharge": "মোবাইল রিচার্জ",
    "Loan Payments": "ঋণের কিস্তি",

    // Transfer
    Savings: "সঞ্চয়",
    Investments: "বিনিয়োগ",
    Retirement: "অবসর",
    "Bank Transfers": "ব্যাংক স্থানান্তর",
  };

  const lowerCategory = category.toLowerCase();

  // Try exact match first
  if (engToBnMap[category]) {
    return engToBnMap[category];
  }

  // Otherwise try partial/fuzzy matching
  for (const key in engToBnMap) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes(lowerCategory) || lowerCategory.includes(lowerKey)) {
      return engToBnMap[key];
    }
  }

  // fallback to original if nothing matches
  return category;
}

/**
 *
 * @param method string
 * @returns string
 */
export function engMethodToBanglaFuzzy(method: string): string {
  const engToBnMap: { [key: string]: string } = {
    Cash: "নগদ",
    "Credit Card": "ক্রেডিট কার্ড",
    "Debit Card": "ডেবিট কার্ড",
    "Bank Transfer": "ব্যাংক স্থানান্তর",
    Wallet: "ওয়ালেট",
    Nagad: "মোবাইল ব্যাংকিং নগদ",
    BKash: "মোবাইল ব্যাংকিং বিকাশ",
    Rocket: "মোবাইল ব্যাংকিং রকেট",
    Outstanding: "বকেয়া",
  };

  const lowerMethod = method.toLowerCase();

  // Try exact match first
  if (engToBnMap[method]) {
    return engToBnMap[method];
  }

  // Otherwise try partial/fuzzy matching
  for (const key in engToBnMap) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes(lowerMethod) || lowerMethod.includes(lowerKey)) {
      return engToBnMap[key];
    }
  }

  // fallback to original if nothing matches
  return method;
}

export function engTypeToBanglaFuzzy(type: string): string {
  const engToBnMap: { [key: string]: string } = {
    Income: "আয়",
    Expense: "ব্যয়",
    Transfer: "স্থানান্তর",
  };

  const lowerType = type.toLowerCase();

  // Try exact match first
  if (engToBnMap[type]) {
    return engToBnMap[type];
  }

  // Otherwise try partial/fuzzy matching
  for (const key in engToBnMap) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes(lowerType) || lowerType.includes(lowerKey)) {
      return engToBnMap[key];
    }
  }

  // fallback to original if nothing matches
  return type;
}

export function engMonthToBanglaFuzzy(month: string): string {
  const engToBnMap: { [key: string]: string } = {
    January: "জানুয়ারী",
    February: "ফেব্রুয়ারী",
    March: "মার্চ",
    April: "এপ্রিল",
    May: "মে",
    Jun: "জুন",
    July: "জুলাই",
    August: "অগাস্ট",
    September: "সেপ্টেম্বর",
    October: "অক্টোবর",
    November: "নভেম্বর",
    December: "ডিসেম্বর",
  };

  const lowerMonth = month.toLowerCase();

  // Try exact match first
  if (engToBnMap[month]) {
    return engToBnMap[month];
  }

  // Otherwise try partial/fuzzy matching
  for (const key in engToBnMap) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes(lowerMonth) || lowerMonth.includes(lowerKey)) {
      return engToBnMap[key];
    }
  }

  // fallback to original if nothing matches
  return month;
}
