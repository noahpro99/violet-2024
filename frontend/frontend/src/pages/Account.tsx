import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-[#f7d2ce]">
      <main>
        {/* sign out button */}
        <div className="flex justify-end p-4">
          <button className="bg-[#f6a4ab] text-white px-4 py-2 rounded-md" onClick={() => logout()}
          > Sign Out</button>
        </div>
      </main >
      <Navbar />
    </div >
  )
}