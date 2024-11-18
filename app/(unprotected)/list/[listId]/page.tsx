"use client";

import React, { useState, useEffect } from "react";
import fetchListById from "@/app/services/fetchListById";
import { useActions } from "@/app/_contexts/ActionsContext";
import Filters from "@/app/_components/Filters";
import Details from "@/app/_components/Details";

import getMedia from "@/app/services/getMedia";

export default function List({ params }: { params: { listId: string } }) {
  const { listId } = params;
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
      setListItems(results);
    } catch (err) {
      console.error("Error fetching media details:", err);
    }
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

  return (
    <>
      <div id="mediaContainer">
        <div id="header">
          <Filters
            selectedMediaType={selectedMediaType}
            setSelectedMediaType={setSelectedMediaType}
          />

          {/* <SearchOverlay
            results={results}
            setResults={setResults}
            handleMediaSelect={handleMediaSelect}
          /> */}
        </div>

        <div id="mediaGrid">
          {listItems.length ? (
            listItems.map((item: any, index: number) =>
              item.media_type === selectedMediaType ||
              selectedMediaType === null ? (
                <div
                  key={index}
                  className="mediaItem"
                  onClick={() => handleMediaSelect(item.id, item.media_type)}
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
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p>Nothing to see here</p>
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
