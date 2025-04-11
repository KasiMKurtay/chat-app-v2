import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  // useLogout custom hook'unu oluşturuyoruz
  const [loading, setLoading] = useState(false); // loading state'i oluşturuyoruz, başlangıçta false
  const { setAuthUser } = useAuthContext(); // AuthContext'ten setAuthUser fonksiyonunu alıyoruz

  const logout = async () => {
    // logout fonksiyonunu oluşturuyoruz
    setLoading(true); // Yükleniyor durumuna geçiyoruz
    try {
      const res = await fetch("/api/auth/logout", {
        // API'ye logout isteği gönderiyoruz
        method: "POST", // POST isteği yapıyoruz
        headers: { "Content-Type": "application/json" }, // JSON formatında veri gönderdiğimizi belirtiyoruz
      });
      const data = await res.json(); // API'den gelen yanıtı JSON formatında alıyoruz
      if (data.error) {
        // Eğer hata varsa
        throw new Error(data.error); // Hata mesajını fırlatıyoruz
      }

      localStorage.removeItem("chat-user"); // LocalStorage'dan kullanıcı bilgisini siliyoruz
      setAuthUser(null); // AuthContext'teki setAuthUser ile kullanıcıyı null yapıyoruz (çıkış yapmış oluyoruz)
    } catch (error) {
      toast.error(error.message); // Hata durumunda toast ile hata mesajı gösteriyoruz
    } finally {
      setLoading(false); // İşlem bitince loading durumunu false yapıyoruz
    }
  };

  return { loading, logout }; // loading durumunu ve logout fonksiyonunu dışa aktarıyoruz
};

export default useLogout;
