export type LabelPosition = 'before' | 'after';

export const getLabelPosition = (
  labelPosition: LabelPosition
): 'row' | 'row-reverse' => {
  return labelPosition === 'after' ? 'row' : 'row-reverse';
};
