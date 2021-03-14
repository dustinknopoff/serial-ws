export const slides = [
  { text: "Let's break it down", linkNext: true },
  { question: true, category: "agriculture", showMicrophone: true },
  {
    question: true,
    category: "commercial, industry, residential",
    personalCat: "gas, fuel oil, and propane",
    showMicrophone: true,
  },
  {
    question: true,
    category: "electricity generation",
    showMicrophone: true,
  },
  { question: true, category: "transportation", showMicrophone: true },
  { final: { results: true } },
];

export const realValues = {
  collective: {
    agriculture: 10,
    transportation: 28,
    "commercial, industry, residential": 35,
    "electricity generation": 27,
  },
  personal: {
    transportation: 49,
    "electricity generation": 10,
    "gas, fuel oil, and propane": 19,
    agriculture: 19,
  },
};
