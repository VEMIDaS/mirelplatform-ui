import axios from 'axios';
import { appConfig } from '../../../foundation/config/appConfig';
import { StencilConfig, StencilOption } from '../types/stencil';

export class StencilApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'StencilApiError';
  }
}

export const stencilClient = {
  async getStencilOptions(categoryId: string): Promise<StencilOption[]> {
    try {
      const response = await axios.get(`${appConfig.api.target}/api/stencils/${categoryId}`);
      return response.data.map((item: any) => ({
        value: item.stencilCd,
        text: item.stencilName
      }));
    } catch (error: any) {
      throw new StencilApiError(
        error.response?.status || 500,
        error.response?.data?.message || 'ステンシル情報の取得に失敗しました'
      );
    }
  },

  async getStencilConfig(stencilCd: string): Promise<StencilConfig> {
    try {
      const response = await axios.get(`${appConfig.api.target}/api/stencil-config/${stencilCd}`);
      return response.data;
    } catch (error: any) {
      throw new StencilApiError(
        error.response?.status || 500,
        error.response?.data?.message || 'ステンシル設定の取得に失敗しました'
      );
    }
  },

  async updateStencilConfig(stencilCd: string, config: Partial<StencilConfig>): Promise<void> {
    try {
      await axios.put(`${appConfig.api.target}/api/stencil-config/${stencilCd}`, config);
    } catch (error: any) {
      throw new StencilApiError(
        error.response?.status || 500,
        error.response?.data?.message || 'ステンシル設定の更新に失敗しました'
      );
    }
  },

  async reloadStencilMaster(params: {
    stencilCategory: string;
    stencilCd: string;
    serialNo: string;
  }): Promise<void> {
    try {
      await axios.post(`${appConfig.api.target}/apps/mste/api/reloadStencilMaster`, {
        content: params
      });
    } catch (error: any) {
      throw new StencilApiError(
        error.response?.status || 500,
        error.response?.data?.message || 'ステンシルマスタのリロードに失敗しました'
      );
    }
  }
};