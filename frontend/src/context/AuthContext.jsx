import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
//React'in Context API'sini kullanarak bir context nesnesi oluşturuluyor
//Veri sağlayıcı olarak işlev görecek. Burada oluşturulan authCOntext kimlik doğrulama bilgilerini tutmak için kullanılacak (örnek olrak, giriş yapan kullanıcı bilgileri)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
  //useAuthContext: özel bir hooktur ve useContext hook'unu kullanarak AuthCntext'e erişim sağlar.
  //useContext(authContext):React'in context API'si ile sağlanan AuthContext'in değerine erişmeyi sağlar. Yani, Uygulamanın herhangi bir yerinden bu hook kullanılarak authUser ve setAuthUser'a erişilebilir
};

export const AuthContextProvider = ({ children }) => {
  //AuthContextProvider : AuthContext'i sağlayan bir component'tir. children props'u component'in etrafında sarılacak diğer tüm component'leri temsil eder
  const [authUser, setAuthUser] = useState(
    //authUser: Griş yapmış kullanıcının bilgilerini tutan state'dir. Başlagınçta eğer kullancı giriş yapmışsa ve bilgileri localStorage'de saklanmışsa bu bilgiyi alırız ve JSON.parse(localStorage.getItem("chat-user")) ile saklanan kullanıcı bilgilerini okuruz eğer giriş yapmamışsa null değeri kullanılır
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {/*AuthContext.Provider: AuthContext'i sağlamak için kullanılır. value props'u ile authUser ve setAuthUser'ı tüm alt componentlere sağlar. Böylece , bu provider'ın sarıldığı component'lerin her biri authUser ve setAuthUser'a erişebilir */}
      {children}
      {/*Burada children props'u AuthContextProivder component'inin içnerisine yerleştirilen tüm diğer component'leri temsil eder. Bu sayede, AuthContextProvider component'i etrafındaki tüm component'ler authUser ve setAuthUser'ı kullanabilir */}
    </AuthContext.Provider>
  );
};

//ÖZETLE,
//Bu yapı bir authentication yönetimi sağlar. Uygulama genelinde kullanıcı bilgilerini yönetmek için Context API kullanılır.
//AuthCOntext ile kimlik doğrulama verisi sağlanır
//useAuthContext hook'u ile her yerde bu verilere erişilebilir
//AuthContextProvider component'i ile bu veriler bir üst component'ten tüm alt component'lara aktarılır

//Böylece , örneğin bir giriş işleminde başarılı olursanız kullanıcı bilgilerini localStorage'a kaydedebilir ve bu bilgiyi AuthContext'te saklayarak tüm component'ler aracılığı ile erişebilirsiniz
