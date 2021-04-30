export interface TodoProps {
  id: number;
  value: string;
  time: string;
  isDone?: boolean;
}

export interface FormProps {
  onAdd?: (data: TodoProps) => void;
  onEdit?: (addTodo: string) => void;
  onSearch?: (addTodo: string) => void;
  type: string;
  defaultValue?: string;
  todo?: TodoProps;
}

export interface FormEditProps {
  todo: TodoProps;
  mapNewData: (todo: TodoProps, type: string, value: string) => void;
}

export type MapNewDataProps = {
  todo: TodoProps;
  type: string;
  value: string;
};
