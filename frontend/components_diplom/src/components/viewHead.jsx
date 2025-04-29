import React, { useState } from 'react';
import Mybutton from './UI/button/mybutton';
import MyInput from './UI/input/myInput';
import MySelect from './UI/select/mySelect';
import Modal from './UI/modal/modal';

const ViewHead = ({ onSortChange }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [form, setForm] = useState({
        articul: '',
        name: '',
        unit: '',
        count: '',
        date: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const submitData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/storage/add_storage_element', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    count: Number(form.count)
                })
            });

            if (!response.ok) throw new Error('Ошибка при отправке данных');
            alert('Элемент добавлен успешно!');
            setModalVisible(false);
            setForm({ articul: '', name: '', unit: '', count: '', date: '' }); // очистить
        } catch (err) {
            console.error(err);
            alert('Ошибка при добавлении элемента');
        }
    };

    const handleSelectChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className='viewHead'>
            <MySelect style={{ width: '200px' }} onChange={handleSelectChange}>
                <option value="value1">none</option>
                <option value="value2">A-Z</option>
                <option value="value3">Z-A</option>
                <option value="value4">1-n</option>
                <option value="value5">n-1</option>
            </MySelect>

            <button
                style={{
                    width: '180px',
                    height: '30px',
                    position: 'relative',
                    left: '40px',
                    top: '35%'
                }}
                onClick={() => setModalVisible(true)}
            >
                Добавить элемент
            </button>

            <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <h2>Добавить новый элемент</h2>
                <MyInput name="articul" value={form.articul} onChange={handleInputChange} placeholder="Артикул" />
                <MyInput name="name" value={form.name} onChange={handleInputChange} placeholder="Название" />
                <MyInput name="unit" value={form.unit} onChange={handleInputChange} placeholder="Единица измерения" />
                <MyInput name="count" value={form.count} onChange={handleInputChange} placeholder="Количество" type="number" />
                <MyInput name="date" value={form.date} onChange={handleInputChange} placeholder="Дата" />
                
                <button onClick={submitData} style={{ marginTop: '10px', color:'white' }}>
                    Отправить
                </button>
            </Modal>
        </div>
    );
};

export default ViewHead;