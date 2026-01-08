export interface OpcuaNode {
    name: string;
    value: string;
}

export interface NodeListResponse {
    nodes: OpcuaNode[];
    totalCount: number;
}