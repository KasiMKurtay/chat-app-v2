import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    //Bu fonksiyon, giriş yapmak için kullanıcı adı ve şifre alır, ardından belirtilen API'ye istek gönderir
    const success = handleInputErrors(username, password);
    //Bu fonksiyon, kullanıcı adı ve şifrenin geçerliliğini kontrol eder eğer eksik alan varsa veya şifre 6 karakterden kısaysa bi hata mesajı döndürür

    if (!success) return; //Doğrulamadan geçerse true döner ve işleme devam edilir
    setLoading(true); //Eğer form doğruysa kullanıcıya bir yükleniyor durumu göstermek için loading durumu true yapılır
    try {
      const res = await fetch("/api/auth/login", {
        //
        method: "POST", //HTTP metodunu post olarak belirliyoruz çünkü yeni bir kullanıcı girişi yapmak istiyoruz
        headers: { "Content-Type": "application/json" }, //Gönderilen verinin JSON formatında olduğunu belirtiyoruz
        body: JSON.stringify({ username, password }), //Kullanıcı adı ve şifreyi bir JSON string'e dönüştürerek body içinde API'ye gönderiyoruz
      });
      const data = await res.json(); //API'den gelen yanıt JSON formatında alınır ve data değişkenine kaydedilir

      if (data.error) {
        //Eğer API'den dönen data içinde bir error varsa Error nesnesi frılatıulır
        throw new Error(data.error); //Burada fırlatılan hata try-catch bloğunda yakalanacak ve kullanıcıya gösterilecektir
      }

      localStorage.setItem("chat-user", JSON.stringify(data)); //Eğer giriş başarılıysa kullanıcı bilgileri localStorage'a kaydedilir
      //Sayfa yenilendiğinde bile kullanıcının bilgilerini tutmak için yapılır
      setAuthUser(data); //AuthContext güncellenir oturum açan kullanıcının bilgilerini AuthContext'a aktarır, böylece uygulamanın her yerinden erişilebilir olur
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors( username, password ) {
  if (!username || !password) {
    //Eğer kullanıcı adı veya şifre boşsa bir hata döndürülür
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    //Şifre 6 haneden kısaysa hata döndürür
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true; //Eğer her şey doğruysa true döner
}
