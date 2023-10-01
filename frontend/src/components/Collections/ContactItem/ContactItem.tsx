import Timothy from "../../../assets/images/Timothy.png";
import Mute from "../../../assets/icons/svg/Mute.svg";
import Call from "../../../assets/icons/svg/Call.svg";
import More from "../../../assets/icons/svg/More.svg";
import { useEffect, useState, useRef } from "react";
import { ButtonSecondary } from "../../Core/Button";
import { Dropdown } from "../Dropdown";

const ContactItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef(document.createElement("div"));

  useEffect(() => {
    let handler = (e: any) => {
      if (open && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div
        ref={dropdownRef}
        className="group flex flex-row justify-between items-center relative mb-12"
      >
        <div className="flex flex-row gap-4 items-center">
          <div>
            <img className="w-10 h-10 rounded-full" src={Timothy} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-lexend">Timothy Lewis</h1>
            <p className="text-white opacity-50">+36 01 234 5678</p>
          </div>
        </div>
        <div
          className={`flex flex-row gap-4 opacity-0 group-hover:opacity-100 transition-all`}
        >
          <ButtonSecondary icon={Mute} />
          <ButtonSecondary icon={Call} />
          <ButtonSecondary
            icon={More}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        {open ? <Dropdown /> : null}
      </div>
    </>
  );
};

export default ContactItem;
