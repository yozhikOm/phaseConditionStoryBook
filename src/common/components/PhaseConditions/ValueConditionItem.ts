import { BoolConditionItem } from './BoolConditionItem';
import { OPERATOR, FIELDS } from './constants';
import { IConditionItem } from './interfaces';

class ValueConditionItem implements IConditionItem {
  fieldKey?: FIELDS;
  operator: OPERATOR = OPERATOR.eq;
  value: string = '';

  constructor(value?: ValueConditionItem | BoolConditionItem) {
    if (value instanceof BoolConditionItem) {
      const operand1 = getValueConditionFromOperand(value.operand1);
      this.fieldKey = operand1?.fieldKey;
      this.operator = operand1?.operator || this.operator;
      this.value = operand1?.value || this.value;
    }
    else {
      this.fieldKey = value?.fieldKey;
      this.operator = value?.operator || this.operator;
      this.value = value?.value || this.value;
    }
  }

  toString() {
    return `${this.fieldKey} ${this.operator} ${this.value}`;
  }
}

const getValueConditionFromOperand = (
  operand: IConditionItem | null
): ValueConditionItem | null => {
  if (operand === null) {
    return null;
  }
  if (operand instanceof ValueConditionItem) {
    return operand;
  }
  else if (operand instanceof BoolConditionItem) {
    return getValueConditionFromOperand(operand.operand1);
  }
  else {
    return null;
  }
}

export { ValueConditionItem };