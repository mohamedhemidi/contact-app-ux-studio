import Default from "../../../assets/images/Default.png";
import Add from "../../../assets/icons/svg/Add.svg";
import { ButtonPrimary, ButtonSecondary } from "../../Core/Button";
import { Input } from "../../Core/Input";
import { useAppDispatch } from "../../../utils/hooks";
import { closePopup } from "../../../reducers/popupReducer";

interface Data {
  type?: string;
}

interface PopupState {
  data: Data;
}

const Type = {
  ADD: "Add",
  EDIT: "Edit",
};

const Popup = (props: PopupState) => {
  const dispatch = useAppDispatch();
  const { data } = props;

  const handleClose = () => {
    dispatch(closePopup());
  };
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center">
      <div className="p-8 w-[364px] bg-[#141414] rounded-lg">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-glysa text-white">
            {data.type && Type[data.type as keyof typeof Type]} contact
          </h2>
          <div className="flex flex-row items-center justify-between">
            <img className="w-[88px] h-[88px] rounded-full" src={Default} />
            <ButtonPrimary icon={Add} label="Add picture" />
          </div>
          <Input />
          <Input />
          <Input />
          <div className="flex flex-row justify-end gap-2">
            <ButtonSecondary onClick={handleClose} label="Cancel" />
            <ButtonPrimary label="Done" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
