import User from "../models/user.model.js";

// Sidebar'da (sol menüde) gösterilecek kullanıcıları getirir
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Giriş yapmış olan kullanıcının ID'sini alır

    // Giriş yapmış kullanıcı haricindeki tüm kullanıcıları bulur
    // ".select('-password')" => şifre bilgisini dışarıda bırakır
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers); // Kullanıcı listesini frontend'e gönderir
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message); // Hata oluşursa terminale yazdırır
    res.status(500).json({ error: "Internal server error" }); // Sunucu hatası durumunda mesaj döner
  }
};
