export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Full content for the modal
  image: string;
}

export interface CareerItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export enum ModalType {
  NONE,
  ENROLL,
  REGISTER,
  BLOG_DETAIL
}