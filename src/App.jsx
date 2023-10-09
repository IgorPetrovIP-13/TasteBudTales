import logo from "./assets/icons/logo.png";

function App() {
  return (
    <>
      <nav className="navbar px-7 py-6">
        <div className="flex-1">
          <a className="btn btn-outline btn-default">
            <img className="hover:brightness-0" src={logo} alt="TasteBudTales" />
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                  alt="pl"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-gray-200 text-white" />
      </nav>
      <hr className="mx-auto border-t border-gray-200 text-white w-5/6" />
    </>
  );
}

export default App;
