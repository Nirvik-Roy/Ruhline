import React, { useRef, useState } from 'react'
import icon from '../../assets/Images/Frame (1).svg'
import './AddNote.css'
import edit from '../../assets/Images/icon (3).svg'
import deleteicon from '../../assets/Images/elements.svg'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import Textarea from '../Inputs/Textarea'
const AddNote = () => {
    const [noteOpen, setnoteOpen] = useState(false);
    const noteRef = useRef()
    const [note, setNote] = useState({
        noteList: true,
        noteAdd: false
    })
    const noteFunc = (i) => {
        setNote({
            noteList: i === 1 ? true : false,
            noteAdd: i === 2 ? true : false
        })
    }

    const closeDropdownFunc = (e) => {
        if (noteRef.current && noteRef.current.contains(e.target)) {
            return null;
        } else {
            setnoteOpen(false)
        }

    }

    document.addEventListener('mousedown', closeDropdownFunc)
    return (
        <>
            {noteOpen && <div ref={noteRef} className='note_list_wrapper'>
                <div className='note_list_head_wrapper'>
                    <h3 onClick={(()=>noteFunc(1))} >Notes</h3>
                    <i onClick={(()=>setnoteOpen(false))} class="fa-solid fa-xmark"></i>
                </div>

                {note.noteList && <>

                    <div className='note_list'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (

                            <div className='note13'>
                                <div className='note_head'>
                                    <p>08/01/2026   6:55 AM</p>
                                    <div className='note_edit_delete_icon_wrapper'>
                                        <img src={edit} />
                                        <img src={deleteicon} />
                                    </div>

                                </div>
                                <h3>Lorem ipsum dolor sit ullamco labo...</h3>
                            </div>
                        ))}
                    </div>

                    <div className='add_note_button_wrapper' onClick={(() => noteFunc(2))}>
                        <Button styles={{
                            border: '1px solid var(--primary-color)',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            fontSize: '13px',
                            padding: '10px'
                        }} children={'Add Note'} />
                    </div>
                </>

                }

                {note.noteAdd && <>

                    <div className='add_note_form_wrapper'>
                        <div  className='add_note_form_head'>
                            <i onClick={(()=>noteFunc(1))} class="fa-solid fa-arrow-left"></i>
                            <p>Add a Note</p>
                        </div>

                        <Input label={'Headline '} defaultValue={'Align your body. Center your mind.'} />
                        <Textarea label={'Note'} required={'true'} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '} />
                    </div>
                    <div className='add_note_button_wrapper' onClick={(() => noteFunc(1))}>
                        <Button styles={{
                            border: '1px solid var(--primary-color)',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            fontSize: '13px',
                            padding: '10px'
                        }} children={'Add'} />
                    </div>
                </>
                }
            </div>}
            <div onClick={(() => setnoteOpen(!noteOpen))} className='add_note_wrapper'>
                <img src={icon} />
            </div>
        </>
    )
}

export default AddNote
