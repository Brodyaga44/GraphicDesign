export interface IWorkReview {
  author: {
    username: string;
    directions: string[];
    createdAt: string;
    roles: { name: string }[];
    name: string;
    id: number;
    email: string;
    about: string;
    skills: string;
    isApproved: boolean;
    isBlocked: boolean;
    photoFileName: string;
    photoUri: string;
    approved: boolean;
    blocked: boolean;
    orgOidRestriction: string | null;
  };
  text: string;
  id: number;
  workId: number;
}
