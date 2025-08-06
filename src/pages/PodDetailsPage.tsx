import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ClusterData } from '../types';

const PodDetailsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state?.cluster as ClusterData;

    const [cluster, setServiceDetails] = useState<ClusterData[]>([]);

    useEffect(() => {
        setServiceDetails(data);
    }, []);

    if (!cluster) {
        return (
            <div className="pod-details-page">
                <div className="error-message">
                    <h2>❌ Cluster not found</h2>
                    <p>Unable to load cluster information. Please return to the dashboard and try again.</p>
                    <button onClick={() => navigate('/')} className="back-button">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const handleBack = () => {
        navigate('/');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getHealthBadgeClass = (health: string) => {
        const healthNum = parseInt(health);
        if (healthNum >= 80) return 'healthy';
        if (healthNum >= 50) return 'warning';
        return 'danger';
    };

    const greatestPort = cluster?.podDetails?.length > 1 ? Math.max(...cluster?.podDetails?.map(pod => pod.port)) : cluster?.podDetails?.[0]?.port || 9091;

    const handleIncrementOrDecrement = (path, port) => {
        
        const fetchServiceDetails = async () => {
        try {
            console.log('Fetching service details...');
            
            const body = JSON.stringify({ clusterId: cluster.id, podPort: port });
            const res = await fetch(`http://127.0.0.1:8080/orchestrate/pod/${path}`, 
                {method: "POST", body, headers: { "Content-Type": "application/json" }}); // Replace with your API
            if (!res.ok) {
            throw new Error('Failed to fetch users');
            }
            const data: ClusterData[] = await res.json();
            setServiceDetails(data);
        } catch (err) {
            console.error('Error fetching service details:', err);
            //setError((err as Error).message);
        }
        };

        fetchServiceDetails();
    };

    const handleDecrement = () => {
        console.log('Decrement button clicked');
    };

    return (
        <div className="pod-details-page">
            <div className="page-header">
                <button onClick={handleBack} className="back-button">
                    Back to Dashboard
                </button>
                <h1>Cluster: {cluster.name}</h1>
            </div>

            <div className="cluster-info">
                <div className="cluster-summary">
                    <h3>Cluster Overview</h3>
                    <div className="info-grid">
                        <div className="info-item status">
                            <label>Status</label>
                            <span className={`status ${cluster?.status?.toLowerCase()}`}>
                                {cluster.status}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Health Score</label>
                            <span className={`metric-badge ${getHealthBadgeClass(cluster.health)}`}>
                                {cluster.health}%
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Total Pods</label>
                            <span>{cluster?.podDetails?.length}</span>
                        </div>
                        <div className="info-item">
                            <label>Created</label>
                            <span>{formatDate(cluster.created_at)}</span>
                        </div>
                        <div className="info-item">
                            <label>Last Updated</label>
                            <span>{formatDate(cluster.updated_at)}</span>
                        </div>
                        <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                            <label>Description</label>
                            <span>{cluster.description}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pods-section">
                <div className="pods-section-header">
                    <h3>Pod Details ({cluster?.podDetails?.length || 0} pods)</h3>
                    <button onClick={() => handleIncrementOrDecrement('increment', greatestPort + 1)} className="increment-button">+</button>
                </div>
                {cluster?.podDetails && cluster?.podDetails.length > 0 ? (
                    <div className="pods-table-container">
                        <table className="pods-table">
                            <thead>
                                <tr>
                                    <th>Pod Name</th>
                                    <th>Status</th>
                                    <th>IP Address</th>
                                    <th>Terminate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cluster.podDetails.map((pod, index) => (
                                    <tr key={index}>
                                        <td className="pod-name">{pod.podName}</td>
                                        <td>
                                            <span className={`status ${pod.podStatus.toLowerCase()}`}>
                                                {pod.podStatus}
                                            </span>
                                        </td>
                                        <td className="pod-ip">{pod.ipAddress}</td>
                                        <td><button onClick={() => handleIncrementOrDecrement('decrement', pod?.port)} className="increment-button">-</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-pods">
                        <div className="no-pods-icon">📦</div>
                        <h4>No Pods Available</h4>
                        <p>This cluster doesn't have any pods currently running or deployed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PodDetailsPage;
