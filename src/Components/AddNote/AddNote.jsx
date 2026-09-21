import React, { useEffect, useRef, useState } from 'react'
import icon from '../../assets/Images/Frame (1).svg'
import './AddNote.css'
import edit from '../../assets/Images/icon (3).svg'
import deleteicon from '../../assets/Images/elements.svg'
import Button from '../Button/Button'
import Input from '../Inputs/Input'
import Textarea from '../Inputs/Textarea'
import DeleteModal from '../DeleteModal/DeleteModal'
import { createNote, deleteNote, getNotes, updateNote } from '../../utils/dashboard'

const formatNoteDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
}

const truncateText = (text, max = 40) => {
    if (!text) return ''
    return text.length > max ? `${text.slice(0, max)}...` : text
}

const emptyForm = { headline: '', note: '' }

const AddNote = () => {
    const [noteOpen, setnoteOpen] = useState(false)
    const noteRef = useRef()
    const [note, setNote] = useState({
        noteList: true,
        noteAdd: false
    })
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [deleteModal, setdeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [deleteloading, setdeleteLoading] = useState(false)

    const noteFunc = (i) => {
        setNote({
            noteList: i === 1 ? true : false,
            noteAdd: i === 2 ? true : false
        })
    }

    const fetchNotes = async () => {
        setLoading(true)
        const res = await getNotes({ per_page: 15 })
        setNotes(res?.data || [])
        setLoading(false)
    }

    const resetForm = () => {
        setForm(emptyForm)
        setEditingId(null)
    }

    const goToList = () => {
        resetForm()
        noteFunc(1)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddClick = () => {
        resetForm()
        noteFunc(2)
    }

    const handleEdit = (item) => {
        setEditingId(item.id)
        setForm({
            headline: item.headline || '',
            note: item.note || ''
        })
        noteFunc(2)
    }

    const handleSubmit = async () => {
        if (!form.note?.trim()) return
        setSubmitting(true)
        const payload = {
            headline: form.headline?.trim() ? form.headline.trim() : null,
            note: form.note.trim()
        }
        const res = editingId
            ? await updateNote(payload, editingId)
            : await createNote(payload)
        setSubmitting(false)
        if (res?.id) {
            goToList()
            fetchNotes()
        }
    }

    const openDeleteModal = (id) => {
        setDeleteId(id)
        setdeleteModal(true)
    }

    const handleDelete = async () => {
        setdeleteLoading(true)
        const res = await deleteNote(deleteId)
        if (res?.success) {
            setdeleteModal(false)
            setDeleteId(null)
            fetchNotes()
        }
        setdeleteLoading(false)
    }

    useEffect(() => {
        if (noteOpen) {
            fetchNotes()
            goToList()
        }
    }, [noteOpen])

    useEffect(() => {
        if (!noteOpen) return
        const closeDropdownFunc = (e) => {
            if (deleteModal) return
            if (noteRef.current && noteRef.current.contains(e.target)) {
                return
            }
            setnoteOpen(false)
        }
        document.addEventListener('mousedown', closeDropdownFunc)
        return () => {
            document.removeEventListener('mousedown', closeDropdownFunc)
        }
    }, [noteOpen, deleteModal])

    return (
        <>
            {deleteModal && (
                <DeleteModal
                    loading={deleteloading}
                    setdeleteModal={setdeleteModal}
                    onClick={handleDelete}
                    title={'Delete note'}
                    details={'Do you really want to delete this note?'}
                />
            )}
            {noteOpen && <div ref={noteRef} className='note_list_wrapper'>
                <div className='note_list_head_wrapper'>
                    <h3 onClick={goToList}>Notes</h3>
                    <i onClick={() => setnoteOpen(false)} className="fa-solid fa-xmark"></i>
                </div>

                {note.noteList && <>
                    <div className='note_list'>
                        {loading && <p style={{ textAlign: 'center', fontSize: '13px' }}>Loading...</p>}
                        {!loading && notes?.length === 0 && (
                            <p style={{ textAlign: 'center', fontSize: '13px' }}>No notes yet</p>
                        )}
                        {!loading && notes?.map((item) => (
                            <div className='note13' key={item.id}>
                                <div className='note_head'>
                                    <p>{formatNoteDate(item.created_at)}</p>
                                    <div className='note_edit_delete_icon_wrapper'>
                                        <img src={edit} alt="edit" onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} />
                                        <img src={deleteicon} alt="delete" onClick={() => openDeleteModal(item.id)} style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <h3>{truncateText(item.headline || item.note)}</h3>
                            </div>
                        ))}
                    </div>

                    <div className='add_note_button_wrapper' onClick={handleAddClick}>
                        <Button styles={{
                            border: '1px solid var(--primary-color)',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            fontSize: '13px',
                            padding: '10px'
                        }} children={'Add Note'} />
                    </div>
                </>}

                {note.noteAdd && <>
                    <div className='add_note_form_wrapper'>
                        <div className='add_note_form_head'>
                            <i onClick={goToList} className="fa-solid fa-arrow-left"></i>
                            <p>{editingId ? 'Edit Note' : 'Add a Note'}</p>
                        </div>

                        <Input
                            label={'Headline '}
                            name="headline"
                            value={form.headline}
                            onChange={handleFormChange}
                            placeholder={'Align your body. Center your mind.'}
                        />
                        <Textarea
                            label={'Note'}
                            required={true}
                            name="note"
                            value={form.note}
                            onChange={handleFormChange}
                            placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. '}
                        />
                    </div>
                    <div
                        className='add_note_button_wrapper'
                        onClick={() => {
                            if (!form.note?.trim() || submitting) return
                            handleSubmit()
                        }}
                        style={{ opacity: !form.note?.trim() || submitting ? 0.5 : 1, pointerEvents: !form.note?.trim() || submitting ? 'none' : 'auto' }}
                    >
                        <Button styles={{
                            border: '1px solid var(--primary-color)',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--primary-color)',
                            fontSize: '13px',
                            padding: '10px'
                        }} children={submitting ? 'Saving...' : (editingId ? 'Update' : 'Add')} />
                    </div>
                </>}
            </div>}
            <div onClick={() => setnoteOpen(!noteOpen)} className='add_note_wrapper'>
                <img src={icon} alt="notes" />
            </div>
        </>
    )
}

export default AddNote
