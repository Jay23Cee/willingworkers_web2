import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@/app/components/user";

type SetSelectedOption = (selectedOption: string) => void;

interface EditUserPostProps {
  prop: User;
  setSelectedOption: SetSelectedOption;
}

export default function EditUserPost({
  prop,
  setSelectedOption: _setSelectedOption,
}: EditUserPostProps) {
  const [admin, setAdmin] = useState({
    name: prop.name,
    email: prop.email,
    role: prop.role,
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/updateUser", admin);
      if (response.status === 201) {
        toast.success("User role has change successfully!");
        setAdmin({ name: "", email: "", role: "admin" });
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-container-content user-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group edit-user-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={admin.name}
              onChange={handleInputChange}
              readOnly
              required
            />
          </div>
          <div className="form-group edit-user-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={admin.email}
              onChange={handleInputChange}
              readOnly
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              onChange={handleInputChange}
              value={admin.role as string}
              required
            >
              <option value="" disabled>
                -- Select Role --
              </option>
              <option value="admin">
                Admin
              </option>
              <option value="moderator">
                Moderator
              </option>
            </select>
          </div>
          <button type="submit">Save Updated User</button>
        </form>
      </div>
    </div>
  );
}
