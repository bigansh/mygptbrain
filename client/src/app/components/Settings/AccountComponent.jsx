import { useState } from "react";

const AccountSettings = () => {
  const [name, setName] = useState("Barun Debnath");
  const [email, setEmail] = useState("barundebnath91@gmail.com");
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = () => {
    setShowUpdatePassword(!showUpdatePassword);
    setOldPassword("");
    setNewPassword("");
    setShowDeleteAccount(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccount(!showDeleteAccount);
    setName("");
    setEmail("");
    setOldPassword("");
    setShowUpdatePassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic for updating password or deleting account
    // You can access the updated values from the respective state variables
  };

  return (
    <div className="max-w-sm mt-8 p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="name" className="block text-3xl text-black mb-1">
            name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="email" className="block text-3xl text-black mb-1">
            email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {showUpdatePassword && (
          <>
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="oldPassword"
                className="block text-2xl  text-gray-700 mb-1">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </>
        )}

        {showDeleteAccount && (
          <>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex">
          {!showUpdatePassword && !showDeleteAccount && (
            <button
              type="button"
              className="mr-2 px-2 py-2 bg-[#DFE8FF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full"
              onClick={handleUpdatePassword}>
              Update Password
            </button>
          )}

          {!showUpdatePassword && !showDeleteAccount && (
            <button
              type="button"
              className="mr-2 px-2 py-2 bg-[#FFDFDF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full"
              onClick={handleDeleteAccount}>
              Delete Account
            </button>
          )}

          {showUpdatePassword && !showDeleteAccount && (
            <button
              type="button"
              className="mr-2 px-2 py-2 bg-[#DFE8FF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full"
              onClick={handleDeleteAccount}>
              confirm password
            </button>
          )}

          {!showUpdatePassword && showDeleteAccount && (
            <button
              type="button"
              className="mr-2 px-2 py-2 bg-[#FFDFDF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full"
              onClick={handleDeleteAccount}>
              Delete Account
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
