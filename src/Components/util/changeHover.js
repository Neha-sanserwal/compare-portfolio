import CARD_ITEM from "../../globals/cardItem";

export default (state, action) => {
  switch (action.type) {
    case CARD_ITEM.LANGUAGE:
      return { language: "showHovered" };
    case CARD_ITEM.STARS:
      return { stars: "showHovered" };
    case CARD_ITEM.FORKS:
      return { forks: "showHovered" };
    case CARD_ITEM.CREATED_AT:
      return { createdAt: "showHovered" };
    case CARD_ITEM.OPEN_ISSUES:
      return { openIssue: "showHovered" };
    case CARD_ITEM.LAST_UPDATED:
      return { lastUpdated: "showHovered" };
    default:
      return {};
  }
};
