/**
 * Localization constants & helpers for FORGE Egypt (مصر)
 */

export const CURRENCY_CODE = 'EGP';
export const CURRENCY_SYMBOL = 'EGP';
export const CURRENCY_ARABIC = 'ج.م';

/**
 * Format a number as Egyptian Pounds (e.g. "12,450 EGP")
 */
export const formatEGP = (amount: number, includeDecimals = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return `0 ${CURRENCY_CODE}`;
  }
  
  const formatted = amount.toLocaleString('en-EG', {
    minimumFractionDigits: includeDecimals ? 2 : (amount % 1 !== 0 ? 2 : 0),
    maximumFractionDigits: 2,
  });

  return `${formatted} ${CURRENCY_CODE}`;
};

/**
 * Egyptian Governorates (محافظات مصر)
 */
export const EGYPT_GOVERNORATES = [
  'Cairo (القاهرة)',
  'Giza (الجيزة)',
  'Alexandria (الإسكندرية)',
  'Qalyubia (القليوبية)',
  'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)',
  'Dakahlia (الدقهلية)',
  'Gharbia (الغربية)',
  'Menofia (المنوفية)',
  'Beheira (البحيرة)',
  'Damietta (دمياط)',
  'Port Said (بورسعيد)',
  'Ismailia (الإسماعيلية)',
  'Suez (السويس)',
  'Kafr El Sheikh (كفر الشيخ)',
  'Fayoum (الفيوم)',
  'Beni Suef (بني سويف)',
  'Minya (المنيا)',
  'Asyut (أسيوط)',
  'Sohag (سوهاج)',
  'Qena (قنا)',
  'Luxor (الأقصر)',
  'Aswan (أسوان)',
  'Red Sea - Hurghada / Ain Sokhna (البحر الأحمر - الغردقة / العين السخنة)',
  'South Sinai - Sharm El Sheikh (جنوب سيناء - شرم الشيخ)',
  'North Sinai (شمال سيناء)',
  'Matruh - North Coast (مطروح - الساحل الشمالي)',
  'New Valley (الوادي الجديد)',
];

/**
 * Popular Industrial and Commercial Cities/Districts in Egypt
 */
export const EGYPTIAN_CITIES_SUGGESTIONS: Record<string, string[]> = {
  'Cairo (القاهرة)': [
    'New Cairo / 5th Settlement (القاهرة الجديدة / التجمع)',
    'Nasr City (مدينة نصر)',
    'Helwan Industrial Zone (حلوان الصناعية)',
    'Maadi (المعادي)',
    'Heliopolis (مصر الجديدة)',
    'Shubra El Kheima (شبرا الخيمة)',
    'El Basatin Industrial (البساتين الصناعية)',
    'Badr City Industrial (مدينة بدر الصناعية)',
    '15th of May City (مدينة 15 مايو)'
  ],
  'Giza (الجيزة)': [
    '6th of October Industrial Zones 1-6 (السادس من أكتوبر)',
    'Sheikh Zayed (الشيخ زايد)',
    'Abu Rawash Industrial Zone (أبو رواش الصناعية)',
    'Mohandessin (المهندسين)',
    'Dokki (الدقي)',
    'Al Haram / Faisal (الهرم / فيصل)',
    'Al Hawamdiya (الحوامدية)'
  ],
  'Sharqia - 10th of Ramadan (الشرقية - العاشر من رمضان)': [
    '10th of Ramadan - Heavy Industrial Area A1-A4 (العاشر من رمضان)',
    '10th of Ramadan - Zone B1-B4',
    'Zagazig (الزقازيق)',
    'Belbeis (بلبيس)'
  ],
  'Alexandria (الإسكندرية)': [
    'Borg El Arab Industrial City (برج العرب الصناعية)',
    'Smouha (سموحة)',
    'Mansheya (المنشية)',
    'El Dekheila / Amreya (الدخيلة / العامرية)',
    'Sidi Gaber (سيدي جابر)',
    'Miami / Montazah (ميامي / المنتزه)'
  ]
};
