import axios from "axios";
import { useState} from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [formData, setformData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: new Date(),
    role: "",
    Searchid: "",
    deleteID:"",
  });

  const [searchResult, setSearchResult] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const handleTabChange = (tab: "add" | "search" | "show") => {
    setActiveTab(tab);
};

async function handlechange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const {name,value} = e.target;
  if (name === "dateOfJoining") {
    setformData({...formData,[name]:new Date(value)});
  } else {
    setformData({...formData,[name]:value});
  }
}

async function handleSubmit() {
  const response=await axios.post("http://localhost:3000/push-user",{
    name:formData.name,
    employeeId:formData.employeeId,
    email:formData.email,
    phoneNumber:formData.phoneNumber,
    department:formData.department,
    dateOfJoining:formData.dateOfJoining,
    role:formData.role,

  });
  alert(response.data.message);
}

async function handleSearch() {
  const response=await axios.get("http://localhost:3000/get-user",{
    params:{search:formData.Searchid},
  });
  if(response.data.message!="Employee not found" && response.data.message!="Server error"){
    setSearchResult(response.data);
  }
  else{
    alert(response.data.message);
  }
}

async function handleDelete() {
  const response = await axios.delete("http://localhost:3000/del-user",{
    params:{delid:formData.deleteID},
  })
  alert(response.data.message);
}

  return (
    <div  style={{
      display:'flex',
      flex:1,
      flexDirection:'column',
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div>
        <h1>Employee Management System</h1>
      </div>
      <div style={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      gap:'40px',
      padding:'20px'
    }}>
        <button 
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("add")}>Add Employee</button>
        <button 
        style={{
          backgroundColor: "#28A745",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("search")}>Search Employee</button>
        <button 
        style={{
          backgroundColor: "#DC3545",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("show")}>Delete Employees</button>
      </div>

      {activeTab === "add" && (
        <div style={{
          display:'flex',
          flexDirection:'column',
          justifyContent: "space-between",
          gap:'25px'
        }}>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>NAME  </strong>
            <input
            style={{
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "10px",
            }}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handlechange}
              value={formData.name}
              required
            />
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>EMPLOYEE ID  </strong>
            <input
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              onChange={handlechange}
              value={formData.employeeId}
              required
            />
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>EMAIL  </strong>
            <input
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handlechange}
              value={formData.email}
              required
            />
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>PHONE NUMBER  </strong>
            <input
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handlechange}
              value={formData.phoneNumber}
              required
            />
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>DEPARTMENT  </strong>
            <select
              style={{
                color: "white",
                padding: "10px 40px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              name="department"
              onChange={handlechange}
              value={formData.department}
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>DATE OF JOINING  </strong>
            <input
              style={{
                color: "white",
                padding: "10px 50px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              type="date"
              name="dateOfJoining"
              onChange={handlechange}
              required
            />
          </div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent: "space-between",
          gap:'10px'
        }}>
            <strong>ROLE  </strong>
            <input
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
              }}
              type="text"
              name="role"
              placeholder="Role"
              onChange={handlechange}
              value={formData.role}
              required
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {activeTab === "search" && (
        <div>
          <div style={{
          display:'flex',
          flexDirection:'row',
          gap:'20px'
        }}>
            <input style={{
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "10px",
            }}
              name="Searchid"
              type="text"
              placeholder="Search by Employee ID"
              onChange={handlechange}
              value={formData.Searchid}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {searchResult.name && (
            <div style={{ marginTop: "20px" }}>
              <p><strong>Name:</strong> {searchResult.name}</p>
              <p><strong>Employee ID:</strong> {searchResult.employeeId}</p>
              <p><strong>Email:</strong> {searchResult.email}</p>
              <p><strong>Phone Number:</strong> {searchResult.phoneNumber}</p>
              <p><strong>Department:</strong> {searchResult.department}</p>
              <p><strong>Date of Joining:</strong> {searchResult.dateOfJoining}</p>
              <p><strong>Role:</strong> {searchResult.role}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "show" && (
        <div style={{
          display:'flex',
          flexDirection:'row',
          gap:'20px'
        }}>
            <input style={{
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "10px",
            }}
              name="deleteID"
              type="text"
              placeholder="Search by Employee ID"
              onChange={handlechange}
              value={formData.deleteID}
            />
            <button onClick={handleDelete}>Delete</button>
          </div>
      )}
    </div>
  );
};

export default App;
