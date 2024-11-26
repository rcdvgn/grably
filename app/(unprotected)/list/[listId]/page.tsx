"use client";

import React, { useState, useEffect } from "react";
import fetchListById from "@/app/services/fetchListById";
import { useParams } from "next/navigation";
import { useActions } from "@/app/_contexts/ActionsContext";
import Filters from "@/app/_components/Filters";
import Details from "@/app/_components/Details";
import { AddIcon } from "@/app/assets/icons";
import getMedia from "@/app/services/getMedia";
import { useAuth } from "@/app/_contexts/AuthContext";
import removeItemFromList from "@/app/services/removeItemFromList";

export default function List() {
  const { user } = useAuth();
  const params = useParams();
  const listId = params.listId as string;

  const {
    selectedMediaMeta,
    setSelectedMediaMeta,
    isSearchOverlayVisible,
    setIsSearchOverlayVisible,
  } = useActions();
  const [list, setList] = useState<any>(null);
  const [listItems, setListItems] = useState<any>([]);

  const [selectedMediaType, setSelectedMediaType] = useState<any>(null);

  const handleMediaSelect = (
    selectedMediaId: number,
    selectedMediaType: any
  ) => {
    if (isSearchOverlayVisible) {
      setIsSearchOverlayVisible(false);
    }

    setSelectedMediaMeta({
      selectedMediaId,
      selectedMediaType,
    });
  };

  const fetchMediaDetails = async () => {
    try {
      const results = await Promise.all(
        list.items.map(({ id, mediaType }: { id: any; mediaType: any }) =>
          getMedia(id, mediaType).then((data) => ({
            ...data,
            mediaType,
          }))
        )
      );
      console.log(listItems);
      setListItems(results);
    } catch (err) {
      console.error("Error fetching media details:", err);
    }
  };

  const handleRemoveItem = async (itemId: any) => {
    if (!user) return;
    if (user.id !== list.author) return;
    await removeItemFromList(list.id, itemId);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const listData = await fetchListById(listId);

        if (listData) {
          setList(listData);
        } else {
          console.log("No list found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };

    fetchList();
  }, [listId]);

  useEffect(() => {
    if (!list) return;
    if (list.items.length > 0) {
      fetchMediaDetails();
    }
  }, [list]);

  if (!list) return null;

  if (list.isPrivate && user?.id !== list.author)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p style={{ color: "white", fontSize: "30px", fontWeight: "700" }}>
          This list is private, change visibility to access it.
        </p>
      </div>
    );

  return (
    <>
      <div id="mediaContainer">
        <div id="listTitle">{list.title}</div>

        <div id="header">
          <Filters
            selectedMediaType={selectedMediaType}
            setSelectedMediaType={setSelectedMediaType}
          />
        </div>

        <div id="mediaGrid">
          {listItems.length ? (
            listItems.map((item: any, index: number) =>
              item.mediaType === selectedMediaType ||
              selectedMediaType === null ? (
                <div
                  key={index}
                  className="mediaItem"
                  onClick={() => handleMediaSelect(item.id, item.mediaType)}
                >
                  <img
                    className="itemPoster"
                    src={
                      "http://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                      item.poster_path
                    }
                    alt=""
                  />
                  <div className="itemData"></div>
                  <div
                    onClick={() => handleRemoveItem(item.id)}
                    className="mediaItemMoreIconWrapper"
                  >
                    <AddIcon className="mediaItemMoreIcon" />
                  </div>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
              This list is empty.
            </p>
          )}
        </div>
      </div>

      {selectedMediaMeta !== null && (
        <Details
          selectedMediaMeta={selectedMediaMeta}
          setSelectedMediaMeta={setSelectedMediaMeta}
        />
      )}
    </>
  );
}
