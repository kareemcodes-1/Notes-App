import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStore } from './store/store';

const QuillEditor = () => {
  const { setNotes, editNotes, editingMode, editingNote } = useStore();
  const [value, setValue] = useState<string>(editingNote ? editingNote.content : '');
  const [color, setColor] = useState<string>(editingNote ? editingNote.color : '#ffffff');

  useEffect(() => {
    if(editingMode && editingNote){
      setValue(editingNote.content);
      setColor(editingNote.color);
    }
  }, [editingMode, editingNote]);

  const quillRef = useRef<ReactQuill | null>(null);


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const updatedNote = {
        id: editingNote ? editingNote.id : Date.now(),
        content: value,
        color,
      };

       if(editingMode){
        editNotes(updatedNote);
       }else{
        setNotes(updatedNote); 
       }


      // Reset local states
      setValue('');
      setColor('#ffffff');
  };

  return (
    <form onSubmit={onSubmit} className="relative flex items-center justify-center w-full">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        className="w-full h-screen"
      />
      <div className="absolute right-[1rem] top-0 flex items-center py-[.2rem]">
        <input
          type="color"
          value={color}
          className='mr-[1rem]'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
        />
            <button type="submit" className="btn !min-h-[2.2rem] !h-[2.2rem] !px-[1rem]">
          {editingMode ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default QuillEditor;
