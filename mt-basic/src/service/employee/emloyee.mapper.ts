import { EmployeeDetailDTO } from 'src/dto/employee.dto';
import { BoniModel } from 'src/modules/database/models/boni.model';
import { EmployeeModel } from 'src/modules/database/models/employee.model';
import { MissingDaysModel } from 'src/modules/database/models/missing-days.model';
import { PerformanceRatingModel } from 'src/modules/database/models/performance-rating.model';

export function mapDetailEmployee(
  employee: EmployeeModel,
  boni: BoniModel[],
  performanceRatings: PerformanceRatingModel[],
  missingDays: MissingDaysModel[],
): EmployeeDetailDTO {
  return {
    ...employee,
    missingDays,
    performanceRatings,
    boni,
  };
}
