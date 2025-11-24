export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  roles: string[];
  status: number;
  dateNaissance: string;
  ville: string;
  passion: string;
  travail: string;
  citation: string;
  signature: string;
  siteweb: string;
  avatarUrl: string;
  userbarUrl: string;
  lastVisit: string;
  nbLogin: number;
  nbForumMessage: number;
  nbMessageSent: number;
  nbMessageReceived: number;
  createdAt: string;
  updatedAt: string;
  subscriptionPreferencesPlan: string;
  subscriptionPreferencesInterval: string;
}
