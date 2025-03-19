import User from "../models/user.model.js"; //Kullanıcı modelini içe aktarır
import bcrypt from "bcryptjs"; //Şifreleri hashlemek için kullanılır
import generateToken from "../utils/generateToken.js"; //Token oluşturmak için kullanılır, kimlik doğrulamak için kullanlır

export const signup = async (req, res) => {
  //Signup işlemini yönetem asenkron fonksiyon tanımlar
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body; //Kullanıcı bilgilerini alır, kullanıcının kayıt formunda girdiği verilerdir

    if (password !== confirmPassword) {
      //Şifre ve şifre onayını eşleşip eşleşmediği kontrolü sağlanıyor
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username }); //veritabanında aynı userName'e sahip biri var mı diye kontrol sağlanıyor

    if (user) {
      return res.status(400).json({ error: "Username already exists" }); //Eğer aynı id'ye sahip birisi varsa hata mesajı dönüyor
    }

    const salt = await bcrypt.genSalt(10); //Şifreyi hasliyoruz, şirenin daha güvenli olmasını sağlar

    const hashedPassword = await bcrypt.hash(password, salt); //Kullanıcının şifresini, oluşturulan ssalt ile birlikte hash'ler ve güvenli şekilde saklar

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`; //Kullanıcının icnsiyetine göre profil resmi URL'si oluşturur

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      //Yeni bir kullanıcı oluşturuyoruz.Nesne'de kullanıcının bilgilerini ve hashlenmiş şifresini içeriyor
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res); //Kullanıcının kimliğinie id kullanalark JWT token oluşturuyoruz.

      await newUser.save(); //Yeni kullanıcıyı veritabanına kaydediyoruz

      res.status(201).json({
        //Yanıt kaydedilen kullanıcı bilgilerini içerir
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" }); //Eğer kullanıcı verileri geçersizse hata mesajı döner
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
