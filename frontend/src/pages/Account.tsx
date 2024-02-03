import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext';
import { DefaultService } from '../api';

export default function Account() {
  const { logout } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  React.useEffect(() => {
    DefaultService.getUserDataUserMeGet().then((res) => {
      setEmail(res.email);
      setName(res.username);
      setDate(res.birth_date);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => logout()}>
          Sign Out
        </button>
      </div>


      <div className="flex-col flex items-center justify-center">
        <div className="rounded-full py-24 h-32 w-32 bg-white flex items-center justify-center">
          <svg
            className="h-32 w-32 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className='w-3/4'>
          <div className="border-2 py-2 px-4 border-blue-500 rounded-xl shadow-xl">
            <div className="text-lg font-medium text-black">{name}</div>
            <div className="text-sm text-blue-500">{email}</div>
            <div className="text-sm text-black">Date of Birth: {date}</div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>

  )
}