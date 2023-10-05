import AWS from "aws-sdk";
import { useEffect, useState } from "react";
import { S3 } from "../../../constants/environements";
import Default from "../../../assets/images/Default.png";
import { useAppSelector } from "../../../utils/hooks";

interface Props {
  src: string;
  styles: string;
}

AWS.config.update({
  accessKeyId: S3.accessKeyId,
  secretAccessKey: S3.secretAccessKey,
  region: S3.region,
});
const s3 = new AWS.S3();
const params = (name: any) => {
  return {
    Bucket: `${S3.bucket}/profile_images`,
    Key: `${name}.png`,
    Expires: 60,
  };
};

const ImageUpload = ({ src, styles }: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { type, active } = useAppSelector((state) => state.popup);
  const { contact } = useAppSelector<any>((state) => state.contacts);

  useEffect(() => {
    let url = "";
    async function getImageUrl(type: any) {
      switch (type) {
        case "ADD":
          url = src;
          setImageUrl(url);
          break;
        case "EDIT":
          if (src) {
            url = src;
            setImageUrl(url);
          } else {
            url = await s3.getSignedUrlPromise(
              "getObject",
              params(contact.picture)
            );
            setImageUrl(url);
          }
          break;

        default:
          break;
      }
    }

    getImageUrl(type);
  }, [src]);

  const onImageError = (e: any) => {
    e.target.src = Default;
  };
  return (
    <img onError={onImageError} src={imageUrl} className={styles} alt={src} />
  );
};

export default ImageUpload;
