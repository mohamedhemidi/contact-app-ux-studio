interface Props {
  label?: string;
  icon?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Button = ({ label, onClick, icon }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-2 ${
        label ? "pt-2 pr-4 pb-2 pl-3" : "w-10 h-10 justify-center items-center"
      } rounded-lg bg-btnPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryPressed text-white cursor-pointer`}
    >
      {icon ? <img className="w-6 h-6" src={icon} /> : null}
      {label}
    </div>
  );
};

export default Button;
