import React from 'react';
import type { PodDetail } from '../types';

interface PodDetailsProps {
    pods: PodDetail[];
    clusterName: string;
    onClose: () => void;
}

const PodDetails: React.FC<PodDetailsProps> = ({ pods, clusterName, onClose }) => {
    return (
        <div className="pod-details-overlay" onClick={onClose}>
            <div className="pod-details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="pod-details-header">
                    <h3>📦 Pod Details for {clusterName}</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div></div>
                <div className="pod-details-content">
                    {pods.length > 0 ? (
                        <div className="pod-table-wrapper">
                            <table className="pod-table">
                                <thead>
                                    <tr>
                                        <th>Pod Name</th>
                                        <th>Status</th>
                                        <th>IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pods.map((pod, index) => (
                                        <tr key={index}>
                                            <td className="pod-name">{pod.podName}</td>
                                            <td>
                                                <span className={`status ${pod.podStatus.toLowerCase()}`}>
                                                    {pod.podStatus}
                                                </span>
                                            </td>
                                            <td className="pod-ip">{pod.podIP}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-pods">
                            <div className="no-pods-icon">📦</div>
                            <h4>No Pods Found</h4>
                            <p>This cluster doesn't have any pods running.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PodDetails;