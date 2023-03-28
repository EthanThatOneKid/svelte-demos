import { writable, type Writable } from 'svelte/store';

/**
 * A writable store that will persist its value in localStorage.
 */
export interface Persistable<T> extends Writable<T> {
	sync: () => StoredItem<T>;
}

/**
 * Creates a persistable store that will persist its value in localStorage.
 * @param key Key to use for localStorage.
 * @param optimisticValue Value to use before the store is initialized.
 * @param initialValue Initial value to use if there is no value in localStorage.
 * @returns A writable store that will persist its value in localStorage.
 */
export function persistable<T>(
	key: string,
	optimisticValue: T,
	initialValue: T = optimisticValue
): Persistable<T> {
	const { value, synced } = safelyGetItem<T>(key);
	const { subscribe, set, update } = writable(
		!synced ? optimisticValue : value !== undefined ? value : initialValue
	);

	return {
		subscribe,
		update,
		set(value: T) {
			const storedItem = safelySetItem(key, value);
			if (!storedItem.synced) {
				return;
			}

			set(value);
		},
		sync(): StoredItem<T> {
			const storedItem = safelyGetItem<T>(key);
			if (!storedItem.synced || storedItem.value === undefined) {
				return storedItem;
			}

			set(storedItem.value);
			return storedItem;
		}
	};
}

interface StoredItem<T> {
	value: T | undefined;
	synced: boolean;
}

function safelyGetItem<T>(key: string): StoredItem<T> {
	if (typeof localStorage === 'undefined') {
		return makeStoredItem(false);
	}

	const serialized = localStorage.getItem(key);
	if (serialized === null) {
		return makeStoredItem(true);
	}

	return makeStoredItem(true, JSON.parse(serialized));
}

function safelySetItem<T>(key: string, value: T): StoredItem<T> {
	if (typeof localStorage === 'undefined') {
		return makeStoredItem(false);
	}

	const serialized = JSON.stringify(value);
	localStorage.setItem(key, serialized);
	return makeStoredItem(true, value);
}

function makeStoredItem<T>(synced: boolean, value?: T): StoredItem<T> {
	return { value, synced };
}
