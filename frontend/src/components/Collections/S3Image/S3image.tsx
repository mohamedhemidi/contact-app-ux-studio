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

const S3Image = ({ src, styles }: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { active } = useAppSelector((state) => state.popup);
  useEffect(() => {
    async function getImageUrl() {
      const s3 = new AWS.S3();
      let url = "";
      const params = (name: any) => {
        return {
          Bucket: `${S3.bucket}/profile_images`,
          Key: `${name}.png`,
          Expires: 60,
        };
      };

      url = await s3.getSignedUrlPromise("getObject", params(src));
      setImageUrl(url);
    }

    getImageUrl();
  }, [src, active]);

  const onImageError = (e: any) => {
    e.target.src = Default;
  };

  return (
    <img onError={onImageError} src={imageUrl} className={styles} alt={src} />
  );
};

export default S3Image;
