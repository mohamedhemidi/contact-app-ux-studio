import Add from "../../../assets/icons/svg/Add.svg";
import Delete from "../../../assets/icons/svg/Delete.svg";
import { ButtonPrimary, ButtonSecondary } from "../../Core/Button";
import { Input } from "../../Core/Input";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { closePopup } from "../../../reducers/popupReducer";
import { useEffect, useRef, useState } from "react";
import AWS from "aws-sdk";
import {
  addContacts,
  getContacts,
  updateContact,
  viewContact,
} from "../../../services/contacts.services";
import S3Image from "../S3Image/S3image";
import { S3 } from "../../../constants/environements";
AWS.config.update({
  accessKeyId: S3.accessKeyId,
  secretAccessKey: S3.secretAccessKey,
  region: S3.region,
});
const Type = {
  ADD: "Add",
  EDIT: "Edit",
  DELETE: "Delete",
};

const Popup = () => {
  const dispatch = useAppDispatch();
  const { type, id } = useAppSelector((state) => state.popup);
  const { loading, contact } = useAppSelector((state) => state.contacts);
  const inputRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
  });
  useEffect(() => {
    if (id) {
      dispatch(viewContact(id));
    }
  }, []);

  useEffect(() => {
    if (id && contact) {
      for (const [key, value] of Object.entries(contact)) {
        setFormData((prev) => {
          return { ...prev, [key]: value };
        });
        if (type === "DELETE") {
          setFormData((prev) => {
            return { ...prev, archived: true };
          });
        }
      }
    }
  }, [contact]);

  const handleForm = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => {
      return { ...prev, [field]: e.target.value };
    });

    setFormData((prev) => {
      return { ...prev, picture: formData.name };
    });
  };
  const handleSubmit = () => {
    // form validation : check empty fields:
    if (!formData.name || !formData.email) {
      return;
    }
    switch (type) {
      case "ADD":
        dispatch(addContacts(formData)).then((res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            handleClose();
            dispatch(getContacts());
          }
        });
        break;
      case "EDIT":
        dispatch(updateContact({ id, formData })).then((res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            handleClose();
            dispatch(getContacts());
          }
        });
        break;
      case "DELETE":
        dispatch(updateContact({ id, formData })).then((res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            handleClose();
            dispatch(getContacts());
          }
        });
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    dispatch(closePopup());
  };

  const [selectedImage, setSelectedImage] = useState({
    buffer: "",
    url: "",
  });

  const chooseFile = () => {
    inputRef.current.click();
  };
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          url: URL.createObjectURL(e.target.files[0]),
          buffer: reader.result.toString(),
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, base64: selectedImage.buffer };
    });
  }, [selectedImage]);

  const removeImage = () => {
    setSelectedImage({ buffer: "", url: "" });
  };
  if (loading) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center">
      <div className="p-8 w-[364px] bg-[#141414] rounded-lg">
        <div className="flex flex-col gap-6">
          {type === "DELETE" ? (
            <h2 className="text-white text-3xl">
              You sure you want to delete this contact ?
            </h2>
          ) : (
            <>
              <h2 className="text-2xl font-glysa text-white">
                {type && Type[type as keyof typeof Type]} contact
              </h2>
              <div className="flex flex-row items-center justify-between">
                <input
                  hidden
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    imageChange(e);
                  }}
                  accept="image/png, image/gif, image/jpeg"
                  ref={inputRef}
                />
                <S3Image
                  styles="w-[88px] h-[88px] rounded-full"
                  src={selectedImage.url}
                  buffer={selectedImage.buffer}
                />
                <ButtonPrimary
                  icon={Add}
                  label="Add picture"
                  onClick={chooseFile}
                />
                {selectedImage && selectedImage.url && (
                  <ButtonPrimary
                    icon={Delete}
                    onClick={removeImage}
                  ></ButtonPrimary>
                )}
              </div>
              <Input
                label={"Name"}
                placeholder="Jamie Wright"
                value={formData.name}
                onChange={(e) => handleForm("name", e)}
              />
              <Input
                label={"Phone number"}
                placeholder="+01 234 5678"
                value={formData.phone}
                onChange={(e) => handleForm("phone", e)}
              />
              <Input
                label={"Email address"}
                placeholder="jamie.wright@mail.com"
                value={formData.email}
                onChange={(e) => handleForm("email", e)}
              />
            </>
          )}
          <div className="flex flex-row justify-end gap-2">
            <ButtonSecondary onClick={handleClose} label="Cancel" />
            <ButtonPrimary onClick={handleSubmit} label="Done" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
