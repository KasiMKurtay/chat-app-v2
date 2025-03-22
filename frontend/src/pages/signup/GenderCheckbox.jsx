import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex"> {/*Checkbox'lar yataya dizildi */}
      <div className="form-control"> {/*Erkek Checkbox'ını saran div */}
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selectedd" : "" //Eğer "male" seçiliyse ek CSS sınıfı eklenir
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"} //Seçili ecinsiyet "male" ise checkbox işareti eklenir
            onChange={() => onCheckboxChange("male")} //Tıklandığında erkek olarak cinsiyet ayarlanır
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selectedd" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
