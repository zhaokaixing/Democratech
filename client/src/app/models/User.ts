/**
 * Created by flwrnt on 28/03/17.
 */
import {Project} from "./Project";

export class User {
  _id?: string;
  isPhysic?: boolean;
  mail: string;
  password: string;
  name: string;
  lastName?: string;
  birthDate?: Date;
  description?: string;
  SIRET?: number;
  phone?: string;
  authority?: boolean;
  isPublic?: boolean;
  image?: string;
  address: {
    streetNumber: number;
    streetName: string;
    city: string;
    postalCode: string;
    department: string;
    country: string;
  };
  resume?: {
    path?: string;
    diplomas?: [{
      title: string;
      date: string;
    }]
    skills?: [{
      label: string;
      level: number;
    }]
    jobs?: [{
      label: string;
      startDate: Date;
      endDate: Date;
      description: string;
      category: string;
      tags: [{
        label: string;
        category: string;
      }]
    }]
  };

  tags?: [{
    label: string;
    category: string;
  }];

  ownedProjects?: Array<Project>;
  FollowedProjects?: Array<Project>;

  jobsOffer?: [{
    label: string;
    startDate: Date;
    endDate: Date;
    description: string;
    category: string;
    listTags: [{
      label: string;
      category: string;
    }]
  }];

  constructor() {}
}
