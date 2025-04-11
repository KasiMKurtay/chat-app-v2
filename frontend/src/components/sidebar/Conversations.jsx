import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations(); // Sohbetleri ve yükleme durumunu alır.

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Sohbetler listesi */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id} // Her bir sohbet için benzersiz anahtar
          conversation={conversation} // Sohbet verisi
          emoji={getRandomEmoji()} // Rastgele bir emoji
          lastIdx={idx === conversations.length - 1} // Son sohbet olup olmadığını kontrol eder
        />
      ))}
      {/* Yükleme durumu */}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}{" "}
      {/* Eğer yükleme durumundaysa, yükleme simgesi gösterir */}
    </div>
  );
};
export default Conversations;