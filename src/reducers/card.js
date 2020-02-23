import ActionNames from "./action-names";

const INITIAL_STATE = {
  cards: {}
};

export default (state = INITIAL_STATE, action) => {
  let cards, id;
  switch (action.type) {
    case ActionNames.CardDetailRefresh:
      id = action.payload.id;
      cards = { ...state.cards };
      cards[id] = cards[id] || { refreshing: false };
      cards[id].refreshing = action.payload.status;
      return { ...state, cards };
    case ActionNames.CardDetailFetchSuccess:
      id = action.payload.id;
      cards = { ...state.cards };
      cards[id] = action.payload.data;
      return { ...state, cards };
    case ActionNames.CardDetailRemove:
      id = action.payload;
      cards = { ...state.cards };
      cards[id] = null;
      return { ...state, cards };
    default:
      return state;
  }
};
