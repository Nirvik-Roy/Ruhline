import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import img from "../../../assets/Images/Group.png";
import { useNavigate } from "react-router-dom";
import AddNote from "../../../Components/AddNote/AddNote";
import { getDashboardData } from "../../../utils/dashboard";
import DashboardLoader from "../../../Components/Loaders/DashboardLoader";
const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const res = await getDashboardData();
      setDashboardData(res?.data || {});
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <AddNote />
      {loading && (
        <div className="dashboard_content_wrapper">
          {loading && <DashboardLoader />}
        </div>
      )}
      {!loading && (
        <div className="dashboard_content_wrapper">
          <h3>Dashboard</h3>

          {!loading && (
            <div className="dashboard_cards_wrapper">
              <div className="dashboard_card">
                <img src={img} />
                <h4>Upcoming Appointments</h4>
                <h2>{dashboardData?.stats?.upcoming_appointments || 0}</h2>
              </div>

              <div className="dashboard_card">
                <img src={img} />
                <h4>Completed Programs</h4>
                <h2>{dashboardData?.stats?.completed_programs || 0}</h2>
              </div>

              <div className="dashboard_card">
                <img src={img} />
                <h4>Enrolled Programs</h4>
                <h2>{dashboardData?.stats?.enrolled_programs || 0}</h2>
              </div>
            </div>
          )}

          <h3>Quick Actions</h3>
          <div className="quick_actions_buttons_wrapper">
            <button
              onClick={() => navigate("/dashboard/support")}
              className="quick_action_btn"
            >
              Raise a Dispute
            </button>
            <button
              onClick={() => navigate("/dashboard/change-password")}
              className="quick_action_btn"
            >
              Change Password
            </button>
            {/* <button className='quick_action_btn'>Delete Account</button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
