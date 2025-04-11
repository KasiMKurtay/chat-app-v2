import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // signup fonksiyonu, kullanıcı kaydı için gerekli işlemleri yapacak
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    }); // Giriş verilerinin doğruluğunu kontrol ediyoruz
    if (!success) return; // Eğer doğrulama başarısızsa işlem duruyor

    setLoading(true); // Yükleniyor durumuna geçiyoruz
    try {
      const res = await fetch("/api/auth/signup", {
        // Backend'e yeni kullanıcıyı kaydetmek için POST isteği gönderiyoruz
        method: "POST", // POST metodunu kullanıyoruz
        headers: { "Content-Type": "application/json" }, // JSON formatında veri gönderdiğimizi belirtiyoruz
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }), // Kullanıcı verilerini JSON formatında gönderiyoruz
      });

      const data = await res.json(); // API'den gelen yanıtı JSON formatında alıyoruz
      if (data.error) {
        throw new Error(data.error); // Eğer bir hata varsa, hata fırlatıyoruz
      }
      localStorage.setItem("chat-user", JSON.stringify(data)); // Kullanıcı verilerini localStorage'a kaydediyoruz
      setAuthUser(data); // Kullanıcıyı auth context'e set ediyoruz
    } catch (error) {
      toast.error(error.message); // Hata durumunda toast ile hata mesajı gösteriyoruz
    } finally {
      setLoading(false); // İşlem bitince loading durumunu false yapıyoruz
    }
  };

  return { loading, signup }; // signup fonksiyonunu ve loading durumunu dışa aktarıyoruz
};

export default useSignup; // useSignup hook'unu dışa aktarıyoruz

// Kullanıcı giriş verilerini kontrol etmek için yardımcı bir fonksiyon
function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    // Gerekli alanların doldurulup doldurulmadığını kontrol ediyoruz
    toast.error("Please fill in all fields"); // Eğer bir alan eksikse hata mesajı gösteriyoruz
    return false;
  }

  if (password !== confirmPassword) {
    // Şifre ile onay şifresinin eşleşip eşleşmediğini kontrol ediyoruz
    toast.error("Passwords do not match"); // Şifreler uyuşmazsa hata mesajı gösteriyoruz
    return false;
  }

  if (password.length < 6) {
    // Şifrenin en az 6 karakter uzunluğunda olup olmadığını kontrol ediyoruz
    toast.error("Password must be at least 6 characters"); // Şifre kısa ise hata mesajı gösteriyoruz
    return false;
  }

  return true; // Eğer tüm doğrulamalar başarılıysa true döndürüyoruz
}
