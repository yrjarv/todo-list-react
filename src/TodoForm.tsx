import { useState} from "react"

interface TodoFormProps {
    onSubmit: (param1: string) => void
}

export function TodoForm ({ onSubmit }: TodoFormProps) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(newItem)
        setNewItem("")
    }
    
    return (
        <form
            onSubmit={handleSubmit}
            className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                type="text"
                id="item"
                />
                </div>
                <button className="btn">Add</button>
        </form>
    )
}