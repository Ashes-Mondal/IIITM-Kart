import React from "react";

const Dashboard = (admin) => {
  return (
    <div className="adminPanel">
      <h1>Dashboard</h1>
      <h3>
        Welcome {admin.admin.name.firstName} {admin.admin.name.lastName}
      </h3>
      <div className="row justify-content">
        <div className="container shadow bg-white rounded m-3 p-1">
          <h3>Card 1</h3>
          <p>Some text</p>
          <p>Some text</p>
        </div>
        <div className="container shadow bg-white rounded m-3 p-1">
          <h3>Card 2</h3>
          <p>Some text</p>
          <p>Some text</p>
        </div>
        <div className="container shadow bg-white rounded m-3 p-1">
          <h3>Card 3</h3>
          <p>Some text</p>
          <p>Some text</p>
        </div>
        <div className="container shadow bg-white rounded m-3 p-1">
          <h3>Card 4</h3>
          <p>Some text</p>
          <p>Some text</p>
        </div>
      </div>
      <div className="container shadow bg-white rounded m-3 p-2">
        <h3>
          Welcome {admin.admin.name.firstName} {admin.admin.name.lastName}
        </h3>
        <h3>{admin.admin.email}</h3>
      </div>
      {console.log("Admin is: ", admin)}
    </div>
  );
};

export default Dashboard;
