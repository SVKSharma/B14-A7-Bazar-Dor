import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;

export type SocialAuthIntent = 'signin' | 'signup';

const SOCIAL_AUTH_INTENT_KEY = 'bazar-dor:social-auth-intent';

export function setSocialAuthIntent(intent: SocialAuthIntent) {
  window.sessionStorage.setItem(SOCIAL_AUTH_INTENT_KEY, intent);
}

export function consumeSocialAuthIntent(): SocialAuthIntent | null {
  const intent = window.sessionStorage.getItem(SOCIAL_AUTH_INTENT_KEY);
  window.sessionStorage.removeItem(SOCIAL_AUTH_INTENT_KEY);

  return intent === 'signin' || intent === 'signup' ? intent : null;
}

export function clearSocialAuthIntent() {
  window.sessionStorage.removeItem(SOCIAL_AUTH_INTENT_KEY);
}