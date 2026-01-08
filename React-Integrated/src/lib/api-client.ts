import BaseApi from '@lib/api-client-base';
import type { NodeListResponse } from '@utils/types/api';

export class OpcUaNodesApi extends BaseApi {
    async getNodes(): Promise<NodeListResponse[]> {
    return this.get<NodeListResponse[]>('/opcua-nodes');
  }
}