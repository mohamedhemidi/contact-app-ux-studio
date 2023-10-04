import Mute from "../../../assets/icons/svg/Mute.svg";
import Call from "../../../assets/icons/svg/Call.svg";
import More from "../../../assets/icons/svg/More.svg";
import { useEffect, useState, useRef } from "react";
import { ButtonSecondary } from "../../Core/Button";
import { Dropdown } from "../Dropdown";
import { Contact } from "../../../Models/contacts";
import S3Image from "../S3Image/S3image";
import { useAppSelector } from "../../../utils/hooks";

interface Props {
  data: Contact;
}

const ContactItem = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef(document.createElement("div"));
  const { active} = useAppSelector((state) => state.popup);


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
        key={data.ContactId}
        ref={dropdownRef}
        className="group flex flex-row justify-between items-center relative mb-12"
      >
        <div className="flex flex-row gap-4 items-center">
          <div>
            <S3Image src={data.picture} styles="w-10 h-10 rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-lexend">{data.name}</h1>
            <p className="text-white opacity-50">{data.phone}</p>
          </div>
        </div>
        <div
          className={`flex flex-row gap-4 opacity-0 group-hover:opacity-100 transition-all`}
        >
          <ButtonSecondary icon={Mute} />
          <ButtonSecondary icon={Call} />
          <ButtonSecondary icon={More} onClick={() => setOpen(true)} />
        </div>
        {open && !active ? <Dropdown id={data.ContactId} /> : null}
      </div>
    </>
  );
};

export default ContactItem;
