const getNestedPropertyValue = (obj: any, propertyPath: string): any => {
  const properties = propertyPath.split('.');

  return properties.reduce((prev, curr) => {
    return prev && prev[curr];
  }, obj);
};

export const haveSameProperty = (arr: any[], propertyPath: string): boolean => {
  if (arr.length === 0) {
    return false;
  }

  const referenceValue = getNestedPropertyValue(arr[0], propertyPath);

  return arr.every(
    (obj) => getNestedPropertyValue(obj, propertyPath) === referenceValue,
  );
};
