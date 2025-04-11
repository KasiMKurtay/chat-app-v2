import { useState } from "react";
import toast from "react-hot-toast"; 
import { useAuthContext } from "../context/AuthContext"; 
const useLogin = () => {
  // useLogin custom hook'unu oluşturuyoruz
  const [loading, setLoading] = useState(false); // loading state'i oluşturuyoruz, başlangıçta false
  const { setAuthUser } = useAuthContext(); // AuthContext'ten setAuthUser fonksiyonunu alıyoruz

  const login = async (username, password) => {
    // login fonksiyonu oluşturuyoruz, async olmalı çünkü API çağrısı yapacağız
    const success = handleInputErrors(username, password); // input hatalarını kontrol ediyoruz
    if (!success) return; // Eğer input hatalıysa, işlemi durduruyoruz
    setLoading(true); // Yükleniyor durumuna geçiyoruz

    try {
      const res = await fetch("/api/auth/login", {
        // API'ye login isteği gönderiyoruz
        method: "POST", // POST isteği yapıyoruz
        headers: { "Content-Type": "application/json" }, // JSON formatında veri göndereceğimizi belirtiyoruz
        body: JSON.stringify({ username, password }), // Username ve password'u JSON formatında gönderiyoruz
      });

      const data = await res.json(); // API'den gelen yanıtı JSON formatında alıyoruz
      if (data.error) {
        // Eğer hata varsa
        throw new Error(data.error); // Hata mesajını fırlatıyoruz
      }

      localStorage.setItem("chat-user", JSON.stringify(data)); // Kullanıcı bilgisini localStorage'a kaydediyoruz
      setAuthUser(data); // AuthContext'teki setAuthUser ile global state'i güncelliyoruz
    } catch (error) {
      toast.error(error.message); // Hata durumunda toast ile hata mesajı gösteriyoruz
    } finally {
      setLoading(false); // İşlem bitince loading durumunu false yapıyoruz
    }
  };

  return { loading, login }; // loading durumunu ve login fonksiyonunu dışa aktarıyoruz
};

export default useLogin; // useLogin hook'unu dışa aktarıyoruz

function handleInputErrors(username, password) {
  // Input doğrulama fonksiyonu
  if (!username || !password) {
    // Eğer kullanıcı adı ya da şifre boşsa
    toast.error("Please fill in all fields"); // Hata mesajı gösteriyoruz
    return false; // Hatalı giriş
  }

  return true; // Giriş doğru
}
