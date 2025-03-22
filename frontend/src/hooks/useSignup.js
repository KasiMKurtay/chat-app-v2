import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  //Yüklenme durumunu kontrol eder form gönderilirken true olur
  const { authUser, setAuthUser } = useAuthContext();
  //Kullanıcı bilgisine erişir giriş yapınca bu güncellenir

  const signup = async ({
    //Parametere olarak tüm from verilerini alıyor
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      //form verileri eksik mi şifreler uyuşuyor mu gibiş kontroller yapılıur varsa hata toast.error ile gösterilir devam edilmez
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    //İşlem başladığı için loading durumu true olur
    try {
      const res = await fetch("/api/auth/signup", {
        //fetch ile sunucuya istek atıyoruz
        method: "POST", //veri gönderiyoruz
        headers: { "Content-Type": "application/json" }, //JSON formatında yollayağımızı belirtiyoruz
        body: JSON.stringify({
          //Formdan gelen verileri JSON'a çevirip gönderiyoruz
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json(); //Sunucu cevap verir biz bu cevabı alırız.

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      //Kayıt başarılı ise, kullanıcı bilgilerini localStorage'a kaydediyoruz
      //Böylece sayfa yenilendiğinde bile kullanıcı bilgileri korunur

      setAuthUser(data);
      //Context'teki authUser bilgilerini güncelliyoruz
      //Uygulama genelinde kullanıcı giriş yapmış olur
      if (res.ok) {
        toast.success("Signup successful!");
        //Eğer kayıt işlemi başarılıysa (res.ok true) > yeşil bildirim
      } else {
        toast.error(data.message || "Signup failed"); //değilse kırmızı bildirim
      }
    } catch (error) {
      toast.error(error.message); //fetch sırasında hata olursa, buraya düşeriz
    } finally {
      setLoading(false); //İşlem bittiğinde (başarılı ya da hatalı),loading tekrar false yapılır
    }
  };

  return { loading, signup };
  //loading: Buton durumu için
  //Signup : Form gönderme işlemi için
};

export default useSignup;

function handleInputErrors({
  //Input verilerini kontrol eder
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  //Eğer herhangi bir alan boşsa kullancıya hata gösterilir
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
    //Fonksiyon false döner
  }
  if (password !== confirmPassword) {
    //Şifreler eşleşmiyosa hata verilir
    toast.error("Passwords do not match");
    return false; //İşlem durur
  }
  if (password.length < 6) {
    //Şifre 6 karakterden kısaysa hata verir
    toast.error("Password must be at least 6 characters");
    return false; //İşlem durur
  }
  return true; //Eğer her şey doğruysa true döner
}
