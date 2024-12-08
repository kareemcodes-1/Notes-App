import {create} from "zustand";

export type Note = {
    id: number;
    content: string; 
    color: string;
}

type StoreState = {
    notes: Note[],
    editingNote?: Note;
    filteredNotes: Note[],
    findNote: (note: Note) => void;
    editingMode: boolean;
    setNotes: (note: Note) => void;
    editNotes: (note: Note) => void;
    searchTerm: (value: string) => void;
}

const storedData = localStorage.getItem('notes');

export const useStore = create<StoreState>((set) => ({
    notes: storedData ? JSON.parse(storedData) : [],
    filteredNotes: storedData ? JSON.parse(storedData) : [],
    editingMode: false,
    searchTerm (value){
        return set((state) => {
            const updatedNotes = state.filteredNotes.filter((note) => note.content.includes(value));
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            return {
                ...state,
                notes: updatedNotes
            }
        })
    },
    findNote: (note) => {{
        set((state) => (
            {
                ...state,
                editingNote: note,
                editingMode: true
            }
        ))
    }
    },
    setNotes(note) {
        return set((state) => {
           const updatedNotes = [...state.notes, note];
           localStorage.setItem('notes', JSON.stringify(updatedNotes));
           return {
            ...state,
            notes: updatedNotes,
            filteredNotes: updatedNotes,
           }
    })
    },
    editNotes(note) {
        return set((state) => {
             const updatedNotes = state.notes.map((n) => {
                  if(note.id === n.id){
                    return {
                        ...note,
                    }
                  }else{
                    return n;
                  }
             });

             localStorage.setItem('notes', JSON.stringify(updatedNotes));
             
             return {
                ...state,
                notes: updatedNotes,
                editingMode: false,
                editingNote: undefined
             }

             
        })
    },
}))