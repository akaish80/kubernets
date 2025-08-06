import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClusterData } from '../types';

interface ClusterTableProps {
    clusters: ClusterData[];
}

const ClusterTable: React.FC<ClusterTableProps> = ({ clusters }) => {
    const navigate = useNavigate();

    const handleNameClick = (cluster: ClusterData) => {
        navigate(`/cluster/${cluster.id}/pods`, {
            state: {
                cluster: cluster
            }
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getHealthStatus = (health: string) => {
        const healthNum = parseInt(health);
        if (healthNum >= 80) return 'healthy';
        if (healthNum >= 50) return 'warning';
        return 'danger';
    };

    return (
        <div className="cluster-table-container">
            <div className="cluster-table-header">
                <h2>
                    🖥️ Cluster Dashboard
                    <span className="cluster-count">{clusters.length} Active</span>
                </h2>
                <div className="table-actions">
                    <button className="refresh-button">
                        ↻ Refresh
                    </button>
                </div>
            </div>

            <div className="cluster-table-content">
                <table className="cluster-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Health</th>
                            <th>Pods</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clusters.map((cluster) => (
                            <tr key={cluster.id}>
                                <td>
                                    <span className={`status ${cluster.status.toLowerCase()}`}>
                                        {cluster.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="name-button"
                                        onClick={() => handleNameClick(cluster)}
                                    >
                                        {cluster.name}
                                        <span>→</span>
                                    </button>
                                </td>
                                <td>
                                    <span className={`metric-badge ${getHealthStatus(cluster.health)}`}>
                                        {cluster.health}%
                                    </span>
                                </td>
                                <td>
                                    <span className="metric-badge">
                                        {cluster?.podDetails?.length}
                                    </span>
                                </td>
                                <td className="date-cell">{formatDate(cluster.created_at)}</td>
                                <td className="date-cell">{formatDate(cluster.updated_at)}</td>
                                <td className="description" title={cluster.description}>
                                    {cluster.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClusterTable;
