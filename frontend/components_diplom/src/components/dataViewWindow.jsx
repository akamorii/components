import React, { useEffect, useState } from 'react';
import DataViewHeaders from './dataViewHeaders';
import ViewHead from './viewHead';

const DataViewWindow = () => {
    const [allHeaders, setHeaders] = useState([]);
    const [sortType, setSortType] = useState("value1"); // default: none
    const [rawStorage, setRawStorage] = useState([]); // для оригинальных данных без сортировки

    const handleSortChange = (newSort) => {
        console.log("Выбранная сортировка:", newSort);
        setSortType(newSort);
    };

    const pieceByPosition = {
        1: '30%',
        2: '15%',
        3: '20%',
        4: '10%',
        5: '25%'
    };

    const applySort = (storage, type) => {
        const sorted = [...storage];

        switch (type) {
            case "value2": // A-Z (по первому name)
                sorted.sort((a, b) =>
                    a[1].localeCompare(b[1], 'ru') // кириллица и латиница
                );
                break;
            case "value3": // Z-A (по первому name)
                sorted.sort((a, b) =>
                    b[1].localeCompare(a[1], 'ru')
                );
                break;
            case "value4": // 1-n (по 4-му полю: числовая сортировка)
                sorted.sort((a, b) =>
                    Number(a[4]) - Number(b[4])
                );
                break;
            case "value5": // n-1 (по 4-му полю: числовая сортировка, обратный порядок)
                sorted.sort((a, b) =>
                    Number(b[4]) - Number(a[4])
                );
                break;
            case "value1":
            default:
                // без сортировки, возвращаем как есть
                return storage;
        }

        return sorted;
    };

    const formatStorage = (storage) => {
        return storage.map(arr => {
            const recordId = arr[0]; // берём ID из первого элемента
            const data = [];
    
            for (let i = 1; i < arr.length; i++) {
                const name = String(arr[i]);
                data.push({
                    id: i,
                    name,
                    piece: pieceByPosition[i] || '0%'
                });
            }
    
            return {
                isTitleLine: false,
                recordId, // сохраняем id записи
                data
            };
        });
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/storage/get_storage_elements')
            .then(response => response.json())
            .then(data => {
                const storage = data.result.storage;
                setRawStorage(storage); // сохраняем оригинальные данные
                const sorted = applySort(storage, sortType);
                const formatted = formatStorage(sorted);
    
                const titleRow = {
                    isTitleLine: true,
                    data: [
                        {id: 1, name: 'название', piece: '30%'},
                        {id: 2, name: 'артикул', piece: '15%'},
                        {id: 3, name: 'ед. измерения', piece: '20%'},
                        {id: 4, name: 'кол-во', piece: '10%'},
                        {id: 5, name: 'дата пр.', piece: '25%'}
                    ]
                };
    
                setHeaders([titleRow, ...formatted]);
            })
            .catch(err => {
                console.error('Ошибка при загрузке данных:', err);
            });
    }, []);

    useEffect(() => {
        if (rawStorage.length === 0) return;
        const sorted = applySort(rawStorage, sortType);
        const formatted = formatStorage(sorted);
    
        const titleRow = {
            isTitleLine: true,
            data: [
                { id: 1, name: 'название', piece: '30%' },
                { id: 2, name: 'артикул', piece: '15%' },
                { id: 3, name: 'ед. измерения', piece: '20%' },
                { id: 4, name: 'кол-во', piece: '10%' },
                { id: 5, name: 'дата пр.', piece: '25%' }
            ]
        };
    
        setHeaders([titleRow, ...formatted]);
    }, [sortType]);
    console.log(allHeaders);
    return (
        <div className='main-view-container'>
            <div className='main-view'>
                <ViewHead onSortChange={handleSortChange} />
                {allHeaders.map((obj, index) => (
                    <div key={index} className={`row record-${obj.recordId}`} data-id={obj.recordId}>
                        <DataViewHeaders headers={obj} recordId={obj.recordId} />
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default DataViewWindow;