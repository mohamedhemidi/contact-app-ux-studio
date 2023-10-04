interface Props {
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, onChange, value }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-white font-lexend">{label}</div>
      <input
        className="outline-none border border-[#282828] hover:border-[#373737] rounded-lg bg-[#1E1E1E] focus:bg-[#414141] focus:border-[#414141] placeholder:opacity-[32%] text-white pt-2 pr-3 pb-2 pl-3"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
