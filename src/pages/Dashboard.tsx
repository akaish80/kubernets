import React from 'react';
import ClusterTable from '../components/ClusterTable';
import type { InputData } from '../types';
import inputData from '../input.json';

const Dashboard: React.FC = () => {
    const data: InputData = inputData as InputData;

    // Calculate statistics
    const totalClusters = data.data.length;
    const activeClusters = data.data.filter(cluster => cluster.status.toLowerCase() === 'active').length;
    const totalPods = data.data.reduce((sum, cluster) => sum + parseInt(cluster.Pods), 0);
    const totalNodes = data.data.reduce((sum, cluster) => sum + parseInt(cluster.Nodes), 0);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Kubernetes Cluster Dashboard</h1>
                <p className="dashboard-subtitle">Monitor and manage your cluster infrastructure</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h4>Total Clusters</h4>
                    <div className="value">{totalClusters}</div>
                </div>
                <div className="stat-card">
                    <h4>Active Clusters</h4>
                    <div className="value">{activeClusters}</div>
                </div>
                <div className="stat-card">
                    <h4>Total Pods</h4>
                    <div className="value">{totalPods}</div>
                </div>
                <div className="stat-card">
                    <h4>Total Nodes</h4>
                    <div className="value">{totalNodes}</div>
                </div>
            </div>

            <ClusterTable clusters={data.data} />
        </div>
    );
};

export default Dashboard;
