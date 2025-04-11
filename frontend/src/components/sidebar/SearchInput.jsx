import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState(""); // Arama terimi için durum yönetimi.
  const { setSelectedConversation } = useConversation(); // Seçilen konuşmayı ayarlamak için hook.
  const { conversations } = useGetConversations(); // Konuşmaları almak için hook.

  // Arama işlemi gerçekleştiren fonksiyon.
  const handleSubmit = (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engeller.
    if (!search) return; // Arama terimi boşsa işlem yapılmaz.
    if (search.length < 3) {
      // Arama terimi 3 karakterden kısa olursa uyarı gösterilir.
      return toast.error("Search term must be at least 3 characters long");
    }

    // Konuşmalar arasında arama yapılır.
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation); // Bulunan konuşma seçilir.
      setSearch(""); // Arama alanı sıfırlanır.
    } else toast.error("No such user found!"); // Kullanıcı bulunamazsa hata mesajı gösterilir.
  };

  // Bileşenin JSX yapısı.
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…" // Arama alanı için placeholder.
        className="input input-bordered rounded-full" // Stil sınıfları.
        value={search} // Arama terimini state'den alır.
        onChange={(e) => setSearch(e.target.value)} // Kullanıcı her yazdıkça arama terimi güncellenir.
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" /> {/* Arama ikonu */}
      </button>
    </form>
  );
};
export default SearchInput;
