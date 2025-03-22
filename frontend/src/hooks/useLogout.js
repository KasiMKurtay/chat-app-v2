import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  //Çıkış işlemi yapılırken kullanıcıya "yükleniyor" göstermek için kullanılacak başlangıçta false
  const { setAuthUser } = useAuthContext();
  //Bu fonksiyon kullanıcı bilgilerini null yaparak, oturum kapandıktan sonra uygulamanın geri kalanında kullanıcı bilgilerini sıfırlama yarar

  const logout = async () => {
    setLoading(true); //Çıkış işlemi başladığında yükleniyor durumu başlatır
    try {
      const res = await fetch("/api/auth/logout", {
        //sunucuya POST isteği gönderiyoruz.
        method: "POST", //Kullanıcıya çıkış yaptırmka için backend API'ına yapılır
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json(); //Gelen yanıtı JSON formatında işlenir
      if (data.error) {
        //Eğer API'dan hata dönerse
        throw new Error(data.error); //Hata fırlatırı
      }
      localStorage.removeItem("chat-user"); //Kullanıcı çıkışı yaptıktan sonra, tarayıcıda saklanan kullanıcı verisi silinir
      setAuthUser(null); //Kullanıcı bilgileri sıfırlanır, yani kullanıcı çıkış işlemini gerçekleştirmiş olur
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout }; //loading ve logout fonksiyonunu dışarı geri döndürüyoruz, bu sayede bu custom hook'u kullanan component'larda hem loading hem logout kullanılabilir
};

export default useLogout;
