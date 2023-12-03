import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const state = {
    token: ref(localStorage.getItem('token') || null)
  };

  const toggleToken = (token) => {
    state.token.value = token;
    localStorage.setItem('token', token);
  };

  return {
    ...state,
    toggleToken,
  };
});
