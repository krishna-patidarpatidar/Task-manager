import React, { useState, useEffect } from 'react';
import { TiInputChecked } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import ATMTextField from '../../Component/Input/ATMTextField';
import ATMButtonField from '../../Component/Button/ATMButtonField';

type Task = {
    id: string;
    text: string;
};



const HomePage: React.FC = () => {
    const [list, setList] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [confirmedList, setConfirmedList] = useState<Task[]>([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedList = localStorage.getItem('LIST');
        const storedConfirmedList = localStorage.getItem('CONFIRMEDLIST');


        if (storedList) {
            setList(JSON.parse(storedList));
        }
        if (storedConfirmedList) {
            setConfirmedList(JSON.parse(storedConfirmedList));
        }

    }, []);



    // Save list and confirmedList to localStorage when they change
    useEffect(() => {
        localStorage.setItem('LIST', JSON.stringify(list));
        localStorage.setItem('CONFIRMEDLIST', JSON.stringify(confirmedList));
    }, [list, confirmedList]);

    const addList = () => {
        if (inputValue.trim()) {
            const newTask: Task = { id: uuidv4(), text: inputValue };
            setList((prevList) => [...prevList, newTask]);
            setInputValue('');
        }
    };

    const confirm = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to confirm this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const itemToConfirm = list.find((item) => item.id === id);
                if (itemToConfirm) {
                    setConfirmedList((prev) => [...prev, itemToConfirm]);
                    setList((prev) => prev.filter((item) => item.id !== id));
                }
                Swal.fire('Confirmed!', 'Your task has been confirmed.', 'success');
            }
        });
    };

    const del = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setList((prev) => prev.filter((item) => item.id !== id));
                setConfirmedList((prev) => prev.filter((item) => item.id !== id));
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                Task Management System
            </h1>

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <ATMTextField
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your task"
                    inputSize='lg'
                />
                <ATMButtonField
                    label="Add Task"
                    onClick={addList}
                    variant='success'
                    size='lg' />
                    
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pending Tasks */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
                    <ul className="space-y-2">
                        {list.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md"
                            >
                                <span>{item.text}</span>
                                <div className="flex gap-2">
                                    <ATMButtonField
                                        onClick={() => confirm(item.id)}
                                        label={<TiInputChecked />}
                                        variant='primary'
                                    />
                                    <ATMButtonField
                                        onClick={() => del(item.id)}
                                        label={<MdDeleteForever />}
                                        variant='danger' />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Confirmed Tasks */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Confirmed Tasks</h2>
                    <ul className="space-y-2">
                        {confirmedList.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center bg-green-100 p-4 rounded shadow-md"
                            >
                                <span>{item.text} (Confirmed)</span>
                                <ATMButtonField
                                    onClick={() => del(item.id)}
                                    label={<MdDeleteForever />}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
