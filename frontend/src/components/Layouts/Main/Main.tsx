import { Contact } from "../../../Models/contacts";
import { ContactItem } from "../../Collections/ContactItem";

interface Props {
  data: Contact[];
}

const Main = ({ data }: Props) => {
  if (!data || !data.length) return null;
  return (
    <div className="p-4">
      {data.map((contact) => {
        return <ContactItem key={contact.ContactId} data={contact} />;
      })}
    </div>
  );
};

export default Main;
