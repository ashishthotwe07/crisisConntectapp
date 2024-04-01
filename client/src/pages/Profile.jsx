import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthSelector, updateUser } from "../redux/reducers/authSlice";
// import { updateUser } from "../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(AuthSelector);
  const [isEditing, setIsEditing] = useState(false);
  const inputref = useRef();
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: user._id, data: formData }));

    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputref.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="h-full">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold ml-10 block">Profile</span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </button>
            )}
          </div>
          <div className="rounded shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="pb-6">
                <div className="flex">
                  <input
                    disabled={!isEditing}
                    ref={inputref}
                    name="username"
                    className="border-2 rounded-r px-4 py-2 w-full"
                    type="text"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="pb-6">
                <input
                  disabled={!isEditing}
                  name="email"
                  className="border-2 rounded-r px-4 py-2 w-full"
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="pb-6">
                <input
                  disabled={!isEditing}
                  name="password"
                  className="border-2 rounded-r px-4 py-2 w-full"
                  type="password"
                  placeholder="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="pb-6">
                <input
                  disabled={!isEditing}
                  name="phone"
                  className="border-2 rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="pb-6">
                <input
                  disabled={!isEditing}
                  name="address"
                  className="border-2 rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
