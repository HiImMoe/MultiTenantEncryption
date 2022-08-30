export function calcTenantSize(tenantNumber: number, tenantTotalNumber: number, maxEmployeeSize: number) {
  if (tenantNumber / tenantTotalNumber < 0.33) {
    return Math.floor(maxEmployeeSize * 0.33);
  } else if (tenantNumber / tenantTotalNumber < 0.66) {
    return Math.floor(maxEmployeeSize * 0.66);
  } else {
    return maxEmployeeSize;
  }
}
