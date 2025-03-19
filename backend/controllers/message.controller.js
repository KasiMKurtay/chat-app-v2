import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; //HTTP isteği ile gönderilen verileri tutar. Kullanıcının gönderdiği mesajı vbu veriden alır ve message değişkenine atar
    const { id: receiverId } = req.params; //URL'de tanımlı olan id'yi alır ve onu receiverID olarak yeniden adlandırarak değişkene atar, Alıcıya ait ID burada alnır
    const senderId = req.user._id; //Aktif olan kullanıcıya ait bilgileri içerir yani mesajı gönderen kişinin ID'si buradan alınır

    //Conversation.findOne : veritabanında, gönderen ve alıcının katılımcı olduğu sohbet arar
    let conversation = await Conversation.findOne({
      //participants: { $all: [senderId, receiverId] }: Hem gönderen hem de alıcının katılımcı olduğu sohbeti bulur
      participants: { $all: [senderId, receiverId] },
    });

    //Eğer böyle bir sohbet yoksa yeni bir sohbet oluşturur
    if (!conversation) {
      //Yeni bir sohbet belgesi oluşturur ve veritabanına kaydeder
      conversation = await Conversation.create({
        //Gönderen ve alıcıyı katılımcı olarak ekler
        participants: [senderId, receiverId],
      });
    }

    //Yeni bir mesaj belgesi oluşturur, Bu belge, (senderId) , (receiverId) ve message içeriğini içerir
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //Eğer yeni mesaj başarıyla oluşturulduysa bu mesajın kimliğini messages kısmına ekler
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Altta bulunan iki kod aynı anda çalışmaz çünkü üstten aşşağı doğru okur
    //await conversation.save();
    //await newMessage.save();

    // Ama bu kod yapısı aynı anda çalışır
    await Promise.all([conversation.save(), newMessage.save()]);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    res.status(200).json(conversation.messages);

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
