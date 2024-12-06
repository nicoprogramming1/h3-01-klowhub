export interface CourseData {
  id: number;
  type: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  calification: number;
  price: number;
}
