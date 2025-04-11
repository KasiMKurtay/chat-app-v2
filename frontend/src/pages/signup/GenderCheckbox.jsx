const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  // GenderCheckbox bileşeni, selectedGender ve onCheckboxChange props'ları alır

  return (
    <div className="flex">
      {/* İki kutuyu yatayda göstermek için flex kullanılıyor */}

      <div className="form-control">
        {/* Male seçeneği */}
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            // Eğer selectedGender 'male' ise, checkbox işaretli olacak
            onChange={() => onCheckboxChange("male")}
            // Checkbox değiştiğinde, onCheckboxChange fonksiyonu çağrılır ve 'male' değeri gönderilir
          />
        </label>
      </div>
      <div className="form-control">
        {/* Female seçeneği */}
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            // Eğer selectedGender 'female' ise, checkbox işaretli olacak
            onChange={() => onCheckboxChange("female")}
            // Checkbox değiştiğinde, onCheckboxChange fonksiyonu çağrılır ve 'female' değeri gönderilir
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
