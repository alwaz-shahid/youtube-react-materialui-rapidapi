// localDB.js

import { openDB } from 'idb';

const DB_NAME = 'vio_offline_db';
const DB_VERSION = 1;

const SEARCH_BAR_STORE = 'search_data';
const VIDEO_STORE = 'video_data';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(SEARCH_BAR_STORE)) {
      db.createObjectStore(SEARCH_BAR_STORE, {
        keyPath: 'id',
        autoIncrement: true,
      });
    }

    if (!db.objectStoreNames.contains(VIDEO_STORE)) {
      db.createObjectStore(VIDEO_STORE, { keyPath: 'id', autoIncrement: true });
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
