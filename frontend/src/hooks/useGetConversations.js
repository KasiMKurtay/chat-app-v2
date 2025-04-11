import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  // useGetConversations custom hook'u oluşturuyoruz
  const [loading, setLoading] = useState(false); // loading state'ini, API çağrısının durumunu takip etmek için tanımlıyoruz
  const [conversations, setConversations] = useState([]); // conversations state'ini, gelen konuşmaların listesini saklamak için tanımlıyoruz

  useEffect(() => {
    // Component yüklendiğinde API çağrısı yapmak için useEffect kullanıyoruz
    const getConversations = async () => {
      // asenkron bir fonksiyon oluşturuyoruz
      setLoading(true); // API çağrısına başlamadan önce loading durumunu true yapıyoruz
      try {
        const res = await fetch("/api/users"); // '/api/users' endpoint'ine GET isteği gönderiyoruz
        const data = await res.json(); // Gelen cevabı JSON formatında parse ediyoruz
        if (data.error) {
          // Eğer bir hata varsa
          throw new Error(data.error); // Hata fırlatıyoruz
        }
        setConversations(data); // Veriyi state'e kaydediyoruz
      } catch (error) {
        // Eğer bir hata oluşursa
        toast.error(error.message); // Hata mesajını toast ile gösteriyoruz
      } finally {
        setLoading(false); // Hata ya da başarılı sonuç fark etmeksizin loading durumunu false yapıyoruz
      }
    };

    getConversations(); // getConversations fonksiyonunu çağırıyoruz
  }, []); // useEffect yalnızca component ilk render olduğunda çalışacak, boş array bağımlılığı ile

  return { loading, conversations }; // loading ve conversations state'lerini döndürüyoruz
};
export default useGetConversations;
