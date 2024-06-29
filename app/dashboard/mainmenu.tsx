import React from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

type SetSelectedOption = (selectedOption: string) => void;
interface MainmenuProps {
  isAdmin: boolean;
  onOptionClick: SetSelectedOption;
  jobLimit: boolean;
  userLimit: boolean;
}

const Mainmenu = ({ onOptionClick, isAdmin, jobLimit, userLimit }: MainmenuProps) => {
  const handleClick = (option: string) => {
    onOptionClick(option);
  };

  return (
    <div className="mainmenu">
      <div className="menu-option">
        <div className="mainmenu-jobpost">
          <h2>Job Post</h2>
          <UploadOutlined className="jobpost-icon" />
          <div>
            {jobLimit ? (
              <div>
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  Job Post Limit Reached (6/6)<br/> 
                  Delete a Job Post to Add More
                </p>
              
              </div>
            ) : (
              <p style={{ color: 'green', fontWeight: 'bold' }}>Only 6 job posts allowed.</p>
            )}
            <a
              href="#"
              onClick={() => !jobLimit && handleClick("new-job-posting")}
              style={{
                color: jobLimit ? 'gray' : 'black',
                pointerEvents: jobLimit ? 'none' : 'auto',
                textDecoration: jobLimit ? 'none' : 'underline'
              }}
            >
              <h1>Create New Job Post</h1>
            </a>
            <a href="#" onClick={() => handleClick("all-job-posting")}>
              <h1>View All Job Posting</h1>
            </a>
          </div>
        </div>

        {isAdmin && (
          <div className="mainmenu-user">
            <h2>Admin Access</h2>
            <UserOutlined className="user-icon" />
            <div>
              {userLimit ? (
                <div>
                  <p style={{ color: 'red', fontWeight: 'bold' }}>
                   User limit has been reached (5/5)
                    <br/>
                    Delete users to add more
                  </p>
                
                </div>
              ) : (
                <p style={{ color: 'green', fontWeight: 'bold' }}>Only 5 admin users allowed.</p>
              )}
              <a
                href="#"
                onClick={() => !userLimit && handleClick("new-user")}
                style={{
                  color: userLimit ? 'gray' : 'black',
                  pointerEvents: userLimit ? 'none' : 'auto',
                  textDecoration: userLimit ? 'none' : 'underline'
                }}
              >
                <h1>Create New User</h1>
              </a>
              <a href="#" onClick={() => handleClick("all-list-user")}>
                <h1>View All Users</h1>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainmenu;
