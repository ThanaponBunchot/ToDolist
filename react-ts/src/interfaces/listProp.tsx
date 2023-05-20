export interface ToDoListProps {
  ToDoList: {
    id: string;
    title: string;
    completed: boolean;
    checked:boolean;
    isOpen:boolean
  }[]
}
