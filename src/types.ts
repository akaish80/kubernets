export interface PodDetail {
    podName: string;
    podStatus: string;
    podIP: string;
}

export interface ClusterData {
    id: string;
    name: string;
    status: string;
    ready: number;
    health: string;
    nodes: number;
    pods: number;
    created_at: string;
    updated_at: string;
    description: string;
    Pods?: PodDetail[];
    podDetatils?: PodDetail[];
}

export interface InputData {
    data: ClusterData[];
}