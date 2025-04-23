import React from 'react';
import ViewHeader from './viewHeader';

const DataViewHeaders = ({ headers, recordId, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/storage/delete_storage_elem?id=${recordId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Запись с id ${recordId} удалена`);
                if (onDelete) onDelete(recordId); // коллбек для обновления списка
            } else {
                console.error('Ошибка при удалении элемента');
            }
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    return (
        <div className={`headersLine ${headers.isTitleLine ? 'titleLineHeaders' : ''}`}>
            {headers.data.map((obj, index) => (
                <ViewHeader key={index} headerData={obj} />
            ))}

            {!headers.isTitleLine && (
                <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
                    ❌
                </button>
            )}
        </div>
    );
};

export default DataViewHeaders;