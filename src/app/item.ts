export interface Item{
    id: number;
    title: string;
    text: string;
    deadline: Date;
    completed: boolean;
    todoListId: number;
}