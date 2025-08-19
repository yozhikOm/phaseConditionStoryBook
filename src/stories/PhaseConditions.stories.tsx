import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PhaseConditions from '../common/components/PhaseConditions';
import { loadFonts } from '../common/utils/fonts';
import { ValueConditionItem } from '../common/components/PhaseConditions/ValueConditionItem';
import { BOOL_OPERATOR, FIELD_NAMES, OPERATOR } from '../common/components/PhaseConditions/constants';
import { BoolConditionItem } from '../common/components/PhaseConditions/BoolConditionItem';
import { BaseButton, CommandBarButton, Dialog, PrimaryButton, TextField } from '@fluentui/react';
import '../common/components/PhaseConditions/styles.css';

loadFonts();

const meta = {
  title: 'Example/PhaseConditions',
  component: PhaseConditions,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PhaseConditions>;

export default meta;
type Story = StoryObj<typeof meta>;

const PhaseConditionsWithDialog: React.FC<{ initialValue?: any }> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <CommandBarButton
        iconProps={{ iconName: 'Add' }}
        text={'Добавить'}
        disabled={false}
        checked={false}
        onClick={() => {
          setIsHidden(false);
        }}
      />
      <Dialog
        hidden={isHidden}
        onDismiss={() => setIsHidden(true)}
        dialogContentProps={{
          title: 'AddCondition',
          titleId: 'phaseModalTitleContainer'
        }}
        modalProps={{
          containerClassName: 'phase-modal__main',
        }}
      >
        <div className='phase-modal-dialog__container'>
          <div className='phase-modal-dialog__body'>
            <TextField
              className='phase-modal-dialog__text-field'
              disabled
              multiline={true}
              rows={3}
              value={value?.toString()}
            />
            <PhaseConditions
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
            />
          </div>

          <div className='phase-modal-dialog__footer'>
            <PrimaryButton
              className={'phase-modal-button phase-modal-button-save'}
              text='Save'
              onClick={() => {
                setIsHidden(true);
              }}
            />
            <BaseButton
              className={'phase-modal-button'}
              text='Cancel'
              onClick={() => setIsHidden(true)}
            />
          </div>
        </div>
      </Dialog>
      <p>Input: value changed: {value?.toString()}</p>
    </>
  );
};

const operand1 = new ValueConditionItem({
  fieldKey: FIELD_NAMES.Amount.key,
  operator: OPERATOR.ge,
  value: '100'
} as ValueConditionItem);

const operand2 = new ValueConditionItem({
  fieldKey: FIELD_NAMES.Amount.key,
  operator: OPERATOR.le,
  value: '1000'
} as ValueConditionItem);

const operand2_1 = new ValueConditionItem({
  fieldKey: FIELD_NAMES.Company.key,
  operator: OPERATOR.eq,
  value: 'Company1'
} as ValueConditionItem);

const operand2_2 = new ValueConditionItem({
  fieldKey: FIELD_NAMES.Company.key,
  operator: OPERATOR.eq,
  value: 'Company2'
} as ValueConditionItem);

const boolConditionNOT = new BoolConditionItem();
boolConditionNOT.operand1 = operand1;
boolConditionNOT.operator = BOOL_OPERATOR.NOT;

const mockBoolCond1 = new BoolConditionItem();
mockBoolCond1.operator = BOOL_OPERATOR.AND;
mockBoolCond1.operand1 = operand1;
mockBoolCond1.operand2 = operand2;

const mockBoolCond2 = new BoolConditionItem()
mockBoolCond2.operator = BOOL_OPERATOR.OR;
mockBoolCond2.operand1 = operand2_1;
mockBoolCond2.operand2 = operand2_2;

const complexBoolCond = new BoolConditionItem();
complexBoolCond.operator = BOOL_OPERATOR.AND;
complexBoolCond.operand1 = mockBoolCond1;
complexBoolCond.operand2 = mockBoolCond2;

export const ValueCondition: Story = {
  render: () => (
    <PhaseConditionsWithDialog 
      initialValue={new ValueConditionItem({
        fieldKey: FIELD_NAMES.Company.key,
        operator: OPERATOR.ne,
        value: 'фарма'
      } as ValueConditionItem)}
    />
  )
};

export const ValueConditionBool: Story = {
  render: () => (
    <PhaseConditionsWithDialog 
      initialValue={new ValueConditionItem({
        fieldKey: FIELD_NAMES['Is Framework'].key,
        operator: OPERATOR.ne,
        value: 'True'
      } as ValueConditionItem)}
    />
  )
};

export const BoolConditionNot: Story = {
  render: () => (
    <PhaseConditionsWithDialog initialValue={boolConditionNOT} />
  )
};

export const BoolCondition: Story = {
  render: () => (
    <PhaseConditionsWithDialog initialValue={mockBoolCond1} />
  )
};

export const BoolConditionComplex: Story = {
  render: () => (
    <PhaseConditionsWithDialog initialValue={complexBoolCond} />
  )
};

export const Empty: Story = {
  render: () => (
    <PhaseConditionsWithDialog initialValue={undefined} />
  )
};