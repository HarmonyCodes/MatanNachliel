import { useState } from "react";
import { useAddBookMutation } from "./bookApiSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";

const AddBook = () => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        author: "",
        subject: "",
        category: "",
        notes: "",
        image: null,
        donor: "",
    });

    const [addBook, { isLoading }] = useAddBookMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(formData)
        setFormData({
            code: "",
            name: "",
            author: "",
            subject: "",
            category: "",
            notes: "",
            image: null,
            donor: ""
        });
    }
    return (
        <>
            <div className="book-form">
                <h2>הוספת ספר חדש</h2>
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="code">קוד ספר</label>
                        <InputText id="code" name="code" value={formData.code} onChange={handleChange} required />
                    </div>
                    <div className="p-field">
                        <label htmlFor="name">שם ספר</label>
                        <InputText id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="p-field">
                        <label htmlFor="author">מחבר</label>
                        <InputText id="author" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div className="p-field">
                        <label htmlFor="subject">נושא</label>
                        <InputTextarea id="subject" name="subject" value={formData.subject} onChange={handleChange} rows={3} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="category">קטגוריה</label>
                        <Dropdown id="category" name="category" value={formData.category} options={[{ categories }]} onChange={handleChange} placeholder="בחר קטגוריה" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="notes">הערות</label>
                        <InputTextarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="image">תמונה</label>
                        <FileUpload id="image" name="image" mode="basic" accept=".jpg,.jpeg,.png" customUpload uploadHandler={(e) => setFormData({ ...formData, image: e.files[0] })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="donor">תורם</label>
                        <InputText id="donor" name="donor" value={formData.donor} onChange={handleChange} />
                    </div>
                    <Button type="submit" label="הוסף ספר" icon="pi pi-plus" loading={isLoading} />
                </form>
            </div>

        </>
    )

}