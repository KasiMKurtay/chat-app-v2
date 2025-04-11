import { create } from "zustand"; 

const useConversation = create((set) => ({
  // 'useConversation' adında bir store oluşturulur ve 'set' fonksiyonu kullanılarak store'daki veriler güncellenebilir.
  selectedConversation: null, // Başlangıçta, seçilen konuşma 'null' olarak ayarlanır.
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }), // Seçilen konuşmayı güncelleyen bir fonksiyon.
  messages: [], // Başlangıçta, mesajlar boş bir dizi olarak ayarlanır.
  setMessages: (messages) => set({ messages }), // Mesajları güncelleyen bir fonksiyon.
}));

export default useConversation; 
