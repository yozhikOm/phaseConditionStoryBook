enum OPERATOR {
  eq = '==',
  ne = '!=',
  gt = '>',
  ge = '>=',
  lt = '<',
  le = '<='
};

enum BOOL_OPERATOR {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT'
};

type FIELDS =
  'Company' |
  'Contractor' |
  'Amount' |
  'Currency' |
  'Month Amount' |
  'Quarter Amount' |
  'Is Framework' |
  'Payment Term' |
  'Сontractor Status';

type Field = {
  key: FIELDS;
  name: string | (() => string);
  type: 'string' | 'number' | 'boolean';
}

export type ConditionalType = { [keyName in FIELDS]: Field }

const FIELD_NAMES: ConditionalType = {
  Company: { key: 'Company', name: 'Company', type: 'string' },
  Contractor: { key: 'Contractor', name: 'Contractor', type: 'string' },
  Amount: { key: 'Amount', name: 'Amount', type: 'number' },
  Currency: { key: 'Currency', name: 'Currency', type: 'string' },
  ['Month Amount']: { key: 'Month Amount', name: 'MonthAmount', type: 'number' },
  ['Quarter Amount']: { key: 'Quarter Amount', name: 'QuarterAmount', type: 'number' },
  ['Is Framework']: { key: 'Is Framework', name: 'IsFramework', type: 'boolean' },
  ['Payment Term']: { key: 'Payment Term', name: 'PaymentTerm', type: 'string' },
  ['Сontractor Status']: { key: 'Сontractor Status', name: 'СontractorStatus', type: 'boolean' },
};

export { FIELD_NAMES, OPERATOR, BOOL_OPERATOR };
export type { Field, FIELDS };