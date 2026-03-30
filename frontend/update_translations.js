const fs = require('fs');

const translations = {
  en: {
    dashboard: {
      title: "Dashboard",
      subtitle: "Your financial security overview",
      securityScore: "Security Score",
      lessonsCompleted: "Lessons Completed",
      activeAlerts: "Active Alerts",
      quizAccuracy: "Quiz Accuracy",
      riskLevel: "Risk Level",
      lowRisk: "Low Risk",
      riskDesc: "Based on your activity & awareness",
      weeklyProgress: "Weekly Progress",
      recentActivity: "Recent Activity",
      phishing: "Phishing",
      upiFraud: "UPI Fraud",
      investmentScams: "Investment Scams",
      otpFraud: "OTP Fraud"
    },
    profile: {
      title: "Settings & Profile",
      subtitle: "Manage your account preferences",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      securitySettings: "Security Settings",
      twoFactor: "Two-Factor Authentication",
      changePassword: "Change Password",
      notifications: "Notifications",
      emailAlerts: "Email Alerts",
      smsAlerts: "SMS Alerts",
      pushNotifications: "Push Notifications",
      saveChanges: "Save Changes"
    },
    simulator: {
      title: "Scam Simulator",
      subtitle: "Practice identifying real-world scams safely",
      phishing: "Phishing Setup",
      vishing: "Vishing Challenge",
      smishing: "SMS Fraud",
      upi: "UPI Scan Request",
      score: "Simulation Score",
      analyzing: "Analyzing...",
      markSafe: "Mark as Safe",
      markScam: "Report Scam",
      nextScenario: "Next Scenario"
    },
    alerts: {
      title: "Fraud Alerts",
      subtitle: "Latest security threats and active scams",
      search: "Search alerts...",
      filterAll: "All",
      filterHigh: "High Risk",
      filterMedium: "Medium Risk",
      filterLow: "Low Risk",
      reportButton: "Report a Scam",
      readMore: "Read More"
    },
    video: {
      title: "Learning Modules",
      subtitle: "Master digital security through interactive lessons",
      module1: "Cybersecurity Basics",
      module2: "Phishing Prevention",
      module3: "Safe Online Banking",
      watchNow: "Watch Now",
      completed: "Completed"
    },
    quiz: {
      title: "Security Quiz",
      subtitle: "Test your knowledge on digital fraud prevention",
      startQuiz: "Start Quiz",
      question: "Question",
      next: "Next",
      submit: "Submit",
      scoreTitle: "Your Score",
      retake: "Retake Quiz"
    }
  },
  hi: {
    dashboard: {
      title: "डैशबोर्ड",
      subtitle: "आपका वित्तीय सुरक्षा अवलोकन",
      securityScore: "सुरक्षा स्कोर",
      lessonsCompleted: "पूर्ण किए गए पाठ",
      activeAlerts: "सक्रिय अलर्ट",
      quizAccuracy: "प्रश्नोत्तरी सटीकता",
      riskLevel: "जोखिम स्तर",
      lowRisk: "कम जोखिम",
      riskDesc: "आपकी गतिविधि और जागरूकता के आधार पर",
      weeklyProgress: "साप्ताहिक प्रगति",
      recentActivity: "हाल की गतिविधि",
      phishing: "फ़िशिंग",
      upiFraud: "UPI धोखाधड़ी",
      investmentScams: "निवेश घोटाले",
      otpFraud: "OTP धोखाधड़ी"
    },
    profile: {
      title: "प्रोफ़ाइल और सेटिंग्स",
      subtitle: "अपनी खाता प्राथमिकताएं प्रबंधित करें",
      personalInfo: "व्यक्तिगत जानकारी",
      fullName: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फ़ोन नंबर",
      securitySettings: "सुरक्षा सेटिंग्स",
      twoFactor: "टू-फैक्टर ऑथेंटिकेशन",
      changePassword: "पासवर्ड बदलें",
      notifications: "सूचनाएं",
      emailAlerts: "ईमेल अलर्ट",
      smsAlerts: "SMS अलर्ट",
      pushNotifications: "पुश सूचनाएं",
      saveChanges: "परिवर्तन सहेजें"
    },
    simulator: {
      title: "स्कैम सिम्युलेटर",
      subtitle: "वास्तविक दुनिया के घोटालों को सुरक्षित रूप से पहचानने का अभ्यास करें",
      phishing: "फ़िशिंग सेटअप",
      vishing: "विशिंग चुनौती",
      smishing: "SMS धोखाधड़ी",
      upi: "UPI स्कैन अनुरोध",
      score: "सिमुलेशन स्कोर",
      analyzing: "विश्लेषण हो रहा है...",
      markSafe: "सुरक्षित चिह्नित करें",
      markScam: "स्कैम रिपोर्ट करें",
      nextScenario: "अगला परिदृश्य"
    },
    alerts: {
      title: "धोखाधड़ी अलर्ट",
      subtitle: "नवीनतम सुरक्षा खतरे और सक्रिय घोटाले",
      search: "अलर्ट खोजें...",
      filterAll: "सभी",
      filterHigh: "उच्च जोखिम",
      filterMedium: "मध्यम जोखिम",
      filterLow: "कम जोखिम",
      reportButton: "स्कैम की रिपोर्ट करें",
      readMore: "और पढ़ें"
    },
    video: {
      title: "लर्निंग मॉड्यूल",
      subtitle: "इंटरैक्टिव पाठों के माध्यम से डिजिटल सुरक्षा में महारत हासिल करें",
      module1: "साइबर सुरक्षा मूल बातें",
      module2: "फ़िशिंग रोकथाम",
      module3: "सुरक्षित ऑनलाइन बैंकिंग",
      watchNow: "अभी देखें",
      completed: "पूर्ण"
    },
    quiz: {
      title: "सुरक्षा प्रश्नोत्तरी",
      subtitle: "डिजिटल धोखाधड़ी की रोकथाम पर अपने ज्ञान का परीक्षण करें",
      startQuiz: "प्रश्नोत्तरी शुरू करें",
      question: "प्रश्न",
      next: "अगला",
      submit: "जमा करें",
      scoreTitle: "आपका स्कोर",
      retake: "प्रश्नोत्तरी दोबारा लें"
    }
  },
  mr: {
    dashboard: {
      title: "डॅशबोर्ड",
      subtitle: "तुमचा आर्थिक सुरक्षा आढावा",
      securityScore: "सुरक्षा गुणांक",
      lessonsCompleted: "पूर्ण केलेले धडे",
      activeAlerts: "सक्रिय इशारे",
      quizAccuracy: "प्रश्नमंजुषा अचूकता",
      riskLevel: "धोक्याची पातळी",
      lowRisk: "कमी धोका",
      riskDesc: "तुमच्या हालचाली आणि जागरूकतेवर आधारित",
      weeklyProgress: "साप्ताहिक प्रगती",
      recentActivity: "अलीकडील क्रियाकलाप",
      phishing: "फिशिंग",
      upiFraud: "UPI फसवणूक",
      investmentScams: "गुंतवणूक घोटाळे",
      otpFraud: "OTP फसवणूक"
    },
    profile: {
      title: "प्रोफाईल आणि सेटिंग्ज",
      subtitle: "तुमची खाते प्राधान्ये व्यवस्थापित करा",
      personalInfo: "वैयक्तिक माहिती",
      fullName: "पूर्ण नाव",
      email: "ईमेल पत्ता",
      phone: "फोन नंबर",
      securitySettings: "सुरक्षा सेटिंग्ज",
      twoFactor: "टू-फॅक्टर ऑथेंटिकेशन",
      changePassword: "पासवर्ड बदला",
      notifications: "सूचना",
      emailAlerts: "ईमेल इशारे",
      smsAlerts: "SMS इशारे",
      pushNotifications: "पुश सूचना",
      saveChanges: "बदल जतन करा"
    },
    simulator: {
      title: "स्कॅम सिम्युलेटर",
      subtitle: "वास्तविक जगातील घोटाळे सुरक्षितपणे ओळखण्याचा सराव करा",
      phishing: "फिशिंग सेटअप",
      vishing: "विशिंग आव्हान",
      smishing: "SMS फसवणूक",
      upi: "UPI स्कॅन विनंती",
      score: "सिम्युलेशन गुणांक",
      analyzing: "विश्लेषण करत आहे...",
      markSafe: "सुरक्षित चिन्हांकित करा",
      markScam: "स्कॅम नोंदवा",
      nextScenario: "पुढील परिस्थिती"
    },
    alerts: {
      title: "फसवणूक इशारे",
      subtitle: "नवीनतम सुरक्षा धोके आणि सक्रिय घोटाळे",
      search: "इशारे शोधा...",
      filterAll: "सर्व",
      filterHigh: "उच्च धोका",
      filterMedium: "मध्यम धोका",
      filterLow: "कमी धोका",
      reportButton: "घोटाळ्याची नोंद करा",
      readMore: "अधिक वाचा"
    },
    video: {
      title: "लर्निंग मॉड्यूल्स",
      subtitle: "परस्परसंवादी धड्यांद्वारे डिजिटल सुरक्षा साध्य करा",
      module1: "सायबर सुरक्षा मूलभूत माहिती",
      module2: "फिशिंग प्रतिबंध",
      module3: "सुरक्षित ऑनलाइन बँकिंग",
      watchNow: "आता पहा",
      completed: "पूर्ण झाले"
    },
    quiz: {
      title: "सुरक्षा प्रश्नमंजुषा",
      subtitle: "डिजिटल फसवणूक प्रतिबंधावर आपल्या ज्ञानाची चाचणी घ्या",
      startQuiz: "प्रश्नमंजुषा सुरू करा",
      question: "प्रश्न",
      next: "पुढील",
      submit: "सबमिट करा",
      scoreTitle: "तुमचे गुण",
      retake: "प्रश्नमंजुषा पुन्हा घ्या"
    }
  },
  bn: {
    dashboard: {
      title: "ড্যাশবোর্ড",
      subtitle: "আপনার আর্থিক নিরাপত্তা ওভারভিউ",
      securityScore: "নিরাপত্তা স্কোর",
      lessonsCompleted: "সম্পন্ন পাঠ",
      activeAlerts: "সক্রিয় সতর্কতা",
      quizAccuracy: "কুইজ নির্ভুলতা",
      riskLevel: "ঝুঁকির স্তর",
      lowRisk: "কম ঝুঁকি",
      riskDesc: "আপনার কার্যকলাপ এবং সচেতনতার উপর ভিত্তি করে",
      weeklyProgress: "সাপ্তাহিক অগ্রগতি",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      phishing: "ফিশিং",
      upiFraud: "UPI জালিয়াতি",
      investmentScams: "বিনিয়োগ কেলেঙ্কারি",
      otpFraud: "OTP জালিয়াতি"
    },
    profile: {
      title: "প্রোফাইল ও সেটিংস",
      subtitle: "আপনার অ্যাকাউন্ট পছন্দ পরিচালনা করুন",
      personalInfo: "ব্যক্তিগত তথ্য",
      fullName: "পুরো নাম",
      email: "ইমেল ঠিকানা",
      phone: "ফোন নম্বর",
      securitySettings: "নিরাপত্তা সেটিংস",
      twoFactor: "টু-ফ্যাক্টর প্রমাণীকরণ",
      changePassword: "পাসওয়ার্ড পরিবর্তন করুন",
      notifications: "বিজ্ঞপ্তি",
      emailAlerts: "ইমেল সতর্কতা",
      smsAlerts: "SMS সতর্কতা",
      pushNotifications: "পুশ বিজ্ঞপ্তি",
      saveChanges: "পরিবর্তন সংরক্ষণ করুন"
    },
    simulator: {
      title: "স্ক্যাম সিমুলেটর",
      subtitle: "নিরাপদে বাস্তব বিশ্বের কেলেঙ্কারি চিহ্নিত করার অনুশীলন করুন",
      phishing: "ফিশিং সেটআপ",
      vishing: "ভিশিং চ্যালেঞ্জ",
      smishing: "SMS জালিয়াতি",
      upi: "UPI স্ক্যান অনুরোধ",
      score: "সিমুলেশন স্কোর",
      analyzing: "বিশ্লেষণ করা হচ্ছে...",
      markSafe: "নিরাপদ চিহ্নিত করুন",
      markScam: "স্ক্যাম রিপোর্ট করুন",
      nextScenario: "পরবর্তী দৃশ্যপট"
    },
    alerts: {
      title: "জালিয়াতি সতর্কতা",
      subtitle: "সর্বশেষ নিরপত্তা হুমকি এবং সক্রিয় কেলেঙ্কারি",
      search: "সতর্কতা অনুসন্ধান করুন...",
      filterAll: "সব",
      filterHigh: "উচ্চ ঝুঁকি",
      filterMedium: "মাঝারি ঝুঁকি",
      filterLow: "কম ঝুঁকি",
      reportButton: "স্ক্যাম রিপোর্ট করুন",
      readMore: "আরও পড়ুন"
    },
    video: {
      title: "লার্নিং মডিউল",
      subtitle: "ইন্টারেক্টিভ পাঠের মাধ্যমে ডিজিটাল নিরাপত্তা আয়ত্ত করুন",
      module1: "সাইবার নিরাপত্তা বেসিক",
      module2: "ফিশিং প্রতিরোধ",
      module3: "নিরাপদ অনলাইন ব্যাংকিং",
      watchNow: "এখনই দেখুন",
      completed: "সম্পন্ন"
    },
    quiz: {
      title: "নিরাপত্তা কুইজ",
      subtitle: "ডিজিটাল জালিয়াতি প্রতিরোধে আপনার জ্ঞান পরীক্ষা করুন",
      startQuiz: "কুইজ শুরু করুন",
      question: "প্রশ্ন",
      next: "পরবর্তী",
      submit: "জমা দিন",
      scoreTitle: "আপনার স্কোর",
      retake: "কুইজ আবার নিন"
    }
  }
};

const localesDir = 'c:\\\\Users\\\\mgopa\\\\OneDrive\\\\Desktop\\\\Securofy MERN\\\\src\\\\locales';

Object.keys(translations).forEach(lang => {
  const filePath = `${localesDir}\\\\${lang}.json`;
  let existing = {};
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  // Merge keys preserving nested structures!
  // But wait, the previous structure might have overlapping keys.
  // dashboard already exists in "en.json".
  Object.keys(translations[lang]).forEach(key => {
    existing[key] = { ...existing[key], ...translations[lang][key] };
  });
  
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`Updated ${lang}.json`);
});
