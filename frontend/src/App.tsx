import { Header } from "./components/Layouts/Header";
import { Section } from "./components/Layouts/Section";
import Settings from "./assets/icons/svg/Settings.svg";
import Profile_pic from "./assets/icons/svg/Profile_pic.svg";
import Back_arrow from "./assets/icons/svg/Back_arrow.svg";
import Light_mode from "./assets/icons/svg/Light_mode.svg";
import Add from "./assets/icons/svg/Add.svg";
import { ButtonSecondary, ButtonSpecial } from "./components/Core/Button";
import { Main } from "./components/Layouts/Main";
import { Popup } from "./components/Collections/Popup";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { openPopup } from "./reducers/popupReducer";

interface Popup {
  active: boolean;
  type?: "ADD" | "EDIT";
}

function App() {
  const dispatch = useAppDispatch();
  const { active, data } = useAppSelector((state) => state.popup);

  const openPopupHandler = (type: string) => {
    dispatch(openPopup({ active: true, data: { type } }));
  };

  return (
    <div className="flex flex-row">
      {/* Left Aside */}
      <div className="hidden md:block lg:block w-1/4">
        <Section
          header={
            <Header side="left">
              <ButtonSecondary icon={Back_arrow} />
            </Header>
          }
        />
      </div>
      {/* Main */}
      <div className="w-full md:w-1/2">
        <Section
          header={
            <Header title="Contacts" side="center">
              <ButtonSecondary icon={Settings} />
              <ButtonSecondary icon={Profile_pic} />
              <ButtonSpecial
                onClick={() => openPopupHandler("ADD")}
                label="Add New"
                icon={Add}
              />
            </Header>
          }
          content={<Main />}
        />
      </div>
      {/* Right Aside */}
      <div className="hidden md:block lg:block w-1/4">
        <Section
          header={
            <Header side="right">
              <ButtonSecondary icon={Light_mode} />
            </Header>
          }
        />
      </div>
      {active ? <Popup data={data} /> : null}
    </div>
  );
}

export default App;
