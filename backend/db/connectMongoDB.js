import mongoose from "mongoose";

const connectMongoDB = async() => {//asenkron bir fonksiyon tanımlıyoruz
  try {
    await mongoose.connect(process.env.MONGODB_URI)//MongoDB veritabanına bağlanır. Bağlantı için proccess.env.MONGODB_URI değişkeni kullanılır
    console.log("Connected to MongoDB");//Bağlantı başarılı olduğunda bu mesaj yazar
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
}

export default connectMongoDB