import React, { useEffect, useState } from 'react';
import ClusterTable from '../components/ClusterTable';
import type { InputData } from '../types';
//import inputData from '../input.json';

const Dashboard: React.FC = () => {
    //const data: InputData = inputData as InputData;

    const [serviceDetails, setServiceDetails] = useState<InputData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
        try {
            console.log('Fetching service details...');
            const res = await fetch('http://127.0.0.1:8080/orchestrate/details'); // Replace with your API
            if (!res.ok) {
            throw new Error('Failed to fetch users');
            }
            const data: InputData[] = await res.json();
            setServiceDetails(data);
        } catch (err) {
            console.error('Error fetching service details:', err);
            setError((err as Error).message);
        }
        };

        fetchServiceDetails();
    }, []);

    // Calculate statistics
    const totalClusters = serviceDetails.length;
    const activeClusters = serviceDetails.filter(cluster => cluster?.status === "ACTIVE").length;
    const totalPods = serviceDetails.reduce((sum, cluster) => sum + cluster?.podDetails?.length, 0);
    const totalNodes = serviceDetails.reduce((sum, cluster) => sum + cluster?.nodes, 0);

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
            </div>

            <ClusterTable clusters={serviceDetails} />
        </div>
    );
};

export default Dashboard;
