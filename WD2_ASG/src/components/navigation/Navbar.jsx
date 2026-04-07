// export default function Navbar({ setPage }) {
//   return (
//     <div className="bg-gray-800 text-white p-4 items-center gap-2 flex">
//       <h1>Ticketing System (Layout)</h1>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Dashboard
//       </button>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Create Ticket
//       </button>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Logout
//       </button>
//     </div>
//   );
// }

import { useAuth } from "../../auth/useAuth";
import UserNav from "./UserNav";
import TechnicianNav from "./TechnicianNav";

export default function Navbar({ setPage }) {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white p-4 flex gap-4">
      {user.role === "user" ? (
        <UserNav setPage={setPage} />
      ) : (
        <TechnicianNav setPage={setPage} />
      )}
      <button onClick={logout} className="ml-auto">
        Logout
      </button>
    </div>
  );
}
