import { ButtonSecondary } from "../../Core/Button";
import Settings from "../../../assets/icons/svg/Settings.svg";
import Favourite from "../../../assets/icons/svg/Favourite.svg";
import Delete from "../../../assets/icons/svg/Delete.svg";
import { useAppDispatch } from "../../../utils/hooks";
import { openPopup } from "../../../reducers/popupReducer";

interface Props {
  ref?: any;
}

const Dropdown = ({ ref }: Props) => {
  const dispatch = useAppDispatch();

  const handleEdit = (type: string) => {
    dispatch(openPopup({ active: true, data: { type } }));
  };

  return (
    <div
      ref={ref}
      className="absolute flex flex-col rounded-lg bg-[#1E1E1E] w-[219px] cursor-pointer right-0 md:-right-44 top-12 z-30"
    >
      <div
        className="flex flex-row gap-6 items-center justify-start text-white p-2 hover:bg-[#232323]"
        onClick={() => handleEdit("EDIT")}
      >
        <ButtonSecondary icon={Settings} />
        <h1>Edit</h1>
      </div>
      <div className="flex flex-row gap-6 items-center justify-start text-white p-2 hover:bg-[#232323]">
        <ButtonSecondary icon={Favourite} />
        <h1>Favourite</h1>
      </div>
      <div className="flex flex-row gap-6 items-center justify-start text-white p-2 hover:bg-[#232323]">
        <ButtonSecondary icon={Delete} />
        <h1>Remove</h1>
      </div>
    </div>
  );
};

export default Dropdown;
