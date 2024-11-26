"use client";

import React, { useEffect, useState } from "react";
import { CloseIcon, CheckmarkIcon, LockIcon, ArrowIcon } from "../assets/icons";
import createList from "../services/createList";
import { useAuth } from "../_contexts/AuthContext";
import { useModal } from "../_contexts/ModalContext";
import addItemToLists from "../services/addItemToLists";
import OutsideClickHandler from "./OutsideClickHandler";
import { fetchUserLists } from "../services/fetchUserLists";
export default function AddToListModal({
  mediaDetails,
}: {
  mediaDetails: any;
}) {
  const { mediaId, mediaType } = mediaDetails;
  const { setCurrentModal } = useModal();
  const { user } = useAuth();
  const [isCreatingList, setIsCreatingList] = useState<any>(false);
  const [lists, setLists] = useState<any>(null);
  const [queue, setQueue] = useState<any>([]);

  const [newListTitle, setNewListTitle] = useState<any>("");
  const [newListDescription, setNewListDescription] = useState<any>("");
  const [newListIsPrivate, setNewListIsPrivate] = useState<any>(false);

  const [newListTitleError, setNewListTitleError] = useState<any>("");

  const handleClose = () => {
    if (queue.length) {
      addItemToLists(user.id, queue, mediaId, mediaType);
    }

    setCurrentModal(null);
  };

  const fetchLists = async () => {
    const userLists = await fetchUserLists(user.id);
    console.log(userLists);
    userLists ? setLists(userLists) : "";
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleAddToQueue = (listId: any) => {
    if (!queue.includes(listId)) {
      setQueue((currentQueue: any) => [...currentQueue, listId]);
    } else {
      setQueue(queue.filter((id: any) => id !== listId));
    }
  };

  const handleChangeNewListVisibility = () => {
    console.log(!newListIsPrivate);
    setNewListIsPrivate((f: any) => !f);
  };

  const handleCreateList = async () => {
    if (newListTitle.legth === 0) {
      setNewListTitleError("Invalid list title!");
      return null;
    }

    await createList(
      user.id,
      newListTitle,
      newListDescription,
      newListIsPrivate
    );

    fetchLists();

    setIsCreatingList(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={handleClose} exceptionRefs={[]}>
      <div id="addToListModalWrapper">
        <div id="addToListModal">
          <div id="addToListModalTitleWrapper">
            {isCreatingList ? (
              <div
                onClick={() => setIsCreatingList(false)}
                className="addToListModalTitleBackIconWrapper"
              >
                <ArrowIcon className="addToListModalTitleBackIcon" />
              </div>
            ) : (
              ""
            )}
            <span id="addToListModalTitle">
              {isCreatingList ? "New List" : "Add to list"}
            </span>
            <div
              onClick={handleClose}
              className="addToListModalCloseIconWrapper"
            >
              {" "}
              <CloseIcon className="addToListModalCloseIcon" />
            </div>
          </div>

          {!isCreatingList ? (
            <div id="addToListModalListsContainer">
              {lists &&
                lists.map((list: any, index: any) => {
                  return (
                    <div className="addToListModalList" key={index}>
                      <div
                        onClick={() => handleAddToQueue(list.id)}
                        className={`addToListModalListCheckbox ${
                          queue.includes(list.id)
                            ? "addToListModalListCheckboxChecked"
                            : "addToListModalListCheckboxUnchecked"
                        }`}
                      >
                        {queue.includes(list.id) && (
                          <CheckmarkIcon className="addToListModalListCheckboxCheckmarkIcon" />
                        )}
                      </div>
                      <div className="addToListModalListTitleWrapper">
                        <span className="addToListModalListTitle">
                          {list.title}
                        </span>
                        {!list.isPrivate ? (
                          ""
                        ) : (
                          <LockIcon className="addToListModalListTitleLockIcon" />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div id="addToListModalNewListTitleContainer">
                <input
                  placeholder="List Title"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  type="text"
                  className="addToListModalNewListInput"
                />
                <span id="addToListModalNewListTitleError">
                  {newListTitleError}
                </span>
              </div>
              <textarea
                placeholder="List Description"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                style={{ padding: "15px", resize: "none", height: "150px" }}
                className="addToListModalNewListInput"
              />

              <div id="addToListModalNewListVisibilityContainer">
                <span id="addToListModalNewListVisibilityText">Private</span>

                <div
                  onClick={handleChangeNewListVisibility}
                  className={`addToListModalNewListVisibilitySwitchOuter ${
                    newListIsPrivate
                      ? "addToListModalNewListVisibilitySwitchOuterChecked"
                      : ""
                  }`}
                >
                  <div
                    style={
                      newListIsPrivate ? { right: "2px" } : { left: "2px" }
                    }
                    id="addToListModalNewListVisibilitySwitchInner"
                  ></div>
                </div>
              </div>
            </>
          )}
          <div id="addToListModalNewListButtonWrapper">
            {isCreatingList ? (
              <button
                onClick={handleCreateList}
                className="addToListModalActionButton"
              >
                Create List
              </button>
            ) : (
              <button
                onClick={() => setIsCreatingList(true)}
                className="addToListModalActionButton"
              >
                New List
              </button>
            )}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
}
