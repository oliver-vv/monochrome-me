import { auth } from '$lib/firebase/firebase';

import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	type User
} from 'firebase/auth';

import { writable } from 'svelte/store';

/**
 * @returns a store with the current firebase user
 */
function userStore() {
	let unsubscribe: () => void;

	//|| typeof window === 'undefined'
	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

export const authHandlers = {
	signup: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	signupWithGoogle: async () => {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
	}
};
