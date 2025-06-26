
// Type definitions for the PTS Report Card system
export interface Chapter {
  name: string;
  correct: string;
  incorrect: string;
  timeSpent: string;
  marks: string;
  whatWentWrong: string;
  learnings: string;
}

export interface Subject {
  name: string;
  icon: string;
  color: string;
  maxMarks: number;
  chapters: Chapter[];
}

export interface SubjectData {
  [key: string]: Subject;
}

export interface StudentInfo {
  name: string;
  mockNo: string;
  rank: number;
  totalMarks: number;
  maxMarks: number;
  percentile: number;
}

export interface ChapterStats {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  timeSpent: number;
  totalMarks: number;
  percentage: number;
}

export interface SubjectAnalysis {
  name: string;
  icon: string;
  color: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  timeSpent: number;
  totalMarks: number;
  percentage: number;
}
