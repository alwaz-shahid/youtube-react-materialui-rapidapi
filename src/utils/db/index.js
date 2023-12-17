// db/index.js

import { openDB } from 'idb';

const DB_NAME = 'vio_offline_db';
const DB_VERSION = 2;

const SEARCH_BAR_STORE = 'search_data';
// const VIDEO_STORE = 'video_data';
const LIKE_STORE = 'like_data'; // New store for likes

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(SEARCH_BAR_STORE)) {
      db.createObjectStore(SEARCH_BAR_STORE, {
        keyPath: 'id',
        autoIncrement: true,
      });
    }

    // if (!db.objectStoreNames.contains(VIDEO_STORE)) {
    //   db.createObjectStore(VIDEO_STORE, { keyPath: 'id', autoIncrement: true });
    // }

    // Create the LIKE_STORE if it doesn't exist
    if (!db.objectStoreNames.contains(LIKE_STORE)) {
      db.createObjectStore(LIKE_STORE);
    }
  },
});

export async function addDataToSearchBar(data) {
  const db = await dbPromise;
  const tx = db.transaction(SEARCH_BAR_STORE, 'readwrite');
  const store = tx.objectStore(SEARCH_BAR_STORE);
  await store.put(data);
  return tx.complete;
}

export async function addDataToVideo(data) {
  const db = await dbPromise;
  const tx = db.transaction(VIDEO_STORE, 'readwrite');
  const store = tx.objectStore(VIDEO_STORE);
  await store.put(data);
  return tx.complete;
}
export async function addDataToLike(data) {
  const db = await dbPromise;
  const tx = db.transaction(LIKE_STORE, 'readwrite');
  const store = tx.objectStore(LIKE_STORE);
  await store.put(data, data.id); // Use the video's id as the key
  return tx.complete;
}
// export async function addDataToLike(data) {
//   const db = await dbPromise;
//   const tx = db.transaction(LIKE_STORE, 'readwrite');
//   const store = tx.objectStore(LIKE_STORE);
//   await store.put(data);
//   return tx.complete;
// }
export async function clearSearchBar() {
  const db = await dbPromise;
  const tx = db.transaction(SEARCH_BAR_STORE, 'readwrite');
  const store = tx.objectStore(SEARCH_BAR_STORE);
  store.clear(); // This will remove all entries from the store
  return tx.complete;
}
export async function getAllDataFromSearchBar() {
  const db = await dbPromise;
  const tx = db.transaction(SEARCH_BAR_STORE, 'readonly');
  const store = tx.objectStore(SEARCH_BAR_STORE);
  return store.getAll();
}

export async function getAllDataFromVideo() {
  const db = await dbPromise;
  const tx = db.transaction(VIDEO_STORE, 'readonly');
  const store = tx.objectStore(VIDEO_STORE);
  return store.getAll();
}

export async function getAllDataFromLike() {
  const db = await dbPromise;
  const tx = db.transaction(LIKE_STORE, 'readonly');
  const store = tx.objectStore(LIKE_STORE);
  return store.getAll();
}
export async function deleteAllDataFromLike() {
  const db = await dbPromise;
  const tx = db.transaction(LIKE_STORE, 'readwrite');
  const store = tx.objectStore(LIKE_STORE);
  await store.clear(); // Clear all data from the store
  return tx.complete;
}

export async function removeDataFromLike(videoId) {
  const db = await dbPromise;
  const tx = db.transaction(LIKE_STORE, 'readwrite');
  const store = tx.objectStore(LIKE_STORE);

  try {
    await store.delete(videoId);
    await tx.complete;
    console.log(`Data with ID ${videoId} removed from the "likes" store.`);
  } catch (error) {
    console.error('Error removing data from the "likes" store:', error);
  }
}
