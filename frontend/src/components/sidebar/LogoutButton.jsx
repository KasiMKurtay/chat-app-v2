import { BiLogOut } from "react-icons/bi"; 
import useLogout from "../../hooks/useLogout";  
const LogoutButton = () => {
	const { loading, logout } = useLogout();  // useLogout hook'undan loading ve logout işlevini alır.

	return (
		<div className='mt-auto'>  {/* Bu div, butonun alt kısmında görünmesini sağlar. */}
			{/* Eğer çıkış işlemi yapılırken yükleniyorsa, loading spinner gösterir */}
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />  // Çıkış simgesine tıklandığında logout fonksiyonunu çalıştırır.
			) : (
				<span className='loading loading-spinner'></span>  // Yükleme simgesi, çıkış işlemi yapılıyorken gösterilir.
			)}
		</div>
	);
};

export default LogoutButton;  
