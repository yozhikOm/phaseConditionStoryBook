import { IconButton } from '@fluentui/react';
import BoolCondition from './BoolCondition';
import { BoolConditionItem } from './BoolConditionItem';
import ValueCondition from './ValueCondition';
import { ValueConditionItem } from './ValueConditionItem';
import { IConditionItem } from './interfaces';
import { JSX, useState } from 'react';

interface IProps {
  value?: IConditionItem | null;
  onChange?: (data: IConditionItem | null) => void;
}

enum ConditionType {
  ValueCond = 'ValueCond',
  BoolCond = 'BoolCond',
}

const getValueType = (val?: IConditionItem | null): ConditionType | null => {
  if (val === null || typeof val === 'undefined') {
    return null;
  }
  if (val instanceof ValueConditionItem) {
    return ConditionType.ValueCond;
  }
  else if (val instanceof BoolConditionItem) {
    return ConditionType.BoolCond;
  }
  return null;
}

const ConditionComponent = (props: IProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { value, onChange } = props;
  const valueType = getValueType(value);

  const changeTrigger = (
    newValue: IConditionItem | null
  ) => {
    if (!onChange || typeof onChange !== 'function') {
      return;
    }
    onChange(newValue);
    setIsHovered(false)
  };

  return (
    <div className={`phase-condition-item__container${isHovered ? ' hovered' : ''}${value ? ' centered' : ''}`}>
      {valueType === ConditionType.ValueCond &&
        <ValueCondition
          value={value as ValueConditionItem}
          onChange={onChange}
        />
      }
      {valueType === ConditionType.BoolCond &&
        <BoolCondition
          value={value as BoolConditionItem}
          onChange={onChange}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      }
      <IconButton
        iconProps={{ iconName: value ? 'Edit' : 'Add' }}
        title={value ? 'Редактировать' : 'Добавить'}
        menuProps={{
          items: [
            {
              key: 'valueCondition',
              text: 'Value Condition',
              iconProps: { iconName: 'StatusCircleQuestionMark' },
              disabled: valueType === ConditionType.ValueCond,
              onClick: () => {
                const newValue = new ValueConditionItem(value as BoolConditionItem);
                changeTrigger(newValue);
              }
            },
            {
              key: 'boolCondition',
              text: 'Bool Condition',
              iconProps: { iconName: 'Org' },
              disabled: valueType === ConditionType.BoolCond,
              onClick: () => {
                const newValue = new BoolConditionItem(value as ValueConditionItem);
                changeTrigger(newValue);
              }
            },
            {
              key: 'deleteCondition',
              text: 'Delete Condition',
              iconProps: { iconName: 'Delete', styles: { root: { color: 'palevioletred' } } },
              disabled: !value,
              onClick: () => {
                changeTrigger(null);
              }
            }
          ],
        }}
        disabled={false}
        checked={false}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}

export default ConditionComponent;