export interface Question {
    category: string;
    type: 'multiple' | 'boolean' | 'text';
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers?: string[];
  }
  