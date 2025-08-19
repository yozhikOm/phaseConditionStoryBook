import { BOOL_OPERATOR, OPERATOR } from "./constants";

interface IConditionItem {
  operator: OPERATOR | BOOL_OPERATOR;
  toString: () => string;
}

export type { IConditionItem };