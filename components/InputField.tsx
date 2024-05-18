import { InputFieldType } from "@/utils/types";

const InputField = ({ name, type }: InputFieldType) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-text-color-100 capitalize">
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={`Enter your ${name}`}
        className="p-1 pl-2 bg-[#1D2432] border-2 border-[#343A47] rounded-md focus:outline-none placeholder:text-sm text-text-color-100 focus:border-[#6366F1]"
        required
      />
    </div>
  );
};
export default InputField;
