import { Dropdown, IDropdownOption } from '@fluentui/react';
import { BOOL_OPERATOR } from './constants';
import { BoolConditionItem } from './BoolConditionItem';
import { IConditionItem } from './interfaces';
import ConditionComponent from './Component';
import { JSX } from 'react';


const dropdownOptions = Object.keys(BOOL_OPERATOR).map(key => (
  { key, text: BOOL_OPERATOR[key as keyof typeof BOOL_OPERATOR] }
)) as Array<IDropdownOption>;

interface IProps {
  value?: BoolConditionItem;
  onChange?: (data: IConditionItem) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BoolCondition = (props: IProps): JSX.Element => {
  const value = props.value ? new BoolConditionItem(props.value) : null;
  const { onChange, onMouseEnter, onMouseLeave } = props;

  const changeTrigger = (
    newValue: IConditionItem
  ) => {
    if (!onChange || typeof onChange !== 'function') {
      return;
    }
    onChange(newValue);
  };

  const renderOperator = (): JSX.Element => {
    return (
      <>
        <Dropdown
          className={'phase-condition__operator'}
          options={dropdownOptions}
          selectedKey={value?.operator}
          onChange={(_, option) => {
            const newValue = new BoolConditionItem(value);
            newValue.operator = option?.key as BOOL_OPERATOR;
            changeTrigger(newValue);
          }}
          onMouseEnter={() => {
            if (onMouseEnter && typeof onMouseEnter === 'function') {
              onMouseEnter();
            }
          }}
          onMouseLeave={() => {
            if (onMouseLeave && typeof onMouseLeave === 'function') {
              onMouseLeave();
            }
          }}
        />
      </>
    );
  };

  return (
    <div className='bool-condition-container'>
      {value && value.operator === BOOL_OPERATOR.NOT &&
        renderOperator()
      }
      <div className='phase-bool-condition__operand'>
        <span className='phase-bool-condition__label'>
          Operand1:
        </span>
        <ConditionComponent
          value={value?.operand1}
          onChange={(val) => {
            const newValue = new BoolConditionItem(value);
            newValue.operand1 = val;
            changeTrigger(newValue);
          }}
        />
      </div>

      {(value === null || value.operator !== BOOL_OPERATOR.NOT) &&
        <>
          <div>
            {renderOperator()}
          </div>
          <div className='phase-bool-condition__operand'>
            <span className='phase-bool-condition__label'>
              Operand2:
            </span>
            <ConditionComponent
              value={value?.operand2}
              onChange={(val) => {
                const newValue = new BoolConditionItem(value);
                newValue.operand2 = val;
                changeTrigger(newValue);
              }}
            />
          </div>
        </>
      }
    </div>
  );
};

export default BoolCondition;