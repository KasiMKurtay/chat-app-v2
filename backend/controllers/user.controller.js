import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; //req.user bilgisinden oturum açmış kullanıcının kimliğini (_id) alır. Bu bilgi, protectRouter tarafından eklenir

    //Bu değişken sorgu sonucunda dönen kullanıcı listesini içerir
    const filteredUsers = await User.find({
      //Veritabanından id alanı loggedInUserId'ye eşit olmayan tüm kullanıları bulur
      _id: { $ne: loggedInUserId },
      //Yani giriş yapmamış kullanıcı hariç tüm kullanıclar seçilir
    }).select("-password");
    //Seçilen kullanıcıların şifresi hariç diğer bilgileri döner

    //Filtrelenmiş kullanıcı listesini JSON formatında yanıt olarak döner
    res.status(200).json( filteredUsers );
  } catch (error) {
    console.error("Error in getUsersForSideBar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};