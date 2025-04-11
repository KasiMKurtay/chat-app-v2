import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  // useGetMessages custom hook'u oluşturuyoruz
  const [loading, setLoading] = useState(false); // loading state'ini, API çağrısının durumunu takip etmek için tanımlıyoruz
  const { messages, setMessages, selectedConversation } = useConversation(); // Zustand store'dan messages, setMessages ve selectedConversation'ı alıyoruz

  useEffect(() => {
    // Component yüklendiğinde selectedConversation'a göre mesajları almak için useEffect kullanıyoruz
    const getMessages = async () => {
      // asenkron bir fonksiyon oluşturuyoruz
      setLoading(true); // API çağrısına başlamadan önce loading durumunu true yapıyoruz
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`); // Seçilen konuşmanın mesajlarını almak için API isteği gönderiyoruz
        const data = await res.json(); // Gelen cevabı JSON formatında parse ediyoruz
        if (data.error) throw new Error(data.error); // Eğer hata varsa, hata fırlatıyoruz
        setMessages(data); // Mesajları Zustand store'a kaydediyoruz
      } catch (error) {
        // Eğer bir hata oluşursa
        toast.error(error.message); // Hata mesajını toast ile gösteriyoruz
      } finally {
        setLoading(false); // Hata ya da başarılı sonuç fark etmeksizin loading durumunu false yapıyoruz
      }
    };

    if (selectedConversation?._id) getMessages(); // Eğer selectedConversation varsa, getMessages fonksiyonunu çağırıyoruz
  }, [selectedConversation?._id, setMessages]); // selectedConversation değiştiğinde API çağrısı yapılacak

  return { messages, loading }; // messages ve loading state'lerini döndürüyoruz
};
export default useGetMessages;
