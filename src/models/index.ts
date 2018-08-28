/* tslint:disable:variable-name */
import { AppData } from './AppData';
import { AssetSubCategory } from './Asset-sub-category';
import { AssetCategory } from './AssetCategory';
import { Assets } from './Assets';
import { AvailabilityCalender } from './AvailabilityCalender';
import { BusinessFunction } from './Business-function';
import { BusinessSubFunction } from './Business-sub-function';
import { Company } from './Company';
import { country } from './Country';
import { Education } from './Education';
import { EmployeeProjects } from './EmployeeProjects';
import { Experience } from './Experience';
import { Goals } from './Goals';
import { Holiday } from './Holidays';
import { Industry } from './Industries';
import { Interview } from './Interview';
import { InterviewAvailabilityCalender } from './InterviewAvailabilityCalender';
import { InterviewDetails } from './InterviewDetails';
import { Project } from './Project';
import { ProjectCategory } from './ProjectCategory';
import { Skills } from './Skills';
import { SkillCategory } from './SkillCategory';
import { SkillSubCategory } from './SkillSubCategory';
import { TempUser } from './TempUser';
import { TimeSlot } from './TimeSlots';
import { Wlb } from './WLB';
import { Favorites } from './Favorites';
import { Draft } from './Draft';
import { ProjectRequest } from './ProjectRequest';
import { User } from './User';

export const Models: { [key: string]: typeof AppData } = {
  Favorites,
  AppData,
  AssetSubCategory,
  AssetCategory,
  Assets,
  AvailabilityCalender,
  BusinessFunction,
  BusinessSubFunction,
  Company,
  country,
  Draft,
  Education,
  EmployeeProjects,
  Experience,
  Goals,
  Holiday,
  Industry,
  Interview,
  InterviewAvailabilityCalender,
  InterviewDetails,
  Project,
  ProjectCategory,
  Skills,
  SkillCategory,
  SkillSubCategory,
  TempUser,
  TimeSlot,
  Wlb,
  ProjectRequest,
  User,
};
