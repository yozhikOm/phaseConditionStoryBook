import { JSX, useState } from 'react';
import { Dropdown, IDropdownOption, TextField } from '@fluentui/react';
import { FIELDS, FIELD_NAMES, Field, OPERATOR } from './constants';
import { ValueConditionItem } from './ValueConditionItem';

const dropdownOptions = Object.keys(FIELD_NAMES).map(key => ({ key, text: (FIELD_NAMES[key as FIELDS]).name })) as Array<IDropdownOption>;

const getOperatorsOptions = (fieldType?: 'string' | 'number' | 'boolean'): Array<IDropdownOption> => {
  switch (fieldType) {
    case 'string': {
      return [
        { key: OPERATOR.eq, text: OPERATOR.eq, },
        { key: OPERATOR.ne, text: OPERATOR.ne, }
      ];
    }
    case 'number': {
      return [
        { key: OPERATOR.eq, text: OPERATOR.eq, },
        { key: OPERATOR.ne, text: OPERATOR.ne, },
        { key: OPERATOR.gt, text: OPERATOR.gt, },
        { key: OPERATOR.ge, text: OPERATOR.ge, },
        { key: OPERATOR.lt, text: OPERATOR.lt, },
        { key: OPERATOR.le, text: OPERATOR.le, },
      ];
    }
    case 'boolean': {
      return [
        { key: OPERATOR.eq, text: OPERATOR.eq, },
        { key: OPERATOR.ne, text: OPERATOR.ne, }
      ];
    }
    default: return [];
  }
};

interface IProps {
  value?: ValueConditionItem;
  onChange?: (data: ValueConditionItem) => void;
}

const ValueCondition = (props: IProps): JSX.Element => {
  const value = props.value ? new ValueConditionItem(props.value) : undefined;
  const [fieldKey, setFieldKey] = useState<FIELDS | null>(props.value?.fieldKey || null);

  const { onChange } = props;

  const changeTrigger = (
    newValue: ValueConditionItem
  ) => {
    if (!onChange || typeof onChange !== 'function') {
      return;
    }
    onChange(newValue);
  };

  const fieldType = fieldKey ? (FIELD_NAMES[fieldKey] as Field).type : undefined;
  const operatorsOptions = getOperatorsOptions(fieldType);

  return (
    <>
      <Dropdown
        className={'phase-value-condition__field'}
        selectedKey={value?.fieldKey}
        options={dropdownOptions}
        onChange={(_, option) => {
          const optionKey = option?.key.toString();
          const field = FIELD_NAMES[optionKey as FIELDS] as Field;
          setFieldKey(field.key);

          const newValue = new ValueConditionItem(value);
          newValue.fieldKey = field.key;
          changeTrigger(newValue);
        }}
      ></Dropdown>
      <Dropdown
        className={'phase-condition__operator'}
        options={operatorsOptions}
        selectedKey={value?.operator}
        onChange={(_, option) => {
          const newValue = new ValueConditionItem(value);
          if (option) {
            newValue.operator = option.key as OPERATOR;
          }
          changeTrigger(newValue);
        }}
      />
      {fieldType && fieldType === 'boolean' ?
        <Dropdown
          className={'phase-value-condition__value'}
          selectedKey={value?.value}
          options={[
            { key: 'True', text: 'True', },
            { key: 'False', text: 'False', }
          ]}
          onChange={(_, option) => {
            const newValue = new ValueConditionItem(value);
            newValue.value = option?.key.toString() || '';
            changeTrigger(newValue);
          }}
        /> :
        <TextField
          className={'phase-value-condition__value'}
          type={fieldType === 'number' ? 'number' : 'text'}
          value={value?.value}
          min={0}
          onChange={(_, val) => {
            const newValue = new ValueConditionItem(value);
            newValue.value = val || '';
            changeTrigger(newValue);
          }}
        />
      }
    </>
  );
};

export default ValueCondition;