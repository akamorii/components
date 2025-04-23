import React, { useEffect, useState } from 'react';
import './../styles/app.css';
import Modal from './UI/modal/modal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AsidePanel = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [storageData, setStorageData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [graphType, setGraphType] = useState(null);

    const fetchStats = () => {
        fetch('http://127.0.0.1:8000/storage/get_storage_elements')
            .then(res => res.json())
            .then(data => {
                const storage = data.result.storage;

                setStorageData(storage);
                setTotalItems(storage.length);

                const countSum = storage.reduce((sum, row) => {
                    const count = Number(row[4]);
                    return sum + (isNaN(count) ? 0 : count);
                }, 0);

                setTotalCount(countSum);
            })
            .catch(err => console.error("Ошибка при получении статистики:", err));
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const processChartData = () => {
        const map = new Map();

        storageData.forEach(row => {
            const date = row[5];
            const count = Number(row[4]);
            if (!/\d{2}-\d{2}-\d{2}/.test(date)) return;

            if (!map.has(date)) {
                map.set(date, 0);
            }
            map.set(date, map.get(date) + (isNaN(count) ? 0 : count));
        });

        return Array.from(map.entries()).map(([date, value]) => ({ date, value }));
    };

    const chartData = processChartData();
    const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];

    const renderGraph = () => {
        if (!graphType || chartData.length === 0) return null;

        switch (graphType) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="date" cx="50%" cy="50%" outerRadius={100}>
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className='aside'>
            <h3>📊 Статистика</h3>
            <p>Всего позиций: <strong>{totalItems}</strong></p>
            <p>Общее количество: <strong>{totalCount}</strong></p>
            <button onClick={fetchStats} className="recalc-btn">🔄 Пересчитать</button>

            <h4>📈 Построить график:</h4>
            <button className="graph-btn" onClick={() => { setGraphType('bar'); setModalVisible(true); }}>📊 Столбчатый</button>
            <button className="graph-btn" onClick={() => { setGraphType('line'); setModalVisible(true); }}>📈 Линейный</button>
            <button className="graph-btn" onClick={() => { setGraphType('pie'); setModalVisible(true); }}>🥧 Круговой</button>

            <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <h2>График по дате</h2>
                {renderGraph()}
            </Modal>
        </div>
    );
};

export default AsidePanel;
