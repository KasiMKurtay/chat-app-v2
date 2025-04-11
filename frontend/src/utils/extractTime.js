export function extractTime(dateString) {
  // Tarih string'ini alır, bunu Date nesnesine dönüştürür.
  const date = new Date(dateString);
  const hours = padZero(date.getHours()); // Saat bilgisini alır ve 2 haneli yapmak için padZero fonksiyonu ile formatlar.
  const minutes = padZero(date.getMinutes()); // Dakika bilgisini alır ve 2 haneli yapmak için padZero fonksiyonu ile formatlar.
  return `${hours}:${minutes}`; // Formatlanmış saat ve dakika değerlerini döndürür.
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  // Tek haneli sayıları "0" ile başlatan yardımcı fonksiyon.
  return number.toString().padStart(2, "0");
}
