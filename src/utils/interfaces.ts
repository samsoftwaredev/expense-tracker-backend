export interface projectProps {
  name: string;
  description: string;
}

export interface projectDBProps {
  [projectId: string]: projectProps;
}

export interface projectOptionalProps {
  id: string;
  name?: string;
  description?: string;
}

export interface expenseProps {
  name: string;
  description: string;
  amount: string;
  location: string;
}

export interface expenseDBProps {
  [expenseId: string]: expenseProps;
}

export interface expenseOptionalProps {
  id: string;
  name?: string;
  description?: string;
  amount?: string;
  location?: string;
}
