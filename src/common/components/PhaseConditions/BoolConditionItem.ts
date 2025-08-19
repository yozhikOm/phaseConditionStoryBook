import { ValueConditionItem } from './ValueConditionItem';
import { BOOL_OPERATOR } from './constants';
import { IConditionItem } from './interfaces';

class BoolConditionItem implements IConditionItem {
  operator: BOOL_OPERATOR = BOOL_OPERATOR.AND;
  operand1: IConditionItem | null = null;
  operand2?: IConditionItem | null = null;

  constructor(value?: BoolConditionItem | ValueConditionItem | null) {
    if (value instanceof ValueConditionItem) {
      this.operand1 = value;
    }
    else {
      this.operator = value?.operator || this.operator;
      this.operand1 = value && value.operand1
        ? this.getOperand(value.operand1)
        : this.operand1;
      this.operand2 = value && value.operand2
        ? this.getOperand(value.operand2)
        : this.operand2;
    }
  }

  getOperand(
    operand: IConditionItem
  ): IConditionItem {
    if (operand instanceof ValueConditionItem) {
      return new ValueConditionItem(operand);
    }
    else if (operand instanceof BoolConditionItem) {
      return new BoolConditionItem(operand);
    }
    return operand;
  }

  toString() {
    if (this.operator === BOOL_OPERATOR.NOT) {
      return `${this.operator} (${this.operand1?.toString()})`;
    }
    return `(${this.operand1?.toString()}) ${this.operator} (${this.operand2?.toString()})`;
  }

  fromString(_: string) {
  }
}

export { BoolConditionItem };