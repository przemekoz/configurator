import { useEffect, useState } from "react";
import { Confirm } from "react-admin";
import { Http } from "../_helper/http";

interface Props {
  title: string;
  text: string;
  getUrl: string;
  id: string | number;
  onConfirm(): void;
}

export const ConfirmBeforeDeletingRelation = ({
  getUrl,
  id,
  onConfirm,
  title,
  text,
}: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [content, setContent] = useState(text);

  // if id has changed
  useEffect(() => {
    console.log("ConfirmBeforeDeletingRelation", id);
    if (!id) {
      return;
    }
    Http.get(getUrl + id).then((response: any) => {
      console.log(response.data.data);
      if (response.data.data > 0) {
        setContent((currentContent) => {
          return `${response.data.data} connected element/s. ${currentContent} `;
        });
        setOpenConfirm(true);
        console.log("are connections");
      } else {
        console.log("no connections");
        onConfirm();
      }
    });
  }, [id]);

  const handleConfirm = () => {
    setOpenConfirm(false);
    onConfirm();
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  return (
    <Confirm
      isOpen={openConfirm}
      onConfirm={handleConfirm}
      onClose={handleClose}
      title={title}
      content={content}
    />
  );
};
