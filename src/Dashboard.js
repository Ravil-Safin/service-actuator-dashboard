// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const services = [
  { name: 'Example service 1', url: '/example1/actuator/info' },
  { name: 'Example service 2', url: '/example2/actuator/info' }
];

const Dashboard = ({ baseUrl }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = services.map(async (service) => {
        try {
          const response = await axios.get(`${baseUrl}${service.url}`);
          return {
            name: service.name,
            gitBranch: response.data.git.branch,
            commitId: response.data.git.commit.id,
            commitTime: response.data.git.commit.time,
            error: false,
          };
        } catch (error) {
          return {
            name: service.name,
            gitBranch: 'N/A',
            commitId: 'N/A',
            commitTime: 'N/A',
            error: true,
          };
        }
      });
      const results = await Promise.all(promises);
      setData(results);
    };

    if (baseUrl) {
      fetchData();
    }
  }, [baseUrl]);

  return (
    <div className="dashboard">
      {data.map((service, index) => (
        <div
          key={index}
          className={`service-box ${service.error ? 'error' : ''}`}
        >
          <h3>{service.name}</h3>
          <p><strong>Git Branch:</strong> {service.gitBranch}</p>
          <p><strong>Commit ID:</strong> {service.commitId}</p>
          <p><strong>Commit Time:</strong> {service.commitTime}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
