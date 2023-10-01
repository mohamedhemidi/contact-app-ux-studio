type Props = {
  children: React.ReactNode;
  title?: string;
  side: "left" | "right" | "center";
};
const Side = {
  left: "end",
  right: "start",
  center: "between",
};
const Header = ({ children, title, side }: Props) => {
  return (
    <div
      className={`flex gap-4 flex-col md:flex-row justify-${Side[side]} items-center h-full p-3`}
    >
      {title ? (
        <h1 className="font-glysa text-white text-headlineOne">{title}</h1>
      ) : null}
      <div className="flex flex-row gap-6">{children}</div>
    </div>
  );
};

export default Header;
