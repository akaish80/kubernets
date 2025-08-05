import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ClusterData } from '../types';

const PodDetailsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const cluster = location.state?.cluster as ClusterData;

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
                            <span className={`status ${cluster.status.toLowerCase()}`}>
                                {cluster.status}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Ready Nodes</label>
                            <span>{cluster.ready}/{cluster.nodes}</span>
                        </div>
                        <div className="info-item">
                            <label>Health Score</label>
                            <span className={`metric-badge ${getHealthBadgeClass(cluster.health)}`}>
                                {cluster.health}%
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Total Nodes</label>
                            <span>{cluster.nodes}</span>
                        </div>
                        <div className="info-item">
                            <label>Total Pods</label>
                            <span>{cluster.pods}</span>
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
                </div>
                {cluster?.podDetails && cluster?.podDetails.length > 0 ? (
                    <div className="pods-table-container">
                        <table className="pods-table">
                            <thead>
                                <tr>
                                    <th>Pod Name</th>
                                    <th>Status</th>
                                    <th>IP Address</th>
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
