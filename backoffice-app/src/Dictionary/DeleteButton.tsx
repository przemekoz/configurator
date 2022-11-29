import React, { useState } from "react";
import { Confirm, useDelete, useRecordContext } from "react-admin";
import { Endpoint } from "../_const/endpoint";
import { useCheckRelations } from "../_hooks/useCheckRelations";

export const DeleteButton = () => {
  const record = useRecordContext();
  const [deleteOne, { isLoading }] = useDelete();

  const [confirmText, setConfirmText] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const checkRelations = useCheckRelations(
    `${Endpoint.element_dictionary_values}/getAssignedDictionaries?id=`
  );

  const deleteDictionary = () => {
    deleteOne(Endpoint.dictionaries, {
      id: record.id,
      previousData: record,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    checkRelations(record.id as number)
      .then(() => {
        deleteDictionary();
      })
      .catch((count: number) => {
        setConfirmText(
          `Are you sure to remove relation ? You will lost ${count} connection/s.`
        );
        setIsOpen(true);
      });
  };

  const handleConfirm = () => {
    deleteDictionary();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        disabled={isLoading}
        onClick={handleClick}
        style={{ color: "red" }}
      >
        Delete
      </button>
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
        title="Confirm deleting relationship"
        content={confirmText}
      />
    </>
  );
};
