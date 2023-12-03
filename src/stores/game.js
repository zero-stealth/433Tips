import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const state = {
    gameId: ref(null),
  };

  const updateGameId = (id) => {
    state.gameId.value = id;
  };

  return {
    ...state,
    updateGameId,
  };
});
