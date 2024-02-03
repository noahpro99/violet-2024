import { useState } from 'react';
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { logout } = useAuth();
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const[date,setDate] = useState('');
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-end p-4">
        <button className="bg-[#f6a4ab] text-white px-4 py-2 rounded-md" onClick={() => logout()}>
          Sign Out
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
          <div className="flex items-center space-x-4 p-2">
            <div className="rounded-full h-12 w-12 bg-blue-500 flex items-center justify-center">
              <img src="" alt="avatar" className="rounded-full h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-lg font-medium text-black">User Name</div>
              <div className="text-sm text-blue-500">user@example.com</div>
              <div className="text-sm text-black">Date of Birth: 01/01/1990</div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>

  )
}